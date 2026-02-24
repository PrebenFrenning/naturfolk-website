import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "E-postadresse er påkrevd" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if email exists in profiles
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("email, first_name")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (profileError) throw profileError;

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "not_found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Invalidate old codes for this email
    await supabaseAdmin
      .from("verification_codes")
      .update({ used: true })
      .eq("email", email.toLowerCase())
      .eq("used", false);

    // Generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store code
    const { error: insertError } = await supabaseAdmin
      .from("verification_codes")
      .insert({
        email: email.toLowerCase(),
        code,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) throw insertError;

    // Send email via Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const firstName = profile.first_name || "medlem";

    const { error: emailError } = await resend.emails.send({
      from: "Naturfolk <noreply@naturfolk.org>",
      to: [email],
      subject: "Din innloggingskode - Naturfolk",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #2d5016;">Hei, ${firstName}!</h2>
          <p>Her er din innloggingskode:</p>
          <div style="background: #f0f7e6; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2d5016;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">Koden er gyldig i 10 minutter. Hvis du ikke ba om denne koden, kan du ignorere denne e-posten.</p>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">– Naturfolk</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error("Kunne ikke sende e-post");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "En feil oppstod. Vennligst prøv igjen." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
