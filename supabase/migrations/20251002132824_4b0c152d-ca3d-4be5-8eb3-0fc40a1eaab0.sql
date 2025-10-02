-- Add registration_deadline column to events table
ALTER TABLE public.events 
ADD COLUMN registration_deadline timestamp with time zone;

-- Update existing events to have future dates and registration deadlines
UPDATE public.events
SET 
  start_date = '2025-11-15 18:00:00+00',
  end_date = '2025-11-15 22:00:00+00',
  registration_deadline = '2025-11-10 23:59:59+00'
WHERE title = 'Naturvandring i Marka';

UPDATE public.events
SET 
  start_date = '2025-11-22 19:00:00+00',
  end_date = '2025-11-22 23:00:00+00',
  registration_deadline = '2025-11-18 23:59:59+00'
WHERE title = 'Vintersolverv-fest';

UPDATE public.events
SET 
  start_date = '2025-11-08 10:00:00+00',
  end_date = '2025-11-08 15:00:00+00',
  registration_deadline = '2025-11-05 23:59:59+00'
WHERE title = 'Workshop: Healing med planter';

UPDATE public.events
SET 
  start_date = '2025-12-06 18:00:00+00',
  end_date = '2025-12-06 21:00:00+00',
  registration_deadline = '2025-12-03 23:59:59+00'
WHERE title = 'Fullmåne-seremoni';

UPDATE public.events
SET 
  start_date = '2025-11-29 17:00:00+00',
  end_date = '2025-11-29 20:00:00+00',
  registration_deadline = '2025-11-25 23:59:59+00'
WHERE title = 'Naturfotografering';

UPDATE public.events
SET 
  start_date = '2025-12-13 19:00:00+00',
  end_date = '2025-12-13 22:00:00+00',
  registration_deadline = '2025-12-10 23:59:59+00'
WHERE title = 'Årstidsfest: Vinter';

UPDATE public.events
SET 
  start_date = '2025-11-16 09:00:00+00',
  end_date = '2025-11-17 16:00:00+00',
  registration_deadline = '2025-11-10 23:59:59+00'
WHERE title = 'Helgeretreat: Tilbake til naturen';

UPDATE public.events
SET 
  start_date = '2025-12-20 18:00:00+00',
  end_date = '2025-12-20 21:00:00+00',
  registration_deadline = '2025-12-15 23:59:59+00'
WHERE title = 'Sirkeldans og sang';