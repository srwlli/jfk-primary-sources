-- Create investigations table with UUID and JSONB data
CREATE TABLE investigations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on slug for lookups
CREATE INDEX idx_investigations_slug ON investigations(slug);

-- Enable Row Level Security
ALTER TABLE investigations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON investigations
  FOR SELECT USING (true);

-- Comment
COMMENT ON TABLE investigations IS 'Official investigations into the JFK assassination';
