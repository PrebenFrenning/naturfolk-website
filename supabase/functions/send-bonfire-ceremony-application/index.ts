import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-client-info, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT_EMAIL = "post@naturfolk.org";
const SENDER_EMAIL = "noreply@naturfolk.org";

const bodySchema = z.object({
  requestedAt: z.string().trim().min(1),
  locationAddress: z.string().trim().min(5).max(250),
  applicantFullName: z.string().trim().min(2).max(150),
  requestedAmount: z.coerce.number().positive().max(100000),
  vippsPhone: z.string().trim().min(8).max(20).regex(/^[0-9+\s]+$/),
  additionalInfo: z.string().trim().max(3000).optional().or(z.literal("")),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
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

    const payload = parsed.data;

    const { data: application, error: insertError } = await supabaseAdmin
      .from("bonfire_ceremony_applications")
      .insert({
        applicant_user_id: null,
        requested_at: new Date(payload.requestedAt).toISOString(),
        location_address: payload.locationAddress,
        applicant_full_name: payload.applicantFullName,
        requested_amount: payload.requestedAmount,
        vipps_phone: payload.vippsPhone,
        additional_info: payload.additionalInfo || null,
        recipient_email: RECIPIENT_EMAIL,
      })
      .select("id")
      .single();

    if (insertError || !application) {
      throw new Error("Kunne ikke lagre søknaden");
    }

    try {
      const resend = new Resend(resendKey);
      const escapedName = escapeHtml(payload.applicantFullName);
      const escapedLocation = escapeHtml(payload.locationAddress);
      const escapedVippsPhone = escapeHtml(payload.vippsPhone);
      const escapedAdditionalInfo = escapeHtml(payload.additionalInfo || "Ikke oppgitt").replace(/\n/g, "<br />");
      const formattedAmount = new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(payload.requestedAmount);
      const formattedDate = new Date(payload.requestedAt).toLocaleString("nb-NO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const { error: emailError } = await resend.emails.send({
        from: `Naturfolk <${SENDER_EMAIL}>`,
        to: [RECIPIENT_EMAIL],
        subject: "Søknad om midler til bålseremoni",
        html: `
          <div style="font-family: 'Open Sans', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background: #fdfaf6; color: #3d3129;">
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; margin-bottom: 16px; color: #3d3129;">Ny søknad om midler til bålseremoni</h1>
            <p style="margin: 0 0 8px;"><strong>Navn:</strong> ${escapedName}</p>
            <p style="margin: 0 0 8px;"><strong>Dato og klokkeslett:</strong> ${formattedDate}</p>
            <p style="margin: 0 0 8px;"><strong>Lokasjon:</strong> ${escapedLocation}</p>
            <p style="margin: 0 0 8px;"><strong>Ønsket beløp:</strong> ${formattedAmount}</p>
            <p style="margin: 0 0 8px;"><strong>Vipps-nummer:</strong> ${escapedVippsPhone}</p>
            <div style="margin-top: 24px; padding: 20px; border-radius: 8px; background: #ffffff; border: 1px solid #e4dccf;">
              <p style="margin: 0 0 8px;"><strong>Annen info:</strong></p>
              <p style="margin: 0; line-height: 1.7;">${escapedAdditionalInfo}</p>
            </div>
          </div>
        `,
      });

      if (emailError) throw emailError;

      await supabaseAdmin
        .from("bonfire_ceremony_applications")
        .update({
          email_sent: true,
          email_error: null,
          processed_at: new Date().toISOString(),
        })
        .eq("id", application.id);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : "Kunne ikke sende e-post";

      await supabaseAdmin
        .from("bonfire_ceremony_applications")
        .update({
          email_sent: false,
          email_error: message,
          processed_at: new Date().toISOString(),
        })
        .eq("id", application.id);

      return new Response(JSON.stringify({ success: false, saved: true, error: "Søknaden ble lagret, men e-posten kunne ikke sendes akkurat nå." }), {
        status: 202,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});