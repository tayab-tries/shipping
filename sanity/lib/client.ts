import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'a1b2c3d4',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    studioUrl: '/studio',
  },
});
