import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  incrementalCache: () => import('@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache').then((m) => m.default),
  tagCache: () => import('@opennextjs/cloudflare/overrides/tag-cache/kv-next-tag-cache').then((m) => m.default),
  enableCacheInterception: true,
});
