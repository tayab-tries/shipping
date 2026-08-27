import { validateSeoCompleteness, SeoValidationResult } from './seo-checker';

export interface LocationPublishFields {
  h1: string;
  seo_title: string;
  seo_description: string;
  introduction: string;
  slug: string;
  is_verified: boolean;
  has_physical_branch: boolean;
  branch_address?: string;
}

export interface DestinationCityPublishFields {
  h1: string;
  seo_title: string;
  seo_description: string;
  introduction: string;
  slug: string;
  is_verified: boolean;
  parentCountryPublished: boolean;
  parentCountryVerified: boolean;
}

/**
 * Pre-publish validation for Pakistan Origin Locations.
 */
export function validateLocationForPublishing(location: LocationPublishFields): SeoValidationResult {
  const seoResult = validateSeoCompleteness(location);

  if (location.has_physical_branch && (!location.branch_address || location.branch_address.trim().length === 0)) {
    seoResult.errors.push('Physical branch address is required when "has_physical_branch" is checked.');
    seoResult.isReady = false;
  }

  return seoResult;
}

/**
 * Pre-publish validation for Sub-Destination Cities (e.g. London under UK).
 * Destination City publishes ONLY when parent country is published & verified!
 */
export function validateDestinationCityForPublishing(city: DestinationCityPublishFields): SeoValidationResult {
  const seoResult = validateSeoCompleteness(city);

  if (!city.parentCountryPublished || !city.parentCountryVerified) {
    seoResult.errors.push('Destination City cannot be published unless parent country is published and verified.');
    seoResult.isReady = false;
  }

  return seoResult;
}
