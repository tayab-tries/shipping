export interface GuideQualityResult {
  isReady: boolean;
  errors: string[];
  warnings: string[];
}

export interface GuideArticleCompletenessFields {
  h1: string;
  seo_title: string;
  seo_description: string;
  content_markdown: string;
  is_verified: boolean;
  contains_regulatory_claims: boolean;
  verification_notes?: string;
}

/**
 * Pre-publish quality & completeness validator for guide articles.
 */
export function validateGuideCompleteness(
  article: GuideArticleCompletenessFields
): GuideQualityResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!article.h1 || article.h1.trim().length === 0) {
    errors.push('H1 heading is required.');
  }

  if (!article.seo_title || article.seo_title.length < 20 || article.seo_title.length > 70) {
    errors.push('SEO Title must be between 20 and 70 characters.');
  }

  if (!article.seo_description || article.seo_description.length < 50 || article.seo_description.length > 170) {
    errors.push('Meta Description must be between 50 and 170 characters.');
  }

  if (!article.content_markdown || article.content_markdown.length < 200) {
    errors.push('Substantive markdown content (at least 200 characters) is required.');
  }

  if (
    article.contains_regulatory_claims &&
    (!article.verification_notes || article.verification_notes.trim().length === 0)
  ) {
    errors.push('Verification notes are required when "contains_regulatory_claims" is set to true.');
  }

  if (!article.is_verified) {
    errors.push('Business verification flag (is_verified) must be set to true prior to publishing.');
  }

  return {
    isReady: errors.length === 0,
    errors,
    warnings,
  };
}
