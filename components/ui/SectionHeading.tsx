import React from 'react';
import { clsx } from 'clsx';
import { Badge } from './Badge';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleAs?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  badge,
  title,
  subtitle,
  align = 'left',
  titleAs: HeadingTag = 'h2',
  ...props
}) => {
  return (
    <div
      className={clsx(
        'max-w-3xl',
        {
          'text-left': align === 'left',
          'text-center mx-auto': align === 'center',
          'text-right ml-auto': align === 'right',
        },
        className
      )}
      {...props}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant="accent">{badge}</Badge>
        </div>
      )}
      <HeadingTag className="text-display-lg text-foreground font-bold tracking-tight">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="mt-3 text-body-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
