import { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  name: "Raahi International",
  legalName: "Raahi International",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://cargo.raahiinternational4.workers.dev",
  tagline: "International Air & Sea Cargo Delivery",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  contact: {
    phonePrimary: "+92 300 1234567",
    phoneSecondary: "+92 42 111 222 333",
    whatsappNumber: "+923001234567",
    whatsappDefaultMessage: "Hello Raahi International, I would like to inquire about international cargo rates.",
    emailInfo: "info@raahiinternational.pk",
    emailQuotes: "quotes@raahiinternational.pk",
  },
  verifiedOffices: [
    {
      city: "Lahore",
      address: "Allama Iqbal International Airport Cargo Terminal, Lahore",
      phone: "+92 300 1234567",
      isHeadquarters: true,
    },
    {
      city: "Karachi",
      address: "Jinnah International Airport Cargo Complex, Karachi",
      phone: "+92 300 1234568",
      isHeadquarters: false,
    },
  ],
  defaultSeo: {
    titleTemplate: "%s | Raahi International",
    defaultTitle: "Raahi International | Air & Sea Cargo Delivery from Pakistan",
    defaultDescription: "Send cargo with Raahi International. Door-to-door air cargo and sea cargo delivery from Pakistan to destinations worldwide.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
