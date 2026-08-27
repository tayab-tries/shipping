import React from 'react';
import { clsx } from 'clsx';
import { Container } from '@/components/ui/Container';

export interface HeaderShellProps {
  topBar?: React.ReactNode;
  brand: React.ReactNode;
  navItems?: React.ReactNode;
  actions?: React.ReactNode;
  mobileMenuTrigger?: React.ReactNode;
  className?: string;
}

export const HeaderShell: React.FC<HeaderShellProps> = ({
  topBar,
  brand,
  navItems,
  actions,
  mobileMenuTrigger,
  className,
}) => {
  return (
    <header className={clsx('w-full bg-surface border-b border-border sticky top-0 z-40', className)}>
      {topBar && <div className="border-b border-border-subtle bg-surface-subtle">{topBar}</div>}
      <Container>
        <div className="flex items-center justify-between h-20 gap-6">
          <div className="flex items-center gap-8">
            <div className="shrink-0">{brand}</div>
            {navItems && <nav className="hidden lg:flex items-center gap-6">{navItems}</nav>}
          </div>
          <div className="flex items-center gap-4">
            {actions && <div className="hidden sm:flex items-center gap-3">{actions}</div>}
            {mobileMenuTrigger && <div className="lg:hidden">{mobileMenuTrigger}</div>}
          </div>
        </div>
      </Container>
    </header>
  );
};
