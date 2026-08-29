import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export const FloatingWhatsApp: React.FC = () => {
  if (!siteConfig.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, '').replace(/\s+/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center min-h-[48px] min-w-[48px]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-current" />
    </a>
  );
};
