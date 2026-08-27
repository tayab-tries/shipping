import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';

export interface RelatedGuidesGridProps {
  currentSlug: string;
}

export const RelatedGuidesGrid: React.FC<RelatedGuidesGridProps> = ({ currentSlug }) => {
  const publishedArticles = getPublishedStaticArticles().filter((a) => a.slug !== currentSlug);

  if (publishedArticles.length === 0) return null;

  return (
    <section className="w-full bg-surface-subtle border-b border-border py-12 lg:py-16">
      <Container>
        <SectionHeading
          badge="More Guides"
          title="Related Educational Articles"
          subtitle="Explore further international shipping guides and packing advice."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {publishedArticles.map((art) => (
            <div
              key={art.slug}
              className="bg-surface p-6 rounded-md border border-border space-y-3 hover:border-border-strong transition-colors min-w-0"
            >
              <span className="text-[11px] font-mono font-semibold text-secondary uppercase">
                {art.category.replace('-', ' ')}
              </span>
              <h3 className="text-heading-sm font-bold text-foreground">{art.title}</h3>
              <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-2">
                {art.excerpt}
              </p>
              <TextLink href={`/guides/${art.slug}`} showIcon className="text-xs font-semibold">
                Read Article
              </TextLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
