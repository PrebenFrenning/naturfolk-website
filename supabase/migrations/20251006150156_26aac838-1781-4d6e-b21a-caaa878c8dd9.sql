-- Add page metadata fields
ALTER TABLE public.pages
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS hero_image TEXT,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS social_image TEXT,
ADD COLUMN IF NOT EXISTS is_static BOOLEAN DEFAULT false;

-- Seed static pages with their metadata
INSERT INTO public.pages (slug, title, subtitle, status, is_static, author_id, content, meta_title, meta_description)
VALUES 
  ('home', 'Velkommen til Naturfolk', 'Bli med i vårt samfunn', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Naturfolk - Norsk naturspirituelt samfunn', 'Naturfolk er et norsk naturspirituelt samfunn som forener naturreligiøse tradisjoner.'),
  ('about', 'Om Oss', 'Hvem vi er og hva vi står for', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Om Naturfolk', 'Lær mer om Naturfolk og vårt naturspirituell samfunn.'),
  ('contact', 'Kontakt Oss', 'Ta kontakt med oss', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Kontakt Naturfolk', 'Ta kontakt med Naturfolk for spørsmål eller samarbeid.'),
  ('medlemskap', 'Medlemskap', 'Bli medlem av Naturfolk', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Bli medlem av Naturfolk', 'Meld deg inn i Naturfolk og bli en del av vårt samfunn.'),
  ('trosgrunnlag', 'Trosgrunnlag', 'Våre verdier og tro', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Naturfolks trosgrunnlag', 'Les om Naturfolks trosgrunnlag og verdier.'),
  ('aktuelt', 'Aktuelt', 'Siste nytt fra Naturfolk', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Aktuelt - Naturfolk', 'Se hva som skjer i Naturfolk nå.'),
  ('temagrupper', 'Temagrupper', 'Våre temagrupper og fellesskap', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Temagrupper - Naturfolk', 'Utforsk Naturfolks temagrupper og finn ditt fellesskap.'),
  ('kalender', 'Kalender', 'Kommende arrangementer', 'published', true, (SELECT id FROM auth.users LIMIT 1), '', 'Arrangementskalender - Naturfolk', 'Se alle kommende arrangementer i Naturfolk.')
ON CONFLICT (slug) DO UPDATE SET
  is_static = true,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle;