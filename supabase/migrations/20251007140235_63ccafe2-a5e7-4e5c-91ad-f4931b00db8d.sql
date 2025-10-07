-- Fix security issues by implementing stricter RLS policies
-- This migration addresses PUBLIC_USER_DATA, EXPOSED_SENSITIVE_DATA, and MISSING_RLS_PROTECTION

-- ============================================
-- FIX 1: PROFILES TABLE - Member Personal Information
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "System and admins can insert profiles" ON public.profiles;

-- Create new restrictive policies with explicit authentication requirements
-- SELECT: Deny all access by default, only allow authenticated users to view their own profile or admins
CREATE POLICY "authenticated_users_view_own_profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "admins_view_all_profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- UPDATE: Only authenticated users can update their own profile or admins can update all
CREATE POLICY "authenticated_users_update_own_profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_update_all_profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- INSERT: Only admins can manually insert (trigger uses service role)
CREATE POLICY "admins_insert_profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- DELETE: Only admins can delete profiles
CREATE POLICY "admins_delete_profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- FIX 2: MEMBERSHIP_PAYMENTS TABLE - Financial Records
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own payments" ON public.membership_payments;
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.membership_payments;

-- SELECT: Only authenticated users can view their own payments or admins can view all
CREATE POLICY "authenticated_users_view_own_payments"
ON public.membership_payments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "admins_view_all_payments"
ON public.membership_payments
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- INSERT/UPDATE/DELETE: Only admins can manage payment records
CREATE POLICY "admins_insert_payments"
ON public.membership_payments
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins_update_payments"
ON public.membership_payments
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins_delete_payments"
ON public.membership_payments
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- FIX 3: EVENT_REGISTRATIONS TABLE - Privacy Protection
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Users can create own registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Users can delete own registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.event_registrations;

-- SELECT: Only authenticated users can view their own registrations or admins/editors
CREATE POLICY "authenticated_users_view_own_registrations"
ON public.event_registrations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "admins_editors_view_all_registrations"
ON public.event_registrations
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- INSERT: Only authenticated users can create their own registrations
CREATE POLICY "authenticated_users_create_own_registrations"
ON public.event_registrations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Only authenticated users can update their own registrations or admins/editors
CREATE POLICY "authenticated_users_update_own_registrations"
ON public.event_registrations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins_editors_update_registrations"
ON public.event_registrations
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- DELETE: Only authenticated users can delete their own registrations
CREATE POLICY "authenticated_users_delete_own_registrations"
ON public.event_registrations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);