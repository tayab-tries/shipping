import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export interface DestinationCtaProps {
  countryName: string;
  slug: string;
}

export const DestinationCta: React.FC<DestinationCtaProps> = ({ countryName, slug }) => {
  return (
    <section className="w-full bg-background py-12 lg:py-16">
      <Container>
        <div className="bg-primary text-primary-foreground p-8 lg:p-12 rounded-md border border-slate-800 text-center space-y-6 max-w-4xl mx-auto shadow-md">
          <h2 className="text-display-lg text-white font-extrabold tracking-tight">
            Ready to Ship International Cargo to {countryName}?
          </h2>
          <p className="text-body-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Request a custom shipping quote for cargo heading from Pakistan to {countryName}. Specify your cargo weight, shipping mode, and origin city for detailed freight pricing.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/quote?destination=${slug}`} className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              >
                Get a Quote for {countryName} Cargo
              </Button>
            </Link>
            <Link href="/track" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-slate-700 hover:bg-slate-800"
                leftIcon={<Search className="w-4 h-4 shrink-0" />}
              >
                Track Shipment Status
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
