import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import d1NextTagCache from '@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache';
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue';

// Writable cache so Sanity publishes go live without a redeploy:
// pages live in KV (fronted by the Cache API), and /api/revalidate marks them stale in D1.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: 'long-lived' }),
  tagCache: d1NextTagCache,
  queue: memoryQueue,
});
