import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedStaticArticles,
  getStaticArticleBySlug,
} from '@/lib/guides/guide-content';
import { siteConfig } from '@/config/site.config';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { GuideHero } from '@/components/guides/GuideHero';
import { ArticleSummaryCallout } from '@/components/guides/ArticleSummaryCallout';
import { ArticleBody } from '@/components/guides/ArticleBody';
import { ArticleConsiderations } from '@/components/guides/ArticleConsiderations';
import { RelatedServicesBar } from '@/components/guides/RelatedServicesBar';
import { RelatedDestinationsBar } from '@/components/guides/RelatedDestinationsBar';
import { RelatedLocationsBar } from '@/components/guides/RelatedLocationsBar';
import { RelatedGuidesGrid } from '@/components/guides/RelatedGuidesGrid';
import { ArticleFaq } from '@/components/guides/ArticleFaq';
import { ArticleCta } from '@/components/guides/ArticleCta';

interface GuideArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const publishedArticles = getPublishedStaticArticles();
  return publishedArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getStaticArticleBySlug(slug);

  if (!article) {
    return {
      title: `Article Not Found | ${siteConfig.name}`,
    };
  }

  const canonicalUrl = `${siteConfig.domain}/guides/${article.slug}`;

  return {
    title: `${article.seoTitle} | ${siteConfig.name}`,
    description: article.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.seoTitle} | ${siteConfig.name}`,
      description: article.seoDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.authorName],
    },
  };
}

export default async function GuideArticleDetailPage({ params }: GuideArticlePageProps) {
  const { slug } = await params;
  const article = getStaticArticleBySlug(slug);

  // Authoritative Publication & Verification Check
  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Guides', url: '/guides' },
    { label: article.title, url: `/guides/${article.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription,
    author: {
      '@type': 'Organization',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: `${siteConfig.domain}/guides/${article.slug}`,
  };

  return (
    <article className="w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. Guide Hero Block */}
      <GuideHero
        title={article.title}
        category={article.category}
        authorName={article.authorName}
        publishedAt={article.publishedAt}
        readingTimeMinutes={article.readingTimeMinutes}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Executive Summary Takeaways Box */}
      <ArticleSummaryCallout excerpt={article.excerpt} />

      {/* 3. Sanitized Markdown Body */}
      <ArticleBody contentMarkdown={article.contentMarkdown} />

      {/* 4. Compliance Verification Considerations */}
      <ArticleConsiderations
        containsRegulatoryClaims={article.containsRegulatoryClaims}
        verificationNotes={article.verificationNotes}
      />

      {/* 5. Publication-Aware Related Services Bar */}
      <RelatedServicesBar supportedServices={article.supportedServices} />

      {/* 6. Publication-Aware Related Destinations Bar */}
      <RelatedDestinationsBar supportedDestinations={article.supportedDestinations} />

      {/* 7. Publication-Aware Related Pakistan Locations Bar */}
      <RelatedLocationsBar supportedOrigins={article.supportedOrigins} />

      {/* 8. Contextual Related Educational Guides */}
      <RelatedGuidesGrid currentSlug={article.slug} />

      {/* 9. Article FAQ Accordion */}
      <ArticleFaq faqs={article.faqs} />

      {/* 10. High-Impact Quote CTA */}
      <ArticleCta />
    </article>
  );
}
