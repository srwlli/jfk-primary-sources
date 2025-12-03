-- Create themes table to store application themes
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  fonts JSONB,
  light JSONB NOT NULL,
  dark JSONB NOT NULL,
  border_radius JSONB,
  transitions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on name for lookups
CREATE INDEX idx_themes_name ON themes(name);

-- Index on is_active for finding active theme
CREATE INDEX idx_themes_active ON themes(is_active) WHERE is_active = TRUE;

-- Enable Row Level Security
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON themes
  FOR SELECT USING (true);

-- Comment
COMMENT ON TABLE themes IS 'Application themes with light/dark mode color schemes';
