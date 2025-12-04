-- Create locations table for Points of Interest
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT,
  description TEXT,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'USA',
  address TEXT,
  coordinates JSONB,
  significance TEXT,
  events JSONB DEFAULT '[]'::jsonb,
  current_status TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  related_people JSONB DEFAULT '[]'::jsonb,
  related_incidents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for city grouping
CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_country ON locations(country);

-- Enable RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON locations
  FOR SELECT USING (true);
