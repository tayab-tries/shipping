import { CargoType } from '@/types/quote';

export interface ServiceConfigItem {
  slug: string;
  name: string;
  h1: string;
  shortDescription: string;
  enabled: boolean;                  // Single source of truth for publication
  isVerified: boolean;               // Single source of truth for business verification
  quoteCargoType?: CargoType;        // Explicit enum mapping (undefined for umbrella services)
  contentPath: string;
  iconName: 'Package' | 'Plane' | 'Ship' | 'Truck' | 'FileText' | 'Building2' | 'Luggage';
  category: 'core' | 'specialized';
  relatedServices: string[];         // Slugs of related services
  relatedDestinations: string[];     // Slugs of target destinations
  relatedLocations: string[];        // Slugs of target origin cities
  seo: {
    title: string;
    description: string;
  };
}

export const servicesRegistry: ServiceConfigItem[] = [
  {
    slug: 'international-cargo',
    name: 'International Cargo',
    h1: 'International Cargo & Shipping Services from Pakistan',
    shortDescription: 'International cargo shipping solutions connecting shippers in Pakistan with global destinations.',
    enabled: true,
    isVerified: true,
    quoteCargoType: undefined,       // Umbrella service -> Navigates to /quote without preselecting mode
    contentPath: 'content/services/international-cargo.mdx',
    iconName: 'Package',
    category: 'core',
    relatedServices: ['air-freight', 'sea-cargo', 'door-to-door'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    seo: {
      title: 'International Cargo & Shipping Services Pakistan',
      description: 'International cargo shipping solutions from Pakistan connecting businesses and individuals with global freight delivery.',
    },
  },
  {
    slug: 'air-freight',
    name: 'Air Freight',
    h1: 'Air Freight Cargo Shipping Services',
    shortDescription: 'Air cargo shipping services for international freight shipments.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'air_freight',   // Direct enum match -> Navigates to /quote?cargo=air_freight
    contentPath: 'content/services/air-freight.mdx',
    iconName: 'Plane',
    category: 'core',
    relatedServices: ['international-cargo', 'door-to-door', 'excess-baggage'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    seo: {
      title: 'Air Freight Services Pakistan | International Air Cargo',
      description: 'Air freight shipping services originating from Pakistan export hubs to international destination airports.',
    },
  },
  {
    slug: 'sea-cargo',
    name: 'Sea Cargo / Ocean Freight',
    h1: 'Sea Cargo & Ocean Freight Services',
    shortDescription: 'Ocean freight shipping services for ocean cargo requirements originating in Pakistan.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'sea_cargo',     // Direct enum match -> Navigates to /quote?cargo=sea_cargo
    contentPath: 'content/services/sea-cargo.mdx',
    iconName: 'Ship',
    category: 'core',
    relatedServices: ['international-cargo', 'commercial-cargo', 'freight-forwarding'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['karachi', 'lahore'],
    seo: {
      title: 'Sea Cargo & Ocean Freight Services Pakistan',
      description: 'Ocean freight shipping services from Pakistan for ocean cargo requirements.',
    },
  },
  {
    slug: 'door-to-door',
    name: 'Door-to-Door Shipping',
    h1: 'Door-to-Door Cargo Shipping Services',
    shortDescription: 'Coordinated international cargo shipping services from collection through destination delivery.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'door_to_door',  // Direct enum match -> Navigates to /quote?cargo=door_to_door
    contentPath: 'content/services/door-to-door.mdx',
    iconName: 'Truck',
    category: 'core',
    relatedServices: ['international-cargo', 'air-freight', 'excess-baggage'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    seo: {
      title: 'Door to Door International Shipping Pakistan',
      description: 'Coordinated door-to-door cargo shipping services from Pakistan to international destinations.',
    },
  },
  {
    slug: 'freight-forwarding',
    name: 'Freight Forwarding',
    h1: 'Freight Forwarding & Shipping Coordination',
    shortDescription: 'Logistics coordination and shipping documentation services for export cargo.',
    enabled: true,
    isVerified: true,
    quoteCargoType: undefined,       // Specialized logistics -> Navigates to /quote
    contentPath: 'content/services/freight-forwarding.mdx',
    iconName: 'FileText',
    category: 'specialized',
    relatedServices: ['international-cargo', 'commercial-cargo', 'sea-cargo'],
    relatedDestinations: ['uk', 'uae', 'usa'],
    relatedLocations: ['karachi', 'lahore'],
    seo: {
      title: 'Freight Forwarding Services Pakistan',
      description: 'Freight forwarding and shipping coordination services for international export cargo from Pakistan.',
    },
  },
  {
    slug: 'commercial-cargo',
    name: 'Commercial Cargo',
    h1: 'Commercial Cargo & Trade Shipping Services',
    shortDescription: 'Commercial cargo shipping for exporters, trade shipments, and commercial goods.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'commercial_freight', // Direct enum match -> Navigates to /quote?cargo=commercial_freight
    contentPath: 'content/services/commercial-cargo.mdx',
    iconName: 'Building2',
    category: 'specialized',
    relatedServices: ['sea-cargo', 'air-freight', 'freight-forwarding'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'sialkot', 'faisalabad'],
    seo: {
      title: 'Commercial Cargo & B2B Freight Shipping Pakistan',
      description: 'Commercial cargo shipping for exporters and trade shipments from Pakistan to international markets.',
    },
  },
  {
    slug: 'excess-baggage',
    name: 'Excess Baggage',
    h1: 'Excess Baggage & Personal Belongings Shipping',
    shortDescription: 'Baggage shipping for personal belongings, travelers, students, and relocating families.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'excess_baggage', // Direct enum match -> Navigates to /quote?cargo=excess_baggage
    contentPath: 'content/services/excess-baggage.mdx',
    iconName: 'Luggage',
    category: 'specialized',
    relatedServices: ['air-freight', 'door-to-door'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad'],
    seo: {
      title: 'Excess Baggage International Shipping Pakistan',
      description: 'Baggage shipping solutions for personal belongings and relocation cargo from Pakistan worldwide.',
    },
  },
];

export function getEnabledServices(): ServiceConfigItem[] {
  return servicesRegistry.filter((s) => s.enabled === true && s.isVerified === true);
}
