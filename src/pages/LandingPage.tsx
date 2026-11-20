import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Brain,
  FileText,
  LineChart,
  Shield,
  Sparkles,
  Target,
  Zap,
  Check,
  Activity,
  Briefcase,
  BarChart3,
  KanbanSquare,
  MessageSquare,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: Bot,
    title: 'Autonomous Application Agent',
    description: 'From job discovery to submission, HireSprint helps you apply end-to-end with zero manual effort — while keeping you in control.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Job Matching',
    description: 'Hybrid semantic + rule-based matching scores every job 0–100 against your profile, with transparent gap analysis.',
  },
  {
    icon: FileText,
    title: 'ATS-Optimized Resumes',
    description: 'Every resume and cover letter is dynamically tailored to mirror job description keywords and pass 50+ ATS systems.',
  },
  {
    icon: KanbanSquare,
    title: 'Application Pipeline',
    description: 'A drag-and-drop Kanban board tracks every application from discovered to offer, with status auto-detection.',
  },
  {
    icon: MessageSquare,
    title: 'Interview Coaching',
    description: 'Role-specific question banks, AI mock interviews, and salary negotiation scripts powered by market data.',
  },
  {
    icon: LineChart,
    title: 'Analytics & Insights',
    description: 'Funnel metrics, A/B testing insights, and benchmark comparisons show exactly what is working and what is not.',
  },
];

const steps = [
  { icon: Target, title: 'Build your profile', description: 'Upload your resume, set target roles, and define preferences in a guided wizard.' },
  { icon: Sparkles, title: 'Get matched', description: 'AI scores jobs against your profile and ranks them by fit, urgency, and desirability.' },
  { icon: Zap, title: 'Apply with one click', description: 'Review-then-apply or go fully autonomous — your tailored docs are ready instantly.' },
  { icon: BarChart3, title: 'Track & optimize', description: 'Watch your pipeline, get interview prep, and refine your strategy with real analytics.' },
];

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['10 job matches / day', '5 applications / week', 'Basic resume builder', '30-day analytics'],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    features: ['Unlimited matches', '100 applications / week', 'Full ATS tailoring', 'Interview prep', 'Browser extension'],
    cta: 'Start 7-day trial',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$59',
    period: '/ month',
    features: ['Everything in Pro', 'Unlimited applications', 'Salary negotiation coach', 'Referral automation', 'API access'],
    cta: 'Go Premium',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-secondary-200/70 bg-secondary-50/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-600">
              <a href="#features" className="hover:text-secondary-900 transition-colors">Features</a>
              <a href="#how" className="hover:text-secondary-900 transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-secondary-900 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/auth" className="btn-ghost hidden sm:inline-flex">Sign in</Link>
              <Link to="/auth" className="btn-primary">Get started <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 paper-grid opacity-40" />
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-accent-200/35 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 pt-16 sm:px-6 min-[900px]:grid-cols-2 min-[900px]:gap-12 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-secondary-600 shadow-sm animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              A smarter job search starts here
            </div>
            <h1 className="text-5xl font-bold leading-[0.98] text-secondary-900 sm:text-6xl lg:text-7xl animate-slide-up">
              Make your next move
              <span className="mt-2 block text-primary-600">count.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-secondary-600 animate-slide-up">
              HireSprint brings your job search into focus — discover roles, build stronger applications, and keep every opportunity moving.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-slide-up">
              <Link to="/auth" className="btn-primary whitespace-nowrap px-5 py-3 text-base shadow-glow">
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="btn-secondary whitespace-nowrap px-5 py-3 text-base">See how it works</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary-500">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary-600" /> Start for free</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary-600" /> Your search, organized</span>
            </div>
          </div>

          <div className="relative mx-auto w-full animate-scale-in">
            <div className="absolute -right-4 -top-5 h-24 w-24 rounded-full border-[14px] border-accent-300/70" />
            <div className="absolute -bottom-6 -left-5 h-32 w-32 rounded-full bg-primary-200/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-secondary-900 p-6 text-white shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-300">HireSprint / overview</p>
                  <p className="mt-2 text-xl font-semibold">Your search, in motion</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Matched', count: '24', color: 'text-white' },
                  { label: 'Applied', count: '18', color: 'text-accent-300' },
                  { label: 'Interviews', count: '06', color: 'text-primary-300' },
                  { label: 'Offers', count: '02', color: 'text-emerald-300' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-xs font-medium text-secondary-300">{stat.label}</p>
                    <p className={`mt-2 font-display text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-white p-4 text-secondary-900">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xs font-bold text-primary-700">VE</div>
                    <div>
                      <p className="text-sm font-bold">Senior Frontend Engineer</p>
                      <p className="mt-0.5 text-xs text-secondary-500">Vercel · Remote</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">92 match</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary-100">
                    <div className="h-full w-[72%] rounded-full bg-primary-500" />
                  </div>
                  <span className="text-[10px] font-semibold text-secondary-500">Pipeline</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-secondary-300">
                <span>One clear view of what comes next</span>
                <span className="inline-flex items-center gap-1 font-semibold text-accent-300"><Activity className="h-3.5 w-3.5" /> In progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-secondary-100 bg-secondary-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '100+', label: 'Tailored applications / day' },
              { value: '90%+', label: 'ATS compatibility score' },
              { value: '50+', label: 'Job sources aggregated' },
              { value: '10x', label: 'Application velocity' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-primary-600">{stat.value}</p>
                <p className="mt-1 text-sm text-secondary-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">Everything you need to job hunt at scale</h2>
          <p className="mt-4 text-secondary-600">From discovery to offer, one platform handles the entire process intelligently.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-cardhover transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="h-12 w-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">{f.title}</h3>
              <p className="mt-2 text-sm text-secondary-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
            <p className="mt-4 text-secondary-300">Four steps from sign-up to offer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="h-14 w-14 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center mb-4">
                  <step.icon className="h-7 w-7 text-primary-400" />
                </div>
                <p className="text-xs font-bold text-primary-400 mb-1">STEP {i + 1}</p>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-secondary-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-secondary-600">Start free. Upgrade when you are ready to go full throttle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${plan.highlight ? 'ring-2 ring-primary-500 shadow-glow' : ''}`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <p className="text-sm font-semibold text-secondary-500">{plan.name}</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-secondary-900">{plan.price}</span>
                <span className="text-sm text-secondary-500">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-secondary-700">
                    <Check className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-8 w-full ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-16 text-center shadow-glow">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent-400/20 blur-2xl" />
          <Briefcase className="h-12 w-12 text-white/90 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to 10x your job search?</h2>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto">Join thousands of candidates who let AI handle the grind while they focus on interviews.</p>
          <Link to="/auth" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-semibold text-primary-700 hover:bg-primary-50 transition-colors">
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="flex items-center gap-6 text-sm text-secondary-500">
              <a href="#features" className="hover:text-secondary-900">Features</a>
              <a href="#pricing" className="hover:text-secondary-900">Pricing</a>
              <Link to="/auth" className="hover:text-secondary-900">Sign in</Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-400">
              <Shield className="h-4 w-4" /> GDPR & CCPA compliant
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-secondary-400">© {new Date().getFullYear()} HireSprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
