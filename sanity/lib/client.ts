import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'vst9vvau',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://raahi-international.sanity.studio',
  },
});
