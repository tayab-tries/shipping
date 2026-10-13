-- ============================================================================
-- RAAHI INTERNATIONAL — COMPLETE UNIFIED SUPABASE PRODUCTION DATABASE SCHEMA
-- Target: Supabase Postgres (Auth, Storage, RLS, Edge APIs, Tracking, Admin)
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. EXTENSIONS
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. UTILITY FUNCTIONS & TRIGGERS
-- ----------------------------------------------------------------------------

-- Automatic updated_at timestamp refresher
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Admin role verification function (bypasses RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles 
    WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
  );
$$;

-- Active admin verification function
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles 
    WHERE id = auth.uid() 
      AND is_active = true
      AND role IN ('admin', 'editor')
  );
$$;

-- ----------------------------------------------------------------------------
-- 2. ADMIN PROFILES & AUTHORIZATION
-- Links directly to Supabase Auth users (auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger for admin_profiles updated_at
DROP TRIGGER IF EXISTS trg_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER trg_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 3. GLOBAL BUSINESS SETTINGS & CONTACT INFORMATION
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL DEFAULT 'Raahi International',
  legal_name TEXT DEFAULT 'Raahi International Logistics (Pvt) Ltd',
  phone_primary TEXT DEFAULT '+92 300 7097063',
  whatsapp_number TEXT DEFAULT '+92 300 7097063',
  email_info TEXT DEFAULT 'raahiinternational4@gmail.com',
  email_quotes TEXT DEFAULT 'quotes@raahiinternational.com',
  operating_hours TEXT DEFAULT 'Mon - Sat: 09:00 AM - 07:00 PM PKT',
  verified_offices JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 4. PAKISTAN ORIGIN HUBS & RECEIVING LOCATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  hub_address TEXT,
  phone_local TEXT,
  email_local TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  services_offered JSONB DEFAULT '[]'::jsonb,
  verified_branches JSONB DEFAULT '[]'::jsonb,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_locations_updated_at ON public.locations;
CREATE TRIGGER trg_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 5. INTERNATIONAL DESTINATION COUNTRIES & CITIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.destination_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  iso_code TEXT,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  customs_summary TEXT,
  prohibited_items JSONB DEFAULT '[]'::jsonb,
  required_docs JSONB DEFAULT '[]'::jsonb,
  supported_origins JSONB DEFAULT '["Karachi", "Lahore", "Islamabad", "Sialkot", "Faisalabad"]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_dest_countries_updated_at ON public.destination_countries;
CREATE TRIGGER trg_dest_countries_updated_at
  BEFORE UPDATE ON public.destination_countries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.destination_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES public.destination_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  transit_time_air TEXT DEFAULT '3-5 Business Days',
  transit_time_sea TEXT DEFAULT '20-30 Days',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(country_id, slug)
);

DROP TRIGGER IF EXISTS trg_dest_cities_updated_at ON public.destination_cities;
CREATE TRIGGER trg_dest_cities_updated_at
  BEFORE UPDATE ON public.destination_cities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 6. SHIPMENT TRACKING & MILESTONE ENGINE (PHASE A)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  current_status VARCHAR(50) NOT NULL DEFAULT 'booked' 
    CHECK (current_status IN ('booked', 'received_at_hub', 'in_transit', 'customs_cleared', 'out_for_delivery', 'delivered', 'on_hold')),
  origin_city VARCHAR(100) NOT NULL,
  origin_country VARCHAR(100) NOT NULL DEFAULT 'Pakistan',
  destination_city VARCHAR(100) NOT NULL,
  destination_country VARCHAR(100) NOT NULL,
  cargo_type VARCHAR(50) NOT NULL DEFAULT 'air_freight'
    CHECK (cargo_type IN ('air_freight', 'sea_cargo', 'door_to_door', 'commercial_freight', 'excess_baggage')),
  estimated_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_shipments_updated_at ON public.shipments;
