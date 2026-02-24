import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: "E-post og kode er påkrevd" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find matching, unused, non-expired code
    const { data: verificationCode, error: findError } = await supabaseAdmin
      .from("verification_codes")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findError) throw findError;

    if (!verificationCode) {
      return new Response(
        JSON.stringify({ error: "Ugyldig eller utløpt kode. Vennligst prøv igjen." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark code as used
    await supabaseAdmin
      .from("verification_codes")
      .update({ used: true })
      .eq("id", verificationCode.id);

    // Check if user exists in auth.users
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = authUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    let session;

    if (existingUser) {
      // Generate a magic link / sign in the existing user
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: email.toLowerCase(),
      });

      if (error) throw error;

      // Use admin to create a session directly
      // We'll return a token hash that the client can use
      return new Response(
        JSON.stringify({ 
          success: true, 
          type: "existing_user",
          // The client will use signInWithOtp verify
          token_hash: data.properties?.hashed_token,
          email: email.toLowerCase(),
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } else {
      // Create a new auth user for this profile member
      const tempPassword = crypto.randomUUID();
      
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase(),
        password: tempPassword,
        email_confirm: true,
        user_metadata: { needs_password_setup: true },
      });

      if (createError) throw createError;

      // Link the profile to this new auth user by updating the profile id
      // First get the profile
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (profile && newUser.user) {
        // Update profile to match auth user id
        // We need to create a new profile with the auth user id and delete the old one
        const { data: oldProfile } = await supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", profile.id)
          .single();

        if (oldProfile) {
          // Insert new profile with auth user ID
          const { id: _oldId, ...profileData } = oldProfile;
          await supabaseAdmin
            .from("profiles")
            .upsert({ ...profileData, id: newUser.user.id });
          
          // Delete old profile if different id
          if (profile.id !== newUser.user.id) {
            await supabaseAdmin
              .from("profiles")
              .delete()
              .eq("id", profile.id);
          }
        }
      }

      // Generate session for the new user
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: email.toLowerCase(),
      });

      if (linkError) throw linkError;

      return new Response(
        JSON.stringify({ 
          success: true, 
          type: "new_user",
          token_hash: linkData.properties?.hashed_token,
          email: email.toLowerCase(),
          needs_password: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "En feil oppstod. Vennligst prøv igjen." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
