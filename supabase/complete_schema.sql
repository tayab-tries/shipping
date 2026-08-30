-- ============================================================================
-- CARGO & SHIPPING PLATFORM - COMPLETE UNIFIED SUPABASE SCHEMA
-- ============================================================================
-- Execute this script in the Supabase SQL Editor to provision all tables,
-- functions, constraints, indexes, triggers, and RLS security policies.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ADMIN PROFILES & AUTHORIZATION TABLE
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor', -- 'admin' | 'editor'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. SECURITY DEFINER HELPER FUNCTIONS (Non-recursive admin checks)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role = 'admin' AND is_active = true
  );
$$;

-- ----------------------------------------------------------------------------
-- 3. GLOBAL BUSINESS SETTINGS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  legal_name TEXT,
  phone_primary TEXT,
  whatsapp_number TEXT,
  email_info TEXT,
  operating_hours TEXT,
  verified_offices JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. PAKISTAN LOCATIONS (ORIGIN CITIES)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  has_physical_branch BOOLEAN NOT NULL DEFAULT false,
  branch_address TEXT,
  local_coverage_text TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft' | 'review' | 'published' | 'archived'
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. DESTINATION COUNTRIES & CITIES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  shipping_overview TEXT,
  customs_guidance TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destination_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES destination_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT,
  overview TEXT,
  preparation_considerations TEXT,
  delivery_coverage_notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_country_city_slug UNIQUE (country_id, slug)
);

-- ----------------------------------------------------------------------------
-- 6. ARTICLES & EDUCATIONAL GUIDES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Logistics Editorial Team',
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  canonical_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  contains_regulatory_claims BOOLEAN NOT NULL DEFAULT false,
  search_intent TEXT NOT NULL DEFAULT 'informational', -- 'informational' | 'commercial-investigation' | 'transactional-support'
  primary_topic TEXT,
  target_entity_slug TEXT,
  reading_time_minutes INT NOT NULL DEFAULT 5,
  verification_notes TEXT,
  reference_urls TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. NORMALIZED ENTITY RELATIONSHIP JOIN TABLES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS location_services (
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (location_id, service_slug)
);

CREATE TABLE IF NOT EXISTS location_destinations (
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  PRIMARY KEY (location_id, destination_country_id)
);

CREATE TABLE IF NOT EXISTS destination_services (
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (destination_country_id, service_slug)
);

CREATE TABLE IF NOT EXISTS destination_locations (
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  PRIMARY KEY (destination_country_id, location_id)
);

CREATE TABLE IF NOT EXISTS article_services (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (article_id, service_slug)
);

CREATE TABLE IF NOT EXISTS article_locations (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, location_id)
);

CREATE TABLE IF NOT EXISTS article_destinations (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, destination_country_id)
);

-- ----------------------------------------------------------------------------
-- 8. FAQS & 301 REDIRECTS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  entity_type TEXT NOT NULL DEFAULT 'general',
  entity_slug TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. MEDIA ASSET LIBRARY
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INT NOT NULL,
  alt_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 10. CONTENT REVISIONS & AUDIT LOGS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  version_number INT NOT NULL,
  snapshot_data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 11. QUOTE REQUEST TOOL & TRACKING ENGINE
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference TEXT NOT NULL UNIQUE,
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
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
  contact_preference TEXT DEFAULT 'whatsapp',
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'in_review' | 'quoted' | 'accepted' | 'rejected' | 'archived'
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  internal_notes TEXT,
  assigned_admin_id UUID REFERENCES auth.users(id),
  admin_notification_status TEXT DEFAULT 'pending',
  customer_notification_status TEXT DEFAULT 'pending',
  email_attempt_count INT DEFAULT 0,
  email_error_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 12. NO-CODE CMS EXPANSION TABLES
-- ----------------------------------------------------------------------------

-- Homepage Controlled Blocks
CREATE TABLE IF NOT EXISTS homepage_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_type TEXT NOT NULL, -- 'hero' | 'quick_quote' | 'services' | 'locations' | 'destinations' | 'process' | 'trust' | 'guides' | 'faq' | 'cta'
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  content_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Navigation Manager
CREATE TABLE IF NOT EXISTS site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  nav_location TEXT NOT NULL DEFAULT 'header', -- 'header' | 'footer' | 'topbar'
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  parent_id UUID REFERENCES site_navigation(id) ON DELETE CASCADE,
  open_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Controlled Custom Pages
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft' | 'review' | 'published' | 'archived'
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  canonical_url TEXT,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Verified Business Credentials & Certifications
CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credential_type TEXT NOT NULL DEFAULT 'certification', -- 'registration' | 'certification' | 'association' | 'membership' | 'carrier_network' | 'other'
  logo_url TEXT,
  description TEXT,
  verification_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 13. PERFORMANCE INDEXES
-- ----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_destination_countries_pub 
  ON destination_countries (status, is_verified, is_indexable);

CREATE INDEX IF NOT EXISTS idx_destination_cities_pub 
  ON destination_cities (country_id, status, is_verified, is_indexable);

CREATE INDEX IF NOT EXISTS idx_articles_pub_export 
  ON articles (status, is_verified, is_indexable, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_quotes_status 
  ON quotes (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_quotes_ref 
  ON quotes (quote_reference);

-- ----------------------------------------------------------------------------
-- 14. ROW LEVEL SECURITY (RLS) SECURITY POLICIES
-- ----------------------------------------------------------------------------

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running script
DROP POLICY IF EXISTS "Admin All Access admin_profiles" ON admin_profiles;
DROP POLICY IF EXISTS "Admin All Access business_settings" ON business_settings;
DROP POLICY IF EXISTS "Admin All Access locations" ON locations;
DROP POLICY IF EXISTS "Admin All Access destination_countries" ON destination_countries;
DROP POLICY IF EXISTS "Admin All Access destination_cities" ON destination_cities;
DROP POLICY IF EXISTS "Admin All Access articles" ON articles;
DROP POLICY IF EXISTS "Admin All Access faqs" ON faqs;
DROP POLICY IF EXISTS "Admin All Access redirects" ON redirects;
DROP POLICY IF EXISTS "Admin All Access media" ON media;
DROP POLICY IF EXISTS "Admin All Access content_revisions" ON content_revisions;
DROP POLICY IF EXISTS "Admin All Access audit_logs" ON audit_logs;
DROP POLICY IF EXISTS "Admin All Access quotes" ON quotes;
DROP POLICY IF EXISTS "Admin All Access homepage_blocks" ON homepage_blocks;
DROP POLICY IF EXISTS "Admin All Access site_navigation" ON site_navigation;
DROP POLICY IF EXISTS "Admin All Access cms_pages" ON cms_pages;
DROP POLICY IF EXISTS "Admin All Access credentials" ON credentials;

-- Active Admin access policies
CREATE POLICY "Admin All Access admin_profiles" ON admin_profiles FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access business_settings" ON business_settings FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access locations" ON locations FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access destination_countries" ON destination_countries FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access destination_cities" ON destination_cities FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access articles" ON articles FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access faqs" ON faqs FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access redirects" ON redirects FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access media" ON media FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access content_revisions" ON content_revisions FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access audit_logs" ON audit_logs FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access quotes" ON quotes FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access homepage_blocks" ON homepage_blocks FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access site_navigation" ON site_navigation FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access cms_pages" ON cms_pages FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access credentials" ON credentials FOR ALL USING (is_active_admin());
