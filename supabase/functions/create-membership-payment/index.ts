import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const NOTIFICATION_RECIPIENT = "post@naturfolk.org";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe price ID for annual membership subscription (200 NOK/year)
const MEMBERSHIP_PRICE_ID = "price_1T4ODKIh8FAjNH79j9LLUocP";

// Server-side validation schema (includes email for unauthenticated signups)
const membershipDataSchema = z.object({
  membership_type: z.enum(['Hovedmedlem', 'Støttemedlem']),
  email: z.string().trim().email().min(1).max(255),
  first_name: z.string().trim().min(1).max(100),
  middle_name: z.string().trim().max(100).optional().nullable(),
  last_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(8).max(15),
  personnummer: z.string().trim().regex(/^\d{6,12}$/),
  gender: z.enum(['Mann', 'Kvinne', 'Ønsker ikke å oppgi']),
  country: z.string().trim().min(1).max(100),
  address: z.string().trim().min(1).max(200),
  address_2: z.string().trim().max(200).optional().nullable(),
  postal_code: z.string().trim().min(4).max(10),
  city: z.string().trim().min(1).max(100),
  newsletter_subscribed: z.boolean().default(false),
  how_heard_about_us: z.string().trim().max(1000).optional().nullable(),
});

function sanitizeString(input: string | null | undefined): string | null {
  if (!input) return null;
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Ugyldig forespørsel", code: "INVALID_REQUEST" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { membershipData } = requestBody;
    if (!membershipData) {
      return new Response(
        JSON.stringify({ error: "Medlemskapsdata mangler", code: "MISSING_DATA" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const validationResult = membershipDataSchema.safeParse(membershipData);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.flatten());
      return new Response(
        JSON.stringify({ error: "Ugyldig medlemskapsdata. Vennligst sjekk skjemaet og prøv igjen.", code: "VALIDATION_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const validatedData = validationResult.data;
    const email = validatedData.email.toLowerCase().trim();

    // Find or create the user in auth.users using the email from the form.
    // This way the visitor doesn't need to log in before paying.
    let userId: string | null = null;

    // Try to look up an existing user by email
    const { data: usersList, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });

    if (!listError && usersList?.users) {
      const existing = usersList.users.find(
        (u) => u.email?.toLowerCase() === email
      );
      if (existing) {
        userId = existing.id;
      }
    }

    // If no existing user, create one (passwordless — they will log in via OTP later)
    if (!userId) {
      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          full_name: [
            validatedData.first_name,
            validatedData.middle_name,
            validatedData.last_name,
          ].filter(Boolean).join(' '),
        },
      });

      if (createError || !created?.user) {
        console.error("Could not create user:", createError);
        return new Response(
          JSON.stringify({
            error: "Kunne ikke opprette medlemskonto. Vennligst prøv igjen senere.",
            code: "USER_CREATE_FAILED",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
      }
      userId = created.user.id;
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Betalingstjenesten er midlertidig utilgjengelig", code: "CONFIG_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 503 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" });

    // Check for existing Stripe customer
    let customerId: string | undefined;
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;

        // Check if user already has an active subscription
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: "active",
          limit: 1,
        });
        if (subscriptions.data.length > 0) {
          return new Response(
            JSON.stringify({
              error: "Det finnes allerede et aktivt medlemskap registrert på denne e-posten.",
              code: "ALREADY_SUBSCRIBED",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }
      }
    } catch (stripeError) {
      console.error("Stripe customer lookup error:", stripeError);
    }

    // Create subscription checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: MEMBERSHIP_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/takk-for-registrering?type=${encodeURIComponent(validatedData.membership_type)}`,
      cancel_url: `${req.headers.get("origin")}/betaling?canceled=true`,
      metadata: {
        user_id: userId,
        membership_type: validatedData.membership_type,
      },
      subscription_data: {
        metadata: {
          user_id: userId,
          membership_type: validatedData.membership_type,
        },
      },
    });

    // Update profile with membership data
    const fullName = [
      sanitizeString(validatedData.first_name),
      sanitizeString(validatedData.middle_name),
      sanitizeString(validatedData.last_name)
    ].filter(Boolean).join(' ');

    try {
      await supabaseAdmin
        .from('profiles')
        .update({
          first_name: sanitizeString(validatedData.first_name),
          middle_name: sanitizeString(validatedData.middle_name),
          last_name: sanitizeString(validatedData.last_name),
          full_name: fullName,
          phone: sanitizeString(validatedData.phone),
          personnummer: sanitizeString(validatedData.personnummer),
          gender: validatedData.gender,
          country: sanitizeString(validatedData.country),
          address: sanitizeString(validatedData.address),
          address_2: sanitizeString(validatedData.address_2),
          postal_code: sanitizeString(validatedData.postal_code),
          city: sanitizeString(validatedData.city),
          newsletter_subscribed: validatedData.newsletter_subscribed,
          how_heard_about_us: sanitizeString(validatedData.how_heard_about_us),
          membership_type: validatedData.membership_type,
        })
        .eq('id', userId);
    } catch (dbError) {
      console.error("Database update error:", dbError);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Det oppstod en uventet feil. Vennligst prøv igjen senere.", code: "INTERNAL_ERROR" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
