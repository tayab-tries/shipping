import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { DestinationCta } from '@/components/destinations/DestinationCta';
import { Block, Markdown, SidebarLink, toPlainText } from '@/components/routes/CityLandingPage';
import { getBreadcrumbJsonLd } from '@/lib/seo/jsonld.service';
import { ORGANIZATION_ID } from '@/lib/seo/schema.service';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { getRoutesForCountry } from '@/lib/routes/registry';
import { CountryLanding } from '@/lib/routes/shared';
import { getStaticDestinationBySlug } from '@/lib/destinations/destination-content';

const BASE_URL = 'https://raahiinternational.com';

const countryBreadcrumbs = (page: CountryLanding) => [
  { label: 'Home', url: '/' },
  { label: 'Destinations', url: '/destinations' },
  { label: page.name, url: page.path },
];

export function getCountryPageJsonLd(page: CountryLanding) {
  const { name, areaServed, offerTarget, airRate, seaRate } = page.service;
  const perKgOffer = (mode: 'Air' | 'Sea', [minPrice, maxPrice]: [number, number]) => ({
    '@type': 'Offer',
    name: `${mode} cargo from Pakistan to ${offerTarget}`,
    priceSpecification: { '@type': 'UnitPriceSpecification', minPrice, maxPrice, priceCurrency: 'PKR', unitCode: 'KGM' },
  });

  return [
    getBreadcrumbJsonLd(countryBreadcrumbs(page)),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      serviceType: 'Door-to-door international cargo',
      description: page.seoDescription,
      url: `${BASE_URL}${page.path}`,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: areaServed.name, identifier: areaServed.code },
      offers: [perKgOffer('Air', airRate), perKgOffer('Sea', seaRate)],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: toPlainText(faq.answer) },
      })),
    },
  ];
}

export interface CountryLandingPageProps {
  page: CountryLanding;
  whatsappNumber?: string;
}

export function CountryLandingPage({ page, whatsappNumber }: CountryLandingPageProps) {
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, page.whatsappMessage);
  const routes = getRoutesForCountry(page.slug);
  const cities = getStaticDestinationBySlug(page.slug)?.cities ?? [];

  return (
    <article className="w-full bg-background">
      {getCountryPageJsonLd(page).map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <DestinationHero
        countryName={page.name}
        region={page.region}
        h1={page.h1}
        introduction={page.intro.join(' ')}
        quoteUrl={page.quoteUrl}
        breadcrumbs={countryBreadcrumbs(page)}
        showStatusLine={false}
      />

      <div className="w-full bg-background text-foreground py-12 lg:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10 min-w-0">
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

              <section id="faqs" className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-28">
                <h2 className="text-heading-lg sm:text-2xl font-extrabold text-foreground tracking-tight border-b border-border pb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent-dark shrink-0" />
                  <span>{page.faqTitle}</span>
                </h2>
                <div className="space-y-6 divide-y divide-border/60">
                  {page.faqs.map((faq, idx) => (
                    <div key={idx} className={idx > 0 ? 'pt-6 space-y-2' : 'space-y-2'}>
                      <h3 className="text-heading-md font-bold text-foreground">{faq.question}</h3>
                      <p className="text-body-md text-slate-700 leading-relaxed">
                        <Markdown text={faq.answer} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <p className="text-body-md text-slate-800 leading-relaxed border-l-4 border-accent pl-4">
                <Markdown text={page.closing} />
              </p>
            </div>

            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              <div className="bg-brand-black-deep text-white rounded-md border border-border-dark p-6 space-y-5 shadow-2xl">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">Get a price</span>
                  <p className="text-heading-lg font-bold text-white">Send cargo to {page.service.offerTarget}</p>
                  <p className="text-body-xs text-slate-300 leading-relaxed">
                    Tell us your city, what is inside and the rough weight. We reply with the per-kg rate and the total.
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

              <nav aria-label={`Cargo to ${page.service.offerTarget}`} className="bg-surface rounded-md border border-border p-6 space-y-4 shadow-xs">
                <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Cargo to {page.service.offerTarget}
                </p>
                <div className="space-y-2.5">
                  {routes.map((route) => (
                    <SidebarLink key={route.path} href={route.path} label={route.countryLinkLabel ?? route.linkLabel} />
                  ))}
                  {cities.map((city) => (
                    <SidebarLink key={city.slug} href={`${page.path}/${city.slug}`} label={`Cargo to ${city.name}`} />
                  ))}
                  <SidebarLink href="/cargo-services" label="All cargo rates" />
                </div>
              </nav>
            </aside>
          </div>
        </Container>
      </div>

      <DestinationCta countryName={page.name} countrySlug={page.slug} />
    </article>
  );
}
