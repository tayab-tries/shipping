import { draftMode } from 'next/headers';
import { client } from './client';
import { isSanityConfigured, readToken } from '../env';
import { HOMEPAGE_FULL_QUERY, SITE_SETTINGS_FULL_QUERY } from './queries';
import { urlForImage } from './image';

export interface SanityHeroData {
  eyebrow?: string;
  heading?: string;
  highlightedHeading?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
}

export interface SanityHomepageFullData {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImageUrl?: string;
  };
  hero?: SanityHeroData;
  heroFeatureChips?: Array<{ label?: string; icon?: string }>;
  quickQuote?: {
    heading?: string;
    description?: string;
    ctaText?: string;
  };
  trustMetrics?: Array<{ value?: string; label?: string }>;
  registrations?: {
    heading?: string;
    items?: Array<{
      name?: string;
      logoUrl?: string;
      altText?: string;
      orgName?: string;
      description?: string;
    }>;
  };
  trustedMarket?: {
    heading?: string;
    items?: Array<{
      companyName?: string;
      logoUrl?: string;
      altText?: string;
    }>;
  };
  whatCanYouSend?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: Array<{
      title?: string;
      description?: string;
      badgeText?: string;
      iconName?: string;
    }>;
  };
  servicesOverview?: {
    badge?: string;
    heading?: string;
    description?: string;
    airCargo?: {
      title?: string;
      description?: string;
      imageUrl?: string;
      imageAlt?: string;
      features?: string[];
      ctaLabel?: string;
      ctaHref?: string;
    };
    seaCargo?: {
      title?: string;
      description?: string;
      imageUrl?: string;
      imageAlt?: string;
      features?: string[];
      ctaLabel?: string;
      ctaHref?: string;
    };
  };
  popularDestinations?: {
    badge?: string;
    heading?: string;
    description?: string;
    destinations?: Array<{
      name?: string;
      countryCode?: string;
      flagImageUrl?: string;
      shortText?: string;
      href?: string;
    }>;
  };
  pickupCities?: {
    badge?: string;
    heading?: string;
    description?: string;
    cities?: Array<{
      name?: string;
      href?: string;
    }>;
  };
  howItWorks?: {
    badge?: string;
    heading?: string;
    description?: string;
    steps?: Array<{
      stepNumber?: string;
      title?: string;
      subtitle?: string;
      description?: string;
    }>;
  };
  testimonials?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: Array<{
      name?: string;
      location?: string;
      quote?: string;
      rating?: number;
      imageUrl?: string;
      caption?: string;
    }>;
  };
  faq?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: Array<{
      question?: string;
      answer?: string;
    }>;
  };
  finalCta?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  mobileBottomCta?: {
    callLabel?: string;
    whatsappLabel?: string;
    quoteLabel?: string;
  };
}

export interface SanitySiteSettingsFullData {
  businessName?: string;
  shortDescription?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  operatingHours?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  logoLightUrl?: string;
  navigationItems?: Array<{ label?: string; href?: string }>;
  primaryCta?: { label?: string; href?: string };
  footerDescription?: string;
  footerGroups?: Array<{
    title?: string;
    links?: Array<{ label?: string; href?: string }>;
  }>;
  copyrightText?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultSocialImageUrl?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
}

