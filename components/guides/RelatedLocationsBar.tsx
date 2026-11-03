import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { toLocationKeys } from '@/lib/locations/location-slugs';
import { getCityPageLinks } from '@/lib/routes/registry';

export interface RelatedLocationsBarProps {
  supportedOrigins?: string[];
}

export const RelatedLocationsBar: React.FC<RelatedLocationsBarProps> = ({ supportedOrigins = [] }) => {
  // Null/broken CMS reference entries are dropped before matching; no origins (or none matching) lists every city
  const originKeys = toLocationKeys(supportedOrigins);
  const allCities = getCityPageLinks();
  const matched = allCities.filter((city) => originKeys.includes(city.key));
  const related = matched.length > 0 ? matched : allCities;

  return (
    <div className="py-8 border-t border-border space-y-4">
      <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
        Cargo Pickup Across Pakistan
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded border border-border bg-border overflow-hidden">
        {related.map((city) => (
          <Link
            key={city.key}
            href={city.href}
            className="p-4 flex items-center justify-between gap-3 bg-surface hover:bg-surface-subtle transition-colors group"
          >
            <span className="flex items-center gap-3 min-w-0">
              <MapPin className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-accent transition-colors" />
              <span className="text-body-sm font-bold text-brand-black group-hover:text-accent transition-colors">
                {city.label}
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
