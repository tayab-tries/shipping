import React from 'react';
import Link from 'next/link';
import { Package, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { footerNavigation } from '@/config/nav.config';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  const { phonePrimary, emailInfo } = siteConfig.contact;
  const verifiedOffices = siteConfig.verifiedOffices;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-black text-slate-300 border-t border-border-dark mt-auto">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Description Section */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight text-white">
              <Package className="w-6 h-6 text-accent shrink-0" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-body-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.defaultSeo.defaultDescription}
            </p>

            {/* Contact Information Area */}
            {(phonePrimary || emailInfo || verifiedOffices.length > 0) && (
              <div className="pt-4 border-t border-border-dark space-y-2 text-xs text-slate-400 font-mono">
                {verifiedOffices.length > 0 && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{verifiedOffices[0].address}</span>
                  </div>
                )}
                {phonePrimary && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span>{phonePrimary}</span>
                  </div>
                )}
                {emailInfo && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <span>{emailInfo}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hierarchical Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-border-dark pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/guides/export-customs-documentation-guide" className="hover:text-white transition-colors">
              Customs Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
