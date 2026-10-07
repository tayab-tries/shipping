import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { getEnabledServices } from '@/config/services.config';

export interface RelatedServicesBarProps {
  supportedServices?: string[];
}

export const RelatedServicesBar: React.FC<RelatedServicesBarProps> = ({
  supportedServices = [],
}) => {
  const allServices = getEnabledServices();

  const related = supportedServices.length > 0
    ? allServices.filter((s) => supportedServices.includes(s.slug))
    : allServices.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="py-8 border-t border-border space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
        Related Shipping Services
      </div>

      <div className="divide-y divide-border rounded border border-border bg-surface overflow-hidden">
        {related.map((service) => {
          const serviceHref =
            service.slug === 'air-freight'
              ? '/cargo-services#part-1-air-cargo'
              : service.slug === 'sea-cargo'
              ? '/cargo-services#part-2-sea-cargo'
              : `/services/${service.slug}`;

          return (
            <Link
              key={service.slug}
              href={serviceHref}
              className="p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors" />
                <span className="text-body-sm font-bold text-brand-black group-hover:text-accent transition-colors">
                  {service.name}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
