-- ============================================================================
-- PATCH 2026-10-18 — RLS HARDENING
-- Apply to an existing database in the Supabase SQL Editor. Idempotent.
-- Mirrors the same changes in supabase/complete_schema.sql.
--
-- 1. Editors can no longer write admin_profiles (blocks editor -> admin escalation).
-- 2. Removes anonymous SELECT on shipments / shipment_updates; public tracking
--    now goes through get_public_shipment(tracking_number) (exact match only).
-- ============================================================================

BEGIN;

-- Strict admin verification function (role = 'admin' only; editors excluded)
-- Gates all writes to admin_profiles so editors cannot escalate their own role.
CREATE OR REPLACE FUNCTION public.is_strict_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles
    WHERE id = auth.uid()
      AND is_active = true
      AND role = 'admin'
  );
$$;

-- Public tracking lookup (exact tracking number match only)
-- Shipments have no anonymous SELECT policy; this is the only public read path,
-- so the tables cannot be enumerated with the publishable key.
CREATE OR REPLACE FUNCTION public.get_public_shipment(p_tracking_number TEXT)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'tracking_number', s.tracking_number,
    'current_status', s.current_status,
    'origin_city', s.origin_city,
    'origin_country', s.origin_country,
    'destination_city', s.destination_city,
    'destination_country', s.destination_country,
    'cargo_type', s.cargo_type,
    'estimated_delivery', s.estimated_delivery,
    'shipment_updates', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'status', u.status,
        'location_name', u.location_name,
        'description', u.description,
        'event_timestamp', u.event_timestamp,
        'created_at', u.created_at
      ) ORDER BY u.event_timestamp)
      FROM public.shipment_updates u
      WHERE u.shipment_id = s.id
    ), '[]'::jsonb)
  )
  FROM public.shipments s
  WHERE length(btrim(p_tracking_number)) BETWEEN 1 AND 50
    AND s.tracking_number = p_tracking_number;
$$;

REVOKE ALL ON FUNCTION public.get_public_shipment(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_shipment(TEXT) TO anon, authenticated, service_role;

-- Admin profile write access: strict admins only (editors keep read access)
DROP POLICY IF EXISTS "Active Admin All admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Active Admin Read admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Strict Admin Insert admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Strict Admin Update admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Strict Admin Delete admin_profiles" ON public.admin_profiles;
CREATE POLICY "Active Admin Read admin_profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (is_active_admin());
CREATE POLICY "Strict Admin Insert admin_profiles" ON public.admin_profiles FOR INSERT TO authenticated WITH CHECK (is_strict_admin());
CREATE POLICY "Strict Admin Update admin_profiles" ON public.admin_profiles FOR UPDATE TO authenticated USING (is_strict_admin()) WITH CHECK (is_strict_admin());
CREATE POLICY "Strict Admin Delete admin_profiles" ON public.admin_profiles FOR DELETE TO authenticated USING (is_strict_admin());

-- Shipments: remove open anonymous reads
DROP POLICY IF EXISTS "Public Read Shipments" ON public.shipments;
DROP POLICY IF EXISTS "Public Read Shipment Updates" ON public.shipment_updates;

COMMIT;
