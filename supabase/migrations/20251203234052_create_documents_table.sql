-- Create documents table for primary source document library
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,

  -- Basic info
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,  -- Document date (flexible format: "1963-11-22", "November 1963")

  -- Classification
  category TEXT NOT NULL DEFAULT 'other',
  agency TEXT NOT NULL DEFAULT 'other',
  agency_other TEXT,  -- If agency is 'other', specify here

  -- Source info
  source TEXT,           -- Original source/archive
  document_number TEXT,  -- Original document ID/number
  pages INTEGER,         -- Number of pages

  -- File info
  file_url TEXT,         -- Supabase Storage URL
  file_type TEXT,        -- pdf, jpg, png, txt
  file_size BIGINT,      -- Bytes

  -- Content
  summary TEXT,          -- Brief summary of contents
  transcript TEXT,       -- Full text transcript if available

  -- Related entities (stored as JSONB arrays of slugs)
  related_people JSONB DEFAULT '[]',
  related_locations JSONB DEFAULT '[]',
  related_incidents JSONB DEFAULT '[]',
  related_investigations JSONB DEFAULT '[]',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_documents_slug ON documents(slug);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_agency ON documents(agency);
CREATE INDEX idx_documents_date ON documents(date);
CREATE INDEX idx_documents_title ON documents(title);

-- Full-text search index on title, description, summary, transcript
CREATE INDEX idx_documents_search ON documents
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(transcript, '')));

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access" ON documents
  FOR SELECT USING (true);

-- Authenticated users can insert/update/delete (for admin interface)
CREATE POLICY "Allow authenticated insert" ON documents
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON documents
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON documents
  FOR DELETE TO authenticated USING (true);

-- Comment
COMMENT ON TABLE documents IS 'Primary source documents related to the JFK assassination';
COMMENT ON COLUMN documents.category IS 'Document type: testimony, report, memo, correspondence, photograph, evidence, transcript, affidavit, autopsy, other';
COMMENT ON COLUMN documents.agency IS 'Originating agency: fbi, cia, secret_service, dpd, dso, usmc, state_dept, warren, hsca, arrb, nara, other';
