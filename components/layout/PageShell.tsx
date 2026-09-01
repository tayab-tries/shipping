import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsData } from '@/sanity/lib/fetch';

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell = async ({ children }: PageShellProps) => {
  const [business, sanitySiteSettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsData(),
  ]);

  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber;

  return (
    <div className="min-h-screen flex flex-col bg-background text-brand-black selection:bg-accent selection:text-brand-black">
      <Header sanitySiteSettings={sanitySiteSettings} />
      <main className="flex-1 w-full">{children}</main>
      <Footer sanitySiteSettings={sanitySiteSettings} />
      <FloatingWhatsApp whatsappNumber={activeWhatsapp} />
    </div>
  );
};
