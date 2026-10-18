/**
 * Location identifier helpers.
 *
 * Internally every location is keyed by its short slug (`lahore`, `karachi`, ...),
 * which is also what Sanity stores and what `/quote?origin=` expects.
 * Public URLs use the long SEO path segment (`international-cargo-services-in-lahore`).
 */

export const LOCATION_PATH_PREFIX = 'international-cargo-services-in-';

export const DEFAULT_LOCATION_DESTINATIONS = ['uk', 'uae', 'usa', 'canada', 'ksa'];

/** Normalizes any location identifier (short slug, long slug, or name) to its short key. */
export function toLocationKey(value: unknown): string {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith(LOCATION_PATH_PREFIX)
    ? normalized.slice(LOCATION_PATH_PREFIX.length)
    : normalized;
}

/** Canonical URL path segment for a location (`international-cargo-services-in-<key>`). */
export function toLocationPathSlug(value: unknown): string {
  const key = toLocationKey(value);
  return key ? `${LOCATION_PATH_PREFIX}${key}` : '';
}

/** Canonical internal href for a location page. */
export function getLocationHref(value: unknown): string {
  const pathSlug = toLocationPathSlug(value);
  return pathSlug ? `/locations/${pathSlug}` : '/locations';
}

/** Drops null/broken entries (e.g. dangling Sanity references) and normalizes the rest to short keys. */
export function toLocationKeys(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.map(toLocationKey).filter(Boolean);
}

/** First non-empty destination list (null/broken entries dropped), else the default regional corridors. */
export function resolveSupportedDestinations(...candidates: Array<unknown>): string[] {
  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    const cleaned = candidate
      .filter((d): d is string => typeof d === 'string' && d.trim().length > 0)
      .map((d) => d.trim().toLowerCase());
    if (cleaned.length > 0) return cleaned;
  }
  return [...DEFAULT_LOCATION_DESTINATIONS];
}
