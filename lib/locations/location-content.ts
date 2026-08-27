export interface LocationData {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
  faqs: Array<{ question: string; answer: string }>;
}

export const staticLocations: LocationData[] = [
  {
    id: 'loc-lahore',
    name: 'Lahore',
    slug: 'lahore',
    province: 'Punjab',
    h1: 'International Cargo & Shipping Services in Lahore',
    seoTitle: 'International Cargo Services Lahore | Air & Sea Shipping',
    seoDescription: 'Reliable international cargo shipping services for customers in Lahore. Air freight, ocean sea cargo, and door-to-door logistics dispatch.',
    introduction: 'Lahore serves as a primary commercial cargo origin hub in Punjab. We facilitate international air freight and ocean sea cargo collection for exporters, businesses, and individual shippers across Lahore.',
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    localCoverageText: 'Cargo receiving and pickup dispatch services operate across major commercial districts in Lahore including Gulberg, Model Town, Johar Town, and Multan Road commercial hubs.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'How do I arrange international cargo shipping from Lahore?',
        answer: 'You can request a quote by selecting Lahore as your origin city and specifying your cargo type and destination. Cargo receiving can be scheduled from your address or local collection point.',
      },
      {
        question: 'Which international cargo shipping modes are available in Lahore?',
        answer: 'Air freight, sea cargo, door-to-door logistics, commercial freight, and excess baggage cargo services are available for shipments originating in Lahore.',
      },
    ],
  },
  {
    id: 'loc-karachi',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    h1: 'International Cargo & Shipping Services in Karachi',
    seoTitle: 'International Cargo Services Karachi | Ocean & Air Shipping',
    seoDescription: 'International cargo shipping services for customers in Karachi. Ocean sea freight port access and airport air cargo dispatch.',
    introduction: 'As Pakistan’s chief maritime port and financial hub, Karachi provides direct ocean port access and international air cargo connections for commercial exporters and private shippers.',
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    localCoverageText: 'Cargo collection and dispatch services cover major industrial and commercial zones in Karachi, including SITE Industrial Area, Korangi, I.I. Chundrigar Road, and Clifton.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'door-to-door', 'freight-forwarding', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'Can I ship sea cargo directly from Karachi?',
        answer: 'Yes, Karachi serves as the primary sea cargo port gateway in Pakistan for international ocean freight shipments heading worldwide.',
      },
      {
        question: 'What is the process for air cargo dispatch from Karachi?',
        answer: 'Air cargo is received at local dispatch points in Karachi, inspected, cleared for export, and transferred to international air freight departures.',
      },
    ],
  },
  {
    id: 'loc-islamabad',
    name: 'Islamabad',
    slug: 'islamabad',
    province: 'Capital Territory',
    h1: 'International Cargo & Shipping Services in Islamabad',
    seoTitle: 'International Cargo Services Islamabad | Air Cargo Shipping',
    seoDescription: 'International cargo and express shipping services for customers in Islamabad. Direct air cargo links and destination delivery.',
    introduction: 'Islamabad provides key air cargo dispatch links connecting the capital territory with international destination airports. We support commercial, embassy, personal, and student cargo shipments.',
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    localCoverageText: 'Coverage includes all commercial sectors in Islamabad including Blue Area, F-6, F-7, G-8, I-9 Industrial Sector, and surrounding capital territory zones.',
    supportedServices: ['international-cargo', 'air-freight', 'door-to-door', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'Is excess baggage shipping available for students leaving Islamabad?',
        answer: 'Yes, specialized excess baggage and personal luggage cargo shipping is available for students and families relocating internationally from Islamabad.',
      },
      {
        question: 'How are quotes calculated for shipments originating in Islamabad?',
        answer: 'Quotes are calculated based on your cargo dimensions, weight, shipping mode (air freight vs door-to-door), and chosen destination country.',
      },
    ],
  },
  {
    id: 'loc-rawalpindi',
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    province: 'Punjab',
    h1: 'International Cargo & Shipping Services in Rawalpindi',
    seoTitle: 'International Cargo Services Rawalpindi | Air & Sea Freight',
    seoDescription: 'International cargo shipping services for customers in Rawalpindi. Air freight, ocean cargo, and door-to-door shipping solutions.',
    introduction: 'Serving shippers across Rawalpindi, our international cargo logistics connects commercial businesses and residents with comprehensive air freight and door-to-door destination delivery.',
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    localCoverageText: 'Cargo collection operates across commercial markets in Rawalpindi including Raja Bazaar, Saddar, Satellite Town, and Saddar Commercial District.',
    supportedServices: ['international-cargo', 'air-freight', 'sea-cargo', 'door-to-door', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'Can I arrange cargo pickup from my location in Rawalpindi?',
        answer: 'Yes, cargo collection arrangements are supported across Rawalpindi commercial and residential sectors for international shipping dispatch.',
      },
      {
        question: 'What shipping documentation is required for cargo leaving Rawalpindi?',
        answer: 'Shipments require a valid sender ID, itemized packing list, declared value details, and recipient destination contact information.',
      },
    ],
  },
];

export function getPublishedStaticLocations(): LocationData[] {
  return staticLocations.filter(
    (loc) => loc.status === 'published' && loc.isVerified === true && loc.isIndexable === true
  );
}

export function getStaticLocationBySlug(slug: string): LocationData | undefined {
  const loc = staticLocations.find((l) => l.slug === slug);
  if (loc && loc.status === 'published' && loc.isVerified === true) {
    return loc;
  }
  return undefined;
}
