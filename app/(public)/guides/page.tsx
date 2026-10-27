import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getBreadcrumbJsonLd, getItemListJsonLd } from '@/lib/seo/jsonld.service';
import { applyTitleTemplate } from '@/lib/seo/seo-text';
import { getOgImages } from '@/lib/seo/metadata.service';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { GuidesBrowser, GuidesBrowserView, GuideListItem } from '@/components/guides/GuidesBrowser';
import { getPublishedStaticArticles, GuideArticleData } from '@/lib/guides/guide-content';
import { IMAGE_SLOTS } from '@/lib/constants/images';
import { getSanityGuidesList, SanityGuideDocument } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: applyTitleTemplate('Customs & Shipping Guides'),
  description:
    'Educational resources, export compliance advice, packing guidelines, and shipping mode comparisons for cargo originating in Pakistan.',
  alternates: {
    canonical: 'https://raahiinternational.com/guides',
  },
  openGraph: {
    images: getOgImages(),
    title: applyTitleTemplate('Customs & Shipping Guides'),
    description:
      'Educational resources, export compliance advice, packing guidelines, and shipping mode comparisons for cargo originating in Pakistan.',
    url: 'https://raahiinternational.com/guides',
    siteName: 'Raahi International',
    type: 'website',
  },
};

// ?category= is read client-side (GuidesBrowser) so this hub stays prerendered and cached
export default async function GuidesHubPage() {
  const [sanityGuides, fallbackGuides] = await Promise.all([
    getSanityGuidesList(),
    getPublishedStaticArticles(),
  ]);

  const allArticles: GuideArticleData[] =
    sanityGuides.length > 0
      ? sanityGuides.map((doc: SanityGuideDocument) => {
          const fallback = fallbackGuides.find((f) => f.slug === doc.slug);
          return {
            id: doc._id || doc.slug,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt || fallback?.excerpt || '',
            contentMarkdown: doc.contentMarkdown || fallback?.contentMarkdown || '',
            category: doc.category || fallback?.category || 'shipping-guides',
            authorName: doc.authorName || fallback?.authorName || 'Logistics Editorial Team',
            publishedAt: doc.publishedAt || fallback?.publishedAt || '2026-08-01',
            updatedAt: doc.updatedAt || fallback?.updatedAt,
            readingTimeMinutes: doc.readingTimeMinutes || fallback?.readingTimeMinutes || 5,
            seoTitle: doc.seo?.metaTitle || fallback?.seoTitle || doc.title,
            seoDescription: doc.seo?.metaDescription || fallback?.seoDescription || doc.excerpt,
            searchIntent: fallback?.searchIntent || 'informational',
            primaryTopic: fallback?.primaryTopic || doc.title,
            containsRegulatoryClaims: doc.containsRegulatoryClaims ?? fallback?.containsRegulatoryClaims ?? false,
            verificationNotes: doc.verificationNotes || fallback?.verificationNotes,
            supportedServices: doc.supportedServices || fallback?.supportedServices || [],
            supportedOrigins: doc.supportedOrigins || fallback?.supportedOrigins || [],
            supportedDestinations: doc.supportedDestinations || fallback?.supportedDestinations || [],
            status: 'published',
            isVerified: true,
            isIndexable: true,
            isFeatured: doc.isFeatured ?? fallback?.isFeatured ?? false,
            faqs: doc.faqs || fallback?.faqs || [],
          };
        })
      : fallbackGuides;

  const featuredArticle = allArticles.find((a) => a.isFeatured) || allArticles[0];
  const articleList: GuideListItem[] = allArticles.map(({ slug, title, excerpt, category, readingTimeMinutes }) => ({
    slug,
    title,
    excerpt,
    category,
    readingTimeMinutes,
  }));

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

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);
  const itemListJsonLd = getItemListJsonLd(
    'Customs & Shipping Guides',
    allArticles.map((a) => ({ name: a.title, url: `/guides/${a.slug}` }))
  );

  const featuredSection = featuredArticle && (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border">
      <Container>
        <SectionHeading
          badge="Featured Logistics Guide"
          title="Primary Editorial Guide"
          className="mb-10"
        />

        <div className="bg-surface-subtle rounded-md border border-border overflow-hidden p-8 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Featured Visual Image Slot */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-md overflow-hidden bg-surface border border-border">
            <Image
              src={IMAGE_SLOTS.guideCover.src}
              alt={featuredArticle.title}
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover object-center"
            />
          </div>

          {/* Featured Copy & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <Badge variant="navy">{featuredArticle.category.replace('-', ' ')}</Badge>
              <span>{featuredArticle.readingTimeMinutes} min read</span>
            </div>

            <h2 className="text-display-sm font-bold text-brand-black leading-tight hover:text-accent transition-colors">
              <Link href={`/guides/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
            </h2>

            <p className="text-body-md text-slate-700 leading-relaxed font-normal">
              {featuredArticle.excerpt}
            </p>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {featuredArticle.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {featuredArticle.authorName}
                </span>
              </div>

              <Link href={`/guides/${featuredArticle.slug}`}>
                <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}>
                  Read Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );

  return (
    <div className="w-full bg-background text-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {/* 01 HERO (Light / Editorial Header) */}
      <section className="w-full bg-surface py-12 lg:py-16 border-b border-border">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Export Compliance & Shipping Education</span>
            </div>

            <h1 className="text-display-xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight leading-[1.08]">
              Customs & Shipping Guides
            </h1>

            <p className="text-body-lg text-slate-700 leading-relaxed font-normal">
              Educational resources, export compliance advice, packing guidelines, and shipping mode comparisons for cargo originating in Pakistan.
            </p>
          </div>
        </Container>
      </section>

      <Suspense
        fallback={
          <GuidesBrowserView
            activeCategory=""
            categories={categories}
            articles={articleList}
            featuredSlug={featuredArticle?.slug}
            featured={featuredSection}
          />
        }
      >
        <GuidesBrowser
          categories={categories}
          articles={articleList}
          featuredSlug={featuredArticle?.slug}
          featured={featuredSection}
        />
      </Suspense>

      {/* 05 FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
}
