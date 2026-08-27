import { createBrowserClient } from '@supabase/ssr';

/**
 * Automatically logs a 301 redirect entry when an article slug is modified.
 */
export async function handleArticleSlugChange(
  oldSlug: string,
  newSlug: string
): Promise<void> {
  if (oldSlug && newSlug && oldSlug !== newSlug) {
    const sourcePath = `/guides/${oldSlug}`;
    const targetPath = `/guides/${newSlug}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createBrowserClient(supabaseUrl, supabaseKey);
        await supabase.from('redirects').upsert({
          source_path: sourcePath,
          target_path: targetPath,
          status_code: 301,
        });
      } catch (err) {
        console.warn('Failed to log automatic 301 slug redirect:', err);
      }
    }
  }
}