CREATE TRIGGER trg_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.shipment_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location_name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 7. SHIPMENT QUOTE REQUESTS & LEAD PIPELINE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference TEXT UNIQUE NOT NULL,
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
  contact_preference TEXT NOT NULL DEFAULT 'whatsapp' CHECK (contact_preference IN ('whatsapp', 'phone', 'email')),
  origin_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  destination_city TEXT,
  cargo_type TEXT NOT NULL,
  estimated_weight_kg NUMERIC NOT NULL,
  package_count INT DEFAULT 1,
  length_cm INT,
  width_cm INT,
  height_cm INT,
  cargo_description TEXT NOT NULL,
  additional_notes TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'archived')),
  internal_notes TEXT,
  assigned_admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notification_status TEXT DEFAULT 'pending',
  customer_notification_status TEXT DEFAULT 'pending',
  email_attempt_count INT DEFAULT 0,
  email_error_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_quotes_updated_at ON public.quotes;
CREATE TRIGGER trg_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 8. CMS ARTICLES, GUIDES & DOCUMENTATION
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  excerpt TEXT,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'guides',
  reading_time_minutes INT DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_articles_updated_at ON public.articles;
CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 9. FREQUENTLY ASKED QUESTIONS (FAQS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 10. PERMANENT 301/308 REDIRECT MANIFEST
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 11. MEDIA & ASSET REGISTRY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_size INT NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 12. CONTENT REVISIONS & AUDIT LOGGING
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  version_number INT NOT NULL,
  snapshot_data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(entity_type, entity_id, version_number)
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 13. NO-CODE HOMEPAGE BLOCKS & CMS PAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homepage_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key TEXT NOT NULL UNIQUE,
  block_title TEXT NOT NULL,
  block_subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_homepage_blocks_updated_at ON public.homepage_blocks;
CREATE TRIGGER trg_homepage_blocks_updated_at
  BEFORE UPDATE ON public.homepage_blocks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_location TEXT NOT NULL CHECK (menu_location IN ('header', 'footer', 'topbar')),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(menu_location)
);

CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content_markdown TEXT NOT NULL DEFAULT '',
  sections JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_cms_pages_updated_at ON public.cms_pages;
