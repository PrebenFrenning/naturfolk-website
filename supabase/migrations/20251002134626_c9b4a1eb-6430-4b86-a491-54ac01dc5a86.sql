-- Update example events with future dates
UPDATE events 
SET start_date = '2025-11-15 10:00:00+00', 
    end_date = '2025-11-15 16:00:00+00', 
    registration_deadline = '2025-11-10 23:59:59+00'
WHERE title = 'Skogsbading på Østlandet';

UPDATE events 
SET start_date = '2025-12-21 19:00:00+00', 
    end_date = '2025-12-21 23:00:00+00', 
    registration_deadline = '2025-12-15 23:59:59+00'
WHERE title = 'Summer Solstice Celebration';

UPDATE events 
SET start_date = '2025-11-05 14:00:00+00', 
    end_date = '2025-11-05 17:00:00+00', 
    registration_deadline = '2025-11-01 23:59:59+00'
WHERE title = 'Native Plant Workshop';

UPDATE events 
SET start_date = '2025-11-19 09:00:00+00', 
    end_date = '2025-11-19 15:00:00+00', 
    registration_deadline = '2025-11-15 23:59:59+00'
WHERE title = 'Watershed Clean-up Day';

UPDATE events 
SET start_date = '2025-12-05 13:00:00+00', 
    end_date = '2025-12-05 16:00:00+00', 
    registration_deadline = '2025-12-01 23:59:59+00'
WHERE title = 'Nature Photography Workshop';

UPDATE events 
SET start_date = '2025-11-02 18:00:00+00', 
    end_date = '2025-11-02 20:00:00+00', 
    registration_deadline = '2025-10-30 23:59:59+00'
WHERE title = 'Sustainable Living Seminar';

UPDATE events 
SET start_date = '2025-11-10 07:00:00+00', 
    end_date = '2025-11-10 11:00:00+00', 
    registration_deadline = '2025-11-05 23:59:59+00'
WHERE title = 'Bird Watching Expedition';

UPDATE events 
SET start_date = '2026-01-15 10:00:00+00', 
    end_date = '2026-01-17 16:00:00+00', 
    registration_deadline = '2026-01-10 23:59:59+00'
WHERE title = 'Fall Equinox Nature Retreat';