import { supabase } from '@/lib/supabase';
import type {
  Application,
  ApplicationStage,
  JobPreparation,
  Job,
  LearningPlan,
  LearningPlanRecord,
  Profile,
  ProfileSkill,
  Resume,
  ResumeContent,
  Skill,
} from '@/types';

export async function fetchProfileSkills(profileId: string): Promise<ProfileSkill[]> {
  const { data, error } = await supabase
    .from('profile_skills')
    .select('proficiency, skill_id, skills(id, name, category)')
    .eq('profile_id', profileId);
  if (error) throw error;
  return (data as unknown as Array<{ proficiency: number; skill_id: string; skills: Skill }>).map(
    (row) => ({
      id: row.skill_id,
      name: row.skills.name,
      category: row.skills.category,
      proficiency: row.proficiency,
    })
  );
}

export async function updateProfile(profileId: string, updates: Partial<Profile>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function saveProfileSkills(profileId: string, names: string[]): Promise<void> {
  const skillNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))];
  if (skillNames.length === 0) return;

  const { error: insertError } = await supabase
    .from('skills')
    .upsert(skillNames.map((name) => ({ name })), { onConflict: 'name', ignoreDuplicates: true });
  if (insertError) throw insertError;

  const { data: skills, error: fetchError } = await supabase
    .from('skills')
    .select('id, name')
    .in('name', skillNames);
  if (fetchError) throw fetchError;
  if ((skills ?? []).length !== skillNames.length) {
    throw new Error('Some selected skills could not be loaded from the skills catalog.');
  }

  const { error: saveError } = await supabase
    .from('profile_skills')
    .upsert(
      (skills ?? []).map((skill) => ({
        profile_id: profileId,
        skill_id: skill.id,
        proficiency: 3,
      })),
      { onConflict: 'profile_id,skill_id', ignoreDuplicates: true },
    );
  if (saveError) throw saveError;
}

export async function fetchLearningPlans(): Promise<LearningPlanRecord[]> {
  const { data, error } = await supabase
    .from('learning_plans')
    .select('user_id, skill_name, plan, completed_steps')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as LearningPlanRecord[];
}

export async function saveLearningPlan(plan: LearningPlan, completedSteps: string[]): Promise<void> {
  const { error } = await supabase.from('learning_plans').upsert(
    {
      skill_name: plan.skillName.toLowerCase(),
      plan,
      completed_steps: completedSteps,
    },
    { onConflict: 'user_id,skill_name' },
  );
  if (error) throw error;
}

export async function fetchJobPreparation(jobId: string): Promise<JobPreparation | null> {
  const { data, error } = await supabase
    .from('job_preparations')
    .select('user_id, job_id, cover_letter, interview_questions')
    .eq('job_id', jobId)
    .maybeSingle();
  if (error) throw error;
  return data as JobPreparation | null;
}

export async function saveJobPreparation(
  jobId: string,
  updates: Pick<JobPreparation, 'cover_letter' | 'interview_questions'>,
): Promise<void> {
  const { error } = await supabase.from('job_preparations').upsert(
    {
      job_id: jobId,
      ...updates,
    },
    { onConflict: 'user_id,job_id' },
  );
  if (error) throw error;
}

