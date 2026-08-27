'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export const FloatingWhatsApp: React.FC = () => {
  const { whatsappNumber, whatsappDefaultMessage } = siteConfig.contact;

  // Do NOT render floating action if whatsappNumber is empty placeholder
  if (!whatsappNumber) {
    return null;
  }

  const encodedMsg = encodeURIComponent(
    whatsappDefaultMessage || 'Hello! I would like to inquire about international cargo shipping.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] group"
    >
      <MessageSquare className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform duration-200" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
};
