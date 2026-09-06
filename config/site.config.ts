import { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  name: "Raahi International",
  legalName: "Raahi International",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://cargo.raahiinternational4.workers.dev",
  tagline: "International Air & Sea Cargo Delivery",
  defaultSeo: {
    titleTemplate: "%s | Raahi International",
    defaultTitle: "Raahi International | Air & Sea Cargo Delivery from Pakistan",
    defaultDescription: "Send cargo with Raahi International. Door-to-door air cargo and sea cargo delivery from Pakistan to destinations worldwide.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
