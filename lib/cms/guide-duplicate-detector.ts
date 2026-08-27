export interface GuideIntentCheckResult {
  status: 'clear' | 'warning' | 'blocked';
  similarityScore: number;
  message?: string;
}

export interface GuideDraftIntent {
  title: string;
  slug: string;
  search_intent: string;
  primary_topic?: string;
  target_entity_slug?: string;
}

/**
 * Deterministic editorial cannibalization detector.
 * Same topic + same intent + same target entity = Hard Cannibalization Block.
 */
export function evaluateGuideIntentOverlap(
  draft: GuideDraftIntent,
  existingGuides: GuideDraftIntent[]
): GuideIntentCheckResult {
  for (const guide of existingGuides) {
    if (guide.slug === draft.slug) continue;

    const sameTopic =
      draft.primary_topic &&
      guide.primary_topic &&
      draft.primary_topic.toLowerCase() === guide.primary_topic.toLowerCase();
    const sameIntent = draft.search_intent === guide.search_intent;
    const sameEntity = (draft.target_entity_slug || '') === (guide.target_entity_slug || '');

    if (sameTopic && sameIntent && sameEntity) {
      return {
        status: 'blocked',
        similarityScore: 1.0,
        message: `Cannibalization Block: Guide overlaps with existing article "${guide.title}" on topic "${draft.primary_topic}" and intent "${draft.search_intent}".`,
      };
    }
  }

  return { status: 'clear', similarityScore: 0 };
}
