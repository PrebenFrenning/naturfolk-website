CREATE TABLE public.member_registration_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  membership_type text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  postal_code text,
  city text,
  country text,
  how_heard_about_us text,
  recipient_email text NOT NULL DEFAULT 'post@naturfolk.org',
  email_status text NOT NULL DEFAULT 'pending',
  email_error text,
  email_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.member_registration_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view member registration notifications"
ON public.member_registration_notifications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can update member registration notifications"
ON public.member_registration_notifications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete member registration notifications"
ON public.member_registration_notifications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can insert member registration notifications"
ON public.member_registration_notifications
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE INDEX idx_member_reg_notif_created_at ON public.member_registration_notifications(created_at DESC);
CREATE INDEX idx_member_reg_notif_status ON public.member_registration_notifications(email_status);