CREATE TRIGGER trg_cms_pages_updated_at
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 14. COMPANY CREDENTIALS & LICENSES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuing_authority TEXT NOT NULL,
  license_number TEXT,
  verification_url TEXT,
  badge_image_url TEXT,
  display_order INT DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON public.shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_shipment_id ON public.shipment_updates(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_event_timestamp ON public.shipment_updates(event_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_quotes_quote_reference ON public.quotes(quote_reference);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.locations(slug);
CREATE INDEX IF NOT EXISTS idx_destination_countries_slug ON public.destination_countries(slug);
CREATE INDEX IF NOT EXISTS idx_destination_cities_slug ON public.destination_cities(slug);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON public.cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_redirects_source_path ON public.redirects(source_path);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Drop existing policies to ensure clean idempotent run
-- ----------------------------------------------------------------------------
DO $$ 
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT policyname, tablename 
    FROM pg_policies 
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- ----------------------------------------------------------------------------
-- 1. Service Role Bypass (Cloudflare Workers & Backend APIs)
-- ----------------------------------------------------------------------------
CREATE POLICY "Service Role Full Access admin_profiles" ON public.admin_profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access business_settings" ON public.business_settings FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access locations" ON public.locations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access destination_countries" ON public.destination_countries FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access destination_cities" ON public.destination_cities FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access shipments" ON public.shipments FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access shipment_updates" ON public.shipment_updates FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access quotes" ON public.quotes FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access articles" ON public.articles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access faqs" ON public.faqs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access redirects" ON public.redirects FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access media" ON public.media FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access content_revisions" ON public.content_revisions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access audit_logs" ON public.audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access homepage_blocks" ON public.homepage_blocks FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access site_navigation" ON public.site_navigation FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access cms_pages" ON public.cms_pages FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access credentials" ON public.credentials FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 2. Authenticated Active Admin Policies (Dashboard & Management)
-- ----------------------------------------------------------------------------
CREATE POLICY "Admin User Read Own Profile" ON public.admin_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Active Admin All admin_profiles" ON public.admin_profiles FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All business_settings" ON public.business_settings FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All locations" ON public.locations FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All destination_countries" ON public.destination_countries FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All destination_cities" ON public.destination_cities FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All shipments" ON public.shipments FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All shipment_updates" ON public.shipment_updates FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All quotes" ON public.quotes FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All articles" ON public.articles FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All faqs" ON public.faqs FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All redirects" ON public.redirects FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All media" ON public.media FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All content_revisions" ON public.content_revisions FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All audit_logs" ON public.audit_logs FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All homepage_blocks" ON public.homepage_blocks FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All site_navigation" ON public.site_navigation FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All cms_pages" ON public.cms_pages FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());
CREATE POLICY "Active Admin All credentials" ON public.credentials FOR ALL TO authenticated USING (is_active_admin()) WITH CHECK (is_active_admin());

-- ----------------------------------------------------------------------------
-- 3. Public Read & Quote Submission Policies
-- ----------------------------------------------------------------------------

-- Public anonymous quote submission (Form on /quote)
CREATE POLICY "Public Insert Quotes" ON public.quotes FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public tracking query (Form on /track)
CREATE POLICY "Public Read Shipments" ON public.shipments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public Read Shipment Updates" ON public.shipment_updates FOR SELECT TO anon, authenticated USING (true);

-- Public published content reads
CREATE POLICY "Public Read Business Settings" ON public.business_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public Read Locations" ON public.locations FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public Read Destination Countries" ON public.destination_countries FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public Read Destination Cities" ON public.destination_cities FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public Read Redirects" ON public.redirects FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public Read Homepage Blocks" ON public.homepage_blocks FOR SELECT TO anon, authenticated USING (is_enabled = true);
CREATE POLICY "Public Read Site Navigation" ON public.site_navigation FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public Read CMS Pages" ON public.cms_pages FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public Read Credentials" ON public.credentials FOR SELECT TO anon, authenticated USING (is_verified = true);

-- ============================================================================
-- STARTER SEED DATA
-- ============================================================================

-- 1. Default Business Settings (if not already set)
INSERT INTO public.business_settings (
  brand_name, legal_name, phone_primary, whatsapp_number, email_info, email_quotes, operating_hours
)
SELECT 
  'Raahi International',
  'Raahi International Logistics',
  '+92 300 7097063',
  '+92 300 7097063',
  'raahiinternational4@gmail.com',
  'quotes@raahiinternational.com',
  'Mon - Sat: 09:00 AM - 07:00 PM PKT'
WHERE NOT EXISTS (SELECT 1 FROM public.business_settings LIMIT 1);

-- 2. Demo Tracking Shipment (for verifying /track immediately)
DO $$
DECLARE
  v_shipment_id UUID;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.shipments WHERE tracking_number = 'RAAHI-UK-2026-001') THEN
    INSERT INTO public.shipments (
      tracking_number,
      current_status,
      origin_city,
      origin_country,
      destination_city,
      destination_country,
      cargo_type,
      estimated_delivery
    ) VALUES (
      'RAAHI-UK-2026-001',
      'in_transit',
      'Lahore',
      'Pakistan',
      'London',
      'United Kingdom',
      'air_freight',
      NOW() + INTERVAL '3 days'
    ) RETURNING id INTO v_shipment_id;

    INSERT INTO public.shipment_updates (
      shipment_id, status, location_name, description, event_timestamp
    ) VALUES
      (v_shipment_id, 'booked', 'Lahore Hub', 'Shipment booking confirmed and customs documentation generated.', NOW() - INTERVAL '2 days'),
      (v_shipment_id, 'received_at_hub', 'Allama Iqbal International (LHE)', 'Cargo received, weighed, and palletized at air freight terminal.', NOW() - INTERVAL '1 day'),
      (v_shipment_id, 'in_transit', 'Air Linehaul (PK-757)', 'Departed linehaul hub in transit to London Heathrow (LHR).', NOW() - INTERVAL '6 hours');
  END IF;
END $$;

-- ============================================================================
-- INSTRUCTIONS FOR FIRST ADMIN USER SETUP
-- ============================================================================
-- 1. Create a user via Supabase Dashboard -> Authentication -> Users -> Add User
-- 2. Once created, copy the user's UUID from the dashboard.
-- 3. Run the following command in SQL Editor (replacing YOUR_USER_UUID_HERE):
--
-- INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
-- VALUES (
--   'YOUR_USER_UUID_HERE',
--   'your-admin-email@example.com',
--   'Admin Name',
--   'admin',
--   true
-- ) ON CONFLICT (id) DO UPDATE SET is_active = true, role = 'admin';
-- ============================================================================
