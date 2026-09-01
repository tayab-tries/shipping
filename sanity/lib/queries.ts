import { defineQuery } from 'next-sanity';

export const HOMEPAGE_HERO_QUERY = defineQuery(`
  *[_type == "homepage"][0].hero {
    eyebrow,
    headline,
    highlightedHeadline,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    backgroundImage,
    backgroundImageAlt
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    legalName,
    logo,
    logoDark,
    logoLight,
    phone,
    whatsapp,
    email,
    address,
    operatingHours,
    socialLinks,
    defaultSeoTitle,
    defaultSeoDescription,
    defaultOgImage
  }
`);
