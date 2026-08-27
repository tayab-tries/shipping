import React from 'react';
import { clsx } from 'clsx';
import { Container } from '@/components/ui/Container';

export interface FooterShellProps {
  brandSection: React.ReactNode;
  columns?: React.ReactNode;
  bottomBar?: React.ReactNode;
  className?: string;
}

export const FooterShell: React.FC<FooterShellProps> = ({
  brandSection,
  columns,
  bottomBar,
  className,
}) => {
  return (
    <footer className={clsx('w-full bg-primary text-primary-foreground border-t border-slate-800 mt-auto', className)}>
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">{brandSection}</div>
          {columns && <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">{columns}</div>}
        </div>
        {bottomBar && (
          <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {bottomBar}
          </div>
        )}
      </Container>
    </footer>
  );
};
