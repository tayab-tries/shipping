import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickQuoteTeaser } from '@/components/sections/QuickQuoteTeaser';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
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

      {/* 03. CUSTOMER USE CASES */}
      {blocks.use_cases?.enabled !== false && <UseCasesSection blockData={blocks.use_cases?.contentData} />}

      {/* 04. CORE SERVICES */}
      {blocks.services?.enabled && <ServicesOverview blockData={blocks.services.contentData} />}

      {/* 05. PAKISTAN COVERAGE */}
      {blocks.locations?.enabled && <PakistanReachSection blockData={blocks.locations.contentData} />}

      {/* 06. POPULAR DESTINATIONS */}
      {blocks.destinations?.enabled && <DestinationShowcase blockData={blocks.destinations.contentData} />}

      {/* 07. PROCESS */}
      {blocks.process?.enabled && <ProcessSection blockData={blocks.process.contentData} />}

      {/* 08. TRUST / RELIABILITY */}
      {blocks.trust?.enabled && <TrustSection blockData={blocks.trust.contentData} />}

      {/* 09. GUIDES / RESOURCES */}
      {blocks.guides?.enabled && <GuidesPreviewSection blockData={blocks.guides.contentData} />}

      {/* 10. FAQ */}
      {blocks.faq?.enabled && <FaqSection blockData={blocks.faq.contentData} />}

      {/* 11. FINAL CTA */}
      {blocks.cta?.enabled && <FinalCtaSection blockData={blocks.cta.contentData} />}
    </div>
  );
}
