import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Air & Sea Cargo Delivery
          </div>

          <h2 className="text-display-lg font-bold text-white tracking-tight">
            Ready to send cargo?
          </h2>

          <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect with our team to calculate air cargo rates, ocean container schedules, and door-to-door delivery options.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
              >
                Get a Shipping Quote
              </Button>
            </Link>
            <Link href="/track" className="w-full sm:w-auto">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Search className="w-4 h-4 text-slate-300" />}
              >
                Track Shipment
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
