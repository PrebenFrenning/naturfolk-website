import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  console.log(`[RENEWAL-REMINDER] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!stripeKey || !resendKey) {
      throw new Error("Missing required environment variables");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const resend = new Resend(resendKey);

    // Find subscriptions renewing in ~7 days (between 6 and 8 days from now)
    const now = Math.floor(Date.now() / 1000);
    const sixDays = now + 6 * 24 * 60 * 60;
    const eightDays = now + 8 * 24 * 60 * 60;

    logStep("Searching for subscriptions renewing soon", { sixDays, eightDays });

    const subscriptions = await stripe.subscriptions.list({
      status: "active",
      limit: 100,
    });

    let remindersSent = 0;

    for (const sub of subscriptions.data) {
      const renewalDate = sub.current_period_end;

      if (renewalDate >= sixDays && renewalDate <= eightDays) {
        const customer = await stripe.customers.retrieve(sub.customer as string);
        if (customer.deleted || !('email' in customer) || !customer.email) continue;

        const renewalDateFormatted = new Date(renewalDate * 1000).toLocaleDateString('nb-NO', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        const amount = sub.items.data[0]?.price?.unit_amount
          ? (sub.items.data[0].price.unit_amount / 100).toFixed(0)
          : '200';

        logStep("Sending reminder", { email: customer.email, renewalDate: renewalDateFormatted });

        try {
          await resend.emails.send({
            from: "Naturfolk <noreply@naturfolk.no>",
            to: [customer.email],
            subject: "Påminnelse: Ditt Naturfolk-medlemskap fornyes snart",
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2d5016;">Hei ${customer.name || 'kjære medlem'}!</h2>
                <p>Vi vil gi deg en vennlig påminnelse om at ditt Naturfolk-medlemskap fornyes automatisk <strong>${renewalDateFormatted}</strong>.</p>
                <p>Beløpet som trekkes er <strong>${amount} NOK</strong>.</p>
                <p>Hvis du ønsker å gjøre endringer i ditt medlemskap, kan du logge inn på <a href="https://naturfolk-website.lovable.app/medlemskap" style="color: #2d5016;">din medlemsside</a>.</p>
                <hr style="border: none; border-top: 1px solid #e0d8c8; margin: 20px 0;" />
                <p style="color: #666; font-size: 14px;">Med vennlig hilsen,<br/>Naturfolk</p>
              </div>
            `,
          });
          remindersSent++;
        } catch (emailError) {
          logStep("Failed to send email", { email: customer.email, error: emailError });
        }
      }
    }

    logStep("Completed", { remindersSent });

    return new Response(JSON.stringify({ success: true, remindersSent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
