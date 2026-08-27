import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickQuoteTeaser } from '@/components/sections/QuickQuoteTeaser';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { DestinationShowcase } from '@/components/sections/DestinationShowcase';
import { PakistanReachSection } from '@/components/sections/PakistanReachSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TrackingCtaSection } from '@/components/sections/TrackingCtaSection';
import { GuidesPreviewSection } from '@/components/sections/GuidesPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section (Single H1 & Dual CTAs) */}
      <HeroSection />

      {/* 2. Quick Quote Teaser (Native HTML GET Form) */}
      <QuickQuoteTeaser />

      {/* 3. Operational Trust / How We Work */}
      <TrustSection />

      {/* 4. Core Logistics Services */}
      <ServicesOverview />

      {/* 5. International Destination Corridors */}
      <DestinationShowcase />

      {/* 6. Coverage Across Pakistan */}
      <PakistanReachSection />

      {/* 7. Transparent Shipment Workflow */}
      <ProcessSection />

      {/* 8. Tracking Callout CTA */}
      <TrackingCtaSection />

      {/* 9. Guides & Resource Previews */}
      <GuidesPreviewSection />

      {/* 10. Frequently Asked Questions & FAQPage JSON-LD */}
      <FaqSection />

      {/* 11. Final Conversion Quote CTA */}
      <FinalCtaSection />
    </div>
  );
}
