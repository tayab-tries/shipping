import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { Container } from '@/components/ui/Container';
import { getPublishedBusinessSettings } from '@/lib/cms/business-settings.service';
import { getSanitySiteSettingsFull } from '@/sanity/lib/fetch';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export const Footer = async () => {
  const [business, sanitySettings] = await Promise.all([
    getPublishedBusinessSettings(),
    getSanitySiteSettingsFull(),
  ]);

  const brandName = sanitySettings?.businessName || business.brandName || siteConfig.name;
  const phone = sanitySettings?.phone || business.phonePrimary || siteConfig.phone || '+92 300 1234567';
  const whatsappNumber = sanitySettings?.whatsappNumber || business.whatsappNumber || siteConfig.contact?.whatsappNumber || phone;
  const whatsappUrl = buildWhatsappUrl(whatsappNumber);
  const email = sanitySettings?.email || business.emailInfo || siteConfig.contact?.emailInfo || 'info@raahiinternational.pk';
  const footerDesc =
    sanitySettings?.footerDescription ||
    'International cargo delivery provider providing reliable air cargo, ocean sea cargo, and door-to-door shipping services connecting Pakistan worldwide.';
  const copyrightText = sanitySettings?.copyrightText || 'All rights reserved.';
  const logoSrc = sanitySettings?.logoUrl || '/images/brand/logo-white.svg';

  return (
    <footer className="w-full bg-brand-black border-t border-border-dark text-slate-300 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-dark">
          {/* Column 1: Company / Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt={`${brandName} Logo`}
                width={220}
                height={128}
                className="h-12 sm:h-14 w-auto object-contain max-h-[56px]"
              />
            </Link>
            <p className="text-body-sm text-slate-400 leading-relaxed">
              {footerDesc}
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-current" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                  WhatsApp: {whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/services/air-freight" className="hover:text-white transition-colors">
                  Air Cargo Services
                </Link>
              </li>
              <li>
                <Link href="/services/sea-cargo" className="hover:text-white transition-colors">
                  Sea Cargo (FCL / LCL)
                </Link>
              </li>
              <li>
                <Link href="/services/door-to-door" className="hover:text-white transition-colors">
                  Door-to-Door Delivery
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-cargo" className="hover:text-white transition-colors">
                  Commercial Cargo
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-xs font-mono text-accent hover:underline">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
              Locations
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/locations/lahore" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
                  <span>Lahore Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/locations/karachi" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
                  <span>Karachi Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/locations/islamabad" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
                  <span>Islamabad Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/locations/rawalpindi" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
                  <span>Rawalpindi Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-xs font-mono text-accent hover:underline">
                  All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Destinations */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
              Destinations
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/destinations/uk" className="hover:text-white transition-colors">
                  Cargo to United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/destinations/uae" className="hover:text-white transition-colors">
                  Cargo to UAE / Dubai
                </Link>
              </li>
              <li>
                <Link href="/destinations/usa" className="hover:text-white transition-colors">
                  Cargo to United States
                </Link>
              </li>
              <li>
                <Link href="/destinations/canada" className="hover:text-white transition-colors">
                  Cargo to Canada
                </Link>
              </li>
              <li>
                <Link href="/destinations/ksa" className="hover:text-white transition-colors">
                  Cargo to Saudi Arabia
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/track" className="hover:text-accent font-semibold transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-accent font-semibold transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  Educational Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {brandName}. {copyrightText}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Verified Air & Sea Cargo Delivery</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
