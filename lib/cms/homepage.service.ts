import { createClient } from '@supabase/supabase-js';
import { BLOCK_DEFINITIONS, BlockType } from './block-registry';

export interface HomepageBlockData {
  id: string;
  type: BlockType;
  label: string;
  enabled: boolean;
  sortOrder: number;
  contentData: Record<string, unknown>;
}

export async function getPublishedHomepageBlocks(): Promise<Record<BlockType, HomepageBlockData>> {
  const result: Record<string, HomepageBlockData> = {};

  // 1. Initialize all block types with safe defaults
  Object.keys(BLOCK_DEFINITIONS).forEach((key) => {
    const blockKey = key as BlockType;
    const def = BLOCK_DEFINITIONS[blockKey];
    result[blockKey] = {
      id: `blk-${blockKey}`,
      type: blockKey,
      label: def.label,
      enabled: true,
      sortOrder: 1,
      contentData: { ...def.defaultData },
    };
  });

  // 2. Fetch published block content from Supabase via public client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('homepage_blocks')
        .select('*')
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        data.forEach((row) => {
          const blockKey = row.block_key as BlockType;
          if (BLOCK_DEFINITIONS[blockKey]) {
            result[blockKey] = {
              id: row.id,
              type: blockKey,
              label: row.block_title || BLOCK_DEFINITIONS[blockKey].label,
              enabled: row.is_enabled ?? true,
              sortOrder: row.display_order ?? 1,
              contentData: {
                ...BLOCK_DEFINITIONS[blockKey].defaultData,
                ...((row.content as Record<string, unknown>) || {}),
              },
            };
          }
        });
      }
    } catch (err: unknown) {
      console.error('getPublishedHomepageBlocks error (using fallback defaults):', err);
    }
  }

  return result as Record<BlockType, HomepageBlockData>;
}
