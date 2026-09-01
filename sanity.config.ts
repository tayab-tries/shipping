import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { apiVersion, dataset, projectId, isSanityConfigured } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'raahi_cargo_studio',
  title: 'Raahi International CMS Studio',
  projectId: isSanityConfigured ? projectId : 'a1b2c3d4',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
