CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  recipient_email TEXT NOT NULL DEFAULT 'post@naturfolk.org',
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and editors can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_contact_submissions_submitted_at
ON public.contact_submissions (submitted_at DESC);

CREATE INDEX idx_contact_submissions_email_sent
ON public.contact_submissions (email_sent, submitted_at DESC);