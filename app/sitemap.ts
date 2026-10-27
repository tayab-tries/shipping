import { MetadataRoute } from 'next';
import { getEnabledServices } from '@/config/services.config';
import { getPublishedLocations } from '@/lib/locations/location-content';
import {
  getSanityLocationsList,
  getSanityDestinationsList,
  getSanityGuidesList,
} from '@/sanity/lib/fetch';
import { getPublishedDestinations } from '@/lib/destinations/destination-content';
import { COUNTRY_LANDINGS, COUNTRY_PAGES_UPDATED } from '@/lib/destinations/country-pages';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';
import { getLocationHref, toLocationKey } from '@/lib/locations/location-slugs';
import { CITY_LANDINGS, CITY_PAGES_UPDATED, ROUTE_PAGES } from '@/lib/routes/registry';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://raahiinternational.com';
  const STABLE_DATE = new Date('2026-10-07T00:00:00.000Z');

  // Static indexable routes — /quote and /track purged to eliminate noindex conflicts
  const staticRoutes = [
    '',
    '/about',
    '/cargo-services',
    '/services',
    '/destinations',
    '/locations',
    '/guides',
  ];

  type SitemapEntry = MetadataRoute.Sitemap[number];
  const entries: SitemapEntry[] = [];

  // Static routes
  for (const route of staticRoutes) {
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified: STABLE_DATE,
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  }

  // 1. Dynamically map ONLY enabled & verified non-redirected services
  const enabledServices = getEnabledServices();
  const activeServices = enabledServices.filter(
    (s) => s.slug !== 'air-freight' && s.slug !== 'sea-cargo' && s.slug !== 'door-to-door'
  );
  for (const service of activeServices) {
    entries.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: STABLE_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // 2. Dynamically map ONLY published location hubs from Sanity
  const sanityLocations = await getSanityLocationsList();
  const fallbackLocations = await getPublishedLocations();
  const activeLocations = sanityLocations.length > 0 ? sanityLocations : fallbackLocations;
  // Code-defined city pages are listed even without a Sanity document, dated by their copy, not Sanity's _updatedAt
  const locationEntries = new Map<string, Date>(Object.keys(CITY_LANDINGS).map((key) => [key, CITY_PAGES_UPDATED]));
  for (const location of activeLocations) {
    const key = toLocationKey(location.slug);
    if (!key || locationEntries.has(key)) continue;
    const rawDate = '_updatedAt' in location ? location._updatedAt : undefined;
    const locationDate = rawDate ? new Date(rawDate) : STABLE_DATE;
    locationEntries.set(key, isNaN(locationDate.getTime()) ? STABLE_DATE : locationDate);
  }
  for (const [key, lastModified] of locationEntries) {
    entries.push({
      url: `${baseUrl}${getLocationHref(key)}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 3. Dynamically map ONLY published & verified destination countries & cities from Sanity
  const sanityDestinations = await getSanityDestinationsList();
  const fallbackDestinations = await getPublishedDestinations();
  const activeDestinations = sanityDestinations.length > 0 ? sanityDestinations : fallbackDestinations;
  for (const country of activeDestinations) {
    const countryRaw = '_updatedAt' in country ? country._updatedAt : undefined;
    const countryDate = countryRaw ? new Date(countryRaw) : STABLE_DATE;
    if (country.slug) {
      entries.push({
        url: `${baseUrl}/destinations/${country.slug}`,
        lastModified: COUNTRY_LANDINGS[country.slug]
          ? COUNTRY_PAGES_UPDATED
          : isNaN(countryDate.getTime())
            ? STABLE_DATE
            : countryDate,
        changeFrequency: 'weekly',
        priority: 0.88,
      });
    }
    if (country.cities && country.cities.length > 0) {
      for (const city of country.cities) {
        if (city.slug) {
          const cityRaw = ('_updatedAt' in city ? city._updatedAt : undefined) || countryRaw;
          const cityDate = cityRaw ? new Date(cityRaw) : STABLE_DATE;
          entries.push({
            url: `${baseUrl}/destinations/${country.slug}/${city.slug}`,
            lastModified: isNaN(cityDate.getTime()) ? STABLE_DATE : cityDate,
            changeFrequency: 'weekly',
            priority: 0.88,
          });
        }
      }
    }
  }

  // 4. Origin → destination route pages (e.g. /routes/lahore-to-uk)
  for (const route of Object.values(ROUTE_PAGES)) {
    entries.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date('2026-10-24T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 5. Dynamically map ONLY published & verified educational guides from Sanity
  const sanityGuides = await getSanityGuidesList();
  const fallbackArticles = getPublishedStaticArticles();
  const activeGuides = sanityGuides.length > 0 ? sanityGuides : fallbackArticles;
  const filteredGuides = activeGuides.filter((a) => a.slug);
  for (const guide of filteredGuides) {
    const rawDate =
      ('updatedAt' in guide ? guide.updatedAt : undefined) ||
      ('_updatedAt' in guide ? guide._updatedAt : undefined) ||
      ('publishedAt' in guide ? guide.publishedAt : undefined);
    const guideDate = rawDate ? new Date(rawDate) : STABLE_DATE;
    entries.push({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: isNaN(guideDate.getTime()) ? STABLE_DATE : guideDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    });
  }

  // Deduplicate entries by URL while preserving ordering
  const seenUrls = new Set<string>();
  const deduplicatedEntries: SitemapEntry[] = [];
  for (const entry of entries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      deduplicatedEntries.push(entry);
    }
  }

  return deduplicatedEntries;
}
