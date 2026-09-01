import { createClient } from '@supabase/supabase-js';

export interface LocationData {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
  faqs: Array<{ question: string; answer: string }>;
}

// ZERO seeded/default location records in codebase
export const staticLocations: LocationData[] = [];

export async function getPublishedLocations(): Promise<LocationData[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (data && data.length > 0) {
        return data.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          province: b.province || 'Pakistan',
          h1: b.h1 || `Cargo Services in ${b.name}`,
          seoTitle: b.meta_title || `Cargo Shipping ${b.name}`,
          seoDescription: b.meta_description || `Cargo shipping in ${b.name}`,
          introduction: b.meta_description || `Cargo shipping in ${b.name}`,
          serviceAvailable: true,
          collectionAvailable: true,
          hasPhysicalBranch: false,
          branchAddress: b.hub_address || '',
          localCoverageText: b.hub_address || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedDestinations: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
          faqs: b.faqs || [],
        }));
      }
    } catch (err: unknown) {
      console.error('getPublishedLocations fetch error:', err);
    }
  }

  return staticLocations;
}

export async function getLocationBySlug(slug: string): Promise<LocationData | undefined> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          province: data.province || 'Pakistan',
          h1: data.h1 || `Cargo Services in ${data.name}`,
          seoTitle: data.meta_title || `Cargo Shipping ${data.name}`,
          seoDescription: data.meta_description || `Cargo shipping in ${data.name}`,
          introduction: data.meta_description || `Cargo shipping in ${data.name}`,
          serviceAvailable: true,
          collectionAvailable: true,
          hasPhysicalBranch: false,
          branchAddress: data.hub_address || '',
          localCoverageText: data.hub_address || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedDestinations: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
          faqs: data.faqs || [],
        };
      }
    } catch (err: unknown) {
      console.error('getLocationBySlug fetch error:', err);
    }
  }

  return staticLocations.find((l) => l.slug === slug);
}

export function getPublishedStaticLocations(): LocationData[] {
  return staticLocations.filter(
    (loc) => loc.status === 'published' && loc.isVerified === true && loc.isIndexable === true
  );
}

export function getStaticLocationBySlug(slug: string): LocationData | undefined {
  const loc = staticLocations.find((l) => l.slug === slug);
  if (loc && loc.status === 'published' && loc.isVerified === true) {
    return loc;
  }
  return undefined;
}
