export interface SimilarityAssessment {
  status: 'clear' | 'warning' | 'blocked';
  similarityScore: number;
  message?: string;
}

export interface LocationTextFields {
  h1: string;
  introduction: string;
  local_coverage_text?: string;
}

/**
 * Multi-field Jaccard text similarity calculation.
 */
function calculateJaccard(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  const setA = new Set(textA.toLowerCase().split(/\s+/).filter(Boolean));
  const setB = new Set(textB.toLowerCase().split(/\s+/).filter(Boolean));
  if (setA.size === 0 || setB.size === 0) return 0;
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

/**
 * Evaluates text uniqueness across draft location copy vs existing location pages.
 * Tiered thresholds: <60% clear, 60-85% warning, >85% blocked.
 */
export function evaluateLocationUniqueness(
  draftEntity: LocationTextFields,
  existingEntities: LocationTextFields[]
): SimilarityAssessment {
  if (existingEntities.length === 0) return { status: 'clear', similarityScore: 0 };

  let maxScore = 0;
  for (const existing of existingEntities) {
    const introSim = calculateJaccard(draftEntity.introduction, existing.introduction);
    const covSim = calculateJaccard(draftEntity.local_coverage_text || '', existing.local_coverage_text || '');
    const combinedScore = introSim * 0.6 + covSim * 0.4;
    if (combinedScore > maxScore) maxScore = combinedScore;
  }

  if (maxScore > 0.85) {
    return {
      status: 'blocked',
      similarityScore: maxScore,
      message: `Content is ${(maxScore * 100).toFixed(1)}% similar to an existing location page. Revisions required.`,
    };
  }

  if (maxScore >= 0.6) {
    return {
      status: 'warning',
      similarityScore: maxScore,
      message: `Editorial Warning: Content is ${(maxScore * 100).toFixed(1)}% similar. Review recommended.`,
    };
  }

  return { status: 'clear', similarityScore: maxScore };
}
