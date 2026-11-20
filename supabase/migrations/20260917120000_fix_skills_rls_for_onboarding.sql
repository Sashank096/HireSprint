-- Onboarding inserts missing catalog entries and ignores conflicts. Users should
-- not be able to edit or delete shared skills that already exist.

DROP POLICY IF EXISTS "insert_skills" ON public.skills;
CREATE POLICY "insert_skills" ON public.skills FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_skills" ON public.skills;
DROP POLICY IF EXISTS "delete_skills" ON public.skills;
