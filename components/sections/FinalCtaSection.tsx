import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export interface FinalCtaSectionProps {
  blockData?: Record<string, unknown>;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ blockData }) => {
  const eyebrow = (blockData?.eyebrow as string) || (blockData?.badge as string) || 'Air & Sea Cargo Delivery';
  const headline = (blockData?.headline as string) || (blockData?.title as string) || 'Ready to send cargo?';
  const supportingCopy =
    (blockData?.supporting_copy as string) ||
    (blockData?.subtitle as string) ||
    'Connect with our team to calculate air cargo rates, ocean container schedules, and door-to-door delivery options.';
  const primaryCtaLabel =
    (blockData?.primary_cta_label as string) || (blockData?.button_text as string) || 'Get a Shipping Quote';
  const primaryCtaHref = (blockData?.primary_cta_href as string) || (blockData?.button_href as string) || '/quote';
  const secondaryCtaLabel = (blockData?.secondary_cta_label as string) || 'Track Shipment';
  const secondaryCtaHref = (blockData?.secondary_cta_href as string) || '/track';

  return (
    <section className="w-full bg-brand-navy py-20 lg:py-28 border-b border-border-dark text-white text-center">
      <Container size="narrow">
        <div className="bg-brand-black-deep rounded-md border border-border-dark p-8 lg:p-14 space-y-6 shadow-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{eyebrow}</div>

          <h2 className="text-display-lg font-bold text-white tracking-tight">{headline}</h2>

          <p className="text-body-lg text-slate-300 max-w-xl mx-auto leading-relaxed">{supportingCopy}</p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
              >
                {primaryCtaLabel}
              </Button>
            </Link>
            <Link href={secondaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="outline-dark"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Search className="w-4 h-4 text-slate-300" />}
              >
                {secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
