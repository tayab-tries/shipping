import React from 'react';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/TextLink';
import { IMAGE_SLOTS } from '@/lib/constants/images';

export const GuidesPreviewSection: React.FC = () => {
  const guides = [
    {
      title: 'Air vs Sea Freight: Transit Time & Cost Comparison',
      slug: 'air-vs-sea-cargo',
      description: 'Understanding key differences between air freight speed and ocean cargo volume economy.',
      image: IMAGE_SLOTS.guideCover.src,
      alt: IMAGE_SLOTS.guideCover.alt,
    },
    {
      title: 'Pakistan Export Customs & Documentation Guide',
      slug: 'export-customs-documentation-guide',
      description: 'Mandatory shipping invoices, packing lists, declared value rules, and clearance procedures.',
      image: IMAGE_SLOTS.guideCover.src,
      alt: IMAGE_SLOTS.guideCover.alt,
    },
    {
      title: 'International Cargo Packaging & Protection Guide',
      slug: 'packing-cargo-guide',
      description: 'How to properly pack, weigh, and measure cargo items for international transit protection.',
      image: IMAGE_SLOTS.guideCover.src,
      alt: IMAGE_SLOTS.guideCover.alt,
    },
  ];

  return (
    <section className="w-full bg-surface-subtle py-16 lg:py-24 border-b border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            badge="Shipping Resources"
            title="Customs & Shipping Guides"
            subtitle="Factual regulatory guidance and packaging resources for international shippers."
          />
          <TextLink href="/guides" showIcon className="shrink-0 font-semibold text-accent">
            View All Guides
          </TextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.slug}
              className="bg-surface rounded-md border border-border overflow-hidden flex flex-col justify-between hover:border-border-strong transition-colors shadow-2xs group"
            >
              <div>
                <div className="relative w-full aspect-[3/2] bg-surface-muted">
                  <Image
                    src={guide.image}
                    alt={guide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="p-2 bg-surface-muted rounded-md inline-block">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-heading-sm font-bold text-foreground">{guide.title}</h3>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <TextLink href={`/guides/${guide.slug}`} showIcon className="text-xs">
                  Read Full Guide
                </TextLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
