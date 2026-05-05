ALTER TABLE public.bonfire_ceremony_applications
  ADD COLUMN IF NOT EXISTS theme text,
  ADD COLUMN IF NOT EXISTS short_description text;