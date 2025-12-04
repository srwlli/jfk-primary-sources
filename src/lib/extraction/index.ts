// Document extraction orchestrator
// Coordinates PDF extraction, OCR, and metadata parsing

import { extractTextFromPDF, checkPDFNeedsOCR, PDFExtractionResult } from './pdf-extractor'
import { extractTextFromImage, extractTextFromImages, OCRResult, terminateOCRWorker, checkImageQuality } from './ocr-extractor'
import { parseMetadata, ExtractedMetadata } from './metadata-parser'
import { DocumentAgency } from '@/types/document'

export interface ExtractionResult {
  success: boolean
  metadata: ExtractedMetadata
  rawText: string
  overallConfidence: number
  extractionMethod: 'pdf_text' | 'pdf_ocr' | 'image_ocr' | 'text_file'
  warnings: string[]
  processingTime: number
}

export interface ExtractionProgress {
  stage: 'detecting' | 'extracting_text' | 'running_ocr' | 'parsing_metadata' | 'complete'
  progress: number // 0-100
  message: string
}

type ProgressCallback = (progress: ExtractionProgress) => void

/**
 * Main extraction function - handles any supported file type
 */
export async function extractDocumentMetadata(
  file: File,
  onProgress?: ProgressCallback
): Promise<ExtractionResult> {
  const startTime = Date.now()
  const warnings: string[] = []

  onProgress?.({
    stage: 'detecting',
    progress: 0,
    message: 'Detecting file type...'
  })

  const fileType = detectFileType(file)
  let rawText = ''
  let extractionMethod: ExtractionResult['extractionMethod'] = 'text_file'

  try {
    switch (fileType) {
      case 'pdf':
        const pdfResult = await extractFromPDF(file, onProgress)
        rawText = pdfResult.text
        extractionMethod = pdfResult.method
        if (pdfResult.warnings.length > 0) {
          warnings.push(...pdfResult.warnings)
        }
        break

      case 'image':
        const imageResult = await extractFromImage(file, onProgress)
        rawText = imageResult.text
        extractionMethod = 'image_ocr'
        if (imageResult.confidence < 60) {
          warnings.push('OCR confidence is low - please verify extracted text')
        }
        break

      case 'text':
        rawText = await extractFromTextFile(file, onProgress)
        extractionMethod = 'text_file'
        break

      default:
        throw new Error(`Unsupported file type: ${file.type}`)
    }

    onProgress?.({
      stage: 'parsing_metadata',
      progress: 80,
      message: 'Parsing metadata from text...'
    })

    // Parse metadata from extracted text
    const metadata = parseMetadata(rawText, file.name)

    // Calculate overall confidence
    const overallConfidence = calculateOverallConfidence(metadata)

    // Add warnings for low-confidence fields
    if (metadata.title.confidence < 50) {
      warnings.push('Title could not be reliably extracted')
    }
    if (metadata.date.confidence < 50) {
      warnings.push('Date could not be reliably extracted')
    }
    if (metadata.agency.confidence < 50) {
      warnings.push('Agency could not be reliably identified')
    }

    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Extraction complete'
    })

    return {
      success: true,
      metadata,
      rawText,
      overallConfidence,
      extractionMethod,
      warnings,
      processingTime: Date.now() - startTime
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      metadata: {
        title: { value: null, confidence: 0, source: 'error' },
        date: { value: null, confidence: 0, source: 'error' },
        agency: { value: null, confidence: 0, source: 'error' },
        documentNumber: { value: null, confidence: 0, source: 'error' }
      },
      rawText: '',
      overallConfidence: 0,
      extractionMethod: 'text_file',
      warnings: [`Extraction failed: ${errorMessage}`],
      processingTime: Date.now() - startTime
    }
  }
}

/**
 * Detect file type from MIME type and extension
 */
function detectFileType(file: File): 'pdf' | 'image' | 'text' | 'unknown' {
  const mimeType = file.type.toLowerCase()
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (mimeType === 'application/pdf' || extension === 'pdf') {
    return 'pdf'
  }

  if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'tiff', 'webp', 'gif'].includes(extension || '')) {
    return 'image'
  }

  if (mimeType.startsWith('text/') || ['txt', 'md', 'text'].includes(extension || '')) {
    return 'text'
  }

  return 'unknown'
}

/**
 * Extract text from PDF (with OCR fallback if needed)
 */
