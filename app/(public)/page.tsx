import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickQuoteTeaser } from '@/components/sections/QuickQuoteTeaser';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { PakistanReachSection } from '@/components/sections/PakistanReachSection';
import { DestinationShowcase } from '@/components/sections/DestinationShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { GuidesPreviewSection } from '@/components/sections/GuidesPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function HomePage() {
  console.log(`[ISR_TEST] rendering homepage component at ${new Date().toISOString()}`);
  return (
    <div className="w-full">
      {/* 01. HERO */}
      <HeroSection />

      {/* 02. QUICK QUOTE / ENTRY ACTION */}
      <QuickQuoteTeaser />

      {/* 03. CORE SERVICES */}
      <ServicesOverview />

      {/* 04. PAKISTAN NETWORK */}
      <PakistanReachSection />

      {/* 05. INTERNATIONAL DESTINATIONS */}
      <DestinationShowcase />

      {/* 06. PROCESS */}
      <ProcessSection />

      {/* 07. TRUST / CREDENTIALS */}
      <TrustSection />

      {/* 08. GUIDES / RESOURCES */}
      <GuidesPreviewSection />

      {/* 09. FAQ */}
      <FaqSection />

      {/* 10. FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
}
