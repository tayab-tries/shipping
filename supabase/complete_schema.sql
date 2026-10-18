-- ============================================================================
-- RAAHI INTERNATIONAL — COMPLETE UNIFIED SUPABASE PRODUCTION DATABASE SCHEMA
-- Target: Supabase Postgres (Auth, Storage, RLS, Edge APIs, Tracking, Admin)
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
--
-- DESIGNED FOR 100% IDEMPOTENCY & AUTOMATIC SELF-HEALING:
-- Safe to run on fresh databases OR existing databases with legacy table states.
-- Automatically repairs missing columns (e.g. is_active, is_published), backfills
-- legacy content, and resets RLS policies cleanly without data loss.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. EXTENSIONS
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. BASE TABLE DEFINITIONS (CREATE TABLE IF NOT EXISTS)
-- ============================================================================

-- 1. Admin Profiles & Authorization (Links directly to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Global Business Settings & Verified Contact Information
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

-- 3. Pakistan Origin Hubs & Receiving Locations
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL DEFAULT 'Punjab',
  h1 TEXT NOT NULL DEFAULT 'Cargo Services',
  meta_title TEXT,
  meta_description TEXT,
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

-- 4. International Destination Countries
CREATE TABLE IF NOT EXISTS public.destination_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  iso_code TEXT,
  h1 TEXT NOT NULL DEFAULT 'Cargo Services',
  meta_title TEXT,
  meta_description TEXT,
  customs_summary TEXT,
  prohibited_items JSONB DEFAULT '[]'::jsonb,
  required_docs JSONB DEFAULT '[]'::jsonb,
  supported_origins JSONB DEFAULT '["Karachi", "Lahore", "Islamabad", "Sialkot", "Faisalabad"]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. International Destination Cities (Sub-Hubs)
CREATE TABLE IF NOT EXISTS public.destination_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES public.destination_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  h1 TEXT NOT NULL DEFAULT 'Cargo Services',
  meta_title TEXT,
  meta_description TEXT,
  transit_time_air TEXT DEFAULT '3-5 Business Days',
  transit_time_sea TEXT DEFAULT '20-30 Days',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Shipment Tracking & Live Milestones (Phase A Engine)
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  current_status VARCHAR(50) NOT NULL DEFAULT 'booked' 
    CHECK (current_status IN ('booked', 'received_at_hub', 'in_transit', 'customs_cleared', 'out_for_delivery', 'delivered', 'on_hold')),
  origin_city VARCHAR(100) NOT NULL DEFAULT 'Lahore',
  origin_country VARCHAR(100) NOT NULL DEFAULT 'Pakistan',
  destination_city VARCHAR(100) NOT NULL DEFAULT 'London',
  destination_country VARCHAR(100) NOT NULL DEFAULT 'United Kingdom',
  cargo_type VARCHAR(50) NOT NULL DEFAULT 'air_freight'
    CHECK (cargo_type IN ('air_freight', 'sea_cargo', 'door_to_door', 'commercial_freight', 'excess_baggage')),
  estimated_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.shipment_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location_name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Shipment Quote Requests & Lead Pipeline
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference TEXT UNIQUE,
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

-- 8. CMS Articles, Guides & Documentation
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  excerpt TEXT,
  content_markdown TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'guides',
  reading_time_minutes INT DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Frequently Asked Questions (FAQs)
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Permanent 301/308 Redirect Manifest
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL DEFAULT '/',
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Media & Asset Registry
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

-- 12. Content Revisions & Audit Logging
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

-- 13. Homepage Blocks & Site Navigation
CREATE TABLE IF NOT EXISTS public.homepage_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key TEXT UNIQUE,
  block_title TEXT NOT NULL DEFAULT '',
  block_subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_location TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Controlled CMS Pages
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  content_markdown TEXT NOT NULL DEFAULT '',
  sections JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. Verified Business Credentials & Accreditations
CREATE TABLE IF NOT EXISTS public.credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  issuing_authority TEXT NOT NULL DEFAULT '',
  license_number TEXT,
  verification_url TEXT,
  badge_image_url TEXT,
  display_order INT DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 2. AUTOMATIC SCHEMA HEALING & COLUMN RECONCILIATION
-- Ensures all columns exist across pre-existing tables from earlier migrations.
-- Resolves ERROR 42703 ("column is_active does not exist") permanently.
-- ============================================================================

-- Admin Profiles
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'editor';
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Business Settings
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS brand_name TEXT NOT NULL DEFAULT 'Raahi International';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS legal_name TEXT DEFAULT 'Raahi International Logistics (Pvt) Ltd';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS phone_primary TEXT DEFAULT '+92 300 7097063';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS whatsapp_number TEXT DEFAULT '+92 300 7097063';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS email_info TEXT DEFAULT 'raahiinternational4@gmail.com';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS email_quotes TEXT DEFAULT 'quotes@raahiinternational.com';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS operating_hours TEXT DEFAULT 'Mon - Sat: 09:00 AM - 07:00 PM PKT';
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS verified_offices JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Locations
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS hub_address TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS phone_local TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS email_local TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS services_offered JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS verified_branches JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Destination Countries
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS iso_code TEXT;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS customs_summary TEXT;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS prohibited_items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS required_docs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS supported_origins JSONB DEFAULT '["Karachi", "Lahore", "Islamabad", "Sialkot", "Faisalabad"]'::jsonb;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.destination_countries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Destination Cities
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS transit_time_air TEXT DEFAULT '3-5 Business Days';
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS transit_time_sea TEXT DEFAULT '20-30 Days';
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.destination_cities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Shipments
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(50);
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS current_status VARCHAR(50) NOT NULL DEFAULT 'booked';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS origin_city VARCHAR(100) NOT NULL DEFAULT 'Lahore';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS origin_country VARCHAR(100) NOT NULL DEFAULT 'Pakistan';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS destination_city VARCHAR(100) NOT NULL DEFAULT 'London';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS destination_country VARCHAR(100) NOT NULL DEFAULT 'United Kingdom';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS cargo_type VARCHAR(50) NOT NULL DEFAULT 'air_freight';
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS estimated_delivery TIMESTAMPTZ;
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Shipment Updates
ALTER TABLE public.shipment_updates ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'booked';
ALTER TABLE public.shipment_updates ADD COLUMN IF NOT EXISTS location_name VARCHAR(150) NOT NULL DEFAULT 'Hub';
ALTER TABLE public.shipment_updates ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
ALTER TABLE public.shipment_updates ADD COLUMN IF NOT EXISTS event_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.shipment_updates ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Quotes
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS quote_reference TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS contact_preference TEXT NOT NULL DEFAULT 'whatsapp';
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS destination_city TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS package_count INT DEFAULT 1;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS length_cm INT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS width_cm INT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS height_cm INT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS additional_notes TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS source_page TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS internal_notes TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS assigned_admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS admin_notification_status TEXT DEFAULT 'pending';
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS customer_notification_status TEXT DEFAULT 'pending';
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS email_attempt_count INT DEFAULT 0;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS email_error_metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS content_markdown TEXT NOT NULL DEFAULT '';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'guides';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reading_time_minutes INT DEFAULT 5;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- FAQs
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'general';
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Redirects
ALTER TABLE public.redirects ADD COLUMN IF NOT EXISTS target_path TEXT NOT NULL DEFAULT '/';
ALTER TABLE public.redirects ADD COLUMN IF NOT EXISTS status_code INT NOT NULL DEFAULT 301;
ALTER TABLE public.redirects ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.redirects ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Media
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS alt_text TEXT;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Content Revisions
ALTER TABLE public.content_revisions ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.content_revisions ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Audit Logs
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Homepage Blocks
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS block_key TEXT;
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS block_title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS block_subtitle TEXT;
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS content JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.homepage_blocks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Site Navigation
ALTER TABLE public.site_navigation ADD COLUMN IF NOT EXISTS menu_location TEXT;
ALTER TABLE public.site_navigation ADD COLUMN IF NOT EXISTS items JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.site_navigation ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- CMS Pages
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS content_markdown TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public.cms_pages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- Credentials
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS issuing_authority TEXT NOT NULL DEFAULT '';
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS license_number TEXT;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS verification_url TEXT;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS badge_image_url TEXT;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- ============================================================================
-- 3. LEGACY DATA HARMONIZATION & BACKFILL
-- Dynamic SQL safely migrates data from deprecated column names to new standard columns
-- ============================================================================
DO $$
BEGIN
  -- 1. Locations: Migrate seo_title, seo_description, branch_address, status
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'locations' AND column_name = 'seo_title') THEN
    EXECUTE 'UPDATE public.locations SET meta_title = seo_title WHERE meta_title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'locations' AND column_name = 'seo_description') THEN
    EXECUTE 'UPDATE public.locations SET meta_description = seo_description WHERE meta_description IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'locations' AND column_name = 'branch_address') THEN
    EXECUTE 'UPDATE public.locations SET hub_address = branch_address WHERE hub_address IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'locations' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.locations SET is_active = (status = ''published'') WHERE is_active IS NULL';
  END IF;

  -- 2. Destination Countries: Migrate seo_title, seo_description, customs_guidance, status
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_countries' AND column_name = 'seo_title') THEN
    EXECUTE 'UPDATE public.destination_countries SET meta_title = seo_title WHERE meta_title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_countries' AND column_name = 'seo_description') THEN
    EXECUTE 'UPDATE public.destination_countries SET meta_description = seo_description WHERE meta_description IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_countries' AND column_name = 'customs_guidance') THEN
    EXECUTE 'UPDATE public.destination_countries SET customs_summary = customs_guidance WHERE customs_summary IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_countries' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.destination_countries SET is_active = (status = ''published'') WHERE is_active IS NULL';
  END IF;

  -- 3. Destination Cities: Migrate seo_title, seo_description, status
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_cities' AND column_name = 'seo_title') THEN
    EXECUTE 'UPDATE public.destination_cities SET meta_title = seo_title WHERE meta_title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_cities' AND column_name = 'seo_description') THEN
    EXECUTE 'UPDATE public.destination_cities SET meta_description = seo_description WHERE meta_description IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'destination_cities' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.destination_cities SET is_active = (status = ''published'') WHERE is_active IS NULL';
  END IF;

  -- 4. Articles: Migrate seo_title, seo_description, status
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'articles' AND column_name = 'seo_title') THEN
    EXECUTE 'UPDATE public.articles SET meta_title = seo_title WHERE meta_title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'articles' AND column_name = 'seo_description') THEN
    EXECUTE 'UPDATE public.articles SET meta_description = seo_description WHERE meta_description IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'articles' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.articles SET is_published = (status = ''published'') WHERE is_published IS NULL';
  END IF;

  -- 5. Homepage Blocks: Migrate legacy block_type, enabled, sort_order, content_data
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'homepage_blocks' AND column_name = 'block_type') THEN
    EXECUTE 'UPDATE public.homepage_blocks SET block_key = block_type WHERE block_key IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'homepage_blocks' AND column_name = 'enabled') THEN
    EXECUTE 'UPDATE public.homepage_blocks SET is_enabled = enabled WHERE is_enabled IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'homepage_blocks' AND column_name = 'sort_order') THEN
    EXECUTE 'UPDATE public.homepage_blocks SET display_order = sort_order WHERE display_order IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'homepage_blocks' AND column_name = 'content_data') THEN
    EXECUTE 'UPDATE public.homepage_blocks SET content = content_data WHERE content IS NULL OR content = ''{}''::jsonb';
  END IF;

  -- 6. Site Navigation: Migrate nav_location
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'site_navigation' AND column_name = 'nav_location') THEN
    EXECUTE 'UPDATE public.site_navigation SET menu_location = nav_location WHERE menu_location IS NULL';
  END IF;

  -- 7. CMS Pages: Migrate seo_title, seo_description, status, blocks
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'cms_pages' AND column_name = 'seo_title') THEN
    EXECUTE 'UPDATE public.cms_pages SET meta_title = seo_title WHERE meta_title = '''' OR meta_title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'cms_pages' AND column_name = 'seo_description') THEN
    EXECUTE 'UPDATE public.cms_pages SET meta_description = seo_description WHERE meta_description = '''' OR meta_description IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'cms_pages' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.cms_pages SET is_published = (status = ''published'') WHERE is_published IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'cms_pages' AND column_name = 'blocks') THEN
    EXECUTE 'UPDATE public.cms_pages SET sections = blocks WHERE sections IS NULL OR sections = ''[]''::jsonb';
  END IF;

  -- 8. Credentials: Migrate name, credential_type, logo_url, sort_order
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'name') THEN
    EXECUTE 'UPDATE public.credentials SET title = name WHERE title = '''' OR title IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'credential_type') THEN
    EXECUTE 'UPDATE public.credentials SET issuing_authority = credential_type WHERE issuing_authority = '''' OR issuing_authority IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'logo_url') THEN
    EXECUTE 'UPDATE public.credentials SET badge_image_url = logo_url WHERE badge_image_url IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'sort_order') THEN
    EXECUTE 'UPDATE public.credentials SET display_order = sort_order WHERE display_order IS NULL';
  END IF;

  -- 9. Quotes: Backfill missing quote references for legacy submissions
  UPDATE public.quotes 
  SET quote_reference = 'QTE-LEGACY-' || REPLACE(id::text, '-', '')
  WHERE quote_reference IS NULL;

  -- 10. Normalize default fallback booleans to avoid NULL values
  UPDATE public.admin_profiles SET is_active = true WHERE is_active IS NULL;
  UPDATE public.locations SET is_active = true WHERE is_active IS NULL;
  UPDATE public.destination_countries SET is_active = true WHERE is_active IS NULL;
  UPDATE public.destination_cities SET is_active = true WHERE is_active IS NULL;
  UPDATE public.articles SET is_published = true WHERE is_published IS NULL;
  UPDATE public.faqs SET is_published = true WHERE is_published IS NULL;
  UPDATE public.redirects SET is_active = true WHERE is_active IS NULL;
  UPDATE public.homepage_blocks SET is_enabled = true WHERE is_enabled IS NULL;
  UPDATE public.cms_pages SET is_published = true WHERE is_published IS NULL;
  UPDATE public.credentials SET is_verified = true WHERE is_verified IS NULL;
