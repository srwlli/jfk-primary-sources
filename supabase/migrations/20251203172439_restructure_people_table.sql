-- Restructure people table with UUID, split names, and split birthplace

-- Drop existing table and recreate with new structure
DROP TABLE IF EXISTS people;

CREATE TABLE people (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,

  -- Name fields
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,

  -- Display name (computed or stored for convenience)
  display_name TEXT GENERATED ALWAYS AS (
    CASE
      WHEN middle_name IS NOT NULL THEN first_name || ' ' || middle_name || ' ' || last_name
      ELSE first_name || ' ' || last_name
    END
  ) STORED,

  -- Description
  description TEXT NOT NULL,

  -- Dates
  birth DATE,
  death DATE,

  -- Birthplace (split into components)
  birth_city TEXT,
  birth_state TEXT,
  birth_country TEXT,

  -- Other info
  occupation TEXT,
  background TEXT,

  -- Related data (JSONB arrays)
  documents JSONB DEFAULT '[]'::jsonb,
  events JSONB DEFAULT '[]'::jsonb,
  connections JSONB DEFAULT '[]'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_people_slug ON people(slug);
CREATE INDEX idx_people_last_name ON people(last_name);
CREATE INDEX idx_people_display_name ON people(display_name);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON people
  FOR SELECT USING (true);

-- Comments
COMMENT ON TABLE people IS 'Key figures related to the JFK assassination';
COMMENT ON COLUMN people.slug IS 'URL-friendly identifier for routing';
COMMENT ON COLUMN people.display_name IS 'Auto-generated full name for display';
