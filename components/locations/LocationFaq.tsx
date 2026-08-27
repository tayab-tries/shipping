import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';

export interface LocationFaqProps {
  cityName: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const LocationFaq: React.FC<LocationFaqProps> = ({ cityName, faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  // FAQPage JSON-LD Schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <SectionHeading
          badge="City FAQ"
          title={`Frequently Asked Questions — ${cityName}`}
          subtitle={`Common inquiries regarding international cargo shipping from ${cityName}.`}
        />

        <div className="max-w-3xl mt-8 bg-surface p-6 rounded-md border border-border">
          <Accordion
            items={faqs.map((item, idx) => ({
              id: `loc-faq-${idx}`,
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  );
};
