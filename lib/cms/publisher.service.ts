import { createClient } from '@/lib/supabase/server';
import { revalidateCmsEntity } from './revalidation.service';

export interface PublishResult {
  success: boolean;
  error?: string;
  revisionId?: string;
  revalidatedPaths?: string[];
}

/**
 * Central CMS Publisher Service
 * 
 * 1. Validates Admin role authorization.
 * 2. Computes sequential content revision version numbers.
 * 3. Records a content revision snapshot in Supabase DB.
 * 4. Logs action in audit_logs.
 * 5. Executes targeted On-Demand ISR revalidation via revalidatePath() for affected public routes.
 */
export async function publishCmsEntity(
  entityType: 'homepage' | 'navigation' | 'page' | 'article' | 'location' | 'destination' | 'credential' | 'business',
  entityId: string,
  snapshotData: Record<string, unknown>,
  adminUserId: string
): Promise<PublishResult> {
  try {
    const supabase = await createClient();

    // 1. Verify Active Admin Role & Security
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role, is_active')
      .eq('id', adminUserId)
      .single();

    if (!profile || !profile.is_active || profile.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized: Only active Admin role users may publish content and revalidate public routes.',
      };
    }

    // 2. Compute Next Version Number for Content Revision Snapshot
    const { data: existingRevisions } = await supabase
      .from('content_revisions')
      .select('version_number')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('version_number', { ascending: false })
      .limit(1);

    const nextVersion = existingRevisions && existingRevisions[0]
      ? existingRevisions[0].version_number + 1
      : 1;

    // 3. Create Content Revision Snapshot
    const { data: revision, error: revError } = await supabase
      .from('content_revisions')
      .insert({
        entity_type: entityType,
        entity_id: entityId,
        version_number: nextVersion,
        snapshot_data: snapshotData,
        created_by: adminUserId,
        published_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (revError) {
      console.error('Failed to create content revision:', revError.message);
    }

    // 4. Create Audit Log Entry
    await supabase.from('audit_logs').insert({
      admin_user_id: adminUserId,
      action: 'content_published',
      entity_type: entityType,
      entity_id: entityId,
      metadata: {
        version_number: nextVersion,
        published_at: new Date().toISOString(),
      },
    });

    // 5. Execute Targeted On-Demand ISR Route Revalidation
    let revalidatedPaths: string[] = [];
    try {
      const revalResult = await revalidateCmsEntity(entityType, entityId, snapshotData);
      revalidatedPaths = revalResult.revalidatedPaths;
    } catch (revalErr: unknown) {
      const msg = revalErr instanceof Error ? revalErr.message : 'Revalidation exception';
      console.error('On-Demand ISR Revalidation error:', msg);
    }

    return {
      success: true,
      revisionId: revision?.id,
      revalidatedPaths,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown exception publishing entity';
    console.error('publishCmsEntity exception:', msg);
    return { success: false, error: msg };
  }
}

export async function restoreCmsRevision(
  revisionId: string,
  adminUserId: string
): Promise<PublishResult> {
  try {
    const supabase = await createClient();

    const { data: revision } = await supabase
      .from('content_revisions')
      .select('*')
      .eq('id', revisionId)
      .single();

    if (!revision) {
      return { success: false, error: 'Revision record not found.' };
    }

    // Restoring creates a NEW version snapshot and triggers publication & revalidation
    return publishCmsEntity(
      revision.entity_type as 'homepage' | 'navigation' | 'page' | 'article' | 'location' | 'destination' | 'credential' | 'business',
      revision.entity_id,
      revision.snapshot_data,
      adminUserId
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown exception restoring revision';
    return { success: false, error: msg };
  }
}
