import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface ServiceHeroProps {
  title: string;
  description: string;
  quoteUrl: string;
  category: 'core' | 'specialized';
  breadcrumbs: Array<{ label: string; url: string }>;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  quoteUrl,
  category,
  breadcrumbs,
}) => {
  return (
    <section className="w-full bg-background border-b border-border py-12 lg:py-16">
      <Container>
        <div className="space-y-6 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-4">
            <Badge variant={category === 'core' ? 'accent' : 'secondary'} size="md">
              {category === 'core' ? 'Core Freight Service' : 'Specialized Cargo Logistics'}
            </Badge>

            {/* Single H1 Tag */}
            <h1 className="text-display-xl text-primary font-extrabold tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-body-lg text-muted-foreground leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href={quoteUrl} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              >
                Get a Shipping Quote
              </Button>
            </Link>
            <Link href="/destinations" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Globe className="w-4 h-4 shrink-0" />}
              >
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
