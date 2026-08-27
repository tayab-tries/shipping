import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ArrowUpRight } from 'lucide-react';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  showIcon?: boolean;
  variant?: 'primary' | 'muted' | 'underline';
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    {
      className,
      href,
      external = false,
      showIcon = false,
      variant = 'primary',
      children,
      ...props
    },
    ref
  ) => {
    const isExternal = external || href.startsWith('http');

    const linkContent = (
      <>
        <span>{children}</span>
        {(showIcon || isExternal) && (
          <ArrowUpRight className="w-3.5 h-3.5 inline-block shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </>
    );

    const baseClasses = clsx(
      'inline-flex items-center gap-1 font-semibold transition-colors duration-150 group rounded-xs',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      {
        'text-accent hover:text-accent-hover': variant === 'primary',
        'text-muted-foreground hover:text-foreground': variant === 'muted',
        'text-foreground underline underline-offset-4 decoration-border hover:decoration-accent':
          variant === 'underline',
      },
      className
    );

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...props}
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} className={baseClasses} {...props}>
        {linkContent}
      </Link>
    );
  }
);

TextLink.displayName = 'TextLink';
