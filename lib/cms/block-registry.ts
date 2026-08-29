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
  | 'cta'
  | 'rich_text'
  | 'image_text';

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
    label: 'Homepage Hero Block',
    description: 'Full-bleed photographic background hero with headline, CTA buttons, and capability line.',
    schema: z.object({
      eyebrow: z.string().default('VERIFIED FREIGHT FORWARDER'),
      headline: z.string().min(5, 'Headline is required'),
      description: z.string().min(10, 'Description is required'),
      primary_cta_label: z.string().default('Get a Shipping Quote'),
      primary_cta_href: z.string().default('/quote'),
      secondary_cta_label: z.string().default('Track Shipment'),
      secondary_cta_href: z.string().default('/track'),
      capability_text: z.string().default('Scheduled dispatches from Karachi, Lahore, Islamabad, and Rawalpindi'),
      bg_image_slot: z.string().default('heroBackground'),
    }),
    defaultData: {
      eyebrow: 'VERIFIED FREIGHT FORWARDER',
      headline: 'Air & Sea Cargo Dispatch From Pakistan',
      description: 'Scheduled international cargo forwarding connecting commercial shippers and individuals in Pakistan to destination markets in the UK, UAE, USA, Canada, and Saudi Arabia.',
      primary_cta_label: 'Get a Shipping Quote',
      primary_cta_href: '/quote',
      secondary_cta_label: 'Track Shipment',
      secondary_cta_href: '/track',
      capability_text: 'Scheduled dispatches from Karachi, Lahore, Islamabad, and Rawalpindi',
      bg_image_slot: 'heroBackground',
    },
  },
  quick_quote: {
    type: 'quick_quote',
    label: 'Quick Quote Widget Block',
    description: 'Embedded fast quote route calculation widget.',
    schema: z.object({
      title: z.string().default('Quick Cargo Rate Inquiry'),
      subtitle: z.string().default('Select origin city and target destination for fast export estimates.'),
      enabled: z.boolean().default(true),
    }),
    defaultData: {
      title: 'Quick Cargo Rate Inquiry',
      subtitle: 'Select origin city and target destination for fast export estimates.',
      enabled: true,
    },
  },
  services: {
    type: 'services',
    label: 'Featured Services Block',
    description: 'Asymmetric editorial container for primary freight modes.',
    schema: z.object({
      badge: z.string().default('Core Capabilities'),
      title: z.string().default('International Cargo Services'),
      subtitle: z.string().default('Scheduled linehaul and express air cargo dispatches departing Pakistan gateways.'),
      featured_service_slug: z.string().default('air-freight'),
      max_visible: z.number().int().default(4),
    }),
    defaultData: {
      badge: 'Core Capabilities',
      title: 'International Cargo Services',
      subtitle: 'Scheduled linehaul and express air cargo dispatches departing Pakistan gateways.',
      featured_service_slug: 'air-freight',
      max_visible: 4,
    },
  },
  locations: {
    type: 'locations',
    label: 'Pakistan Hubs Block',
    description: 'Origin pickup cities and verified branch dispatch points.',
    schema: z.object({
      badge: z.string().default('Origin Operations'),
      title: z.string().default('Pakistan Origin Operations'),
      subtitle: z.string().default('Consolidation hubs and doorstep pickup services in major commercial centers.'),
      featured_city_slug: z.string().default('lahore'),
    }),
    defaultData: {
      badge: 'Origin Operations',
      title: 'Pakistan Origin Operations',
      subtitle: 'Consolidation hubs and doorstep pickup services in major commercial centers.',
      featured_city_slug: 'lahore',
    },
  },
  destinations: {
    type: 'destinations',
    label: 'Trade Corridors Block',
    description: 'International country trade route manifests.',
    schema: z.object({
      badge: z.string().default('Trade Corridors'),
      title: z.string().default('Featured International Shipping Routes'),
      subtitle: z.string().default('Scheduled linehaul dispatch connecting shippers in Pakistan with destination markets.'),
    }),
    defaultData: {
      badge: 'Trade Corridors',
      title: 'Featured International Shipping Routes',
      subtitle: 'Scheduled linehaul dispatch connecting shippers in Pakistan with destination markets.',
    },
  },
  process: {
    type: 'process',
    label: 'Logistics Process Block',
    description: '4-stage shipment workflow container.',
    schema: z.object({
      badge: z.string().default('Operational Workflow'),
      title: z.string().default('4-Stage Export Dispatch Process'),
      subtitle: z.string().default('From pickup in Pakistan to final destination clearance and delivery.'),
    }),
    defaultData: {
      badge: 'Operational Workflow',
      title: '4-Stage Export Dispatch Process',
      subtitle: 'From pickup in Pakistan to final destination clearance and delivery.',
    },
  },
  trust: {
    type: 'trust',
    label: 'Trust & Verification Block',
    description: 'Verified compliance credentials and carrier network badges.',
    schema: z.object({
      badge: z.string().default('Verified Compliance'),
      title: z.string().default('Evidence-Based Export Compliance'),
      subtitle: z.string().default('Standardized customs documentation and verified logistics procedures.'),
    }),
    defaultData: {
      badge: 'Verified Compliance',
      title: 'Evidence-Based Export Compliance',
      subtitle: 'Standardized customs documentation and verified logistics procedures.',
    },
  },
  guides: {
    type: 'guides',
    label: 'Educational Resources Block',
    description: 'Published export guides and customs documentation advice.',
    schema: z.object({
      badge: z.string().default('Resource Hub'),
      title: z.string().default('Logistics & Customs Guides'),
      subtitle: z.string().default('Practical educational guides for commercial exporters and individual shippers.'),
    }),
    defaultData: {
      badge: 'Resource Hub',
      title: 'Logistics & Customs Guides',
      subtitle: 'Practical educational guides for commercial exporters and individual shippers.',
    },
  },
  faq: {
    type: 'faq',
    label: 'FAQ Accordion Block',
    description: 'Frequently Asked Questions accordion section.',
    schema: z.object({
      badge: z.string().default('FAQ'),
      title: z.string().default('Frequently Asked Questions'),
      subtitle: z.string().default('Common questions regarding export dispatch, customs documentation, and transit times.'),
    }),
    defaultData: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions regarding export dispatch, customs documentation, and transit times.',
    },
  },
  cta: {
    type: 'cta',
    label: 'Final Conversion CTA Block',
    description: 'Closing quote conversion panel.',
    schema: z.object({
      badge: z.string().default('Get Started'),
      title: z.string().default('Ready to Dispatch Your Cargo?'),
      subtitle: z.string().default('Contact our operations team for custom rate calculations, packing guidance, and pickup scheduling.'),
      button_text: z.string().default('Get a Shipping Quote'),
      button_href: z.string().default('/quote'),
    }),
    defaultData: {
      badge: 'Get Started',
      title: 'Ready to Dispatch Your Cargo?',
      subtitle: 'Contact our operations team for custom rate calculations, packing guidance, and pickup scheduling.',
      button_text: 'Get a Shipping Quote',
      button_href: '/quote',
    },
  },
  rich_text: {
    type: 'rich_text',
    label: 'Sanitized Markdown Text Block',
    description: 'Sanitized markdown content section.',
    schema: z.object({
      title: z.string().optional(),
      content_markdown: z.string().min(5, 'Content markdown is required'),
    }),
    defaultData: {
      title: 'Additional Information',
      content_markdown: 'Enter sanitized markdown text here...',
    },
  },
  image_text: {
    type: 'image_text',
    label: 'Image + Text Feature Block',
    description: 'Side-by-side photographic feature and editorial copy block.',
    schema: z.object({
      eyebrow: z.string().optional(),
      title: z.string().min(2, 'Title is required'),
      body: z.string().min(5, 'Body text is required'),
      image_slot: z.string().default('serviceAir'),
      image_position: z.enum(['left', 'right']).default('right'),
      cta_label: z.string().optional(),
      cta_href: z.string().optional(),
    }),
    defaultData: {
      eyebrow: 'LOGISTICS FEATURE',
      title: 'Direct Airport Freight Dispatches',
      body: 'Cargo is accepted at major airport terminals in Lahore, Karachi, and Islamabad with full air waybill documentation.',
      image_slot: 'serviceAir',
      image_position: 'right',
      cta_label: 'Learn More',
      cta_href: '/services/air-freight',
    },
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return BLOCK_DEFINITIONS[type] || BLOCK_DEFINITIONS.hero;
}
