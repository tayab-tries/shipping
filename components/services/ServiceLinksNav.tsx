import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { getEnabledServices } from '@/config/services.config';

// Air and sea cargo live on /cargo-services; their old /services/* URLs redirect there
const MERGED_INTO_CARGO_SERVICES = new Set(['air-freight', 'sea-cargo', 'door-to-door']);

/** Keyword-anchored links to every indexable service page, optionally excluding the current one. */
export function getServiceLinks(excludeHref?: string): Array<{ href: string; label: string }> {
  return [
    { href: '/cargo-services', label: 'Air & sea cargo rates' },
    ...getEnabledServices()
      .filter((service) => !MERGED_INTO_CARGO_SERVICES.has(service.slug))
      .map((service) => ({ href: `/services/${service.slug}`, label: `${service.name} shipping` })),
    { href: '/services', label: 'All cargo services' },
  ].filter((link) => link.href !== excludeHref);
}

/** Sidebar box linking the cargo service pages. */
export function ServiceLinksNav({ excludeHref, className = '' }: { excludeHref?: string; className?: string }) {
  const links = getServiceLinks(excludeHref);
  if (links.length === 0) return null;

  return (
    <nav aria-label="Cargo services" className={`bg-surface rounded-md border border-border p-6 space-y-4 shadow-xs ${className}`}>
      <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Cargo services</p>
      <div className="space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between gap-3 p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 shrink-0 text-accent-dark" />
              {link.label}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
