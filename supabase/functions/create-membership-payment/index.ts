import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Membership prices in NOK (stored as øre - multiply by 100)
const MEMBERSHIP_PRICES = {
  Hovedmedlem: 20000, // 200 NOK
  Støttemedlem: 20000, // 200 NOK
} as const;

// Server-side validation schema matching client-side validation
const membershipDataSchema = z.object({
  membership_type: z.enum(['Hovedmedlem', 'Støttemedlem']),
  first_name: z.string()
    .trim()
    .min(1)
    .max(100),
  middle_name: z.string()
    .trim()
    .max(100)
    .optional()
    .nullable(),
  last_name: z.string()
    .trim()
    .min(1)
    .max(100),
  phone: z.string()
    .trim()
    .min(8)
    .max(15),
  personnummer: z.string()
    .trim()
    .regex(/^\d{6,12}$/),
  gender: z.enum(['Mann', 'Kvinne', 'Ønsker ikke å oppgi']),
  country: z.string()
    .trim()
    .min(1)
    .max(100),
  address: z.string()
    .trim()
    .min(1)
    .max(200),
  address_2: z.string()
    .trim()
    .max(200)
    .optional()
    .nullable(),
  postal_code: z.string()
    .trim()
    .min(4)
    .max(10),
  city: z.string()
    .trim()
    .min(1)
    .max(100),
  newsletter_subscribed: z.boolean().default(false),
  how_heard_about_us: z.string()
    .trim()
    .max(1000)
    .optional()
    .nullable(),
});

// Sanitize string input to prevent XSS
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the authenticated user
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
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ error: "Autentisering feilet. Vennligst logg inn på nytt.", code: "AUTH_FAILED" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Parse and validate request body
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

    // Validate membership data with zod schema
    const validationResult = membershipDataSchema.safeParse(membershipData);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.flatten());
      return new Response(
        JSON.stringify({ 
          error: "Ugyldig medlemskapsdata. Vennligst sjekk skjemaet og prøv igjen.", 
          code: "VALIDATION_ERROR" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Betalingstjenesten er midlertidig utilgjengelig", code: "CONFIG_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 503 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check if Stripe customer exists
    let customerId;
    try {
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    } catch (stripeError) {
      console.error("Stripe customer lookup error:", stripeError);
      // Continue without customer ID - will create new customer
    }

    // Get the price based on validated membership type
    const price = MEMBERSHIP_PRICES[validatedData.membership_type];

    // Create checkout session
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "nok",
              product_data: {
                name: `Naturfolk ${validatedData.membership_type}`,
                description: `Årlig medlemskap som ${validatedData.membership_type}`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin")}/medlemskap?success=true`,
        cancel_url: `${req.headers.get("origin")}/betaling?canceled=true`,
        metadata: {
          user_id: user.id,
          membership_type: validatedData.membership_type,
        },
      });
    } catch (stripeError) {
      console.error("Stripe session creation error:", stripeError);
      return new Response(
        JSON.stringify({ error: "Kunne ikke opprette betalingsøkt. Vennligst prøv igjen.", code: "PAYMENT_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Sanitize and update user profile with membership data
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
      // Don't fail the payment flow if profile update fails
      // The payment session is already created
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected error in create-membership-payment:", error);
    return new Response(
      JSON.stringify({ 
        error: "Det oppstod en uventet feil. Vennligst prøv igjen senere.", 
        code: "INTERNAL_ERROR" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
