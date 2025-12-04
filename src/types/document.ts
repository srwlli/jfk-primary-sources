// Document types for the document library

export type DocumentCategory =
  | 'testimony'      // Witness testimony, depositions
  | 'report'         // Official reports (Warren Report, HSCA, etc.)
  | 'memo'           // Internal memos, communications
  | 'correspondence' // Letters, telegrams
  | 'photograph'     // Photos, images
  | 'evidence'       // Physical evidence documentation
  | 'transcript'     // Interview transcripts, recordings
  | 'affidavit'      // Sworn statements
  | 'autopsy'        // Medical/autopsy reports
  | 'other'

export type DocumentAgency =
  | 'fbi'            // Federal Bureau of Investigation
  | 'cia'            // Central Intelligence Agency
  | 'secret_service' // U.S. Secret Service
  | 'dpd'            // Dallas Police Department
  | 'dso'            // Dallas Sheriff's Office
  | 'usmc'           // U.S. Marine Corps
  | 'state_dept'     // State Department
  | 'warren'         // Warren Commission
  | 'hsca'           // House Select Committee on Assassinations
  | 'arrb'           // Assassination Records Review Board
  | 'nara'           // National Archives
  | 'other'

export interface DocumentMetadata {
  // Core identifiers
  id: string
  slug: string

  // Basic info
  title: string
  description?: string
  date?: string              // Document date (e.g., "1963-11-22", "November 1963")

  // Classification
  category: DocumentCategory
  agency: DocumentAgency
  agency_other?: string      // If agency is 'other', specify here

  // Source info
  source?: string            // Original source/archive
  document_number?: string   // Original document ID/number
  pages?: number             // Number of pages

  // File info
  file_url?: string          // Supabase Storage URL
  file_type?: string         // pdf, jpg, png, txt
  file_size?: number         // Bytes

  // Content
  summary?: string           // Brief summary of contents
  transcript?: string        // Full text transcript if available

  // Related entities (slugs)
  related_people?: string[]
  related_locations?: string[]
  related_incidents?: string[]
  related_investigations?: string[]

  // Timestamps
  created_at?: string
  updated_at?: string
}

export interface Document extends DocumentMetadata {
  // Database row structure matches metadata
}

// Helper for agency display names
export const agencyDisplayNames: Record<DocumentAgency, string> = {
  fbi: 'FBI',
  cia: 'CIA',
  secret_service: 'Secret Service',
  dpd: 'Dallas Police Department',
  dso: "Dallas Sheriff's Office",
  usmc: 'U.S. Marine Corps',
  state_dept: 'State Department',
  warren: 'Warren Commission',
  hsca: 'HSCA',
  arrb: 'ARRB',
  nara: 'National Archives',
  other: 'Other'
}

// Helper for category display names
export const categoryDisplayNames: Record<DocumentCategory, string> = {
  testimony: 'Testimony',
  report: 'Report',
  memo: 'Memo',
  correspondence: 'Correspondence',
  photograph: 'Photograph',
  evidence: 'Evidence',
  transcript: 'Transcript',
  affidavit: 'Affidavit',
  autopsy: 'Autopsy Report',
  other: 'Other'
}

// Category icons (Material Symbols)
export const categoryIcons: Record<DocumentCategory, string> = {
  testimony: 'record_voice_over',
  report: 'description',
  memo: 'sticky_note_2',
  correspondence: 'mail',
  photograph: 'photo_camera',
  evidence: 'inventory_2',
  transcript: 'article',
  affidavit: 'gavel',
  autopsy: 'medical_information',
  other: 'draft'
}
