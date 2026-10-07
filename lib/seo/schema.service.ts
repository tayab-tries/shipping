export const ORGANIZATION_ID = 'https://raahiinternational.com/#organization';
export const WEBSITE_ID = 'https://raahiinternational.com/#website';
export const BASE_URL = 'https://raahiinternational.com/';
export const LOGO_URL = 'https://raahiinternational.com/logo.png';

export interface RootGraphOptions {
  telephone?: string;
  email?: string;
  address?: string;
}

export function formatE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '+923007097063';
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  return `+${digits}`;
}

export function getRootGraphJsonLd(options?: RootGraphOptions) {
  const phoneRaw = options?.telephone || '0300 7097063';
  const email = options?.email || 'raahiinternational4@gmail.com';
  const telephone = formatE164(phoneRaw);

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
