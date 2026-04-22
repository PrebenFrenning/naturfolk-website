CREATE TABLE public.bonfire_ceremony_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location_address TEXT NOT NULL,
  applicant_full_name TEXT NOT NULL,
  requested_amount NUMERIC(10,2) NOT NULL,
  vipps_phone TEXT NOT NULL,
  additional_info TEXT,
  recipient_email TEXT NOT NULL DEFAULT 'post@naturfolk.org',
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.bonfire_ceremony_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and editors can view bonfire ceremony applications"
ON public.bonfire_ceremony_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update bonfire ceremony applications"
ON public.bonfire_ceremony_applications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete bonfire ceremony applications"
ON public.bonfire_ceremony_applications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_bonfire_ceremony_applications_submitted_at
ON public.bonfire_ceremony_applications (submitted_at DESC);

CREATE INDEX idx_bonfire_ceremony_applications_applicant_user_id
ON public.bonfire_ceremony_applications (applicant_user_id);

CREATE INDEX idx_bonfire_ceremony_applications_email_sent
ON public.bonfire_ceremony_applications (email_sent, submitted_at DESC);