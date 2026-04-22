ALTER TABLE public.bonfire_ceremony_applications
ALTER COLUMN applicant_user_id DROP NOT NULL;

CREATE POLICY "Service role can create bonfire ceremony applications"
ON public.bonfire_ceremony_applications
FOR INSERT
TO service_role
WITH CHECK (true);