import { z } from 'zod';

export type BlockType =
  | 'hero'
  | 'quick_quote'
  | 'services'
  | 'locations'
  | 'destinations'
  | 'process'
  | 'trust'
  | 'guides'
  | 'faq'
  | 'cta';

export interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  schema: z.ZodSchema<unknown>;
  defaultData: Record<string, unknown>;
}

export const BLOCK_DEFINITIONS: Record<BlockType, BlockDefinition> = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    description: 'Full-bleed Photographic Hero with Headline, Supporting Copy, Dual CTAs, and Capabilities.',
    schema: z.object({
      eyebrow: z.string().default('AIR & SEA CARGO DELIVERY'),
      headline: z.string().default('SEND CARGO. WE HANDLE THE REST.'),
      supporting_copy: z.string().default('Door-to-door cargo delivery by air and sea, from Pakistan to destinations around the world.'),
      primary_cta_label: z.string().default('Get a Shipping Quote'),
      primary_cta_href: z.string().default('/quote'),
      secondary_cta_label: z.string().default('Track Shipment'),
      secondary_cta_href: z.string().default('/track'),
      capability_line: z.string().default('AIR CARGO • SEA CARGO • DOOR-TO-DOOR • CUSTOMS CLEARANCE'),
      background_image: z.string().default('/images/hero-bg.jpg'),
      image_alt_text: z.string().default('Air and sea cargo shipping from Pakistan'),
    }),
    defaultData: {
      eyebrow: 'AIR & SEA CARGO DELIVERY',
      headline: 'SEND CARGO. WE HANDLE THE REST.',
      supporting_copy: 'Door-to-door cargo delivery by air and sea, from Pakistan to destinations around the world.',
      primary_cta_label: 'Get a Shipping Quote',
      primary_cta_href: '/quote',
      secondary_cta_label: 'Track Shipment',
      secondary_cta_href: '/track',
      capability_line: 'AIR CARGO • SEA CARGO • DOOR-TO-DOOR • CUSTOMS CLEARANCE',
      background_image: '/images/hero-bg.jpg',
      image_alt_text: 'Air and sea cargo shipping from Pakistan',
    },
  },
  quick_quote: {
    type: 'quick_quote',
    label: 'Quick Quote Widget',
    description: 'Fast route rate inquiry component.',
    schema: z.object({
      section_title: z.string().default('Quick Rate & Route Inquiry'),
      subtitle: z.string().default('Select shipment parameters to initiate a quote request'),
    }),
    defaultData: {
      section_title: 'Quick Rate & Route Inquiry',
      subtitle: 'Select shipment parameters to initiate a quote request',
    },
  },
  services: {
    type: 'services',
    label: 'Services Section',
    description: 'Air Cargo & Sea Cargo capability cards with door-to-door messaging.',
    schema: z.object({
      badge: z.string().default('Core Services'),
      title: z.string().default('Air & Sea Cargo Delivery'),
      subtitle: z.string().default('Fast air cargo and economical ocean sea cargo delivery with complete door-to-door options from Pakistan.'),
      air_cargo_title: z.string().default('AIR CARGO'),
      air_cargo_description: z.string().default('Cargo shipping by air with door-to-door delivery options. Time-critical air dispatches for commercial shipments, boxes, and urgent international cargo.'),
      sea_cargo_title: z.string().default('SEA CARGO'),
      sea_cargo_description: z.string().default('Cargo shipping by sea with door-to-door delivery from pickup to destination. Economical ocean container shipping (FCL/LCL) for heavy and large goods.'),
      air_cargo_image: z.string().default('/images/service-air.jpg'),
      sea_cargo_image: z.string().default('/images/service-sea.jpg'),
    }),
    defaultData: {
      badge: 'Core Services',
      title: 'Air & Sea Cargo Delivery',
      subtitle: 'Fast air cargo and economical ocean sea cargo delivery with complete door-to-door options from Pakistan.',
      air_cargo_title: 'AIR CARGO',
      air_cargo_description: 'Cargo shipping by air with door-to-door delivery options. Time-critical air dispatches for commercial shipments, boxes, and urgent international cargo.',
      sea_cargo_title: 'SEA CARGO',
      sea_cargo_description: 'Cargo shipping by sea with door-to-door delivery from pickup to destination. Economical ocean container shipping (FCL/LCL) for heavy and large goods.',
      air_cargo_image: '/images/service-air.jpg',
      sea_cargo_image: '/images/service-sea.jpg',
    },
  },
  locations: {
    type: 'locations',
    label: 'Pakistan Reach Section',
    description: 'Pakistan origin collection coverage points.',
    schema: z.object({
      badge: z.string().default('Pakistan Origin Coverage'),
      title: z.string().default('Origin Cargo Pickup Across Pakistan'),
      subtitle: z.string().default('Doorstep collection and export cargo dispatch operating across primary commercial cities.'),
    }),
    defaultData: {
      badge: 'Pakistan Origin Coverage',
      title: 'Origin Cargo Pickup Across Pakistan',
      subtitle: 'Doorstep collection and export cargo dispatch operating across primary commercial cities.',
    },
  },
  destinations: {
    type: 'destinations',
    label: 'Destinations Section',
    description: 'International trade routes and hub manifests.',
    schema: z.object({
      badge: z.string().default('Trade Corridors'),
      title: z.string().default('Direct International Cargo Routes'),
      subtitle: z.string().default('Cargo delivery routes connecting Pakistan export hubs with destination markets worldwide.'),
    }),
    defaultData: {
      badge: 'Trade Corridors',
      title: 'Direct International Cargo Routes',
      subtitle: 'Cargo delivery routes connecting Pakistan export hubs with destination markets worldwide.',
    },
  },
  process: {
    type: 'process',
    label: 'Process Section',
    description: '4-stage operational workflow.',
    schema: z.object({
      badge: z.string().default('Logistics Workflow'),
      title: z.string().default('Structured Shipping & Dispatch Process'),
      subtitle: z.string().default('Four clear operational stages from initial quote submission to final destination delivery.'),
      stage1_num: z.string().default('01'),
      stage1_title: z.string().default('REQUEST'),
      stage1_subtitle: z.string().default('Quote & Specification'),
      stage1_description: z.string().default('Submit cargo dimensions, weight, origin city in Pakistan, and destination address for rate quotes.'),
      stage2_num: z.string().default('02'),
      stage2_title: z.string().default('COLLECTION'),
      stage2_subtitle: z.string().default('Doorstep Pickup'),
      stage2_description: z.string().default('Scheduled cargo collection from your address with commercial packaging inspection.'),
      stage3_num: z.string().default('03'),
      stage3_title: z.string().default('PROCESSING'),
      stage3_subtitle: z.string().default('Export Clearance'),
      stage3_description: z.string().default('Customs declaration, carrier booking, and public tracking reference assignment.'),
      stage4_num: z.string().default('04'),
      stage4_title: z.string().default('DELIVERY'),
      stage4_subtitle: z.string().default('Destination Handoff'),
      stage4_description: z.string().default('International customs clearance and final delivery handoff at the recipient address.'),
    }),
    defaultData: {
      badge: 'Logistics Workflow',
      title: 'Structured Shipping & Dispatch Process',
      subtitle: 'Four clear operational stages from initial quote submission to final destination delivery.',
      stage1_num: '01',
      stage1_title: 'REQUEST',
      stage1_subtitle: 'Quote & Specification',
      stage1_description: 'Submit cargo dimensions, weight, origin city in Pakistan, and destination address for rate quotes.',
      stage2_num: '02',
      stage2_title: 'COLLECTION',
      stage2_subtitle: 'Doorstep Pickup',
      stage2_description: 'Scheduled cargo collection from your address with commercial packaging inspection.',
      stage3_num: '03',
      stage3_title: 'PROCESSING',
      stage3_subtitle: 'Export Clearance',
      stage3_description: 'Customs declaration, carrier booking, and public tracking reference assignment.',
      stage4_num: '04',
      stage4_title: 'DELIVERY',
      stage4_subtitle: 'Destination Handoff',
      stage4_description: 'International customs clearance and final delivery handoff at the recipient address.',
    },
  },
  trust: {
    type: 'trust',
    label: 'Trust & Compliance Section',
    description: 'Verified operational compliance badges.',
    schema: z.object({
      badge: z.string().default('Operational Standards'),
      title: z.string().default('Verified Cargo Standards & Compliance'),
      subtitle: z.string().default('Operational capabilities for international air and sea cargo export shipments.'),
    }),
    defaultData: {
      badge: 'Operational Standards',
      title: 'Verified Cargo Standards & Compliance',
      subtitle: 'Operational capabilities for international air and sea cargo export shipments.',
    },
  },
  guides: {
    type: 'guides',
    label: 'Guides Section',
    description: 'Educational articles preview container.',
    schema: z.object({
      badge: z.string().default('Resources & Knowledge'),
      title: z.string().default('Cargo & Export Educational Guides'),
      subtitle: z.string().default('Practical guidance on packaging standards, export documentation rules, and transit mode selection.'),
      max_visible: z.number().default(3),
    }),
    defaultData: {
      badge: 'Resources & Knowledge',
      title: 'Cargo & Export Educational Guides',
      subtitle: 'Practical guidance on packaging standards, export documentation rules, and transit mode selection.',
      max_visible: 3,
    },
  },
  faq: {
    type: 'faq',
    label: 'FAQ Section',
    description: 'Accordion section for customer inquiries.',
    schema: z.object({
      badge: z.string().default('Frequently Asked Questions'),
      title: z.string().default('Common Questions About International Cargo'),
      subtitle: z.string().default('Answers regarding cargo pickup, volumetric weight billing, and commercial customs documentation.'),
    }),
    defaultData: {
      badge: 'Frequently Asked Questions',
      title: 'Common Questions About International Cargo',
      subtitle: 'Answers regarding cargo pickup, volumetric weight billing, and commercial customs documentation.',
    },
  },
  cta: {
    type: 'cta',
    label: 'Final CTA Section',
    description: 'Bottom page conversion callout.',
    schema: z.object({
      eyebrow: z.string().default('Air & Sea Cargo Delivery'),
      headline: z.string().default('Ready to send cargo?'),
      supporting_copy: z.string().default('Connect with our team to calculate air cargo rates, ocean container schedules, and door-to-door delivery options.'),
      primary_cta_label: z.string().default('Get a Shipping Quote'),
      primary_cta_href: z.string().default('/quote'),
      secondary_cta_label: z.string().default('Track Shipment'),
      secondary_cta_href: z.string().default('/track'),
    }),
    defaultData: {
      eyebrow: 'Air & Sea Cargo Delivery',
      headline: 'Ready to send cargo?',
      supporting_copy: 'Connect with our team to calculate air cargo rates, ocean container schedules, and door-to-door delivery options.',
      primary_cta_label: 'Get a Shipping Quote',
      primary_cta_href: '/quote',
      secondary_cta_label: 'Track Shipment',
      secondary_cta_href: '/track',
    },
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return BLOCK_DEFINITIONS[type] || BLOCK_DEFINITIONS.hero;
}
