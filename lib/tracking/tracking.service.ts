import { TrackingInput } from './tracking.schema';
import { sanitizeShipmentRecord } from './tracking.sanitizer';
import { PublicTrackingResponse } from '@/types/tracking';
import { createClient as createServerSupabase } from '@/lib/supabase/server';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

export async function getPublicTrackingDetails(
  input: TrackingInput
): Promise<PublicTrackingResponse | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Prefer service role client for reliable server-side read if available, else fallback to server SSR client
  let supabase;
  if (supabaseUrl && serviceRoleKey) {
    supabase = createSupabaseJsClient(supabaseUrl, serviceRoleKey);
  } else {
    try {
      supabase = await createServerSupabase();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      console.error('Failed to initialize Supabase client for tracking:', msg);
      return null;
    }
  }

  const { data: shipment, error } = await supabase
    .from('shipments')
    .select(`
      tracking_number,
      current_status,
      origin_city,
      origin_country,
      destination_city,
      destination_country,
      cargo_type,
      estimated_delivery,
      shipment_updates (
        status,
        location_name,
        description,
        event_timestamp,
        created_at
      )
    `)
    .eq('tracking_number', input.trackingNumber)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Supabase tracking lookup error:', error.message);
    }
    return null;
  }

  if (!shipment) {
    return null;
  }

  return sanitizeShipmentRecord(shipment);
}
