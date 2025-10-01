-- Add missing fields to events table
ALTER TABLE public.events
ADD COLUMN max_participants integer,
ADD COLUMN price text,
ADD COLUMN ticket_link text,
ADD COLUMN facebook_link text,
ADD COLUMN organized_by text DEFAULT 'Naturfolk',
ADD COLUMN what_to_bring text;