export async function getSanityHomepageFull(): Promise<SanityHomepageFullData | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const draft = await draftMode();
    const isDraft = draft.isEnabled;

    const fetchClient =
      isDraft && readToken
        ? client.withConfig({ token: readToken, useCdn: false, perspective: 'previewDrafts' })
        : client;

    const data = await fetchClient.fetch(HOMEPAGE_FULL_QUERY, {}, { stega: false });

    if (!data) return null;

    const resolveUrl = (imgAsset: unknown) => (imgAsset ? urlForImage(imgAsset)?.url() || undefined : undefined);

    return {
      seo: data.seo
        ? {
            metaTitle: data.seo.metaTitle,
            metaDescription: data.seo.metaDescription,
            socialImageUrl: resolveUrl(data.seo.socialImage),
          }
        : undefined,
      hero: data.hero
        ? {
            eyebrow: data.hero.eyebrow,
            heading: data.hero.heading,
            highlightedHeading: data.hero.highlightedHeading,
            description: data.hero.description,
            primaryCtaLabel: data.hero.primaryCtaLabel,
            primaryCtaHref: data.hero.primaryCtaHref,
            secondaryCtaLabel: data.hero.secondaryCtaLabel,
            secondaryCtaHref: data.hero.secondaryCtaHref,
            backgroundImageUrl: resolveUrl(data.hero.heroImage),
            backgroundImageAlt: data.hero.heroImageAlt,
          }
        : undefined,
      heroFeatureChips: data.heroFeatureChips,
      quickQuote: data.quickQuote,
      trustMetrics: data.trustMetrics,
      registrations: data.registrations
        ? {
            heading: data.registrations.heading,
            items: data.registrations.items?.map((item: Record<string, unknown>) => ({
              name: item.name as string,
              logoUrl: resolveUrl(item.logo),
              altText: item.altText as string,
              orgName: item.orgName as string,
              description: item.description as string,
            })),
          }
        : undefined,
      trustedMarket: data.trustedMarket
        ? {
            heading: data.trustedMarket.heading,
            items: data.trustedMarket.items?.map((item: Record<string, unknown>) => ({
              companyName: item.companyName as string,
              logoUrl: resolveUrl(item.logo),
              altText: item.altText as string,
            })),
          }
        : undefined,
      whatCanYouSend: data.whatCanYouSend,
      servicesOverview: data.servicesOverview
        ? {
            badge: data.servicesOverview.badge,
            heading: data.servicesOverview.heading,
            description: data.servicesOverview.description,
            airCargo: data.servicesOverview.airCargo
              ? {
                  title: data.servicesOverview.airCargo.title,
                  description: data.servicesOverview.airCargo.description,
                  imageUrl: resolveUrl(data.servicesOverview.airCargo.image),
                  imageAlt: data.servicesOverview.airCargo.imageAlt,
                  features: data.servicesOverview.airCargo.features,
                  ctaLabel: data.servicesOverview.airCargo.ctaLabel,
                  ctaHref: data.servicesOverview.airCargo.ctaHref,
                }
              : undefined,
            seaCargo: data.servicesOverview.seaCargo
              ? {
                  title: data.servicesOverview.seaCargo.title,
                  description: data.servicesOverview.seaCargo.description,
                  imageUrl: resolveUrl(data.servicesOverview.seaCargo.image),
                  imageAlt: data.servicesOverview.seaCargo.imageAlt,
                  features: data.servicesOverview.seaCargo.features,
                  ctaLabel: data.servicesOverview.seaCargo.ctaLabel,
                  ctaHref: data.servicesOverview.seaCargo.ctaHref,
                }
              : undefined,
          }
        : undefined,
      popularDestinations: data.popularDestinations
        ? {
            badge: data.popularDestinations.badge,
            heading: data.popularDestinations.heading,
            description: data.popularDestinations.description,
            destinations: data.popularDestinations.destinations?.map((d: Record<string, unknown>) => ({
              name: d.name as string,
              countryCode: d.countryCode as string,
              flagImageUrl: resolveUrl(d.flagImage),
              shortText: d.shortText as string,
              href: d.href as string,
            })),
          }
        : undefined,
      pickupCities: data.pickupCities,
      howItWorks: data.howItWorks,
      testimonials: data.testimonials
        ? {
            badge: data.testimonials.badge,
            heading: data.testimonials.heading,
            description: data.testimonials.description,
            items: data.testimonials.items?.map((item: Record<string, unknown>) => ({
              name: item.name as string,
              location: item.location as string,
              quote: item.quote as string,
              rating: item.rating as number,
              imageUrl: resolveUrl(item.image),
              caption: item.caption as string,
            })),
          }
        : undefined,
      faq: data.faq,
      finalCta: data.finalCta,
      mobileBottomCta: data.mobileBottomCta,
    };
  } catch (err: unknown) {
    console.warn('getSanityHomepageFull safe notice (using fallback content):', err);
    return null;
  }
}

export async function getSanitySiteSettingsFull(): Promise<SanitySiteSettingsFullData | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const draft = await draftMode();
    const isDraft = draft.isEnabled;

    const fetchClient =
      isDraft && readToken
        ? client.withConfig({ token: readToken, useCdn: false, perspective: 'previewDrafts' })
        : client;

    const data = await fetchClient.fetch(SITE_SETTINGS_FULL_QUERY, {}, { stega: false });

    if (!data) return null;

    const resolveUrl = (imgAsset: unknown) => (imgAsset ? urlForImage(imgAsset)?.url() || undefined : undefined);

    return {
      businessName: data.businessName,
      shortDescription: data.shortDescription,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      address: data.address,
      operatingHours: data.operatingHours,
      logoUrl: resolveUrl(data.logo),
      logoDarkUrl: resolveUrl(data.logoDark),
      logoLightUrl: resolveUrl(data.logoLight),
      navigationItems: data.navigationItems,
      primaryCta: data.primaryCta,
      footerDescription: data.footerDescription,
      footerGroups: data.footerGroups,
      copyrightText: data.copyrightText,
      defaultMetaTitle: data.defaultMetaTitle,
      defaultMetaDescription: data.defaultMetaDescription,
      defaultSocialImageUrl: resolveUrl(data.defaultSocialImage),
      socialLinks: data.socialLinks,
    };
  } catch (err: unknown) {
    console.warn('getSanitySiteSettingsFull safe notice (using fallback content):', err);
    return null;
  }
}
