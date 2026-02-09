
-- Table for storing one-time verification codes
CREATE TABLE public.verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Only service role (edge functions) can manage codes - no public access
CREATE POLICY "Service role only" ON public.verification_codes
  FOR ALL USING (false);

-- Index for quick lookup
CREATE INDEX idx_verification_codes_email ON public.verification_codes (email, used, expires_at);

-- Auto-cleanup old codes (optional: can also be done in edge function)
