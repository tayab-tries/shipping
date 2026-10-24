import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'vst9vvau',
  dataset: dataset || 'production',
  apiVersion,
  // Off so pages re-rendered after a publish webhook never read a stale CDN copy
  useCdn: false,
  stega: {
    studioUrl: 'https://raahi-international.sanity.studio',
  },
});
