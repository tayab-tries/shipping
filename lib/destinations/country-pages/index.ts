import { CountryLanding } from '@/lib/routes/shared';
import { CANADA_COUNTRY_PAGE } from './canada-content';
import { KSA_COUNTRY_PAGE } from './ksa-content';
import { UAE_COUNTRY_PAGE } from './uae-content';
import { UK_COUNTRY_PAGE } from './uk-content';
import { USA_COUNTRY_PAGE } from './usa-content';

/** Code-defined country pages, keyed by destination slug; these replace the Sanity destination document. */
export const COUNTRY_LANDINGS: Record<string, CountryLanding> = {
  uk: UK_COUNTRY_PAGE,
  uae: UAE_COUNTRY_PAGE,
  ksa: KSA_COUNTRY_PAGE,
  usa: USA_COUNTRY_PAGE,
  canada: CANADA_COUNTRY_PAGE,
};

/** Last content change to the country pages, for the sitemap. */
export const COUNTRY_PAGES_UPDATED = new Date('2026-10-25');
