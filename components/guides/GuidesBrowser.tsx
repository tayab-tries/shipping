'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { GuideArticleData } from '@/lib/guides/guide-content';

export type GuideListItem = Pick<GuideArticleData, 'slug' | 'title' | 'excerpt' | 'category' | 'readingTimeMinutes'>;

interface GuidesBrowserViewProps {
  activeCategory: string;
  categories: { label: string; slug: string }[];
  articles: GuideListItem[];
  featuredSlug?: string;
  featured: React.ReactNode;
}

/**
 * Category tabs, featured guide and directory for /guides.
 * Filtering by ?category= happens client-side so the hub itself stays prerendered and cached.
 */
export function GuidesBrowserView({
  activeCategory,
  categories,
  articles,
  featuredSlug,
  featured,
}: GuidesBrowserViewProps) {
  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;
  const supportingArticles = filteredArticles.filter((a) => a.slug !== featuredSlug);

  return (
    <>
      {/* 02 CATEGORY NAVIGATION (Tabs with Horizontal Scroll) */}
      <section className="w-full bg-surface-subtle border-b border-border sticky top-16 z-30 shadow-2xs">
        <Container>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3 text-xs font-mono">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const href = cat.slug ? `/guides?category=${cat.slug}` : '/guides';
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className={`shrink-0 pb-1.5 border-b-2 font-semibold transition-colors ${
                    isActive
                      ? 'border-accent text-brand-black font-bold'
                      : 'border-transparent text-slate-600 hover:text-brand-black'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 03 FEATURED GUIDE */}
      {!activeCategory && featured}

      {/* 04 GUIDE DIRECTORY (Clean Editorial List with Row Dividers) */}
      <section className="w-full bg-background py-16 lg:py-24 border-b border-border">
        <Container>
          <SectionHeading
            badge="Articles Directory"
            title={activeCategory ? `Guides in "${activeCategory.replace('-', ' ')}"` : 'All Published Logistics Guides'}
            subtitle="Verified educational resources, compliance advice, and packing checklists."
            className="mb-12"
          />

          {supportingArticles.length === 0 ? (
            <div className="p-8 bg-surface border border-border rounded text-center text-slate-600">
              No additional guides found in this category.
            </div>
          ) : (
            <div className="bg-surface rounded-md border border-border divide-y divide-border shadow-xs overflow-hidden">
              {supportingArticles.map((art) => (
                <div
                  key={art.slug}
                  className="p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-subtle/80 transition-colors group"
                >
                  <div className="space-y-2 md:w-2/3">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                      <span className="uppercase font-semibold text-slate-700">{art.category.replace('-', ' ')}</span>
                      <span>•</span>
                      <span>{art.readingTimeMinutes} min read</span>
                    </div>

                    <h3 className="text-heading-md font-bold text-brand-black group-hover:text-accent transition-colors">
                      <Link href={`/guides/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-body-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 md:justify-end md:w-1/3">
                    <Link
                      href={`/guides/${art.slug}`}
                      className="text-xs font-mono font-semibold text-brand-black hover:text-accent flex items-center gap-1 transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

/** Reads ?category= in the browser; render inside <Suspense> with an unfiltered GuidesBrowserView fallback. */
export function GuidesBrowser(props: Omit<GuidesBrowserViewProps, 'activeCategory'>) {
  const activeCategory = useSearchParams().get('category') || '';
  return <GuidesBrowserView activeCategory={activeCategory} {...props} />;
}
