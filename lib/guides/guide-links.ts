import { getSanityGuidesList } from '@/sanity/lib/fetch';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';

export interface GuideLink {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: string;
  readingTimeMinutes?: number;
}

/** Published guides from Sanity (the source of truth), falling back to code-defined articles. */
export async function getGuideLinks(): Promise<GuideLink[]> {
  const sanityGuides = await getSanityGuidesList();
  const source = sanityGuides.length > 0 ? sanityGuides : getPublishedStaticArticles();
  return source
    .filter((guide) => guide.slug && guide.title)
    .map((guide) => ({
      slug: guide.slug,
      href: `/guides/${guide.slug}`,
      title: guide.title,
      excerpt: guide.excerpt || '',
      category: guide.category || 'shipping-guides',
      readingTimeMinutes: guide.readingTimeMinutes,
    }));
}
