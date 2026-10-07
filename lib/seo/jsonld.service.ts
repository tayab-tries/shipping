import { siteConfig } from '@/config/site.config';
import { BreadcrumbItem } from '@/types/content';
import { ORGANIZATION_ID, getRootGraphJsonLd } from './schema.service';

export { getRootGraphJsonLd };

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Raahi International',
    url: 'https://raahiinternational.com/',
    logo: 'https://raahiinternational.com/logo.png',
    description: siteConfig.defaultSeo.defaultDescription,
    telephone: '+923007097063',
    email: 'raahiinternational4@gmail.com',
  };
}

export function getServiceJsonLd(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@id': ORGANIZATION_ID,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    serviceType: serviceName,
  };
}

export function getBreadcrumbJsonLd(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => {
      const cleanUrl = item.url.startsWith('http')
        ? item.url
        : `https://raahiinternational.com${item.url === '/' ? '/' : (item.url.startsWith('/') ? item.url : `/${item.url}`).replace(/\/+$/, '')}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: cleanUrl,
      };
    }),
  };
}
