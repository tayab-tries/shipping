'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface MobileNavShellProps {
  isOpen: boolean;
  onClose: () => void;
  brand: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const MobileNavShell: React.FC<MobileNavShellProps> = ({
  isOpen,
  onClose,
  brand,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-surface overflow-y-auto animate-in fade-in-50 duration-150">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-border">
        <div>{brand}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 rounded-md text-foreground hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <Container className="flex-1 py-8 flex flex-col justify-between">
        <div className="space-y-6">{children}</div>
        {actions && <div className="pt-6 border-t border-border mt-8">{actions}</div>}
      </Container>
    </div>
  );
};
