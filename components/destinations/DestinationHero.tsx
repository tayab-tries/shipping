import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface DestinationHeroProps {
  countryName: string;
  region: string;
  h1: string;
  introduction: string;
  quoteUrl: string;
  breadcrumbs: Array<{ label: string; url: string }>;
}

export const DestinationHero: React.FC<DestinationHeroProps> = ({
  countryName,
  region,
  h1,
  introduction,
  quoteUrl,
  breadcrumbs,
}) => {
  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <div className="space-y-6 max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-4">
            <Badge variant="secondary" size="md">
              International Trade Corridor — {countryName} ({region})
            </Badge>

            {/* Single H1 Heading */}
            <h1 className="text-display-xl text-primary font-extrabold tracking-tight leading-tight">
              {h1}
            </h1>

            <p className="text-body-lg text-muted-foreground leading-relaxed max-w-3xl">
              {introduction}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href={quoteUrl} className="w-full sm:w-auto">
              <Button
                variant="primary"
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
                className="w-full sm:w-auto"
                leftIcon={<Search className="w-4 h-4 shrink-0" />}
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
