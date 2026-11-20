import { Link } from 'react-router-dom';
import { classNames } from '@/lib/utils';

export function Logo({ className, showText = true, size = 'md', inverse = false }: { className?: string; showText?: boolean; size?: 'sm' | 'md' | 'lg'; inverse?: boolean }) {
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-9 w-9' : 'h-7 w-7';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <Link to="/" className={classNames('flex items-center gap-2 font-display font-bold', className)}>
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-sm`}>
        <svg viewBox="0 0 24 24" fill="none" className="h-[72%] w-[72%]" aria-hidden="true">
          <path d="M5 19h4v-5h5V9h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 9H19V5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5" cy="19" r="1.25" fill="currentColor" />
        </svg>
      </div>
      {showText && (
        <span className={classNames(inverse ? 'text-white' : 'text-secondary-900', textSize)}>
          Hire<span className="text-primary-600">Sprint</span>
        </span>
      )}
    </Link>
  );
}
