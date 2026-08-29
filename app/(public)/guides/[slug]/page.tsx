import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
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

  // Authoritative Publication Check
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

  // Schema.org FAQPage JSON-LD if FAQs exist
  const faqJsonLd =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="w-full bg-background text-brand-black">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 01 Guide Hero Block (Light) */}
      <GuideHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        authorName={article.authorName}
        publishedAt={article.publishedAt}
        readingTimeMinutes={article.readingTimeMinutes}
        containsRegulatoryClaims={article.containsRegulatoryClaims}
        breadcrumbs={breadcrumbs}
      />

      {/* 02 Article Main Reading Container (Max ~65–72ch) */}
      <section className="w-full py-12 lg:py-16 bg-background border-b border-border">
        <Container size="narrow">
          {/* Executive Summary Callout */}
          <ArticleSummaryCallout summaryText={article.excerpt} />

          {/* Sanitized Markdown Body */}
          <ArticleBody contentMarkdown={article.contentMarkdown} />

          {/* Regulatory Considerations */}
          <ArticleConsiderations
            containsRegulatoryClaims={article.containsRegulatoryClaims}
            verificationNotes={article.verificationNotes}
          />

          {/* Publication-Aware Related Inter-Links */}
          <RelatedServicesBar supportedServices={article.supportedServices} />
          <RelatedDestinationsBar supportedDestinations={article.supportedDestinations} />
          <RelatedLocationsBar supportedOrigins={article.supportedOrigins} />

          {/* Related Guides */}
          <RelatedGuidesGrid currentSlug={article.slug} category={article.category} />

          {/* Article FAQ */}
          <ArticleFaq faqs={article.faqs} />
        </Container>
      </section>

      {/* 03 High-Impact Quote CTA (Dark Closing Section) */}
      <ArticleCta />
    </article>
  );
}
