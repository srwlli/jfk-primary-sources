-- Warren Report sections table
-- Stores chapters, appendices, and other sections from the Warren Commission Report

CREATE TABLE warren_report_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('foreword', 'chapter', 'appendix', 'index')),
  number INTEGER,                          -- 1-8 for chapters, 1-18 for appendices, NULL for foreword/index
  title TEXT NOT NULL,                     -- "Summary and Conclusions"
  slug TEXT UNIQUE NOT NULL,               -- "chapter-1" or "appendix-11"
  content TEXT NOT NULL,                   -- Full HTML content
  word_count INTEGER,                      -- For pagination calculations
  source_url TEXT,                         -- Archives.gov URL
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_warren_report_type ON warren_report_sections(type);
CREATE INDEX idx_warren_report_slug ON warren_report_sections(slug);
CREATE INDEX idx_warren_report_number ON warren_report_sections(type, number);

-- Full-text search on content
CREATE INDEX idx_warren_report_content_search ON warren_report_sections
  USING gin(to_tsvector('english', title || ' ' || content));

-- Enable RLS
ALTER TABLE warren_report_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for warren report"
  ON warren_report_sections FOR SELECT
  TO public
  USING (true);

-- Service role full access for admin operations
CREATE POLICY "Service role full access"
  ON warren_report_sections FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE warren_report_sections IS 'Warren Commission Report content scraped from Archives.gov';
