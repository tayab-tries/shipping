import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';

export interface DestinationFaqProps {
  countryName: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const DestinationFaq: React.FC<DestinationFaqProps> = ({ countryName, faqs }) => {
  if (!faqs || faqs.length === 0) return null;

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
    <section className="w-full bg-surface-subtle border-b border-border py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <SectionHeading
          badge="Corridor FAQ"
          title={`Frequently Asked Questions — Shipping to ${countryName}`}
          subtitle={`Common questions regarding international cargo shipments from Pakistan to ${countryName}.`}
        />

        <div className="max-w-3xl mt-8 bg-surface p-6 rounded-md border border-border">
          <Accordion
            items={faqs.map((item, idx) => ({
              id: `dest-faq-${idx}`,
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  );
};