END $$;

-- ============================================================================
-- 4. UTILITY FUNCTIONS & TRIGGERS
-- ============================================================================

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

-- Triggers for automatic updated_at timestamp
DROP TRIGGER IF EXISTS trg_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER trg_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_locations_updated_at ON public.locations;
CREATE TRIGGER trg_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_dest_countries_updated_at ON public.destination_countries;
CREATE TRIGGER trg_dest_countries_updated_at
  BEFORE UPDATE ON public.destination_countries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_dest_cities_updated_at ON public.destination_cities;
CREATE TRIGGER trg_dest_cities_updated_at
  BEFORE UPDATE ON public.destination_cities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_shipments_updated_at ON public.shipments;
CREATE TRIGGER trg_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_quotes_updated_at ON public.quotes;
CREATE TRIGGER trg_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_articles_updated_at ON public.articles;
CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_homepage_blocks_updated_at ON public.homepage_blocks;
CREATE TRIGGER trg_homepage_blocks_updated_at
  BEFORE UPDATE ON public.homepage_blocks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_cms_pages_updated_at ON public.cms_pages;
CREATE TRIGGER trg_cms_pages_updated_at
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 5. PERFORMANCE INDEXES & CONSTRAINTS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON public.shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_shipment_id ON public.shipment_updates(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_event_timestamp ON public.shipment_updates(event_timestamp DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_quotes_quote_reference ON public.quotes(quote_reference);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.locations(slug);
CREATE INDEX IF NOT EXISTS idx_destination_countries_slug ON public.destination_countries(slug);
CREATE INDEX IF NOT EXISTS idx_destination_cities_slug ON public.destination_cities(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_destination_cities_country_slug ON public.destination_cities(country_id, slug);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON public.cms_pages(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_redirects_source_path ON public.redirects(source_path);
CREATE UNIQUE INDEX IF NOT EXISTS idx_homepage_blocks_block_key ON public.homepage_blocks(block_key) WHERE block_key IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_site_navigation_menu_location ON public.site_navigation(menu_location) WHERE menu_location IS NOT NULL;

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
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

-- Clean drop of existing policies to ensure clean idempotent run
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

-- 1. Service Role Bypass (Cloudflare Workers, Server Actions & Background APIs)
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

-- 2. Authenticated Active Admin Policies (Admin Dashboard Management)
CREATE POLICY "Admin User Read Own Profile" ON public.admin_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
-- Editors may view the team list, but only strict admins may create, modify, or remove admin accounts/roles
CREATE POLICY "Active Admin Read admin_profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (is_active_admin());
CREATE POLICY "Strict Admin Insert admin_profiles" ON public.admin_profiles FOR INSERT TO authenticated WITH CHECK (is_strict_admin());
CREATE POLICY "Strict Admin Update admin_profiles" ON public.admin_profiles FOR UPDATE TO authenticated USING (is_strict_admin()) WITH CHECK (is_strict_admin());
CREATE POLICY "Strict Admin Delete admin_profiles" ON public.admin_profiles FOR DELETE TO authenticated USING (is_strict_admin());
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

-- 3. Public Read & Quote Submission Policies (Anonymous visitors & frontend clients)
CREATE POLICY "Public Insert Quotes" ON public.quotes FOR INSERT TO anon, authenticated WITH CHECK (true);
-- No public SELECT on shipments / shipment_updates: anonymous tracking goes through get_public_shipment()
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
-- 7. STARTER SEED DATA
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
-- 8. FIRST ADMIN USER SETUP INSTRUCTIONS
-- ============================================================================
-- 1. Create a user via Supabase Dashboard -> Authentication -> Users -> Add User
-- 2. Once created, copy the user's UUID from the dashboard.
-- 3. Run the following command in SQL Editor (replacing YOUR_USER_UUID_HERE and email):
--
-- INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
-- VALUES (
--   'YOUR_USER_UUID_HERE',
--   'admin@raahiinternational.com',
--   'System Administrator',
--   'admin',
--   true
-- ) ON CONFLICT (id) DO UPDATE SET is_active = true, role = 'admin';
-- ============================================================================
