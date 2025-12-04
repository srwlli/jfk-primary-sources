// Metadata parsing from extracted text
// Extracts title, date, agency, and document number using pattern matching

import { DocumentAgency } from '@/types/document'

export interface ExtractedMetadata {
  title: MetadataField
  date: MetadataField
  agency: MetadataField<DocumentAgency>
  documentNumber: MetadataField
}

export interface MetadataField<T = string> {
  value: T | null
  confidence: number // 0-100
  source: string // Where/how it was extracted
  alternatives?: T[]
}

/**
 * Extract all metadata from text
 */
export function parseMetadata(text: string, filename?: string): ExtractedMetadata {
  return {
    title: extractTitle(text, filename),
    date: extractDate(text),
    agency: extractAgency(text),
    documentNumber: extractDocumentNumber(text)
  }
}

/**
 * Extract document title
 */
export function extractTitle(text: string, filename?: string): MetadataField {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)

  // Strategy 1: Look for prominent first lines (often titles)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i]
    // Skip lines that look like headers/letterheads
    if (isAgencyHeader(line)) continue
    if (line.match(/^(date|from|to|subject|re|memorandum|classification):/i)) continue

    // Good title candidates: reasonable length, starts with capital
    if (line.length > 10 && line.length < 200 && /^[A-Z]/.test(line)) {
      // Check if it's likely a title (not a sentence fragment)
      if (!line.endsWith(',') && !line.match(/^\d+\./)) {
        return {
          value: cleanTitle(line),
          confidence: 80,
          source: 'first_prominent_line'
        }
      }
    }
  }

  // Strategy 2: Look for "Subject:" or "Re:" lines
  const subjectMatch = text.match(/(?:subject|re):\s*(.+?)(?:\n|$)/i)
  if (subjectMatch) {
    return {
      value: cleanTitle(subjectMatch[1]),
      confidence: 90,
      source: 'subject_line'
    }
  }

  // Strategy 3: Look for "TITLE:" explicitly
  const titleMatch = text.match(/title:\s*(.+?)(?:\n|$)/i)
  if (titleMatch) {
    return {
      value: cleanTitle(titleMatch[1]),
      confidence: 95,
      source: 'title_field'
    }
  }

  // Strategy 4: Use filename as fallback
  if (filename) {
    const cleanName = filename
      .replace(/\.[^.]+$/, '') // Remove extension
      .replace(/[-_]/g, ' ')   // Replace dashes/underscores with spaces
      .replace(/\s+/g, ' ')    // Normalize spaces
      .trim()

    if (cleanName.length > 3) {
      return {
        value: cleanName,
        confidence: 50,
        source: 'filename'
      }
    }
  }

  return {
    value: null,
    confidence: 0,
    source: 'not_found'
  }
}

/**
 * Extract date from text
 */
export function extractDate(text: string): MetadataField {
  const dates: { value: string; confidence: number; source: string }[] = []

  // Pattern 1: Full date formats (November 22, 1963 or Nov 22, 1963)
  const fullDatePattern = /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2}),?\s+(\d{4})\b/gi
  let match
  while ((match = fullDatePattern.exec(text)) !== null) {
    dates.push({
      value: normalizeDate(match[0]),
      confidence: 95,
      source: 'full_date_text'
    })
  }

  // Pattern 2: Numeric dates (11/22/1963, 11-22-1963, 1963-11-22)
  const numericPattern = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g
  while ((match = numericPattern.exec(text)) !== null) {
    dates.push({
      value: normalizeNumericDate(match[0]),
      confidence: 85,
      source: 'numeric_date'
    })
  }

  // Pattern 3: ISO format (1963-11-22)
  const isoPattern = /\b(\d{4})-(\d{2})-(\d{2})\b/g
  while ((match = isoPattern.exec(text)) !== null) {
    dates.push({
      value: match[0],
      confidence: 95,
      source: 'iso_date'
    })
  }

  // Pattern 4: Look for "Date:" prefix
  const dateFieldPattern = /date:\s*([^\n]+)/i
  const dateFieldMatch = text.match(dateFieldPattern)
  if (dateFieldMatch) {
    const dateText = dateFieldMatch[1].trim()
    // Try to parse the date text
    const parsedDate = tryParseDate(dateText)
    if (parsedDate) {
      dates.unshift({ // Put at front as high priority
        value: parsedDate,
        confidence: 90,
        source: 'date_field'
      })
    }
  }

  // Return best date found
  if (dates.length > 0) {
    // Sort by confidence, take best
    dates.sort((a, b) => b.confidence - a.confidence)
    return {
      value: dates[0].value,
      confidence: dates[0].confidence,
      source: dates[0].source,
      alternatives: dates.slice(1, 4).map(d => d.value)
    }
  }

  return {
    value: null,
    confidence: 0,
    source: 'not_found'
  }
}

