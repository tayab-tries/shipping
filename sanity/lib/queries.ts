import { defineQuery } from 'next-sanity';

export const HOMEPAGE_FULL_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    seo,
    hero,
    heroFeatureChips,
    quickQuote,
    trustMetrics,
    registrations,
    trustedMarket,
    whatCanYouSend,
    servicesOverview,
    popularDestinations,
    pickupCities,
    howItWorks,
    testimonials,
    faq,
    finalCta,
    mobileBottomCta
  }
`);

export const SITE_SETTINGS_FULL_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    shortDescription,
    phone,
    whatsappNumber,
    email,
    address,
    operatingHours,
    logo,
    logoDark,
    logoLight,
    navigationItems,
    primaryCta,
    footerDescription,
    footerGroups,
    copyrightText,
    defaultMetaTitle,
    defaultMetaDescription,
    defaultSocialImage,
    socialLinks
  }
`);
