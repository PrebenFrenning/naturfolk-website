-- Add admin policies for profiles table to allow legitimate administrative access
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (
  auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role)
);

-- Drop the old restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;