/**
 * Extract agency from text
 */
export function extractAgency(text: string): MetadataField<DocumentAgency> {
  const upperText = text.toUpperCase()

  // Agency patterns with confidence scores
  const agencyPatterns: { pattern: RegExp; agency: DocumentAgency; confidence: number }[] = [
    // FBI
    { pattern: /FEDERAL BUREAU OF INVESTIGATION/i, agency: 'fbi', confidence: 95 },
    { pattern: /\bF\.?B\.?I\.?\b/, agency: 'fbi', confidence: 90 },
    { pattern: /\bFBI\b/, agency: 'fbi', confidence: 85 },

    // CIA
    { pattern: /CENTRAL INTELLIGENCE AGENCY/i, agency: 'cia', confidence: 95 },
    { pattern: /\bC\.?I\.?A\.?\b/, agency: 'cia', confidence: 90 },
    { pattern: /\bCIA\b/, agency: 'cia', confidence: 85 },

    // Secret Service
    { pattern: /UNITED STATES SECRET SERVICE/i, agency: 'secret_service', confidence: 95 },
    { pattern: /U\.?S\.?\s*SECRET SERVICE/i, agency: 'secret_service', confidence: 90 },
    { pattern: /\bSECRET SERVICE\b/i, agency: 'secret_service', confidence: 85 },

    // Dallas Police Department
    { pattern: /DALLAS POLICE DEPARTMENT/i, agency: 'dpd', confidence: 95 },
    { pattern: /DALLAS P\.?D\.?/i, agency: 'dpd', confidence: 85 },
    { pattern: /\bDPD\b/, agency: 'dpd', confidence: 75 },

    // Dallas Sheriff's Office
    { pattern: /DALLAS (COUNTY )?SHERIFF/i, agency: 'dso', confidence: 90 },

    // U.S. Marine Corps
    { pattern: /UNITED STATES MARINE CORPS/i, agency: 'usmc', confidence: 95 },
    { pattern: /U\.?S\.?\s*MARINE CORPS/i, agency: 'usmc', confidence: 90 },
    { pattern: /\bUSMC\b/, agency: 'usmc', confidence: 85 },
    { pattern: /\bMARINES?\b/i, agency: 'usmc', confidence: 60 },

    // State Department
    { pattern: /DEPARTMENT OF STATE/i, agency: 'state_dept', confidence: 95 },
    { pattern: /STATE DEPARTMENT/i, agency: 'state_dept', confidence: 90 },

    // Warren Commission
    { pattern: /WARREN COMMISSION/i, agency: 'warren', confidence: 95 },
    { pattern: /PRESIDENT'?S COMMISSION/i, agency: 'warren', confidence: 85 },

    // HSCA
    { pattern: /HOUSE SELECT COMMITTEE ON ASSASSINATIONS/i, agency: 'hsca', confidence: 95 },
    { pattern: /\bHSCA\b/, agency: 'hsca', confidence: 90 },

    // ARRB
    { pattern: /ASSASSINATION RECORDS REVIEW BOARD/i, agency: 'arrb', confidence: 95 },
    { pattern: /\bARRB\b/, agency: 'arrb', confidence: 90 },

    // NARA
    { pattern: /NATIONAL ARCHIVES/i, agency: 'nara', confidence: 90 },
    { pattern: /\bNARA\b/, agency: 'nara', confidence: 85 },
  ]

  const matches: { agency: DocumentAgency; confidence: number }[] = []

  for (const { pattern, agency, confidence } of agencyPatterns) {
    if (pattern.test(upperText)) {
      // Boost confidence if found in first 500 chars (likely letterhead)
      const boostConfidence = pattern.test(upperText.substring(0, 500)) ? 5 : 0
      matches.push({ agency, confidence: Math.min(100, confidence + boostConfidence) })
    }
  }

  if (matches.length > 0) {
    // Sort by confidence, take best
    matches.sort((a, b) => b.confidence - a.confidence)
    return {
      value: matches[0].agency,
      confidence: matches[0].confidence,
      source: 'keyword_match',
      alternatives: [...new Set(matches.slice(1).map(m => m.agency))]
    }
  }

  return {
    value: null,
    confidence: 0,
    source: 'not_found'
  }
}

/**
 * Extract document number/ID
 */
export function extractDocumentNumber(text: string): MetadataField {
  const numbers: { value: string; confidence: number; source: string }[] = []

  // Pattern 1: File No. or File # patterns
  const fileNoPattern = /(?:file\s*(?:no\.?|#|number))\s*[:.]?\s*([\w\-\/]+)/gi
  let match
  while ((match = fileNoPattern.exec(text)) !== null) {
    numbers.push({
      value: match[1].trim(),
      confidence: 90,
      source: 'file_number'
    })
  }

  // Pattern 2: Document No. patterns
  const docNoPattern = /(?:doc(?:ument)?\s*(?:no\.?|#|number))\s*[:.]?\s*([\w\-\/]+)/gi
  while ((match = docNoPattern.exec(text)) !== null) {
    numbers.push({
      value: match[1].trim(),
      confidence: 90,
      source: 'document_number'
    })
  }

  // Pattern 3: Reference patterns (Ref:, Reference:)
  const refPattern = /(?:ref(?:erence)?)\s*[:.]?\s*([\w\-\/]+)/gi
  while ((match = refPattern.exec(text)) !== null) {
    numbers.push({
      value: match[1].trim(),
      confidence: 80,
      source: 'reference'
    })
  }

  // Pattern 4: Common government document number formats
  // e.g., 105-82555, CE-399, CD-1
  const govPattern = /\b([A-Z]{1,3}[-\s]?\d{1,6}(?:[-\/]\d+)?)\b/g
  const upperText = text.substring(0, 2000) // Search first part only
  while ((match = govPattern.exec(upperText)) !== null) {
    const num = match[1]
    // Filter out common false positives
    if (!isLikelyFalsePositive(num)) {
      numbers.push({
        value: num,
        confidence: 70,
        source: 'pattern_match'
      })
    }
  }

  if (numbers.length > 0) {
    // Sort by confidence and take best
    numbers.sort((a, b) => b.confidence - a.confidence)
    return {
      value: numbers[0].value,
      confidence: numbers[0].confidence,
      source: numbers[0].source,
      alternatives: numbers.slice(1, 4).map(n => n.value)
    }
  }

  return {
    value: null,
    confidence: 0,
    source: 'not_found'
  }
}

// Helper functions

function isAgencyHeader(line: string): boolean {
  const agencyHeaders = [
    /federal bureau of investigation/i,
    /central intelligence agency/i,
    /department of/i,
    /office of/i,
    /united states/i,
  ]
  return agencyHeaders.some(p => p.test(line))
}

function cleanTitle(title: string): string {
  return title
    .replace(/^(subject|re|title):\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeDate(dateStr: string): string {
  // Try to parse and format consistently
  const months: Record<string, string> = {
    'january': '01', 'jan': '01',
    'february': '02', 'feb': '02',
    'march': '03', 'mar': '03',
    'april': '04', 'apr': '04',
    'may': '05',
    'june': '06', 'jun': '06',
    'july': '07', 'jul': '07',
    'august': '08', 'aug': '08',
    'september': '09', 'sep': '09', 'sept': '09',
    'october': '10', 'oct': '10',
    'november': '11', 'nov': '11',
    'december': '12', 'dec': '12'
  }

  const match = dateStr.match(/(\w+)\.?\s+(\d{1,2}),?\s+(\d{4})/i)
  if (match) {
    const month = months[match[1].toLowerCase()]
    const day = match[2].padStart(2, '0')
    const year = match[3]
    if (month) {
      return `${year}-${month}-${day}`
    }
  }

  return dateStr
}

function normalizeNumericDate(dateStr: string): string {
  const match = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (match) {
    const month = match[1].padStart(2, '0')
    const day = match[2].padStart(2, '0')
    const year = match[3]
    return `${year}-${month}-${day}`
  }
  return dateStr
}

function tryParseDate(text: string): string | null {
  // Try various date parsing approaches
  const cleanText = text.trim()

  // Full date pattern
  const fullMatch = cleanText.match(/(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2}),?\s+(\d{4})/i)
  if (fullMatch) {
    return normalizeDate(fullMatch[0])
  }

  // Numeric pattern
  const numMatch = cleanText.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (numMatch) {
    return normalizeNumericDate(numMatch[0])
  }

  return null
}

function isLikelyFalsePositive(num: string): boolean {
  // Common false positives to filter out
  const falsePositives = [
    /^P\.?\s*\d+$/i,  // Page numbers
    /^PG[-\s]?\d+$/i, // Page numbers
    /^[A-Z][-\s]?1$/i, // Single letter-1 patterns
  ]
  return falsePositives.some(p => p.test(num))
}
