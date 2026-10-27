import { FAISALABAD_LANDING } from './faisalabad-content';
import { ISLAMABAD_LANDING } from './islamabad-content';
import { KARACHI_LANDING } from './karachi-content';
import { LAHORE_LANDING } from './lahore-content';
import { MULTAN_LANDING } from './multan-content';
import { PESHAWAR_LANDING } from './peshawar-content';
import { RAWALPINDI_LANDING } from './rawalpindi-content';
import { SIALKOT_LANDING } from './sialkot-content';
import { CityLanding, LandingPage } from './shared';

/** Code-defined city pages, keyed by location short slug; these replace the Sanity location document. */
export const CITY_LANDINGS: Record<string, CityLanding> = {
  lahore: LAHORE_LANDING,
  islamabad: ISLAMABAD_LANDING,
  rawalpindi: RAWALPINDI_LANDING,
  karachi: KARACHI_LANDING,
  faisalabad: FAISALABAD_LANDING,
  multan: MULTAN_LANDING,
  peshawar: PESHAWAR_LANDING,
  sialkot: SIALKOT_LANDING,
};

/** Last content change to the code-defined city pages, for the sitemap. */
export const CITY_PAGES_UPDATED = new Date('2026-10-25');

/** Every city → country route page, keyed by route slug (`lahore-to-uk`, `islamabad-to-dubai`). */
export const ROUTE_PAGES: Record<string, LandingPage> = Object.assign(
  {},
  ...Object.values(CITY_LANDINGS).map((landing) => landing.routes)
);

/** Route pages serving a destination country slug (`uk`, `uae`, ...), one per origin city that has one. */
export function getRoutesForCountry(countrySlug: string): LandingPage[] {
  return Object.values(ROUTE_PAGES).filter((page) => page.countrySlug === countrySlug);
}
