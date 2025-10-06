-- Add missing fields to profiles table for membership signup
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS middle_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS country text DEFAULT 'Norge',
ADD COLUMN IF NOT EXISTS address_2 text,
ADD COLUMN IF NOT EXISTS postal_code text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS how_heard_about_us text;

-- Add check constraint for gender
ALTER TABLE public.profiles
ADD CONSTRAINT valid_gender CHECK (gender IN ('Mann', 'Kvinne', 'Annet', 'Ønsker ikke å oppgi'));

-- Update the full_name column to be generated from first, middle, and last name if they exist
-- This will be handled in the application logic instead