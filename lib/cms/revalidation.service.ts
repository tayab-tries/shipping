import { revalidatePath } from 'next/cache';

/**
 * Server-Only CMS Revalidation Service
 * Handles On-Demand ISR Cache Invalidation for Next.js & OpenNext Cloudflare.
 */

export interface RevalidationResult {
  revalidatedPaths: string[];
}

export async function revalidateHomepage(): Promise<RevalidationResult> {
  const paths = ['/'];
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

export async function revalidateBusiness(): Promise<RevalidationResult> {
  // Revalidates layout root so header/footer business contact info updates across all public pages
  revalidatePath('/', 'layout');
  const paths = [
    '/',
    '/services',
    '/locations',
    '/destinations',
    '/guides',
    '/quote',
    '/track',
  ];
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: ['/', 'layout', ...paths] };
}

export async function revalidateNavigation(): Promise<RevalidationResult> {
  revalidatePath('/', 'layout');
  return { revalidatedPaths: ['/', 'layout'] };
}

export async function revalidateService(slug?: string): Promise<RevalidationResult> {
  const paths = ['/', '/services'];
  if (slug) {
    paths.push(`/services/${slug}`);
    revalidatePath(`/services/${slug}`, 'page');
  }
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

export async function revalidateLocation(slug?: string): Promise<RevalidationResult> {
  const paths = ['/', '/locations'];
  if (slug) {
    paths.push(`/locations/${slug}`);
    revalidatePath(`/locations/${slug}`, 'page');
  }
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

export async function revalidateDestinationCountry(countrySlug: string): Promise<RevalidationResult> {
  const paths = ['/', '/destinations', `/destinations/${countrySlug}`];
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

export async function revalidateDestinationCity(countrySlug: string, citySlug: string): Promise<RevalidationResult> {
  const paths = [
    '/',
    '/destinations',
    `/destinations/${countrySlug}`,
    `/destinations/${countrySlug}/${citySlug}`,
  ];
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

export async function revalidateArticle(slug?: string): Promise<RevalidationResult> {
  const paths = ['/', '/guides'];
  if (slug) {
    paths.push(`/guides/${slug}`);
    revalidatePath(`/guides/${slug}`, 'page');
  }
  paths.forEach((p) => revalidatePath(p));
  return { revalidatedPaths: paths };
}

/**
 * Maps a CMS entity type and metadata to the exact target public routes that require ISR revalidation.
 */
export async function revalidateCmsEntity(
  entityType: 'homepage' | 'navigation' | 'page' | 'article' | 'location' | 'destination' | 'credential' | 'business',
  entityId: string,
  snapshotData?: Record<string, unknown>
): Promise<RevalidationResult> {
  const slug = (snapshotData?.slug as string) || undefined;
  const countrySlug = (snapshotData?.country_slug as string) || (snapshotData?.countrySlug as string) || undefined;

  switch (entityType) {
    case 'homepage':
      return await revalidateHomepage();
    case 'business':
      return await revalidateBusiness();
    case 'navigation':
      return await revalidateNavigation();
    case 'article':
      return await revalidateArticle(slug);
    case 'location':
      return await revalidateLocation(slug);
    case 'destination':
      if (countrySlug && slug) {
        return await revalidateDestinationCity(countrySlug, slug);
      } else if (slug) {
        return await revalidateDestinationCountry(slug);
      }
      return await revalidateDestinationCountry('');
    case 'credential':
    case 'page':
      return await revalidateBusiness();
    default:
      return await revalidateHomepage();
  }
}
