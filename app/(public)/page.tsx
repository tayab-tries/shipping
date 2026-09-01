import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickQuoteTeaser } from '@/components/sections/QuickQuoteTeaser';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { RegistrationsSection } from '@/components/sections/RegistrationsSection';
import { TrustedMarketSection } from '@/components/sections/TrustedMarketSection';
import { PakistanReachSection } from '@/components/sections/PakistanReachSection';
import { DestinationShowcase } from '@/components/sections/DestinationShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { GuidesPreviewSection } from '@/components/sections/GuidesPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getPublishedHomepageBlocks } from '@/lib/cms/homepage.service';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanityHomepageHero } from '@/sanity/lib/fetch';

export default async function HomePage() {
  const [blocks, business, sanityHero] = await Promise.all([
    getPublishedHomepageBlocks(),
    getPublishedBusinessSettings(),
    getSanityHomepageHero(),
  ]);

  return (
    <div className="w-full">
      {/* 01. HERO */}
      {blocks.hero?.enabled && (
        <HeroSection
          blockData={blocks.hero.contentData}
          sanityHeroData={sanityHero}
          whatsappNumber={business.whatsappNumber}
        />
      )}

      {/* 02. QUICK QUOTE / ENTRY ACTION */}
      {blocks.quick_quote?.enabled && <QuickQuoteTeaser blockData={blocks.quick_quote.contentData} />}

      {/* 03. CUSTOMER USE CASES */}
      {blocks.use_cases?.enabled !== false && <UseCasesSection blockData={blocks.use_cases?.contentData} />}

      {/* 04. CORE SERVICES */}
      {blocks.services?.enabled && <ServicesOverview blockData={blocks.services.contentData} />}

      {/* 05. OFFICIAL REGISTRATIONS & ASSOCIATIONS */}
      {blocks.registrations_associations?.enabled !== false && (
        <RegistrationsSection blockData={blocks.registrations_associations?.contentData} />
      )}

      {/* 06. TRUSTED BY THE MARKET (CLIENT CAROUSEL) */}
      {blocks.trusted_market?.enabled !== false && (
        <TrustedMarketSection blockData={blocks.trusted_market?.contentData} />
      )}

      {/* 07. PAKISTAN COVERAGE */}
      {blocks.locations?.enabled && <PakistanReachSection blockData={blocks.locations.contentData} />}

      {/* 08. POPULAR DESTINATIONS */}
      {blocks.destinations?.enabled && <DestinationShowcase blockData={blocks.destinations.contentData} />}

      {/* 09. PROCESS */}
      {blocks.process?.enabled && <ProcessSection blockData={blocks.process.contentData} />}

      {/* 10. TRUST / RELIABILITY */}
      {blocks.trust?.enabled && <TrustSection blockData={blocks.trust.contentData} />}

      {/* 11. GUIDES / RESOURCES */}
      {blocks.guides?.enabled && <GuidesPreviewSection blockData={blocks.guides.contentData} />}

      {/* 12. FAQ */}
      {blocks.faq?.enabled && (
        <FaqSection blockData={blocks.faq.contentData} whatsappNumber={business.whatsappNumber} />
      )}

      {/* 13. FINAL CTA */}
      {blocks.cta?.enabled && (
        <FinalCtaSection blockData={blocks.cta.contentData} whatsappNumber={business.whatsappNumber} />
      )}
    </div>
  );
}
