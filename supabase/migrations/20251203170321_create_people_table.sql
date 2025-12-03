-- Create people table for key figures in the JFK assassination
CREATE TABLE people (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  birth TEXT,
  death TEXT,
  birth_place TEXT,
  occupation TEXT,
  background TEXT,
  documents JSONB DEFAULT '[]'::jsonb,
  events JSONB DEFAULT '[]'::jsonb,
  connections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_people_name ON people(name);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON people
  FOR SELECT USING (true);

-- Add comment to table
COMMENT ON TABLE people IS 'Key figures related to the JFK assassination';
