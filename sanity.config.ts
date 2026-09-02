import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { resolve } from './sanity/presentation/resolve';
import { apiVersion, dataset, projectId, isSanityConfigured } from './sanity/env';

function getPreviewOrigin(): string {
  if (process.env.SANITY_STUDIO_PREVIEW_URL) return process.env.SANITY_STUDIO_PREVIEW_URL;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:3000';
  }
  return 'https://cargo.raahiinternational4.workers.dev';
}

export default defineConfig({
  basePath: '/',
  name: 'raahi_cargo_studio',
  title: 'Raahi International CMS Studio',
  projectId: isSanityConfigured ? projectId : 'vst9vvau',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: getPreviewOrigin(),
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
