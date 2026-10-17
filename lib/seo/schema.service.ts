import { businessProfile, BranchProfile, OpeningHoursSpec } from '@/config/business-profile';

export const ORGANIZATION_ID = 'https://raahiinternational.com/#organization';
export const WEBSITE_ID = 'https://raahiinternational.com/#website';
export const BASE_URL = 'https://raahiinternational.com/';
export const LOGO_URL = 'https://raahiinternational.com/logo.png';

export interface RootGraphOptions {
  telephone?: string;
  email?: string;
  address?: string;
  /** Public profile URLs (e.g. Sanity Site Settings social links); merged with businessProfile.sameAs. */
  sameAs?: Array<string | null | undefined>;
}

export function formatE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '+923007097063';
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  return `+${digits}`;
}

function toAbsoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${BASE_URL}${path.replace(/^\/+/, '')}`;
}

function getOpeningHoursJsonLd(hours: OpeningHoursSpec[]) {
  return hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek.map((d) => `https://schema.org/${d}`),
    opens: h.opens,
    closes: h.closes,
  }));
}

/** Unique, valid http(s) profile URLs. */
export function getSameAsUrls(extra: Array<string | null | undefined> = []): string[] {
  const urls = [...businessProfile.sameAs, ...extra]
    .filter((u): u is string => typeof u === 'string' && /^https?:\/\//.test(u.trim()))
    .map((u) => u.trim());
  return Array.from(new Set(urls));
}

export function getContactPointsJsonLd(telephone = businessProfile.telephone, email = businessProfile.email) {
  const base = {
    '@type': 'ContactPoint',
    areaServed: ['PK', 'GB', 'AE', 'SA', 'US', 'CA'],
    availableLanguage: businessProfile.availableLanguages,
  };
  return [
    { ...base, contactType: 'customer service', telephone: formatE164(telephone), email },
    { ...base, contactType: 'sales', telephone: formatE164(businessProfile.whatsapp), email },
  ];
}

export function getRootGraphJsonLd(options?: RootGraphOptions) {
  const phoneRaw = options?.telephone || businessProfile.telephone;
  const email = options?.email || businessProfile.email;
  const telephone = formatE164(phoneRaw);
  const sameAs = getSameAsUrls(options?.sameAs);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: BASE_URL,
        name: 'Raahi International',
        alternateName: ['Raahi', 'Raahi Cargo'],
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        inLanguage: 'en-PK',
      },
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Raahi International',
        url: BASE_URL,
        logo: LOGO_URL,
        description:
          'International cargo, air freight, sea cargo, and logistics services from Pakistan to worldwide destinations including UK, UAE, USA, Canada, and Saudi Arabia.',
        email,
        telephone,
        contactPoint: getContactPointsJsonLd(phoneRaw, email),
        ...(sameAs.length > 0 ? { sameAs } : {}),
        areaServed: [
          { '@type': 'Country', name: 'Pakistan' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
        ],
        knowsAbout: [
          'International Cargo Services',
          'Air Cargo from Pakistan',
          'Sea Cargo from Pakistan',
          'Commercial Freight Shipping',
          'Excess Baggage Services',
        ],
      },
    ],
  };
}

export interface LocalBusinessInput {
  key: string;
  name: string;
  province?: string;
  url: string;
  branchAddress?: string;
  description?: string;
}

/**
 * LocalBusiness for a staffed branch. Structured address/geo come from
 * businessProfile.branches[key] when provided; otherwise the location's address text is used.
 */
export function getLocalBusinessJsonLd(location: LocalBusinessInput) {
  const branch: BranchProfile = businessProfile.branches[location.key] ?? {};
  const fallbackPostal = location.branchAddress?.match(/\b(\d{5})\b\s*$/)?.[1];
  const sameAs = getSameAsUrls([branch.googleBusinessProfileUrl]);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${toAbsoluteUrl(location.url)}#localbusiness`,
    name: `Raahi International - ${location.name} Branch`,
    url: toAbsoluteUrl(location.url),
    image: LOGO_URL,
    logo: LOGO_URL,
    ...(location.description ? { description: location.description } : {}),
    telephone: formatE164(branch.telephone || businessProfile.telephone),
    email: businessProfile.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.streetAddress || location.branchAddress,
      addressLocality: location.name,
      addressRegion: branch.addressRegion || location.province,
      ...((branch.postalCode || fallbackPostal) ? { postalCode: branch.postalCode || fallbackPostal } : {}),
      addressCountry: 'PK',
    },
    ...(branch.geo ? { geo: { '@type': 'GeoCoordinates', latitude: branch.geo.latitude, longitude: branch.geo.longitude } } : {}),
    openingHoursSpecification: getOpeningHoursJsonLd(branch.openingHours ?? businessProfile.openingHours),
    contactPoint: getContactPointsJsonLd(branch.telephone || businessProfile.telephone),
    parentOrganization: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'City', name: location.name },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export interface ItemListEntry {
  name: string;
  url: string;
}

/** ItemList for hub/index pages (services, destinations, locations, guides). */
export function getItemListJsonLd(name: string, items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.url),
    })),
  };
}

export function getAboutPageJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${BASE_URL}about#webpage`,
    url: `${BASE_URL}about`,
    name: 'About Raahi International',
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    mainEntity: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-PK',
  };
}
