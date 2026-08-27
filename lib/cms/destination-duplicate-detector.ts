export interface SimilarityAssessment {
  status: 'clear' | 'warning' | 'blocked';
  similarityScore: number;
  message?: string;
}

/**
 * Evaluates Country-level content uniqueness across substantive copy.
 */
export function evaluateCountryUniqueness(
  draft: { introduction: string; shipping_overview?: string; customs_guidance?: string },
  existing: Array<{ introduction: string; shipping_overview?: string; customs_guidance?: string }>
): SimilarityAssessment {
  return calculateEntityUniqueness(
    [draft.introduction, draft.shipping_overview || '', draft.customs_guidance || ''],
    existing.map((e) => [e.introduction, e.shipping_overview || '', e.customs_guidance || ''])
  );
}

/**
 * Evaluates Destination City-level content uniqueness across substantive copy.
 */
export function evaluateDestinationCityUniqueness(
  draft: { introduction: string; overview?: string; preparation_considerations?: string; delivery_coverage_notes?: string },
  existing: Array<{ introduction: string; overview?: string; preparation_considerations?: string; delivery_coverage_notes?: string }>
): SimilarityAssessment {
  return calculateEntityUniqueness(
    [draft.introduction, draft.overview || '', draft.preparation_considerations || '', draft.delivery_coverage_notes || ''],
    existing.map((e) => [e.introduction, e.overview || '', e.preparation_considerations || '', e.delivery_coverage_notes || ''])
  );
}

function calculateEntityUniqueness(draftBlocks: string[], existingEntitiesBlocks: string[][]): SimilarityAssessment {
  if (existingEntitiesBlocks.length === 0) return { status: 'clear', similarityScore: 0 };
  const stopWords = new Set(['cargo', 'shipping', 'pakistan', 'international', 'freight', 'service', 'to', 'from', 'for', 'and', 'the', 'in', 'of', 'city']);
  
  let maxScore = 0;
  const draftText = draftBlocks.join(' ');
  const draftSet = new Set(draftText.toLowerCase().split(/\s+/).filter((w) => w && !stopWords.has(w)));

  for (const existingBlocks of existingEntitiesBlocks) {
    const existingText = existingBlocks.join(' ');
    const existingSet = new Set(existingText.toLowerCase().split(/\s+/).filter((w) => w && !stopWords.has(w)));
    if (draftSet.size === 0 || existingSet.size === 0) continue;
    const intersection = new Set([...draftSet].filter((x) => existingSet.has(x)));
    const union = new Set([...draftSet, ...existingSet]);
    const score = intersection.size / union.size;
    if (score > maxScore) maxScore = score;
  }

  if (maxScore > 0.85) {
    return {
      status: 'blocked',
      similarityScore: maxScore,
      message: `Substantive content is ${(maxScore * 100).toFixed(1)}% similar to an existing destination entity. Revisions required.`,
    };
  }

  if (maxScore >= 0.60) {
    return {
      status: 'warning',
      similarityScore: maxScore,
      message: `Editorial Warning: Substantive content is ${(maxScore * 100).toFixed(1)}% similar. Review recommended.`,
    };
  }

  return { status: 'clear', similarityScore: maxScore };
}
