import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicesRegistry, getEnabledServices } from '@/config/services.config';
import { siteConfig } from '@/config/site.config';
import { getServiceMdxContent } from '@/lib/content/mdx.service';
import { validateServiceQuality } from '@/lib/content/content-gate';
import { getServiceJsonLd, getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSummaryPanel } from '@/components/services/ServiceSummaryPanel';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { RelatedServicesGrid } from '@/components/services/RelatedServicesGrid';
import { RelatedDestinationsBar } from '@/components/services/RelatedDestinationsBar';
import { RelatedLocationsBar } from '@/components/services/RelatedLocationsBar';
import { Accordion } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render static params for enabled and verified services.
 */
export async function generateStaticParams() {
  const enabledServices = getEnabledServices();
  return enabledServices.map((service) => ({
    slug: service.slug,
  }));
}

/**
 * Dynamic metadata generator for service pages.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesRegistry.find((s) => s.slug === slug);

  if (!service || !service.enabled || !service.isVerified) {
    return {
      title: `Service Not Found | ${siteConfig.name}`,
    };
  }

  const canonicalUrl = `${siteConfig.domain}/services/${service.slug}`;

  return {
    title: `${service.seo.title} | ${siteConfig.name}`,
    description: service.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.seo.title} | ${siteConfig.name}`,
      description: service.seo.description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesRegistry.find((s) => s.slug === slug);

  // 1. Authoritative Registry Verification Check
  if (!service || !service.enabled || !service.isVerified) {
    notFound();
  }

  // 2. Load MDX Content & Frontmatter
  let mdxData;
  try {
    mdxData = await getServiceMdxContent(service.contentPath);
  } catch {
    notFound();
  }

  const { frontmatter, content } = mdxData;

  // 3. Structural Quality Gate Check
  const quality = validateServiceQuality(frontmatter, content);
  if (!quality.passed) {
    notFound();
  }

  // 4. Construct Quote CTA URL using explicit quoteCargoType mapping
  const quoteUrl = service.quoteCargoType
    ? `/quote?cargo=${service.quoteCargoType}`
    : '/quote';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: service.name, url: `/services/${service.slug}` },
  ];

  const serviceJsonLd = getServiceJsonLd(service.h1, service.seo.description);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  // FAQ Schema if visible FAQ content exists
  const faqJsonLd =
    frontmatter.faq && frontmatter.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: frontmatter.faq.map((item) => ({
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
    <article className="w-full bg-background">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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

      {/* 1. Service Hero Block */}
      <ServiceHero
        title={service.h1}
        description={service.seo.description}
        quoteUrl={quoteUrl}
        category={service.category}
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Service Summary Panel */}
      <ServiceSummaryPanel
        serviceOverview={frontmatter.serviceOverview}
        targetAudience={frontmatter.targetAudience}
        keyConsiderations={frontmatter.keyConsiderations}
      />

      {/* 3. Main Prose Content */}
      <section className="w-full py-12 border-b border-border">
        <Container>
          <div className="max-w-3xl prose prose-slate dark:prose-invert leading-relaxed space-y-6">
            {/* Simple prose renderer for MDX paragraph content */}
            {content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-heading-md font-bold text-foreground pt-4">
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-heading-sm font-bold text-foreground pt-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ').map((item) => item.replace('- ', ''));
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1 text-body-sm text-muted-foreground">
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-body-md text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Process Steps Block */}
      <ServiceProcess steps={frontmatter.processSteps} />

      {/* 5. Publication-Aware Internal Link Components */}
      <RelatedDestinationsBar destinationSlugs={service.relatedDestinations} />
      <RelatedLocationsBar locationSlugs={service.relatedLocations} />
      <RelatedServicesGrid relatedSlugs={service.relatedServices} />

      {/* 6. Visible FAQ Accordion */}
      {frontmatter.faq && frontmatter.faq.length > 0 && (
        <section className="w-full bg-surface-subtle py-12 lg:py-16 border-b border-border">
          <Container>
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              subtitle={`Common questions regarding ${service.name.toLowerCase()} shipping.`}
            />
            <div className="max-w-3xl mt-8 bg-surface p-6 rounded-md border border-border">
              <Accordion
                items={frontmatter.faq.map((item, idx) => ({
                  id: `faq-${idx}`,
                  title: item.question,
                  content: item.answer,
                }))}
              />
            </div>
          </Container>
        </section>
      )}

      {/* 7. Final Conversion Quote CTA */}
      <FinalCtaSection />
    </article>
  );
}
