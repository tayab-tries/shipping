import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `International Shipping Guides & Cargo Knowledge Hub | ${siteConfig.name}`,
  description:
    'Educational guides, packing advice, customs documentation requirements, and shipping mode comparisons for international cargo originating in Pakistan.',
  alternates: {
    canonical: `${siteConfig.domain}/guides`,
  },
};

interface GuidesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GuidesHubPage({ searchParams }: GuidesPageProps) {
  const { category: activeCategory } = await searchParams;
  const allArticles = getPublishedStaticArticles();

  const filteredArticles = activeCategory
    ? allArticles.filter((a) => a.category === activeCategory)
    : allArticles;

  const featuredArticle = allArticles.find((a) => a.isFeatured) || allArticles[0];

  const categories = [
    { label: 'All Guides', slug: '' },
    { label: 'Shipping Guides', slug: 'shipping-guides' },
    { label: 'Cargo Rates', slug: 'cargo-rates' },
    { label: 'Customs & Docs', slug: 'customs-documentation' },
    { label: 'Packing Guides', slug: 'packing-guides' },
    { label: 'Destinations', slug: 'destinations-guide' },
    { label: 'Cargo Types', slug: 'cargo-types' },
  ];

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Guides', url: '/guides' },
  ];

  return (
    <div className="w-full bg-background py-12 lg:py-16">
      <Container>
        {/* Header & Breadcrumbs */}
        <div className="space-y-6 max-w-4xl mb-12">
          <Breadcrumbs items={breadcrumbs} />
          <SectionHeading
            badge="Knowledge Engine"
            title="International Shipping & Logistics Guides"
            subtitle="Authoritative educational resources, export compliance advice, and packing guides for shippers in Pakistan."
          />
        </div>

        {/* Server-Rendered Category Navigation Toolbar */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {categories.map((cat) => {
            const isActive = (activeCategory || '') === cat.slug;
            const href = cat.slug ? `/guides?category=${cat.slug}` : '/guides';
            return (
              <Link key={cat.slug} href={href}>
                <Badge
                  variant={isActive ? 'accent' : 'outline'}
                  size="md"
                  className="cursor-pointer hover:border-primary transition-colors"
                >
                  {cat.label}
                </Badge>
              </Link>
            );
          })}
        </div>

        {/* Featured Article Hero (When no specific category filter is active) */}
        {!activeCategory && featuredArticle && (
          <div className="bg-surface p-8 lg:p-10 rounded-md border border-border space-y-6 mb-16 shadow-xs">
            <div className="flex items-center gap-3">
              <Badge variant="accent">Featured Guide</Badge>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {featuredArticle.category.replace('-', ' ')}
              </span>
            </div>

            <h2 className="text-display-md font-bold text-foreground max-w-3xl">
              {featuredArticle.title}
            </h2>

            <p className="text-body-md text-muted-foreground leading-relaxed max-w-3xl">
              {featuredArticle.excerpt}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle">
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  {featuredArticle.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  {featuredArticle.readingTimeMinutes} min read
                </span>
              </div>

              <Link href={`/guides/${featuredArticle.slug}`}>
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Read Full Guide
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              className="bg-surface p-6 rounded-md border border-border flex flex-col justify-between space-y-6 shadow-2xs hover:border-border-strong transition-colors min-w-0"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{art.category.replace('-', ' ')}</Badge>
                  <BookOpen className="w-4 h-4 text-secondary" />
                </div>
                <h3 className="text-heading-sm font-bold text-foreground leading-snug">
                  {art.title}
                </h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {art.readingTimeMinutes} min read
                </span>
                <TextLink href={`/guides/${art.slug}`} showIcon className="text-xs font-semibold">
                  Read Article
                </TextLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
