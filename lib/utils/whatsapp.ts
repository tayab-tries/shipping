import { siteConfig } from '@/config/site.config';

/**
 * Clean & sanitize WhatsApp phone number to digits only (e.g. "+92 300 1234567" -> "923001234567")
 */
export function sanitizeWhatsappNumber(rawNumber?: string): string {
  const num = rawNumber || siteConfig.contact?.whatsappNumber || siteConfig.whatsapp || siteConfig.phone || '923001234567';
  const cleaned = num.replace(/[^0-9]/g, '');
  return cleaned || '923001234567';
}

/**
 * Generate a prefilled WhatsApp URL dynamically with the admin-configured WhatsApp number
 */
export function buildWhatsappUrl(rawNumber?: string, customMessage?: string): string {
  const sanitized = sanitizeWhatsappNumber(rawNumber);
  const message = encodeURIComponent(
    customMessage || 'Assalam o Alaikum, I want to send cargo from Pakistan. Please give me a quote.'
  );
  return `https://wa.me/${sanitized}?text=${message}`;
}
