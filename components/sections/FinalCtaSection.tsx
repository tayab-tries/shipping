import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-black py-16 lg:py-24 border-t border-border-dark text-white">
      <Container>
        <div className="bg-brand-navy/80 backdrop-blur-xs p-8 lg:p-12 rounded-md border border-border-dark text-center space-y-6 max-w-4xl mx-auto shadow-md">
          <h2 className="text-display-lg text-white font-extrabold tracking-tight">
            Ready to Ship Your Cargo Internationally?
          </h2>
          <p className="text-body-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Request a shipping quote based on your origin city in Pakistan, destination country, and cargo requirements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              >
                Get a Shipping Quote
              </Button>
            </Link>
            <Link href="/track" className="w-full sm:w-auto">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Search className="w-4 h-4 shrink-0 text-accent" />}
              >
                Track Existing Cargo
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
