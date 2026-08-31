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
import { getPublishedHomepageBlocks } from '@/lib/cms/homepage.service';

export default async function HomePage() {
  const blocks = await getPublishedHomepageBlocks();

  return (
    <div className="w-full">
      {/* 01. HERO */}
      {blocks.hero?.enabled && <HeroSection blockData={blocks.hero.contentData} />}

      {/* 02. QUICK QUOTE / ENTRY ACTION */}
      {blocks.quick_quote?.enabled && <QuickQuoteTeaser blockData={blocks.quick_quote.contentData} />}

      {/* 03. CORE SERVICES */}
      {blocks.services?.enabled && <ServicesOverview blockData={blocks.services.contentData} />}

      {/* 04. PAKISTAN NETWORK */}
      {blocks.locations?.enabled && <PakistanReachSection blockData={blocks.locations.contentData} />}

      {/* 05. INTERNATIONAL DESTINATIONS */}
      {blocks.destinations?.enabled && <DestinationShowcase blockData={blocks.destinations.contentData} />}

      {/* 06. PROCESS */}
      {blocks.process?.enabled && <ProcessSection blockData={blocks.process.contentData} />}

      {/* 07. TRUST / CREDENTIALS */}
      {blocks.trust?.enabled && <TrustSection blockData={blocks.trust.contentData} />}

      {/* 08. GUIDES / RESOURCES */}
      {blocks.guides?.enabled && <GuidesPreviewSection blockData={blocks.guides.contentData} />}

      {/* 09. FAQ */}
      {blocks.faq?.enabled && <FaqSection blockData={blocks.faq.contentData} />}

      {/* 10. FINAL CTA */}
      {blocks.cta?.enabled && <FinalCtaSection blockData={blocks.cta.contentData} />}
    </div>
  );
}
