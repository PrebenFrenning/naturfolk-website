-- Add INSERT policy for profiles table
-- Only allow profile creation through the handle_new_user trigger (service role) or by admins
-- This prevents unauthorized users from creating fake profiles
CREATE POLICY "System and admins can insert profiles"
ON public.profiles
FOR INSERT
WITH CHECK (
  -- Allow admins to manually create profiles if needed
  has_role(auth.uid(), 'admin'::app_role)
  -- Note: The handle_new_user trigger runs with SECURITY DEFINER
  -- so it will bypass RLS and can insert profiles automatically
);