import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { ArrowRight, HelpCircle, MapPin, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LocationHero } from '@/components/locations/LocationHero';
import { LocationCta } from '@/components/locations/LocationCta';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { ORGANIZATION_ID } from '@/lib/seo/schema.service';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import {
  ContentBlock,
  LahorePage,
  LAHORE_CITY_PATH,
  LAHORE_LOCATION_KEY,
  LAHORE_ROUTE_PAGES,
} from '@/lib/routes/lahore-content';

const BASE_URL = 'https://raahiinternational.com';

// Internal links use client-side navigation; external citations open in a new tab
const markdownComponents: Components = {
  a: ({ href = '', children }) =>
    href.startsWith('/') ? (
      <Link href={href} className="font-semibold text-brand-black underline underline-offset-2 hover:text-accent-dark">
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-black underline underline-offset-2 hover:text-accent-dark"
      >
        {children}
      </a>
    ),
  p: ({ children }) => <>{children}</>,
};

function Markdown({ text }: { text: string }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={markdownComponents}>
      {text}
    </ReactMarkdown>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-body-md text-slate-800 leading-relaxed">
          <Markdown text={block.text} />
        </p>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-2 text-body-md text-slate-800 leading-relaxed marker:text-accent-dark marker:font-bold`}
        >
          {block.items.map((item, idx) => (
            <li key={idx} className="pl-1">
              <Markdown text={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface-subtle text-xs font-mono uppercase tracking-wider text-slate-600">
              <tr>
                {block.head.map((cell, idx) => (
                  <th key={idx} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="bg-surface">
                  {row.map((cell, cIdx) =>
                    cIdx === 0 ? (
                      <th key={cIdx} scope="row" className="px-4 py-3 font-semibold text-brand-black">
                        {cell}
                      </th>
                    ) : (
                      <td key={cIdx} className="px-4 py-3 text-slate-800">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'facts':
      return <FactList items={block.items} />;
  }
}

function FactList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(([label, value]) => (
        <div key={label} className="bg-surface-subtle p-4 rounded border border-border">
          <dt className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">{label}</dt>
          <dd className="mt-1 text-sm font-semibold text-brand-black">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function getLahorePageJsonLd(page: LahorePage) {
  const schemas: object[] = [getBreadcrumbJsonLd(page.breadcrumbs)];

  if (page.service) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.serviceType,
      serviceType: page.service.serviceType,
      description: page.seoDescription,
      url: `${BASE_URL}${page.path}`,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: page.service.areaServed.name, identifier: page.service.areaServed.code },
    });
  } else {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'International Cargo Services in Lahore',
      serviceType: 'International Cargo Shipping',
      description: page.seoDescription,
      url: `${BASE_URL}${page.path}`,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'City', name: 'Lahore' },
    });
  }

  if (page.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return schemas;
}

export interface LahoreLandingPageProps {
  page: LahorePage;
  whatsappNumber?: string;
}

export function LahoreLandingPage({ page, whatsappNumber }: LahoreLandingPageProps) {
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, page.whatsappMessage);
  const otherRoutes = Object.entries(LAHORE_ROUTE_PAGES).filter(([, route]) => route.path !== page.path);

  return (
    <article className="w-full bg-background">
      {getLahorePageJsonLd(page).map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <LocationHero
        cityName="Lahore"
        province="Punjab"
        h1={page.h1}
        introduction={page.intro.join(' ')}
        quoteUrl={page.quoteUrl}
        breadcrumbs={page.breadcrumbs}
      />

      <div className="w-full bg-background text-foreground py-12 lg:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10 min-w-0">
              {page.glance && (
                <section aria-labelledby="at-a-glance" className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-5 shadow-xs">
                  <h2 id="at-a-glance" className="text-heading-lg font-extrabold text-foreground tracking-tight">
                    At a glance
                  </h2>
                  <FactList items={page.glance} />
                </section>
              )}

              {page.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-5 shadow-xs scroll-mt-28"
                >
                  <h2 className="text-heading-lg sm:text-2xl font-extrabold text-foreground tracking-tight border-b border-border pb-3">
                    {section.title}
                  </h2>
                  {section.blocks.map((block, idx) => (
                    <Block key={idx} block={block} />
                  ))}
                </section>
              ))}

              {page.faqs.length > 0 && (
                <section id="faqs" className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-28">
                  <h2 className="text-heading-lg sm:text-2xl font-extrabold text-foreground tracking-tight border-b border-border pb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-accent-dark shrink-0" />
                    <span>Frequently asked questions</span>
                  </h2>
                  <div className="space-y-6 divide-y divide-border/60">
                    {page.faqs.map((faq, idx) => (
                      <div key={idx} className={idx > 0 ? 'pt-6 space-y-2' : 'space-y-2'}>
                        <h3 className="text-heading-md font-bold text-foreground">{faq.question}</h3>
                        <p className="text-body-md text-slate-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              <div className="bg-brand-black-deep text-white rounded-md border border-border-dark p-6 space-y-5 shadow-2xl">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">Get a price</span>
                  <p className="text-heading-lg font-bold text-white">Send cargo from Lahore</p>
                  <p className="text-body-xs text-slate-300 leading-relaxed">
                    Tell us the destination, what is inside and the rough weight. We reply with the per-kg rate and the total.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href={page.quoteUrl} className="block">
                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full h-[46px]"
                      rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
                    >
                      Get a quote
                    </Button>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-[46px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-white fill-current" />
                    <span>WhatsApp 0300 7097063</span>
                  </a>
                </div>
              </div>

              <nav aria-label="Shipping from Lahore" className="bg-surface rounded-md border border-border p-6 space-y-4 shadow-xs">
                <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Shipping from Lahore</p>
                <div className="space-y-2.5">
                  {page.path !== LAHORE_CITY_PATH && (
                    <SidebarLink href={LAHORE_CITY_PATH} label="Cargo services in Lahore" />
                  )}
                  {otherRoutes.map(([slug, route]) => (
                    <SidebarLink key={slug} href={route.path} label={route.breadcrumbs[route.breadcrumbs.length - 1].label} />
                  ))}
                  {page.countrySlug && (
                    <SidebarLink href={`/destinations/${page.countrySlug}`} label={`All cargo to ${page.service?.areaServed.name}`} />
                  )}
                  <SidebarLink href="/cargo-services" label="All cargo rates" />
                </div>
              </nav>
            </aside>
          </div>
        </Container>
      </div>

      <LocationCta cityName="Lahore" slug={LAHORE_LOCATION_KEY} />
    </article>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
    >
      <span className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent-dark" />
        {label}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
    </Link>
  );
}
