import { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  name: "BRAND_NAME",
  legalName: "",
  domain: "https://example.com",
  tagline: "International Cargo & Shipping Services",
  contact: {
    phonePrimary: "",
    phoneSecondary: "",
    whatsappNumber: "",
    whatsappDefaultMessage: "",
    emailInfo: "",
    emailQuotes: "",
  },
  verifiedOffices: [],
  defaultSeo: {
    titleTemplate: "%s | BRAND_NAME",
    defaultTitle: "International Cargo & Shipping Services | BRAND_NAME",
    defaultDescription: "International cargo shipping services from Pakistan.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
