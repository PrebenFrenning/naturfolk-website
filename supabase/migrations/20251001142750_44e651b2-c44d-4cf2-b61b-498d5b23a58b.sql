-- Drop the insecure public policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure policies for profile access

-- Policy 1: Users can view their own profile (including email)
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Authenticated users can view other profiles (for author information)
-- Note: This still allows viewing emails for authenticated users
-- Consider removing email column or creating a separate public view if stricter privacy is needed
CREATE POLICY "Authenticated users can view profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- For maximum security, if you want to completely hide emails from other users:
-- You could create a public view that excludes email:
-- CREATE VIEW public.public_profiles AS 
-- SELECT id, full_name, avatar_url, created_at, updated_at 
-- FROM public.profiles;

-- And grant access to the view instead of the table