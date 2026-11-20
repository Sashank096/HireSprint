-- Seed a useful initial shared job catalog.
-- This migration is idempotent and supports deployments whose jobs table is otherwise empty.

INSERT INTO public.jobs (
  source, source_job_id, title, company, location, work_mode, salary_min, salary_max,
  salary_currency, experience_level, description, requirements, skills_required,
  skills_preferred, benefits, company_size, industry, apply_url, is_remote, posted_at
)
VALUES
  ('seed', 'seed-senior-fullstack-engineer', 'Senior Full-Stack Engineer', 'Northstar Labs', 'San Francisco, CA', 'hybrid', 150000, 190000, 'USD', 'senior', 'Build and operate customer-facing web products across React, Node.js, and PostgreSQL.', ARRAY['5+ years of software engineering experience'], ARRAY['JavaScript','TypeScript','React','Node.js','PostgreSQL','System Design'], ARRAY['AWS','Docker','GraphQL'], ARRAY['Health insurance','Remote flexibility','Learning budget'], '51-200', 'SaaS', 'https://example.com/jobs/senior-fullstack-engineer', false, now()),
  ('seed', 'seed-backend-engineer', 'Backend Engineer', 'FinFlow', 'San Francisco, CA', 'remote', 140000, 175000, 'USD', 'senior', 'Design reliable APIs and distributed financial workflows.', ARRAY['Production API experience'], ARRAY['TypeScript','Node.js','PostgreSQL','Redis','System Design'], ARRAY['AWS','Docker','Kafka'], ARRAY['Medical coverage','Equity','Flexible PTO'], '51-200', 'Fintech', 'https://example.com/jobs/backend-engineer', true, now() - interval '1 hour'),
  ('seed', 'seed-software-engineer-ai', 'Software Engineer, AI Platform', 'Cognition Cloud', 'Seattle, WA', 'hybrid', 155000, 205000, 'USD', 'senior', 'Create scalable infrastructure for AI applications and model workflows.', ARRAY['Strong software engineering fundamentals'], ARRAY['Python','TypeScript','AWS','Docker','PostgreSQL','System Design'], ARRAY['Machine Learning','PyTorch','Kubernetes'], ARRAY['Health insurance','401k match','AI learning stipend'], '201-500', 'AI/ML', 'https://example.com/jobs/software-engineer-ai', false, now() - interval '3 hours'),
  ('seed', 'seed-react-developer', 'React Developer', 'Meridian Commerce', 'Austin, TX', 'remote', 120000, 150000, 'USD', 'mid', 'Build polished, accessible commerce experiences with React and TypeScript.', ARRAY['React application experience'], ARRAY['JavaScript','TypeScript','React','Tailwind CSS','GraphQL'], ARRAY['Node.js','PostgreSQL','AWS'], ARRAY['Remote work','Health benefits','Home office budget'], '51-200', 'E-commerce', 'https://example.com/jobs/react-developer', true, now() - interval '5 hours'),
  ('seed', 'seed-platform-engineer', 'Platform Engineer', 'GridWorks', 'Denver, CO', 'hybrid', 145000, 185000, 'USD', 'senior', 'Improve developer infrastructure, deployment systems, and cloud reliability.', ARRAY['Cloud operations experience'], ARRAY['AWS','Docker','Kubernetes','Go','Redis','System Design'], ARRAY['Kafka','Python','PostgreSQL'], ARRAY['Health insurance','Remote Fridays','Stock options'], '201-500', 'Infrastructure', 'https://example.com/jobs/platform-engineer', false, now() - interval '8 hours'),
  ('seed', 'seed-data-platform-engineer', 'Data Platform Engineer', 'Signal Data', 'New York, NY', 'hybrid', 135000, 175000, 'USD', 'mid', 'Build dependable data pipelines and analytical platform services.', ARRAY['Data engineering experience'], ARRAY['Python','PostgreSQL','AWS','Kafka','Docker'], ARRAY['Redis','Kubernetes','GraphQL'], ARRAY['Health coverage','Annual bonus','Commuter benefit'], '51-200', 'Data', 'https://example.com/jobs/data-platform-engineer', false, now() - interval '12 hours'),
  ('seed', 'seed-nodejs-engineer', 'Node.js Engineer', 'BrightDesk', 'Chicago, IL', 'remote', 125000, 160000, 'USD', 'mid', 'Develop APIs and integrations for a modern collaboration platform.', ARRAY['Node.js API experience'], ARRAY['JavaScript','TypeScript','Node.js','PostgreSQL','Redis'], ARRAY['AWS','Docker','GraphQL'], ARRAY['Remote-first','Healthcare','Sabbatical'], '51-200', 'SaaS', 'https://example.com/jobs/nodejs-engineer', true, now() - interval '1 day'),
  ('seed', 'seed-java-backend-engineer', 'Backend Engineer, Java', 'CapitalBridge', 'Boston, MA', 'onsite', 130000, 165000, 'USD', 'mid', 'Maintain secure transaction services for enterprise financial customers.', ARRAY['Java backend experience'], ARRAY['Java','PostgreSQL','Redis','Kafka','System Design'], ARRAY['AWS','Docker','Kubernetes'], ARRAY['401k','Health insurance','Bonus'], '501-1000', 'Fintech', 'https://example.com/jobs/java-backend-engineer', false, now() - interval '1 day'),
  ('seed', 'seed-machine-learning-engineer', 'Machine Learning Engineer', 'Visionary AI', 'San Francisco, CA', 'hybrid', 160000, 210000, 'USD', 'senior', 'Train, evaluate, and deploy production machine learning models.', ARRAY['ML model development experience'], ARRAY['Python','Machine Learning','PyTorch','TensorFlow','AWS'], ARRAY['Docker','Kubernetes','PostgreSQL'], ARRAY['Equity','Health benefits','Conference budget'], '51-200', 'AI/ML', 'https://example.com/jobs/machine-learning-engineer', false, now() - interval '2 days'),
  ('seed', 'seed-entry-fullstack-engineer', 'Junior Full-Stack Engineer', 'LaunchPad Studio', 'Remote', 'remote', 85000, 115000, 'USD', 'entry', 'Join a small team delivering accessible web applications for growing businesses.', ARRAY['0-2 years of software experience'], ARRAY['JavaScript','React','Node.js','PostgreSQL'], ARRAY['TypeScript','Docker','Tailwind CSS'], ARRAY['Mentorship','Remote work','Learning budget'], '11-50', 'Digital Services', 'https://example.com/jobs/junior-fullstack-engineer', true, now() - interval '2 days'),
  ('seed', 'seed-lead-engineer', 'Lead Software Engineer', 'Atlas Health', 'Los Angeles, CA', 'hybrid', 175000, 220000, 'USD', 'lead', 'Lead technical delivery across web and API teams in a healthcare platform.', ARRAY['Technical leadership experience'], ARRAY['TypeScript','React','Node.js','PostgreSQL','System Design','AWS'], ARRAY['Python','Docker','GraphQL'], ARRAY['Equity','Health benefits','Flexible time'], '201-500', 'Healthcare', 'https://example.com/jobs/lead-engineer', false, now() - interval '3 days'),
  ('seed', 'seed-principal-engineer', 'Principal Engineer', 'Orbit Systems', 'New York, NY', 'onsite', 220000, 280000, 'USD', 'principal', 'Set architecture direction and lead cross-team engineering initiatives.', ARRAY['Staff or principal engineering experience'], ARRAY['System Design','AWS','Kubernetes','PostgreSQL','Go'], ARRAY['TypeScript','Kafka','Docker'], ARRAY['Executive bonus','Health benefits','Relocation support'], '501-1000', 'Enterprise Software', 'https://example.com/jobs/principal-engineer', false, now() - interval '4 days')
ON CONFLICT (source, source_job_id) DO UPDATE SET
  title = EXCLUDED.title,
  company = EXCLUDED.company,
  location = EXCLUDED.location,
  work_mode = EXCLUDED.work_mode,
  salary_min = EXCLUDED.salary_min,
  salary_max = EXCLUDED.salary_max,
  salary_currency = EXCLUDED.salary_currency,
  experience_level = EXCLUDED.experience_level,
  description = EXCLUDED.description,
  requirements = EXCLUDED.requirements,
  skills_required = EXCLUDED.skills_required,
  skills_preferred = EXCLUDED.skills_preferred,
  benefits = EXCLUDED.benefits,
  company_size = EXCLUDED.company_size,
  industry = EXCLUDED.industry,
  apply_url = EXCLUDED.apply_url,
  is_remote = EXCLUDED.is_remote,
  posted_at = EXCLUDED.posted_at;
