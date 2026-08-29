import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Service } from '@/lib/supabase/services';

export interface ServiceCtaProps {
  service: Service;
}

export const ServiceCta: React.FC<ServiceCtaProps> = ({ service }) => {
  return (
    <section className="w-full bg-brand-navy py-16 lg:py-24 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-12 space-y-6">
          <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
            Custom Export Quotation
          </div>
          <h2 className="text-display-lg font-bold text-white tracking-tight">
            Ready to Book {service.title}?
          </h2>
          <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
            Submit cargo dimensions, origin city in Pakistan, and destination address for rate quotes.
          </p>
          <div className="flex justify-center">
            <Link href={`/quote?service=${service.slug}`}>
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
              >
                Request {service.title} Quote
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
