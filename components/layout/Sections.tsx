import React from 'react';
import { clsx } from 'clsx';
import { Container } from '@/components/ui/Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'compact' | 'default' | 'spacious';
  bg?: 'background' | 'surface' | 'muted' | 'dark';
  containerSize?: 'default' | 'narrow' | 'wide' | 'full';
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing = 'default',
      bg = 'background',
      containerSize = 'default',
      as: Component = 'section',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          'w-full transition-colors',
          {
            // Spacing
            'py-8 lg:py-12': spacing === 'compact',
            'py-16 lg:py-24': spacing === 'default',
            'py-20 lg:py-32': spacing === 'spacious',
          },
          {
            // Background
            'bg-background text-foreground': bg === 'background',
            'bg-surface text-foreground border-y border-border-subtle': bg === 'surface',
            'bg-surface-muted text-foreground border-y border-border': bg === 'muted',
            'bg-primary text-primary-foreground': bg === 'dark',
          },
          className
        )}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </Component>
    );
  }
);
Section.displayName = 'Section';

export interface FullBleedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  bg?: 'background' | 'surface' | 'muted' | 'dark';
}

export const FullBleedSection: React.FC<FullBleedSectionProps> = ({
  className,
  bg = 'background',
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        {
          'bg-background text-foreground': bg === 'background',
          'bg-surface text-foreground border-y border-border-subtle': bg === 'surface',
          'bg-surface-muted text-foreground border-y border-border': bg === 'muted',
          'bg-primary text-primary-foreground': bg === 'dark',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ProseSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ProseSection: React.FC<ProseSectionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Container size="narrow" className={clsx('prose max-w-4xl py-12', className)} {...props}>
      {children}
    </Container>
  );
};
