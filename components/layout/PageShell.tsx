import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-brand-black selection:bg-accent selection:text-brand-black">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
