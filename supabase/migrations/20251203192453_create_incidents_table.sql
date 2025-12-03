-- Create incidents table with UUID and JSONB data
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on slug for lookups
CREATE INDEX idx_incidents_slug ON incidents(slug);

-- Enable Row Level Security
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON incidents
  FOR SELECT USING (true);

-- Comment
COMMENT ON TABLE incidents IS 'Key incidents related to the JFK assassination';
