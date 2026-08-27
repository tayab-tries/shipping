export interface SeoValidationResult {
  isReady: boolean;
  errors: string[];
  warnings: string[];
}

export interface EntitySeoFields {
  h1: string;
  seo_title: string;
  seo_description: string;
  introduction: string;
  slug: string;
  is_verified: boolean;
}

/**
 * Pre-publish SEO & completeness validator.
 * Checks titles, descriptions, headings, slug syntax, and verification status.
 */
export function validateSeoCompleteness(entity: EntitySeoFields): SeoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!entity.h1 || entity.h1.trim().length === 0) {
    errors.push('H1 heading is required.');
  }

  if (!entity.seo_title || entity.seo_title.length < 20 || entity.seo_title.length > 70) {
    errors.push('SEO Title should be between 20 and 70 characters.');
  }

  if (!entity.seo_description || entity.seo_description.length < 50 || entity.seo_description.length > 170) {
    errors.push('Meta Description should be between 50 and 170 characters.');
  }

  if (!entity.introduction || entity.introduction.trim().length < 30) {
    errors.push('Introduction copy must be at least 30 characters long.');
  }

  if (!entity.slug || !/^[a-z0-9-]+$/.test(entity.slug)) {
    errors.push('Slug must be non-empty, lowercase, and contain only hyphens and alphanumeric characters.');
  }

  if (!entity.is_verified) {
    errors.push('Business verification flag (is_verified) must be set to true prior to publishing.');
  }

  return {
    isReady: errors.length === 0,
    errors,
    warnings,
  };
}
