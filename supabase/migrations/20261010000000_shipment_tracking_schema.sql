-- 1. Shipments Table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  current_status VARCHAR(50) NOT NULL DEFAULT 'booked', -- booked, in_transit, customs_cleared, out_for_delivery, delivered, on_hold
  origin_city VARCHAR(100) NOT NULL,
  origin_country VARCHAR(100) NOT NULL DEFAULT 'Pakistan',
  destination_city VARCHAR(100) NOT NULL,
  destination_country VARCHAR(100) NOT NULL,
  cargo_type VARCHAR(50) NOT NULL DEFAULT 'air_freight',
  estimated_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Shipment Milestone Updates Table
CREATE TABLE IF NOT EXISTS shipment_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location_name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_shipment_id ON shipment_updates(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_updates_event_timestamp ON shipment_updates(event_timestamp DESC);

-- Enable RLS
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_updates ENABLE ROW LEVEL SECURITY;

-- Public Read Policy: Allow anonymous lookup of shipment details
DROP POLICY IF EXISTS "Public Read Shipments" ON shipments;
CREATE POLICY "Public Read Shipments" ON shipments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Shipment Updates" ON shipment_updates;
CREATE POLICY "Public Read Shipment Updates" ON shipment_updates FOR SELECT USING (true);

-- Admin Full Access: Rely on service role or admin profile
DROP POLICY IF EXISTS "Service Role Full Access Shipments" ON shipments;
CREATE POLICY "Service Role Full Access Shipments" ON shipments FOR ALL TO service_role USING (true);

DROP POLICY IF EXISTS "Service Role Full Access Updates" ON shipment_updates;
CREATE POLICY "Service Role Full Access Updates" ON shipment_updates FOR ALL TO service_role USING (true);
