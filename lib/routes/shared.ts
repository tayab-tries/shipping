/**
 * Types and shared values for the code-defined city pages and city → country route pages
 * (Lahore, Islamabad). Each city's copy lives in its own `*-content.ts`; `registry.ts` collects them.
 *
 * Paragraph, list and FAQ answer text is Markdown, so inline links work: `[label](/path)`.
 */

import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'facts'; items: Array<[label: string, value: string]> };

export interface ContentSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

/** The Pakistan city a page ships from. */
export interface OriginCity {
  /** Location short slug (`lahore`, `islamabad`). */
  key: string;
  name: string;
  province: string;
  /** Canonical city page path. */
  cityPath: string;
}

export interface LandingPage {
  origin: OriginCity;
  path: string;
  /** Keyword anchor text used wherever another page links here. */
  linkLabel: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  /** "At a glance" facts; values are Markdown. */
  glance?: Array<[label: string, value: string]>;
  sections: ContentSection[];
  /** Defaults to "Frequently asked questions". */
  faqTitle?: string;
  /** FAQ answers are Markdown; links are stripped for the FAQPage schema. */
  faqs: Array<{ question: string; answer: string }>;
  /** Last line of the page body, under the FAQs. Markdown. */
  closing?: string;
  breadcrumbs: Array<{ label: string; url: string }>;
  quoteUrl: string;
  whatsappMessage: string;
  /** City pages with a staffed office: LocalBusiness schema (from businessProfile.branches) instead of Service. */
  localBusiness?: boolean;
  /** Route pages only: Service schema, with per-kg PKR price ranges as offers. */
  service?: {
    name: string;
    areaServed: { code: string; name: string };
    airRate: [min: number, max: number];
    seaRate: [min: number, max: number];
  };
  /** Destination country slug the route serves (links "Shipping from <city>" on that page). */
  countrySlug?: string;
  /** Anchor text on the country page, when it differs from `linkLabel`. */
  countryLinkLabel?: string;
  /** Anchor text on destination city pages, keyed by city slug (e.g. `london`). */
  cityLinkLabels?: Record<string, string>;
}

/** A city page plus its route pages, keyed by route slug (`lahore-to-uk`). */
export interface CityLanding {
  cityPage: LandingPage;
  routes: Record<string, LandingPage>;
  /** Extra sidebar links on the city page, e.g. destination pages for a city without its own route pages. */
  relatedLinks?: Array<{ label: string; href: string }>;
}

/** A destination country page (`/destinations/uk`): the hub for searches naming the country but no Pakistani city. */
export interface CountryLanding {
  /** Destination slug (`uk`, `uae`, `ksa`, `usa`, `canada`). */
  slug: string;
  name: string;
  region: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  sections: ContentSection[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  closing: string;
  quoteUrl: string;
  whatsappMessage: string;
  /** Service schema; offers are named "Air/Sea cargo from Pakistan to <offerTarget>". */
  service: {
    name: string;
    areaServed: { code: string; name: string };
    offerTarget: string;
    airRate: [min: number, max: number];
    seaRate: [min: number, max: number];
  };
}

export const PHONE = '0300 7097063';
export const WHATSAPP_NUMBER = '923007097063';
export const RATES_UPDATED = 'October 2026';
/** Office hours from the site schema (business_settings); the copy asks for confirmation. */
export const OFFICE_HOURS = 'Mon–Sat, 9am–7pm';

/** Inline WhatsApp links in the copy, prefilled with the route (e.g. "…from Lahore to UK"). */
export const contentWhatsappLink = (origin: string, destination?: string) =>
  buildWhatsappUrl(
    WHATSAPP_NUMBER,
    `Hi Raahi, I want a cargo quote from ${origin}${destination ? ` to ${destination}` : ''}`
  );

/** WhatsApp message naming the destination (e.g. "…cargo quote to the UK"), so enquiries show the page they came from. */
export const destinationWhatsappMessage = (destination: string) => `Hi Raahi, I want a cargo quote to ${destination}`;

export const destinationWhatsappLink = (destination: string) =>
  buildWhatsappUrl(WHATSAPP_NUMBER, destinationWhatsappMessage(destination));

/** Pickup city pages, for the country pages' "eight cities" lists. */
export const ORIGIN_CITY_PATHS: Record<string, string> = {
  lahore: '/locations/international-cargo-services-in-lahore',
  islamabad: '/locations/international-cargo-services-in-islamabad',
  rawalpindi: '/locations/international-cargo-services-in-rawalpindi',
  karachi: '/locations/international-cargo-services-in-karachi',
  faisalabad: '/locations/international-cargo-services-in-faisalabad',
  multan: '/locations/international-cargo-services-in-multan',
  peshawar: '/locations/international-cargo-services-in-peshawar',
  sialkot: '/locations/international-cargo-services-in-sialkot',
};

/** "[Lahore](…), [Karachi](…), … and [Sialkot](…)" in the copy's order. */
export const originCityLinks = (keys: string[]) => {
  const links = keys.map((key) => `[${key.charAt(0).toUpperCase()}${key.slice(1)}](${ORIGIN_CITY_PATHS[key]})`);
  return `${links.slice(0, -1).join(', ')} and ${links[links.length - 1]}`;
};

export const ALL_ORIGIN_KEYS = ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'faisalabad', 'multan', 'peshawar', 'sialkot'];

/** Sidebar links to the destination country pages. */
export const DESTINATION_LINKS = [
  { label: 'Cargo to the UK', href: '/destinations/uk' },
  { label: 'Cargo to Dubai and the UAE', href: '/destinations/uae' },
  { label: 'Cargo to Saudi Arabia', href: '/destinations/ksa' },
  { label: 'Cargo to the USA', href: '/destinations/usa' },
  { label: 'Cargo to Canada', href: '/destinations/canada' },
];

export const cityBreadcrumbs = (origin: OriginCity) => [
  { label: 'Home', url: '/' },
  { label: 'Locations', url: '/locations' },
  { label: origin.name, url: origin.cityPath },
];

export const routeBreadcrumbs = (origin: OriginCity, label: string, url: string) => [
  { label: 'Home', url: '/' },
  { label: 'Locations', url: '/locations' },
  { label: origin.name, url: origin.cityPath },
  { label, url },
];
