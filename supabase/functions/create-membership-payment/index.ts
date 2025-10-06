import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Membership prices in NOK (stored as øre - multiply by 100)
const MEMBERSHIP_PRICES = {
  Hovedmedlem: 20000, // 200 NOK
  Støttemedlem: 20000, // 200 NOK
};

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
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Get request body
    const { membershipData } = await req.json();
    
    if (!membershipData) {
      throw new Error("Membership data is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if Stripe customer exists
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Get the price based on membership type
    const price = MEMBERSHIP_PRICES[membershipData.membership_type as keyof typeof MEMBERSHIP_PRICES];
    
    if (!price) {
      throw new Error("Invalid membership type");
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: `Naturfolk ${membershipData.membership_type}`,
              description: `Årlig medlemskap som ${membershipData.membership_type}`,
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
        membership_type: membershipData.membership_type,
      },
    });

    // Update user profile with membership data
    const fullName = [
      membershipData.first_name,
      membershipData.middle_name,
      membershipData.last_name
    ].filter(Boolean).join(' ');

    await supabaseClient
      .from('profiles')
      .update({
        first_name: membershipData.first_name,
        middle_name: membershipData.middle_name,
        last_name: membershipData.last_name,
        full_name: fullName,
        phone: membershipData.phone,
        personnummer: membershipData.personnummer,
        gender: membershipData.gender,
        country: membershipData.country,
        address: membershipData.address,
        address_2: membershipData.address_2,
        postal_code: membershipData.postal_code,
        city: membershipData.city,
        newsletter_subscribed: membershipData.newsletter_subscribed,
        how_heard_about_us: membershipData.how_heard_about_us,
        membership_type: membershipData.membership_type,
      })
      .eq('id', user.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-membership-payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
