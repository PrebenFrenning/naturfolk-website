-- Enhanced RLS policies for user_roles table
-- Security fix: Restrict role visibility to prevent information disclosure

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "User roles viewable by authenticated users" ON public.user_roles;

-- Create new restrictive policies

-- Policy 1: Admins can view all user roles
CREATE POLICY "Admins can view all user roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy 2: Users can view only their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);