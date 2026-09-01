import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell = async ({ children }: PageShellProps) => {
  const business = await getPublishedBusinessSettings();

  return (
    <div className="min-h-screen flex flex-col bg-background text-brand-black selection:bg-accent selection:text-brand-black">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingWhatsApp whatsappNumber={business.whatsappNumber} />
    </div>
  );
};
