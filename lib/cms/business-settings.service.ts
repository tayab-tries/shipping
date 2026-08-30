import { createClient } from '@supabase/supabase-js';
import { siteConfig } from '@/config/site.config';

export interface PublishedBusinessSettings {
  brandName: string;
  legalName: string;
  phonePrimary: string;
  whatsappNumber: string;
  emailInfo: string;
  operatingHours: string;
}

const defaultPhone = siteConfig.phone || '+92 300 1234567';
const defaultEmail = siteConfig.contact?.emailInfo || 'info@cargo-shipping.pk';

export async function getPublishedBusinessSettings(): Promise<PublishedBusinessSettings> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('business_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (data) {
        return {
          brandName: data.brand_name || siteConfig.name,
          legalName: data.legal_name || siteConfig.name,
          phonePrimary: data.phone_primary || defaultPhone,
          whatsappNumber: data.whatsapp_number || defaultPhone,
          emailInfo: data.email_info || defaultEmail,
          operatingHours: data.operating_hours || 'Mon - Sat: 09:00 - 18:00 (PKT)',
        };
      }
    } catch (err: unknown) {
      console.error('getPublishedBusinessSettings fetch error:', err);
    }
  }

  return {
    brandName: siteConfig.name,
    legalName: siteConfig.name,
    phonePrimary: defaultPhone,
    whatsappNumber: defaultPhone,
    emailInfo: defaultEmail,
    operatingHours: 'Mon - Sat: 09:00 - 18:00 (PKT)',
  };
}
