-- Remove overly permissive policy that exposes all user emails
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;