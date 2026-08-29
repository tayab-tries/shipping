'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const defaultFaqs: FaqItem[] = [
    {
      question: 'How is volumetric weight calculated for air freight shipments?',
      answer: 'Air freight volumetric weight is calculated using the standard formula: (Length × Width × Height in cm) / 5000. Shippers are billed on whichever value is higher: actual scale weight or volumetric weight.',
    },
    {
      question: 'Do you arrange doorstep cargo pickups across cities in Pakistan?',
      answer: 'Yes, scheduled doorstep collection services are available across Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, and Peshawar.',
    },
    {
      question: 'What documentation is required for commercial export shipments?',
      answer: 'Standard commercial export documentation requires a Commercial Invoice, Packing List, Certificate of Origin (where applicable), and sender identification.',
    },
    {
      question: 'How does public shipment tracking work?',
      answer: 'Enter your valid tracking reference ID on the tracking page to view current milestone progress, dispatch timestamps, and destination arrival stages.',
    },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-surface py-20 lg:py-28 border-b border-border text-brand-black">
      <Container size="narrow">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Common Questions About International Cargo"
          subtitle="Answers regarding cargo pickup, volumetric weight billing, and commercial customs documentation."
          className="mb-14 text-center mx-auto"
          align="center"
        />

        {/* Clean Editorial List with Horizontal Dividers (Not separate rounded cards) */}
        <div className="border-t border-border divide-y divide-border">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-heading-sm font-bold text-brand-black hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-black' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 text-body-md text-slate-600 leading-relaxed max-w-prose animate-in fade-in duration-150 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