export async function fetchJobs(filters?: {
  search?: string;
  workMode?: string;
  experienceLevel?: string;
  company?: string;
  limit?: number;
}): Promise<Job[]> {
  let query = supabase.from('jobs').select('*').order('posted_at', { ascending: false });
  if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
  if (filters?.workMode && filters.workMode !== 'all') query = query.eq('work_mode', filters.workMode);
  if (filters?.experienceLevel && filters.experienceLevel !== 'all')
    query = query.eq('experience_level', filters.experienceLevel);
  if (filters?.company) query = query.ilike('company', `%${filters.company}%`);
  if (filters?.limit) query = query.limit(filters.limit);
  const { data, error } = await query;
  if (error) throw error;
  if (data && data.length > 0) return data as Job[];

  const now = Date.now();
  const seedJobs: Job[] = [
    {
      id: 'seed-senior-fullstack-engineer', source: 'seed', source_job_id: 'seed-senior-fullstack-engineer',
      title: 'Senior Full-Stack Engineer', company: 'Northstar Labs', company_logo_url: null,
      location: 'San Francisco, CA', work_mode: 'hybrid', salary_min: 150000, salary_max: 190000,
      salary_currency: 'USD', experience_level: 'senior',
      description: 'Build and operate customer-facing web products across React, Node.js, and PostgreSQL.',
      requirements: ['5+ years of software engineering experience'],
      skills_required: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design'],
      skills_preferred: ['AWS', 'Docker', 'GraphQL'], benefits: ['Health insurance', 'Remote flexibility', 'Learning budget'],
      company_size: '51-200', industry: 'SaaS', apply_url: 'https://example.com/jobs/senior-fullstack-engineer',
      is_remote: false, posted_at: new Date(now).toISOString(), created_at: new Date(now).toISOString(),
    },
    {
      id: 'seed-backend-engineer', source: 'seed', source_job_id: 'seed-backend-engineer',
      title: 'Backend Engineer', company: 'FinFlow', company_logo_url: null,
      location: 'San Francisco, CA', work_mode: 'remote', salary_min: 140000, salary_max: 175000,
      salary_currency: 'USD', experience_level: 'senior',
      description: 'Design reliable APIs and distributed financial workflows.',
      requirements: ['Production API experience'],
      skills_required: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'System Design'],
      skills_preferred: ['AWS', 'Docker', 'Kafka'], benefits: ['Medical coverage', 'Equity', 'Flexible PTO'],
      company_size: '51-200', industry: 'Fintech', apply_url: 'https://example.com/jobs/backend-engineer',
      is_remote: true, posted_at: new Date(now - 3600000).toISOString(), created_at: new Date(now).toISOString(),
    },
    {
      id: 'seed-react-developer', source: 'seed', source_job_id: 'seed-react-developer',
      title: 'React Developer', company: 'Meridian Commerce', company_logo_url: null,
      location: 'Austin, TX', work_mode: 'remote', salary_min: 120000, salary_max: 150000,
      salary_currency: 'USD', experience_level: 'mid',
      description: 'Build polished, accessible commerce experiences with React and TypeScript.',
      requirements: ['React application experience'],
      skills_required: ['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'GraphQL'],
      skills_preferred: ['Node.js', 'PostgreSQL', 'AWS'], benefits: ['Remote work', 'Health benefits', 'Home office budget'],
      company_size: '51-200', industry: 'E-commerce', apply_url: 'https://example.com/jobs/react-developer',
      is_remote: true, posted_at: new Date(now - 18000000).toISOString(), created_at: new Date(now).toISOString(),
    },
  ];
  return seedJobs;
}

export async function fetchApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*, job:jobs(*), resume:resumes(*)')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data as Application[];
}

export async function createApplication(
  jobId: string,
  stage: ApplicationStage = 'discovered',
  matchScore?: number
): Promise<Application> {
  const { data, error } = await supabase
    .from('applications')
    .insert({ job_id: jobId, stage, match_score: matchScore ?? null })
    .select('*, job:jobs(*)')
    .single();
  if (error) throw error;
  return data as Application;
}

export async function updateApplicationStage(
  applicationId: string,
  stage: ApplicationStage,
  extra?: Partial<Application>
): Promise<Application> {
  const updates: Partial<Application> = { stage, ...extra };
  if (stage === 'applied' && !extra?.applied_at) updates.applied_at = new Date().toISOString();
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', applicationId)
    .select('*, job:jobs(*)')
    .single();
  if (error) throw error;
  return data as Application;
}

export async function deleteApplication(applicationId: string): Promise<void> {
  const { error } = await supabase.from('applications').delete().eq('id', applicationId);
  if (error) throw error;
}

export async function fetchResumes(): Promise<Resume[]> {
  const { data, error } = await supabase.from('resumes').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Resume[];
}

export async function createResume(label: string, content: ResumeContent): Promise<Resume> {
  const { data, error } = await supabase
    .from('resumes')
    .insert({ label, content })
    .select()
    .single();
  if (error) throw error;
  return data as Resume;
}

export async function updateResume(resumeId: string, updates: Partial<Resume>): Promise<Resume> {
  const { data, error } = await supabase
    .from('resumes')
    .update(updates)
    .eq('id', resumeId)
    .select()
    .single();
  if (error) throw error;
  return data as Resume;
}

export async function deleteResume(resumeId: string): Promise<void> {
  const { error } = await supabase.from('resumes').delete().eq('id', resumeId);
  if (error) throw error;
}

export async function logActivity(
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await supabase.from('activity_log').insert({
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata: metadata ?? {},
  });
}
