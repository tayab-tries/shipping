import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

/** Helper function combining clsx and tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'ghost' | 'ghost-dark' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isIconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isIconOnly = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Base layout & structural styles
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-y-0';

    // Size styles (Handles normal labeled buttons vs explicit icon-only mode)
    const sizeStyles = {
      sm: isIconOnly ? 'p-1.5 h-8 w-8' : 'text-xs px-3 py-1.5 h-8 gap-1.5',
      md: isIconOnly ? 'p-2 h-10 w-10' : 'text-sm px-4 py-2.5 h-10 gap-2',
      lg: isIconOnly ? 'p-3 h-12 w-12' : 'text-base px-6 py-3.5 h-12 gap-2.5',
    }[size];

    // Authoritative Variant Styles (Composed AFTER caller className so required text color wins!)
    const variantStyles = {
      // Primary CTA (Brand Orange Fill + Black Text = 6.0:1 WCAG AA Compliant)
      primary: 'bg-accent text-brand-black hover:bg-accent-hover font-bold border border-transparent shadow-xs',
      // Secondary (Brand Navy Fill + White Text)
      secondary: 'bg-brand-navy text-white hover:bg-brand-navy-light border border-border-dark shadow-xs',
      // Outline Light (Explicit Brand Black Text on White Surface = 16.8:1 WCAG AAA Compliant)
      outline: 'bg-surface text-brand-black font-semibold border border-border hover:bg-surface-muted hover:border-border-strong hover:text-brand-black',
      // Outline Dark (Explicit White Text on Dark Surface = 18.5:1 WCAG AAA Compliant)
      'outline-dark': 'bg-brand-navy/80 text-white font-semibold border border-border-dark hover:bg-brand-navy hover:text-white',
      // Ghost Light
      ghost: 'bg-transparent text-brand-black font-semibold hover:bg-surface-muted hover:text-brand-black',
      // Ghost Dark
      'ghost-dark': 'bg-transparent text-white font-semibold hover:bg-brand-navy-light hover:text-white',
      // Destructive (Alert Action)
      destructive: 'bg-danger text-white hover:bg-red-700 font-bold border border-transparent shadow-xs',
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-label={isIconOnly ? ariaLabel || (typeof children === 'string' ? children : 'Action') : ariaLabel}
        className={cn(baseStyles, sizeStyles, className, variantStyles)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0 text-current">{leftIcon}</span>
        ) : null}
        {!isIconOnly && <span className="text-current font-inherit">{children}</span>}
        {!isLoading && rightIcon ? <span className="shrink-0 text-current">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
