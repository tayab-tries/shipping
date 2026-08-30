'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';
import { BLOCK_DEFINITIONS, BlockType } from '@/lib/cms/block-registry';

export interface HomepageBlockInput {
  id: string;
  type: BlockType;
  label: string;
  enabled: boolean;
  sortOrder: number;
  contentData: Record<string, unknown>;
}

const defaultBlocks: HomepageBlockInput[] = [
  { id: 'blk-1', type: 'hero', label: BLOCK_DEFINITIONS.hero.label, enabled: true, sortOrder: 1, contentData: { ...BLOCK_DEFINITIONS.hero.defaultData } },
  { id: 'blk-2', type: 'quick_quote', label: BLOCK_DEFINITIONS.quick_quote.label, enabled: true, sortOrder: 2, contentData: { ...BLOCK_DEFINITIONS.quick_quote.defaultData } },
  { id: 'blk-3', type: 'services', label: BLOCK_DEFINITIONS.services.label, enabled: true, sortOrder: 3, contentData: { ...BLOCK_DEFINITIONS.services.defaultData } },
  { id: 'blk-4', type: 'locations', label: BLOCK_DEFINITIONS.locations.label, enabled: true, sortOrder: 4, contentData: { ...BLOCK_DEFINITIONS.locations.defaultData } },
  { id: 'blk-5', type: 'destinations', label: BLOCK_DEFINITIONS.destinations.label, enabled: true, sortOrder: 5, contentData: { ...BLOCK_DEFINITIONS.destinations.defaultData } },
  { id: 'blk-6', type: 'process', label: BLOCK_DEFINITIONS.process.label, enabled: true, sortOrder: 6, contentData: { ...BLOCK_DEFINITIONS.process.defaultData } },
  { id: 'blk-7', type: 'trust', label: BLOCK_DEFINITIONS.trust.label, enabled: true, sortOrder: 7, contentData: { ...BLOCK_DEFINITIONS.trust.defaultData } },
  { id: 'blk-8', type: 'guides', label: BLOCK_DEFINITIONS.guides.label, enabled: true, sortOrder: 8, contentData: { ...BLOCK_DEFINITIONS.guides.defaultData } },
  { id: 'blk-9', type: 'faq', label: BLOCK_DEFINITIONS.faq.label, enabled: true, sortOrder: 9, contentData: { ...BLOCK_DEFINITIONS.faq.defaultData } },
  { id: 'blk-10', type: 'cta', label: BLOCK_DEFINITIONS.cta.label, enabled: true, sortOrder: 10, contentData: { ...BLOCK_DEFINITIONS.cta.defaultData } },
];

export async function getHomepageBlocksAction() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('homepage_blocks')
      .select('*')
      .order('display_order', { ascending: true });

    if (data && data.length > 0) {
      const formatted: HomepageBlockInput[] = data.map((b) => ({
        id: b.id,
        type: b.block_key as BlockType,
        label: b.block_title,
        enabled: b.is_enabled,
        sortOrder: b.display_order,
        contentData: (b.content as Record<string, unknown>) || {},
      }));
      return { success: true, data: formatted };
    }
  } catch (err: unknown) {
    console.error('getHomepageBlocksAction error:', err);
  }
  return { success: true, data: defaultBlocks };
}

export async function saveAndPublishHomepageBlocksAction(
  blocks: HomepageBlockInput[]
): Promise<PublishResult> {
  try {
    const supabase = await createClient();

    // 1. Verify authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return { success: false, error: 'Unauthorized: User authentication required.' };
    }

    // 2. Fetch active admin profile
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, role, is_active')
      .eq('id', userData.user.id)
      .single();

    if (!profile || !profile.is_active || profile.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish homepage blocks.' };
    }

    // 3. Upsert blocks into homepage_blocks table
    for (const b of blocks) {
      await supabase.from('homepage_blocks').upsert(
        {
          block_key: b.type,
          block_title: b.label,
          display_order: b.sortOrder,
          is_enabled: b.enabled,
          content: b.contentData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'block_key' }
      );
    }

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'homepage',
      'main-homepage',
      { blocks } as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving homepage blocks.';
    return { success: false, error: msg };
  }
}
