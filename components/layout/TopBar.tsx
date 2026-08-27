import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Search } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { Container } from '@/components/ui/Container';

export const TopBar: React.FC = () => {
  const { phonePrimary, whatsappNumber } = siteConfig.contact;

  if (!phonePrimary && !whatsappNumber) {
    return null;
  }

  return (
    <div className="bg-brand-black-deep text-slate-300 text-xs py-2 border-b border-border-dark font-mono">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {phonePrimary && (
            <a
              href={`tel:${phonePrimary}`}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{phonePrimary}</span>
            </a>
          )}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-accent" />
              <span>WhatsApp Direct</span>
            </a>
          )}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/track"
            className="inline-flex items-center gap-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
          >
            <Search className="w-3.5 h-3.5 text-accent" />
            <span>Track Cargo Shipment</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};
