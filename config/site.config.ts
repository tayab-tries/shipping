import { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  name: "Cargo Shipping",
  legalName: "Cargo Shipping International",
  domain: "https://cargoshipping.pk",
  tagline: "International Cargo & Shipping Services",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  contact: {
    phonePrimary: "+92 300 1234567",
    phoneSecondary: "+92 42 111 222 333",
    whatsappNumber: "+923001234567",
    whatsappDefaultMessage: "Hello, I would like to inquire about international cargo rates.",
    emailInfo: "info@cargoshipping.pk",
    emailQuotes: "quotes@cargoshipping.pk",
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
      address: "Jinnah International Airport Freight Complex, Karachi",
      phone: "+92 300 1234568",
      isHeadquarters: false,
    },
  ],
  defaultSeo: {
    titleTemplate: "%s | Cargo Shipping",
    defaultTitle: "International Cargo & Shipping Services from Pakistan",
    defaultDescription: "Reliable air cargo, sea ocean freight, and door-to-door shipping connecting Pakistan with destinations worldwide.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
