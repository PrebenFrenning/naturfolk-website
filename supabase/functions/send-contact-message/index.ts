import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT_EMAIL = "post@naturfolk.org";

const bodySchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(5).max(200),
  message: z.string().trim().min(10).max(5000),
});

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Metode ikke tillatt" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = bodySchema.safeParse(await req.json());

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Ugyldige skjemadata", fields: parsed.error.flatten().fieldErrors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      throw new Error("Mangler e-postoppsett");
    }

    const resend = new Resend(resendKey);
    const payload = parsed.data;

    const { data: submission, error: insertError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email.toLowerCase(),
        subject: payload.subject,
        message: payload.message,
        recipient_email: RECIPIENT_EMAIL,
      })
      .select("id")
      .single();

    if (insertError || !submission) {
      throw new Error("Kunne ikke lagre kontakthenvendelsen");
    }

    try {
      const escapedMessage = payload.message.replace(/\n/g, "<br />");

      const { error: emailError } = await resend.emails.send({
        from: "Naturfolk <noreply@naturfolk.org>",
        to: [RECIPIENT_EMAIL],
        replyTo: payload.email,
        subject: payload.subject,
        html: `
          <div style="font-family: 'Open Sans', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background: #fdfaf6; color: #3d3129;">
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; margin-bottom: 16px; color: #3d3129;">Ny henvendelse fra kontaktskjemaet</h1>
            <p style="margin: 0 0 8px;"><strong>Navn:</strong> ${payload.firstName} ${payload.lastName}</p>
            <p style="margin: 0 0 8px;"><strong>E-post:</strong> ${payload.email}</p>
            <p style="margin: 0 0 8px;"><strong>Emne:</strong> ${payload.subject}</p>
            <div style="margin-top: 24px; padding: 20px; border-radius: 8px; background: #ffffff; border: 1px solid #e4dccf;">
              <p style="margin: 0 0 8px;"><strong>Melding:</strong></p>
              <p style="margin: 0; line-height: 1.7;">${escapedMessage}</p>
            </div>
          </div>
        `,
      });

      if (emailError) {
        throw emailError;
      }

      await supabaseAdmin
        .from("contact_submissions")
        .update({
          email_sent: true,
          email_error: null,
          processed_at: new Date().toISOString(),
        })
        .eq("id", submission.id);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : "Kunne ikke sende e-post";

      await supabaseAdmin
        .from("contact_submissions")
        .update({
          email_sent: false,
          email_error: message,
          processed_at: new Date().toISOString(),
        })
        .eq("id", submission.id);

      return new Response(
        JSON.stringify({
          success: false,
          saved: true,
          error: "Henvendelsen ble lagret, men e-posten kunne ikke sendes akkurat nå.",
        }),
        {
          status: 202,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});