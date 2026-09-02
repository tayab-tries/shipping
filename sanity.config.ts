import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { resolve } from './sanity/presentation/resolve';
import { apiVersion, dataset, projectId, isSanityConfigured } from './sanity/env';

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
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
