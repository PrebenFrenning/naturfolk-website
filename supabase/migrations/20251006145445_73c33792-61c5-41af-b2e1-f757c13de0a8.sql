-- Extend profiles table with membership fields
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS newsletter_subscribed BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS community_opt_out BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS membership_type TEXT DEFAULT 'Støttemedlem' CHECK (membership_type IN ('Støttemedlem', 'Hovedmedlem', 'Utmelding')),
ADD COLUMN IF NOT EXISTS personnummer TEXT,
ADD COLUMN IF NOT EXISTS theme_groups TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;

-- Create event registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  attended BOOLEAN DEFAULT false,
  UNIQUE(user_id, event_id)
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create membership payments table
CREATE TABLE IF NOT EXISTS public.membership_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.membership_payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for event_registrations
CREATE POLICY "Users can view own registrations"
ON public.event_registrations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own registrations"
ON public.event_registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own registrations"
ON public.event_registrations
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations"
ON public.event_registrations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- RLS policies for membership_payments
CREATE POLICY "Users can view own payments"
ON public.membership_payments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
ON public.membership_payments
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));