import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const whatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-full shadow-2xl transition-all border border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-2 min-h-[48px]"
      aria-label="Chat with Raahi International on WhatsApp"
    >
      <MessageSquare className="w-5 h-5 text-white shrink-0 fill-current" />
      <span className="font-semibold tracking-wide">WhatsApp Us</span>
    </a>
  );
};
