import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';

export const FaqSection: React.FC = () => {
  const faqData = [
    {
      id: 'faq-1',
      question: 'How do I request an international shipping quote?',
      answer:
        'Select your origin city in Pakistan, destination country, and cargo type on our Quick Quote bar or quote request form. Enter your cargo weight and contact details to receive a quote response.',
    },
    {
      id: 'faq-2',
      question: 'What is the difference between air freight and sea cargo?',
      answer:
        'Air freight is suited for time-sensitive cargo and smaller shipments. Sea cargo provides ocean shipping suitable for heavy, bulk, or larger containerized shipments.',
    },
    {
      id: 'faq-3',
      question: 'How is volumetric weight calculated for air cargo?',
      answer:
        'Volumetric weight is computed using the cargo dimensions: (Length x Width x Height in centimeters) divided by 6000. Shippers are billed on whichever is greater: actual weight or volumetric weight.',
    },
    {
      id: 'faq-4',
      question: 'How can I track my active cargo shipment online?',
      answer:
        'Enter your reference tracking number on our tracking lookup page to view public milestone updates from collection through final destination delivery.',
    },
  ];

  // Compliant FAQPage JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border">
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <SectionHeading
          badge="Inquiries"
          title="Frequently Asked Questions"
          subtitle="Common questions regarding international cargo shipping from Pakistan."
        />

        <div className="max-w-3xl mt-12 bg-surface p-6 lg:p-8 rounded-md border border-border">
          <Accordion
            items={faqData.map((f) => ({
              id: f.id,
              title: f.question,
              content: f.answer,
            }))}
            defaultOpenId="faq-1"
          />
        </div>
      </Container>
    </section>
  );
};
