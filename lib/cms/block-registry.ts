import { z } from 'zod';

export type BlockType =
  | 'hero'
  | 'quick_quote'
  | 'use_cases'
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
    description: 'Customer-focused Hero with Headline, Supporting Copy, Get Quote & WhatsApp CTAs.',
    schema: z.object({
      eyebrow: z.string().default('DOOR-TO-DOOR CARGO SHIPPING FROM PAKISTAN'),
      headline: z.string().default('SEND CARGO FROM PAKISTAN.\nWE\'LL HANDLE THE REST.'),
      supporting_copy: z.string().default('Door-to-door cargo delivery by air and sea. We pick up from Pakistan and deliver to destinations worldwide.'),
      primary_cta_label: z.string().default('GET A QUOTE'),
      primary_cta_href: z.string().default('/quote'),
      secondary_cta_label: z.string().default('WHATSAPP US'),
      secondary_cta_href: z.string().default('https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.'),
      capability_line: z.string().default('HOME PICKUP • AIR CARGO • SEA CARGO • DOOR-TO-DOOR'),
      background_image: z.string().default('/images/hero-bg.jpg'),
      image_alt_text: z.string().default('Air and sea cargo shipping from Pakistan'),
    }),
    defaultData: {
      eyebrow: 'DOOR-TO-DOOR CARGO SHIPPING FROM PAKISTAN',
      headline: 'SEND CARGO FROM PAKISTAN.\nWE\'LL HANDLE THE REST.',
      supporting_copy: 'Door-to-door cargo delivery by air and sea. We pick up from Pakistan and deliver to destinations worldwide.',
      primary_cta_label: 'GET A QUOTE',
      primary_cta_href: '/quote',
      secondary_cta_label: 'WHATSAPP US',
      secondary_cta_href: 'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.',
      capability_line: 'HOME PICKUP • AIR CARGO • SEA CARGO • DOOR-TO-DOOR',
      background_image: '/images/hero-bg.jpg',
      image_alt_text: 'Air and sea cargo shipping from Pakistan',
    },
  },
  quick_quote: {
    type: 'quick_quote',
    label: 'Quick Quote Widget',
    description: 'Fast route rate inquiry component.',
    schema: z.object({
      section_title: z.string().default('Quick Cargo Quote'),
      subtitle: z.string().default('Select origin city in Pakistan and destination country to get started'),
    }),
    defaultData: {
      section_title: 'Quick Cargo Quote',
      subtitle: 'Select origin city in Pakistan and destination country to get started',
    },
  },
  use_cases: {
    type: 'use_cases',
    label: 'What Can You Send Section',
    description: 'Customer cargo use cases (Personal, Excess Baggage, Business).',
    schema: z.object({
      badge: z.string().default('Cargo Types'),
      title: z.string().default('WHAT CAN YOU SEND?'),
      subtitle: z.string().default('We handle personal belongings, luggage, gifts, and commercial export shipments.'),
    }),
    defaultData: {
      badge: 'Cargo Types',
      title: 'WHAT CAN YOU SEND?',
      subtitle: 'We handle personal belongings, luggage, gifts, and commercial export shipments.',
    },
  },
  services: {
    type: 'services',
    label: 'Services Section',
    description: 'Air Cargo & Sea Cargo capability cards with explicit door-to-door delivery.',
    schema: z.object({
      badge: z.string().default('Our Services'),
      title: z.string().default('Air & Sea Cargo Services'),
      subtitle: z.string().default('Fast air cargo and economical sea cargo with complete door-to-door delivery from Pakistan.'),
      air_cargo_title: z.string().default('AIR CARGO'),
      air_cargo_description: z.string().default('Air cargo shipping with door-to-door delivery. Fast air dispatches for boxes, gifts, excess baggage, and urgent shipments.'),
      sea_cargo_title: z.string().default('SEA CARGO'),
      sea_cargo_description: z.string().default('Sea cargo shipping with door-to-door delivery. Economical ocean container shipping for heavy goods and large household shipments.'),
      air_cargo_image: z.string().default('/images/service-air.jpg'),
      sea_cargo_image: z.string().default('/images/service-sea.jpg'),
    }),
    defaultData: {
      badge: 'Our Services',
      title: 'Air & Sea Cargo Services',
      subtitle: 'Fast air cargo and economical sea cargo with complete door-to-door delivery from Pakistan.',
      air_cargo_title: 'AIR CARGO',
      air_cargo_description: 'Air cargo shipping with door-to-door delivery. Fast air dispatches for boxes, gifts, excess baggage, and urgent shipments.',
      sea_cargo_title: 'SEA CARGO',
      sea_cargo_description: 'Sea cargo shipping with door-to-door delivery. Economical ocean container shipping for heavy goods and large household shipments.',
      air_cargo_image: '/images/service-air.jpg',
      sea_cargo_image: '/images/service-sea.jpg',
    },
  },
  locations: {
    type: 'locations',
    label: 'Pakistan Coverage Section',
    description: 'Cargo pickup coverage across Pakistan cities.',
    schema: z.object({
      badge: z.string().default('Home Pickup'),
      title: z.string().default('WE PICK UP CARGO ACROSS PAKISTAN'),
      subtitle: z.string().default('Doorstep collection available across major commercial cities in Pakistan.'),
    }),
    defaultData: {
      badge: 'Home Pickup',
      title: 'WE PICK UP CARGO ACROSS PAKISTAN',
      subtitle: 'Doorstep collection available across major commercial cities in Pakistan.',
    },
  },
  destinations: {
    type: 'destinations',
    label: 'Popular Destinations Section',
    description: 'International cargo shipping routes.',
    schema: z.object({
      badge: z.string().default('Global Routes'),
      title: z.string().default('POPULAR DESTINATIONS FROM PAKISTAN'),
      subtitle: z.string().default('Direct cargo delivery connecting Pakistan to major international destination countries.'),
    }),
    defaultData: {
      badge: 'Global Routes',
      title: 'POPULAR DESTINATIONS FROM PAKISTAN',
      subtitle: 'Direct cargo delivery connecting Pakistan to major international destination countries.',
    },
  },
  process: {
    type: 'process',
    label: 'Process Section',
    description: '4-step simple shipping workflow.',
    schema: z.object({
      badge: z.string().default('How It Works'),
      title: z.string().default('Simple 4-Step Cargo Shipping Process'),
      subtitle: z.string().default('From your initial quote to doorstep delivery at your destination address.'),
      stage1_num: z.string().default('01'),
      stage1_title: z.string().default('GET A QUOTE'),
      stage1_subtitle: z.string().default('Submit Online or WhatsApp'),
      stage1_description: z.string().default('Tell us your pickup city in Pakistan, destination country, and approximate weight.'),
      stage2_num: z.string().default('02'),
      stage2_title: z.string().default('HOME PICKUP'),
      stage2_subtitle: z.string().default('Scheduled Address Collection'),
      stage2_description: z.string().default('We collect your cargo directly from your home or business address.'),
      stage3_num: z.string().default('03'),
      stage3_title: z.string().default('INTERNATIONAL SHIPPING'),
      stage3_subtitle: z.string().default('Export Clearance & Dispatch'),
      stage3_description: z.string().default('Customs clearance and international dispatch via air or sea cargo.'),
      stage4_num: z.string().default('04'),
      stage4_title: z.string().default('FINAL DELIVERY'),
      stage4_subtitle: z.string().default('Doorstep Handoff'),
      stage4_description: z.string().default('Customs clearance at destination and final delivery to the recipient\'s door.'),
    }),
    defaultData: {
      badge: 'How It Works',
      title: 'Simple 4-Step Cargo Shipping Process',
      subtitle: 'From your initial quote to doorstep delivery at your destination address.',
      stage1_num: '01',
      stage1_title: 'GET A QUOTE',
      stage1_subtitle: 'Submit Online or WhatsApp',
      stage1_description: 'Tell us your pickup city in Pakistan, destination country, and approximate weight.',
      stage2_num: '02',
      stage2_title: 'HOME PICKUP',
      stage2_subtitle: 'Scheduled Address Collection',
      stage2_description: 'We collect your cargo directly from your home or business address.',
      stage3_num: '03',
      stage3_title: 'INTERNATIONAL SHIPPING',
      stage3_subtitle: 'Export Clearance & Dispatch',
      stage3_description: 'Customs clearance and international dispatch via air or sea cargo.',
      stage4_num: '04',
      stage4_title: 'FINAL DELIVERY',
      stage4_subtitle: 'Doorstep Handoff',
      stage4_description: 'Customs clearance at destination and final delivery to the recipient\'s door.',
    },
  },
  trust: {
    type: 'trust',
    label: 'Reliability Section',
    description: 'Verified operational capabilities.',
    schema: z.object({
      badge: z.string().default('Reliability'),
      title: z.string().default('RELIABLE CARGO DELIVERY FROM PAKISTAN'),
      subtitle: z.string().default('Factual operational capabilities for international air and sea cargo export shipments.'),
    }),
    defaultData: {
      badge: 'Reliability',
      title: 'RELIABLE CARGO DELIVERY FROM PAKISTAN',
      subtitle: 'Factual operational capabilities for international air and sea cargo export shipments.',
    },
  },
  guides: {
    type: 'guides',
    label: 'Guides Section',
    description: 'Educational resources preview container.',
    schema: z.object({
      badge: z.string().default('Guides & Advice'),
      title: z.string().default('Cargo & Shipping Advice'),
      subtitle: z.string().default('Simple guides on packaging, customs requirements, and choosing between air and sea cargo.'),
      max_visible: z.number().default(3),
    }),
    defaultData: {
      badge: 'Guides & Advice',
      title: 'Cargo & Shipping Advice',
      subtitle: 'Simple guides on packaging, customs requirements, and choosing between air and sea cargo.',
      max_visible: 3,
    },
  },
  faq: {
    type: 'faq',
    label: 'FAQ Section',
    description: 'Customer-facing FAQ accordion.',
    schema: z.object({
      badge: z.string().default('FAQ'),
      title: z.string().default('Frequently Asked Questions'),
      subtitle: z.string().default('Simple answers about cargo pickup, rates, personal belongings, and WhatsApp quotes.'),
    }),
    defaultData: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Simple answers about cargo pickup, rates, personal belongings, and WhatsApp quotes.',
    },
  },
  cta: {
    type: 'cta',
    label: 'Final CTA Section',
    description: 'Bottom page conversion callout.',
    schema: z.object({
      eyebrow: z.string().default('Door-to-Door Delivery'),
      headline: z.string().default('Ready to send cargo from Pakistan?'),
      supporting_copy: z.string().default('Get an instant quote online or message us on WhatsApp to discuss your cargo shipping requirements.'),
      primary_cta_label: z.string().default('GET A QUOTE'),
      primary_cta_href: z.string().default('/quote'),
      secondary_cta_label: z.string().default('WHATSAPP US'),
      secondary_cta_href: z.string().default('https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.'),
    }),
    defaultData: {
      eyebrow: 'Door-to-Door Delivery',
      headline: 'Ready to send cargo from Pakistan?',
      supporting_copy: 'Get an instant quote online or message us on WhatsApp to discuss your cargo shipping requirements.',
      primary_cta_label: 'GET A QUOTE',
      primary_cta_href: '/quote',
      secondary_cta_label: 'WHATSAPP US',
      secondary_cta_href: 'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20send%20cargo%20from%20Pakistan.%20Please%20give%20me%20a%20quote.',
    },
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return BLOCK_DEFINITIONS[type] || BLOCK_DEFINITIONS.hero;
}
