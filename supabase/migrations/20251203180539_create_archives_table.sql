-- Create archives table for external archive links
CREATE TABLE archives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX idx_archives_title ON archives(title);

-- Enable Row Level Security
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON archives
  FOR SELECT USING (true);

-- Comment
COMMENT ON TABLE archives IS 'External archive links and resources';
