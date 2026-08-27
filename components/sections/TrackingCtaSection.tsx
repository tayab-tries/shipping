import React from 'react';
import Link from 'next/link';
import { Search, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const TrackingCtaSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-navy text-white py-16 lg:py-20 border-b border-border-dark">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-brand-black-deep/90 backdrop-blur-xs border border-border-dark p-8 rounded-md shadow-md">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Sanitized Online Visibility</span>
            </div>
            <h2 className="text-heading-xl text-white font-bold tracking-tight">
              Have an Active Cargo Shipment?
            </h2>
            <p className="text-body-md text-slate-300 leading-relaxed">
              Track your shipment milestone updates using your reference tracking number. Private customer details remain protected.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/track">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Search className="w-4 h-4 shrink-0" />}
              >
                Track Cargo Status
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
