'use server';

import { createClient } from '@/lib/supabase/server';
import { publishCmsEntity, PublishResult } from '@/lib/cms/publisher.service';

export interface HeaderNavItemInput {
  title: string;
  href: string;
}

export interface FooterNavGroupInput {
  title: string;
  items: { label: string; href: string }[];
}

export interface SiteNavigationData {
  header: HeaderNavItemInput[];
  footer: FooterNavGroupInput[];
}

export async function getSiteNavigationAction(): Promise<{ success: boolean; data?: SiteNavigationData }> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_navigation').select('*');

    if (data && data.length > 0) {
      const headerItem = data.find((d) => d.menu_location === 'header');
      const footerItem = data.find((d) => d.menu_location === 'footer');

      return {
        success: true,
        data: {
          header: (headerItem?.items as HeaderNavItemInput[]) || [],
          footer: (footerItem?.items as FooterNavGroupInput[]) || [],
        },
      };
    }
  } catch (err: unknown) {
    console.error('getSiteNavigationAction error:', err);
  }

  return {
    success: true,
    data: {
      header: [],
      footer: [],
    },
  };
}

export async function saveAndPublishSiteNavigationAction(
  navData: SiteNavigationData
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
      return { success: false, error: 'Unauthorized: Only active Admin role users may publish navigation.' };
    }

    // 3. Upsert header and footer navigation menus
    await supabase.from('site_navigation').upsert(
      {
        menu_location: 'header',
        items: navData.header,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'menu_location' }
    );

    await supabase.from('site_navigation').upsert(
      {
        menu_location: 'footer',
        items: navData.footer,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'menu_location' }
    );

    // 4. Trigger publish entity revision & Cloudflare Deploy Hook
    return await publishCmsEntity(
      'navigation',
      'main-navigation',
      navData as unknown as Record<string, unknown>,
      profile.id
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving site navigation.';
    return { success: false, error: msg };
  }
}
