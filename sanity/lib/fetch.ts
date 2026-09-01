import { draftMode } from 'next/headers';
import { client } from './client';
import { isSanityConfigured, readToken } from '../env';
import { HOMEPAGE_FULL_QUERY, SITE_SETTINGS_QUERY } from './queries';

export interface SanityCta {
  label?: string;
  href?: string;
}

export interface SanitySiteSettings {
  businessName?: string;
  shortDescription?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  operatingHours?: string;
  logo?: string;
  logoDark?: string;
  logoLight?: string;
  navigationItems?: { label: string; href: string }[];
  primaryCta?: SanityCta;
  footerDescription?: string;
  footerGroups?: { title: string; links: { label: string; href: string }[] }[];
  copyrightText?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSocialImage?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
}

export interface SanityServiceCard {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  featureBullets?: string[];
  cta?: SanityCta;
}

export interface SanityHomepageData {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
  hero?: {
    eyebrow?: string;
    heading?: string;
    highlightedHeading?: string;
    description?: string;
    primaryCta?: SanityCta;
    secondaryCta?: SanityCta;
    heroImage?: string;
    heroImageAlt?: string;
  };
  heroFeatureChips?: { label: string; icon?: string }[];
  quickQuote?: {
    heading?: string;
    description?: string;
    ctaText?: string;
  };
  trustMetrics?: { value?: string; label: string }[];
  registrations?: {
    heading?: string;
    items?: { name: string; logo?: string; altText?: string }[];
  };
  trustedMarket?: {
    heading?: string;
    items?: { companyName: string; logo?: string; altText?: string }[];
  };
  whatCanYouSend?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { title: string; description?: string; badgeText?: string; iconName?: string }[];
  };
  servicesOverview?: {
    badge?: string;
    heading?: string;
    description?: string;
    airCargo?: SanityServiceCard;
    seaCargo?: SanityServiceCard;
  };
  popularDestinations?: {
    badge?: string;
    heading?: string;
    description?: string;
    destinations?: { name: string; countryCode?: string; flagImage?: string; shortText?: string; href?: string }[];
  };
  pickupCities?: {
    badge?: string;
    heading?: string;
    description?: string;
    cities?: { name: string; href?: string }[];
  };
  howItWorks?: {
    badge?: string;
    heading?: string;
    description?: string;
    steps?: { stepNumber?: string; title: string; subtitle?: string; description?: string }[];
  };
  testimonials?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { name: string; location?: string; quote: string; rating?: number; image?: string; caption?: string }[];
  };
  faq?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { question: string; answer: string }[];
  };
  finalCta?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCta?: SanityCta;
    secondaryCta?: SanityCta;
  };
  mobileBottomCta?: {
    callLabel?: string;
    whatsappLabel?: string;
    quoteLabel?: string;
  };
}

export async function getSanitySiteSettingsData(): Promise<SanitySiteSettings | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = (await draftMode()).isEnabled;
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch(SITE_SETTINGS_QUERY, {}, { stega: false });
  } catch (error) {
    console.warn('[Sanity] getSanitySiteSettingsData fetch error, using fallbacks:', error);
    return null;
  }
}

export async function getSanityHomepageData(): Promise<SanityHomepageData | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = (await draftMode()).isEnabled;
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch(HOMEPAGE_FULL_QUERY, {}, { stega: false });
  } catch (error) {
    console.warn('[Sanity] getSanityHomepageData fetch error, using fallbacks:', error);
    return null;
  }
}
