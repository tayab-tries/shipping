export interface DestinationCityData {
  id: string;
  countryId: string;
  name: string;
  slug: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  overview?: string;
  preparationConsiderations?: string;
  deliveryCoverageNotes?: string;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

export interface DestinationCountryData {
  id: string;
  name: string;
  slug: string;
  region: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  shippingOverview?: string;
  customsGuidance?: string;
  supportedServices: string[];
  supportedOrigins: string[];
  cities: DestinationCityData[];
  faqs: Array<{ question: string; answer: string }>;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

export const staticDestinations: DestinationCountryData[] = [
  {
    id: 'dest-uk',
    name: 'United Kingdom',
    slug: 'uk',
    region: 'Europe',
    h1: 'International Cargo & Shipping Services to United Kingdom from Pakistan',
    seoTitle: 'Cargo to UK from Pakistan | Air Freight & Sea Shipping',
    seoDescription: 'Reliable international cargo shipping from Pakistan to the United Kingdom. Air freight express dispatch and ocean sea cargo to UK destinations.',
    introduction: 'The United Kingdom is a major destination corridor for cargo originating in Pakistan. We support commercial freight, personal effects, luggage cargo, and export shipments heading to London, Manchester, Birmingham, and across the UK.',
    shippingOverview: 'Consignments departing Pakistan for the UK are dispatched via direct air cargo flights or ocean vessel transport. Standard export clearance and destination customs protocols apply to all commercial and personal baggage cargo.',
    customsGuidance: 'All UK-bound shipments require an itemized packing declaration, invoice value detail, and recipient contact info in compliance with UK Border Force guidelines.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'How long does air cargo take from Pakistan to the UK?',
        answer: 'Air freight transit duration depends on flight scheduling, export clearance processing, and destination customs inspection.',
      },
      {
        question: 'Can I send personal luggage and excess baggage to London?',
        answer: 'Yes, specialized excess baggage cargo receiving is available for personal items and household goods shipped to London and across the UK.',
      },
    ],
    cities: [
      {
        id: 'dest-city-london',
        countryId: 'dest-uk',
        name: 'London',
        slug: 'london',
        h1: 'Cargo & Shipping Services to London from Pakistan',
        seoTitle: 'Cargo to London from Pakistan | Air & Express Shipping',
        seoDescription: 'Dedicated cargo shipping from Pakistan to London. Direct airport air freight receiving and door-to-door destination delivery across Greater London.',
        introduction: 'As the UK capital and primary economic center, London receives direct air cargo dispatches from Pakistan via London Heathrow and Gatwick logistics hubs.',
        overview: 'Shipments arriving in London are processed at airport terminal cargo handling facilities before dispatching for final local delivery.',
        preparationConsiderations: 'Ensure all personal baggage items are packed securely with clean invoices for non-commercial customs declaration.',
        deliveryCoverageNotes: 'Local delivery coverage spans London postcodes including North, South, East, West, and Central London commercial zones.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },
  {
    id: 'dest-usa',
    name: 'United States',
    slug: 'usa',
    region: 'North America',
    h1: 'International Cargo & Shipping Services to USA from Pakistan',
    seoTitle: 'Cargo to USA from Pakistan | Ocean & Air Freight',
    seoDescription: 'International cargo shipping services from Pakistan to the United States. Air cargo dispatch and ocean freight to US port entry destinations.',
    introduction: 'Shipping cargo to the United States connects commercial exporters and individual shippers in Pakistan with North American trade destinations including New York, Chicago, Texas, and California.',
    shippingOverview: 'US destination cargo moves via scheduled air freight routes or ocean vessel transit entering major US ports of entry.',
    customsGuidance: 'US Customs and Border Protection (CBP) declarations require clear commercial invoice listings and declared value documentation.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'What shipping options are available for cargo to the USA?',
        answer: 'Air freight and ocean sea cargo services are available for commercial goods, personal luggage, and commercial trade items destined for the US.',
      },
      {
        question: 'How are customs declarations handled for US shipments?',
        answer: 'Export customs clearance is processed at origin in Pakistan, and recipient documentation is submitted for US import clearance compliance.',
      },
    ],
    cities: [],
  },
  {
    id: 'dest-uae',
    name: 'United Arab Emirates',
    slug: 'uae',
    region: 'Middle East',
    h1: 'International Cargo & Shipping Services to UAE from Pakistan',
    seoTitle: 'Cargo to UAE from Pakistan | Air & Sea Express',
    seoDescription: 'Cargo shipping services from Pakistan to Dubai, Abu Dhabi, and the United Arab Emirates. Express air cargo and ocean container freight.',
    introduction: 'The United Arab Emirates represents one of Pakistan’s most active commercial trading and personal cargo shipping corridors, connecting Dubai, Abu Dhabi, and Sharjah.',
    shippingOverview: 'Cargo shipped to the UAE benefits from frequent direct flight schedules and short maritime sea freight transit routes departing Karachi sea ports.',
    customsGuidance: 'UAE import clearance requires valid consignee ID, commercial invoices for trade goods, and detailed manifest declarations.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'Can I ship sea cargo from Karachi port to Dubai?',
        answer: 'Yes, regular ocean sea cargo vessel schedules connect Karachi port directly with Dubai Jebel Ali maritime trade hub.',
      },
      {
        question: 'Is express air cargo available from Lahore to UAE?',
        answer: 'Yes, direct air freight dispatch is available for time-sensitive cargo originating in Lahore and heading to UAE airports.',
      },
    ],
    cities: [
      {
        id: 'dest-city-dubai',
        countryId: 'dest-uae',
        name: 'Dubai',
        slug: 'dubai',
        h1: 'Cargo & Shipping Services to Dubai from Pakistan',
        seoTitle: 'Cargo to Dubai from Pakistan | Air Freight & Sea Cargo',
        seoDescription: 'Cargo shipping from Pakistan to Dubai. Direct air cargo receiving and sea freight connections to Dubai logistics hubs.',
        introduction: 'Dubai is the primary commercial transit gateway in the Middle East, receiving air and sea cargo shipments originating across Pakistan.',
        overview: 'Consignments arrive via Dubai International Airport or Jebel Ali Port for terminal clearance and local UAE delivery dispatch.',
        preparationConsiderations: 'Commercial cargo requires formal export invoice listings and recipient Emirates ID identification.',
        deliveryCoverageNotes: 'Local delivery coverage spans Dubai commercial zones including Deira, Bur Dubai, Business Bay, and Jebel Ali.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },
  {
    id: 'dest-canada',
    name: 'Canada',
    slug: 'canada',
    region: 'North America',
    h1: 'International Cargo & Shipping Services to Canada from Pakistan',
    seoTitle: 'Cargo to Canada from Pakistan | Air Freight & Sea Shipping',
    seoDescription: 'Cargo shipping services from Pakistan to Canada including Toronto, Vancouver, and Montreal. Air freight and personal baggage dispatch.',
    introduction: 'Shipping to Canada provides essential cargo links for Pakistani exporters, families, and relocating students sending goods to Toronto, Vancouver, and Calgary.',
    shippingOverview: 'Cargo destined for Canada is dispatched via international air freight carriers or ocean sea freight containers.',
    customsGuidance: 'Canada Border Services Agency (CBSA) guidelines require detailed itemization of cargo contents and declared valuation.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'How is excess baggage shipped to Toronto from Pakistan?',
        answer: 'Personal baggage cargo is packed, received at origin, cleared for export, and shipped via air freight to Toronto Pearson International Airport.',
      },
    ],
    cities: [],
  },
  {
    id: 'dest-ksa',
    name: 'Saudi Arabia',
    slug: 'ksa',
    region: 'Middle East',
    h1: 'International Cargo & Shipping Services to Saudi Arabia from Pakistan',
    seoTitle: 'Cargo to Saudi Arabia from Pakistan | Air & Sea Freight',
    seoDescription: 'Cargo shipping from Pakistan to Saudi Arabia including Riyadh, Jeddah, and Dammam. Air cargo express and ocean freight.',
    introduction: 'Cargo shipping to the Kingdom of Saudi Arabia supports commercial exporters and personal cargo shippers connecting Riyadh, Jeddah, and Eastern Province hubs.',
    shippingOverview: 'Saudi destination cargo moves via direct air freight routes or ocean vessel transit entering Jeddah Islamic Port and Dammam.',
    customsGuidance: 'Saudi Zakat, Tax and Customs Authority (FASAH) clearance protocols apply to all commercial import shipments.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'commercial-cargo'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'What documents are needed for cargo to Jeddah?',
        answer: 'Commercial shipments require valid invoices, packing declarations, and importer FASAH registration details.',
      },
    ],
    cities: [],
  },
];

export function getPublishedStaticDestinations(): DestinationCountryData[] {
  return staticDestinations.filter(
    (dest) => dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true
  );
}

export function getStaticDestinationBySlug(slug: string): DestinationCountryData | undefined {
  const dest = staticDestinations.find((d) => d.slug === slug);
  if (dest && dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true) {
    return dest;
  }
  return undefined;
}

export function getStaticDestinationCity(
  countrySlug: string,
  citySlug: string
): { country: DestinationCountryData; city: DestinationCityData } | undefined {
  const country = getStaticDestinationBySlug(countrySlug);
  if (!country) return undefined;

  const city = country.cities.find((c) => c.slug === citySlug);
  if (
    city &&
    city.status === 'published' &&
    city.isVerified === true &&
    city.isIndexable === true
  ) {
    return { country, city };
  }
  return undefined;
}
