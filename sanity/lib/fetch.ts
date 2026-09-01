import { draftMode } from 'next/headers';
import { client } from './client';
import { isSanityConfigured, readToken } from '../env';
import { HOMEPAGE_HERO_QUERY, SITE_SETTINGS_QUERY } from './queries';
import { urlForImage } from './image';

export interface SanityHeroData {
  eyebrow?: string;
  headline?: string;
  highlightedHeadline?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
}

export async function getSanityHomepageHero(): Promise<SanityHeroData | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const draft = await draftMode();
    const isDraft = draft.isEnabled;

    const fetchClient =
      isDraft && readToken
        ? client.withConfig({ token: readToken, useCdn: false, perspective: 'previewDrafts' })
        : client;

    const data = await fetchClient.fetch(HOMEPAGE_HERO_QUERY, {}, { stega: false });

    if (!data) return null;

    let backgroundImageUrl: string | undefined = undefined;
    if (data.backgroundImage) {
      const url = urlForImage(data.backgroundImage)?.url();
      if (url) backgroundImageUrl = url;
    }

    return {
      eyebrow: data.eyebrow,
      headline: data.headline,
      highlightedHeadline: data.highlightedHeadline,
      description: data.description,
      primaryCtaLabel: data.primaryCtaLabel,
      primaryCtaHref: data.primaryCtaHref,
      secondaryCtaLabel: data.secondaryCtaLabel,
      secondaryCtaHref: data.secondaryCtaHref,
      backgroundImageUrl,
      backgroundImageAlt: data.backgroundImageAlt,
    };
  } catch (err: unknown) {
    console.warn('getSanityHomepageHero safe notice (using fallback content):', err);
    return null;
  }
}

export async function getSanitySiteSettings() {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const draft = await draftMode();
    const isDraft = draft.isEnabled;

    const fetchClient =
      isDraft && readToken
        ? client.withConfig({ token: readToken, useCdn: false, perspective: 'previewDrafts' })
        : client;

    return await fetchClient.fetch(SITE_SETTINGS_QUERY, {}, { stega: false });
  } catch (err: unknown) {
    console.warn('getSanitySiteSettings safe notice (using fallback content):', err);
    return null;
  }
}
