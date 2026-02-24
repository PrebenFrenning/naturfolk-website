import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe price ID for annual membership subscription (200 NOK/year)
const MEMBERSHIP_PRICE_ID = "price_1T4ODKIh8FAjNH79j9LLUocP";

// Server-side validation schema
const membershipDataSchema = z.object({
  membership_type: z.enum(['Hovedmedlem', 'Støttemedlem']),
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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Autentisering kreves", code: "AUTH_REQUIRED" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user?.email) {
      return new Response(
        JSON.stringify({ error: "Autentisering feilet. Vennligst logg inn på nytt.", code: "AUTH_FAILED" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

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
      return new Response(
        JSON.stringify({ error: "Ugyldig medlemskapsdata. Vennligst sjekk skjemaet og prøv igjen.", code: "VALIDATION_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const validatedData = validationResult.data;

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Betalingstjenesten er midlertidig utilgjengelig", code: "CONFIG_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 503 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" });

    // Check for existing Stripe customer
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
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
            JSON.stringify({ error: "Du har allerede et aktivt medlemskap.", code: "ALREADY_SUBSCRIBED" }),
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
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: MEMBERSHIP_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/medlemskap?success=true`,
      cancel_url: `${req.headers.get("origin")}/betaling?canceled=true`,
      metadata: {
        user_id: user.id,
        membership_type: validatedData.membership_type,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
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
      await supabaseClient
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
        .eq('id', user.id);
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
