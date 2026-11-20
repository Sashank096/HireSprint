CREATE TABLE IF NOT EXISTS public.learning_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  plan jsonb NOT NULL,
  completed_steps text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, skill_name)
);

ALTER TABLE public.learning_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_learning_plans" ON public.learning_plans;
CREATE POLICY "select_own_learning_plans" ON public.learning_plans FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_learning_plans" ON public.learning_plans;
CREATE POLICY "insert_own_learning_plans" ON public.learning_plans FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_learning_plans" ON public.learning_plans;
CREATE POLICY "update_own_learning_plans" ON public.learning_plans FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_learning_plans" ON public.learning_plans;
CREATE POLICY "delete_own_learning_plans" ON public.learning_plans FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_plans TO authenticated;

CREATE TABLE IF NOT EXISTS public.job_preparations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  cover_letter text,
  interview_questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, job_id)
);

ALTER TABLE public.job_preparations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_job_preparations" ON public.job_preparations;
CREATE POLICY "select_own_job_preparations" ON public.job_preparations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_job_preparations" ON public.job_preparations;
CREATE POLICY "insert_own_job_preparations" ON public.job_preparations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_job_preparations" ON public.job_preparations;
CREATE POLICY "update_own_job_preparations" ON public.job_preparations FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_job_preparations" ON public.job_preparations;
CREATE POLICY "delete_own_job_preparations" ON public.job_preparations FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_preparations TO authenticated;

DROP TRIGGER IF EXISTS learning_plans_updated_at ON public.learning_plans;
CREATE TRIGGER learning_plans_updated_at BEFORE UPDATE ON public.learning_plans
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS job_preparations_updated_at ON public.job_preparations;
CREATE TRIGGER job_preparations_updated_at BEFORE UPDATE ON public.job_preparations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