async function extractFromPDF(
  file: File,
  onProgress?: ProgressCallback
): Promise<{ text: string; method: 'pdf_text' | 'pdf_ocr'; warnings: string[] }> {
  const warnings: string[] = []

  onProgress?.({
    stage: 'extracting_text',
    progress: 10,
    message: 'Extracting text from PDF...'
  })

  // First try to extract text directly
  const pdfResult = await extractTextFromPDF(file, {
    maxPages: 5, // Process up to 5 pages
    renderForOCR: true
  })

  // Check if we got meaningful text
  if (pdfResult.hasTextLayer && pdfResult.text.length > 100) {
    return {
      text: pdfResult.text,
      method: 'pdf_text',
      warnings
    }
  }

  // Need OCR - check if we have page images
  const pagesNeedingOCR = pdfResult.pages.filter(p => !p.hasText && p.imageDataUrl)

  if (pagesNeedingOCR.length === 0) {
    warnings.push('PDF appears to be scanned but could not render pages for OCR')
    return {
      text: pdfResult.text,
      method: 'pdf_text',
      warnings
    }
  }

  onProgress?.({
    stage: 'running_ocr',
    progress: 30,
    message: `Running OCR on ${pagesNeedingOCR.length} page(s)...`
  })

  // Run OCR on pages that need it
  const imageUrls = pagesNeedingOCR.map(p => p.imageDataUrl!)
  const ocrResults = await extractTextFromImages(imageUrls, (current, total, pageProgress) => {
    const overallProgress = 30 + ((current - 1) / total * 50) + (pageProgress / total * 0.5)
    onProgress?.({
      stage: 'running_ocr',
      progress: Math.round(overallProgress),
      message: `OCR: Processing page ${current} of ${total}...`
    })
  })

  // Combine OCR text with any existing text
  let combinedText = ''
  let ocrIndex = 0

  for (const page of pdfResult.pages) {
    if (page.hasText) {
      combinedText += page.text + '\n\n'
    } else if (ocrIndex < ocrResults.length) {
      combinedText += ocrResults[ocrIndex].text + '\n\n'
      ocrIndex++
    }
  }

  // Calculate average OCR confidence
  const avgConfidence = ocrResults.reduce((sum, r) => sum + r.confidence, 0) / ocrResults.length
  if (avgConfidence < 60) {
    warnings.push(`OCR confidence is low (${Math.round(avgConfidence)}%) - document may be difficult to read`)
  }

  return {
    text: combinedText.trim(),
    method: 'pdf_ocr',
    warnings
  }
}

/**
 * Extract text from image using OCR
 */
async function extractFromImage(
  file: File,
  onProgress?: ProgressCallback
): Promise<OCRResult> {
  // Check image quality first
  const quality = checkImageQuality(file)
  if (!quality.suitable) {
    throw new Error(quality.reason || 'Image not suitable for OCR')
  }

  onProgress?.({
    stage: 'running_ocr',
    progress: 20,
    message: 'Running OCR on image...'
  })

  const result = await extractTextFromImage(file, (progress) => {
    onProgress?.({
      stage: 'running_ocr',
      progress: 20 + (progress * 0.6),
      message: `OCR progress: ${progress}%`
    })
  })

  return result
}

/**
 * Extract text from plain text file
 */
async function extractFromTextFile(
  file: File,
  onProgress?: ProgressCallback
): Promise<string> {
  onProgress?.({
    stage: 'extracting_text',
    progress: 50,
    message: 'Reading text file...'
  })

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read text file'))
    reader.readAsText(file)
  })
}

/**
 * Calculate overall confidence from individual field confidences
 */
function calculateOverallConfidence(metadata: ExtractedMetadata): number {
  const weights = {
    title: 0.3,
    date: 0.25,
    agency: 0.25,
    documentNumber: 0.2
  }

  const weightedSum =
    metadata.title.confidence * weights.title +
    metadata.date.confidence * weights.date +
    metadata.agency.confidence * weights.agency +
    metadata.documentNumber.confidence * weights.documentNumber

  return Math.round(weightedSum)
}

/**
 * Batch extraction for multiple files
 */
export async function extractDocumentMetadataBatch(
  files: File[],
  onProgress?: (current: number, total: number, result: ExtractionResult) => void
): Promise<ExtractionResult[]> {
  const results: ExtractionResult[] = []

  for (let i = 0; i < files.length; i++) {
    const result = await extractDocumentMetadata(files[i])
    results.push(result)
    onProgress?.(i + 1, files.length, result)
  }

  // Clean up OCR worker after batch processing
  await terminateOCRWorker()

  return results
}

/**
 * Get supported file types for UI
 */
export function getSupportedFileTypes(): string[] {
  return [
    '.pdf',
    '.png',
    '.jpg',
    '.jpeg',
    '.tiff',
    '.webp',
    '.txt'
  ]
}

/**
 * Check if a file type is supported
 */
export function isFileTypeSupported(file: File): boolean {
  const type = detectFileType(file)
  return type !== 'unknown'
}

// Re-export types and utilities
export type { ExtractedMetadata } from './metadata-parser'
export { parseMetadata } from './metadata-parser'
export { terminateOCRWorker } from './ocr-extractor'
