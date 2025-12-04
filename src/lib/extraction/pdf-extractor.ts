// PDF text extraction using pdf.js
// Handles both text-based PDFs and renders scanned PDFs to images for OCR
// Note: This module must only be used on the client-side

import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

// Dynamic import for client-side only
let pdfjsLib: typeof import('pdfjs-dist') | null = null
let pdfjsInitialized = false

async function getPdfjs() {
  if (typeof window === 'undefined') {
    throw new Error('PDF extraction is only available in the browser')
  }

  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist')
    if (!pdfjsInitialized) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      pdfjsInitialized = true
    }
  }
  return pdfjsLib
}

export interface PDFExtractionResult {
  text: string
  pageCount: number
  hasTextLayer: boolean
  pages: PageResult[]
}

export interface PageResult {
  pageNumber: number
  text: string
  hasText: boolean
  imageDataUrl?: string // For pages that need OCR
}

/**
 * Extract text from a PDF file
 * Returns text content and flags if OCR might be needed
 */
export async function extractTextFromPDF(
  file: File,
  options: { maxPages?: number; renderForOCR?: boolean } = {}
): Promise<PDFExtractionResult> {
  const { maxPages = 3, renderForOCR = true } = options
  const pdfjs = await getPdfjs()

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise

  const pageCount = pdf.numPages
  const pagesToProcess = Math.min(pageCount, maxPages)
  const pages: PageResult[] = []
  let fullText = ''
  let hasAnyText = false

  for (let i = 1; i <= pagesToProcess; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()

    // Extract text from text layer
    const pageText = textContent.items
      .map((item: unknown) => {
        const textItem = item as { str?: string }
        return textItem.str || ''
      })
      .join(' ')
      .trim()

    const hasText = pageText.length > 50 // Consider pages with very little text as image-based

    if (hasText) {
      hasAnyText = true
    }

    const pageResult: PageResult = {
      pageNumber: i,
      text: pageText,
      hasText
    }

    // If page has no text and we need OCR, render to image
    if (!hasText && renderForOCR && typeof document !== 'undefined') {
      try {
        pageResult.imageDataUrl = await renderPageToImage(page)
      } catch (err) {
        console.warn(`Failed to render page ${i} to image:`, err)
      }
    }

    pages.push(pageResult)
    fullText += pageText + '\n\n'
  }

  return {
    text: fullText.trim(),
    pageCount,
    hasTextLayer: hasAnyText,
    pages
  }
}

/**
 * Render a PDF page to a canvas and return as data URL
 * Used for OCR on scanned/image-based PDFs
 */
async function renderPageToImage(
  page: PDFPageProxy,
  scale: number = 2.0
): Promise<string> {
  const viewport = page.getViewport({ scale })

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Failed to get canvas context')
  }

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({
    canvasContext: context,
    viewport,
    canvas
  }).promise

  return canvas.toDataURL('image/png')
}

/**
 * Check if a PDF file likely needs OCR
 * Quick check without full extraction
 */
export async function checkPDFNeedsOCR(file: File): Promise<boolean> {
  try {
    const pdfjs = await getPdfjs()
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise

    // Check first page only
    const page = await pdf.getPage(1)
    const textContent = await page.getTextContent()

    const text = textContent.items
      .map((item: unknown) => {
        const textItem = item as { str?: string }
        return textItem.str || ''
      })
      .join('')
      .trim()

    // If first page has less than 100 characters, likely needs OCR
    return text.length < 100
  } catch {
    return true // Assume OCR needed if we can't read the PDF
  }
}

/**
 * Get basic PDF info without full extraction
 */
export async function getPDFInfo(file: File): Promise<{ pageCount: number; title?: string }> {
  const pdfjs = await getPdfjs()
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise

  const metadata = await pdf.getMetadata().catch(() => null)
  const info = metadata?.info as Record<string, unknown> | undefined

  return {
    pageCount: pdf.numPages,
    title: info?.Title as string | undefined
  }
}
