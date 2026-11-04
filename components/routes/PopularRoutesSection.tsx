import React from 'react';
import Link from 'next/link';
import { ArrowRight, Route } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CITY_LANDINGS } from '@/lib/routes/registry';

/** Every origin → destination route page, grouped under its Pakistan origin city. */
export function PopularRoutesSection() {
  const groups = Object.values(CITY_LANDINGS)
    .map(({ cityPage, routes }) => ({ origin: cityPage.origin, cityPage, routes: Object.values(routes) }))
    .filter((group) => group.routes.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="w-full bg-surface py-16 lg:py-20 border-b border-border text-brand-black">
      <Container>
        <SectionHeading
          badge="Popular Routes"
          title="Popular shipping routes from Pakistan"
          subtitle="Rates, transit times and what to send on our busiest city-to-country routes."
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(({ origin, cityPage, routes }) => (
            <nav
              key={origin.key}
              aria-label={`Shipping routes from ${origin.name}`}
              className="bg-surface-subtle rounded-md border border-border p-6 space-y-3 shadow-xs"
            >
              <h3 className="text-heading-md font-bold text-brand-black flex items-center gap-2">
                <Route className="w-4 h-4 text-accent-dark shrink-0" />
                <Link href={cityPage.path} className="hover:text-accent-dark">
                  From {origin.name}
                </Link>
              </h3>
              <ul className="space-y-2">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className="flex items-center justify-between gap-2 p-2.5 bg-surface hover:bg-slate-100 rounded border border-border text-sm font-semibold text-brand-black transition-colors"
                    >
                      <span>{route.linkLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </section>
  );
}
