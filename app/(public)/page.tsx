import React from 'react';
import type { Metadata } from 'next';
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
import { getSanityHomepageFull, getSanitySiteSettingsFull } from '@/sanity/lib/fetch';
import { constructMetadata } from '@/lib/seo/metadata.service';

export async function generateMetadata(): Promise<Metadata> {
  const [sanityHomepage, sanitySiteSettings] = await Promise.all([
    getSanityHomepageFull(),
    getSanitySiteSettingsFull(),
  ]);

  const metaTitle =
    sanityHomepage?.seo?.metaTitle ||
    sanitySiteSettings?.defaultMetaTitle ||
    'Door-to-Door Cargo Shipping From Pakistan';

  const metaDescription =
    sanityHomepage?.seo?.metaDescription ||
    sanitySiteSettings?.defaultMetaDescription ||
    'Door-to-door cargo shipping services from Pakistan worldwide by air and sea freight. Home pickup, customs clearance, and global delivery.';

  const ogImage =
    sanityHomepage?.seo?.socialImageUrl ||
    sanitySiteSettings?.defaultSocialImageUrl;

  return constructMetadata({
    title: metaTitle,
    description: metaDescription,
    ogImage: ogImage || undefined,
  });
}

export default async function HomePage() {
  const [blocks, business, sanityHomepage, sanitySiteSettings] = await Promise.all([
    getPublishedHomepageBlocks(),
    getPublishedBusinessSettings(),
    getSanityHomepageFull(),
    getSanitySiteSettingsFull(),
  ]);

  const activeWhatsapp = sanitySiteSettings?.whatsappNumber || business.whatsappNumber;

  return (
    <div className="w-full">
      {/* 01. HERO */}
      {blocks.hero?.enabled && (
        <HeroSection
          blockData={blocks.hero.contentData}
          sanityHeroData={sanityHomepage?.hero}
          whatsappNumber={activeWhatsapp}
        />
      )}

      {/* 02. QUICK QUOTE / ENTRY ACTION */}
      {blocks.quick_quote?.enabled && (
        <QuickQuoteTeaser
          blockData={{
            ...blocks.quick_quote.contentData,
            title: sanityHomepage?.quickQuote?.heading || blocks.quick_quote.contentData?.section_title,
            subtitle: sanityHomepage?.quickQuote?.description || blocks.quick_quote.contentData?.subtitle,
            ctaText: sanityHomepage?.quickQuote?.ctaText,
          }}
        />
      )}

      {/* 03. CUSTOMER USE CASES */}
      {blocks.use_cases?.enabled !== false && (
        <UseCasesSection
          blockData={{
            ...blocks.use_cases?.contentData,
            badge: sanityHomepage?.whatCanYouSend?.badge || blocks.use_cases?.contentData?.badge,
            title: sanityHomepage?.whatCanYouSend?.heading || blocks.use_cases?.contentData?.title,
            subtitle: sanityHomepage?.whatCanYouSend?.description || blocks.use_cases?.contentData?.subtitle,
            items: sanityHomepage?.whatCanYouSend?.items || blocks.use_cases?.contentData?.items,
          }}
        />
      )}

      {/* 04. CORE SERVICES (AIR + SEA CARGO STRICT 2 CARDS) */}
      {blocks.services?.enabled && (
        <ServicesOverview
          blockData={{
            ...blocks.services.contentData,
            badge: sanityHomepage?.servicesOverview?.badge || blocks.services.contentData?.badge,
            title: sanityHomepage?.servicesOverview?.heading || blocks.services.contentData?.title,
            subtitle: sanityHomepage?.servicesOverview?.description || blocks.services.contentData?.subtitle,
            air_cargo_title: sanityHomepage?.servicesOverview?.airCargo?.title,
            air_cargo_description: sanityHomepage?.servicesOverview?.airCargo?.description,
            air_cargo_image: sanityHomepage?.servicesOverview?.airCargo?.imageUrl,
            sea_cargo_title: sanityHomepage?.servicesOverview?.seaCargo?.title,
            sea_cargo_description: sanityHomepage?.servicesOverview?.seaCargo?.description,
            sea_cargo_image: sanityHomepage?.servicesOverview?.seaCargo?.imageUrl,
          }}
        />
      )}

      {/* 05. OFFICIAL REGISTRATIONS & ASSOCIATIONS */}
      {blocks.registrations_associations?.enabled !== false && (
        <RegistrationsSection
          blockData={{
            ...blocks.registrations_associations?.contentData,
            heading: sanityHomepage?.registrations?.heading || blocks.registrations_associations?.contentData?.heading,
            items: sanityHomepage?.registrations?.items?.map((item) => ({
              name: item.name,
              logo: item.logoUrl || '/images/logos/fbr.svg',
              orgName: item.orgName,
              description: item.description,
            })) || blocks.registrations_associations?.contentData?.items,
          }}
        />
      )}

      {/* 06. TRUSTED BY THE MARKET (CLIENT CAROUSEL) */}
      {blocks.trusted_market?.enabled !== false && (
        <TrustedMarketSection
          blockData={{
            ...blocks.trusted_market?.contentData,
            heading: sanityHomepage?.trustedMarket?.heading || blocks.trusted_market?.contentData?.heading,
            items: sanityHomepage?.trustedMarket?.items?.map((item) => ({
              name: item.companyName,
              logo: item.logoUrl || '/images/logos/ufone.svg',
            })) || blocks.trusted_market?.contentData?.items,
          }}
        />
      )}

      {/* 07. PAKISTAN COVERAGE (PICKUP CITIES) */}
      {blocks.locations?.enabled && (
        <PakistanReachSection
          blockData={{
            ...blocks.locations.contentData,
            badge: sanityHomepage?.pickupCities?.badge || blocks.locations.contentData?.badge,
            title: sanityHomepage?.pickupCities?.heading || blocks.locations.contentData?.title,
            subtitle: sanityHomepage?.pickupCities?.description || blocks.locations.contentData?.subtitle,
            cities: sanityHomepage?.pickupCities?.cities || blocks.locations.contentData?.cities,
          }}
        />
      )}

      {/* 08. POPULAR DESTINATIONS */}
      {blocks.destinations?.enabled && (
        <DestinationShowcase
          blockData={{
            ...blocks.destinations.contentData,
            badge: sanityHomepage?.popularDestinations?.badge || blocks.destinations.contentData?.badge,
            title: sanityHomepage?.popularDestinations?.heading || blocks.destinations.contentData?.title,
            subtitle: sanityHomepage?.popularDestinations?.description || blocks.destinations.contentData?.subtitle,
            destinations: sanityHomepage?.popularDestinations?.destinations || blocks.destinations.contentData?.destinations,
          }}
        />
      )}

      {/* 09. PROCESS (HOW IT WORKS) */}
      {blocks.process?.enabled && (
        <ProcessSection
          blockData={{
            ...blocks.process.contentData,
            badge: sanityHomepage?.howItWorks?.badge || blocks.process.contentData?.badge,
            title: sanityHomepage?.howItWorks?.heading || blocks.process.contentData?.title,
            subtitle: sanityHomepage?.howItWorks?.description || blocks.process.contentData?.subtitle,
            steps: sanityHomepage?.howItWorks?.steps || blocks.process.contentData?.steps,
          }}
        />
      )}

      {/* 10. TRUST / RELIABILITY (TRUST METRICS) */}
      {blocks.trust?.enabled && (
        <TrustSection
          blockData={{
            ...blocks.trust.contentData,
            trustMetrics: sanityHomepage?.trustMetrics || blocks.trust.contentData?.trustMetrics,
          }}
        />
      )}

      {/* 11. GUIDES / RESOURCES */}
      {blocks.guides?.enabled && <GuidesPreviewSection blockData={blocks.guides.contentData} />}

      {/* 12. FAQ */}
      {blocks.faq?.enabled && (
        <FaqSection
          blockData={{
            ...blocks.faq.contentData,
            badge: sanityHomepage?.faq?.badge || blocks.faq.contentData?.badge,
            title: sanityHomepage?.faq?.heading || blocks.faq.contentData?.title,
            subtitle: sanityHomepage?.faq?.description || blocks.faq.contentData?.subtitle,
            items: sanityHomepage?.faq?.items || blocks.faq.contentData?.items,
          }}
          whatsappNumber={activeWhatsapp}
        />
      )}

      {/* 13. FINAL CTA */}
      {blocks.cta?.enabled && (
        <FinalCtaSection
          blockData={{
            ...blocks.cta.contentData,
            eyebrow: sanityHomepage?.finalCta?.eyebrow || blocks.cta.contentData?.eyebrow,
            title: sanityHomepage?.finalCta?.heading || blocks.cta.contentData?.title,
            supporting_copy: sanityHomepage?.finalCta?.description || blocks.cta.contentData?.supporting_copy,
            primary_cta_label: sanityHomepage?.finalCta?.primaryCtaLabel || blocks.cta.contentData?.primary_cta_label,
            primary_cta_href: sanityHomepage?.finalCta?.primaryCtaHref || blocks.cta.contentData?.primary_cta_href,
            secondary_cta_label: sanityHomepage?.finalCta?.secondaryCtaLabel || blocks.cta.contentData?.secondary_cta_label,
            secondary_cta_href: sanityHomepage?.finalCta?.secondaryCtaHref || blocks.cta.contentData?.secondary_cta_href,
          }}
          whatsappNumber={activeWhatsapp}
        />
      )}
    </div>
  );
}
