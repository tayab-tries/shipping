import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-mono font-semibold rounded-md transition-colors select-none uppercase tracking-wider',
        {
          // Size
          'text-[0.6875rem] px-2 py-0.5 leading-none': size === 'sm',
          'text-xs px-2.5 py-1 leading-tight': size === 'md',
        },
        {
          // Variants
          'bg-brand-black text-white': variant === 'default',
          'bg-brand-navy text-slate-200 border border-border-dark': variant === 'secondary',
          'bg-accent-muted text-accent border border-accent/30': variant === 'accent',
          'bg-transparent text-foreground border border-border': variant === 'outline',
          'bg-success-bg text-success border border-success-border': variant === 'success',
          'bg-warning-bg text-warning border border-warning-border': variant === 'warning',
          'bg-danger-bg text-danger border border-danger-border': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
