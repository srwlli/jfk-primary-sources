// OCR extraction using Tesseract.js
// Handles image files and scanned PDF pages

import { createWorker, Worker } from 'tesseract.js'

export interface OCRResult {
  text: string
  confidence: number
  words: WordResult[]
}

export interface WordResult {
  text: string
  confidence: number
  bbox: { x0: number; y0: number; x1: number; y1: number }
}

// Singleton worker instance for reuse
let workerInstance: Worker | null = null
let workerInitializing = false
let workerInitPromise: Promise<Worker> | null = null

/**
 * Get or create the Tesseract worker (lazy loaded)
 */
async function getWorker(): Promise<Worker> {
  if (workerInstance) {
    return workerInstance
  }

  if (workerInitializing && workerInitPromise) {
    return workerInitPromise
  }

  workerInitializing = true
  workerInitPromise = (async () => {
    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          // Progress callback could be added here
        }
      }
    })
    workerInstance = worker
    workerInitializing = false
    return worker
  })()

  return workerInitPromise
}

/**
 * Extract text from an image using OCR
 */
export async function extractTextFromImage(
  imageSource: File | string, // File or data URL
  onProgress?: (progress: number) => void
): Promise<OCRResult> {
  const worker = await getWorker()

  // Convert File to data URL if needed
  let source: string
  if (imageSource instanceof File) {
    source = await fileToDataURL(imageSource)
  } else {
    source = imageSource
  }

  // Preprocess image for better OCR
  const processedSource = await preprocessImage(source)

  // Note: Progress callback is handled by the worker's logger set during creation
  // We can't pass logger to recognize() as it can't be cloned for postMessage
  const result = await worker.recognize(processedSource)

  // Extract words from the result (handle type differences between Tesseract versions)
  const data = result.data as unknown as {
    text: string
    confidence: number
    words?: Array<{ text: string; confidence: number; bbox: { x0: number; y0: number; x1: number; y1: number } }>
  }

  const words: WordResult[] = (data.words || []).map((word) => ({
    text: word.text,
    confidence: word.confidence,
    bbox: word.bbox
  }))

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    words
  }
}

/**
 * Extract text from multiple images (e.g., PDF pages)
 */
export async function extractTextFromImages(
  images: string[], // Array of data URLs
  onProgress?: (current: number, total: number, pageProgress: number) => void
): Promise<OCRResult[]> {
  const results: OCRResult[] = []

  for (let i = 0; i < images.length; i++) {
    const result = await extractTextFromImage(images[i], (progress) => {
      onProgress?.(i + 1, images.length, progress)
    })
    results.push(result)
  }

  return results
}

/**
 * Convert File to data URL
 */
function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Preprocess image for better OCR accuracy
 * - Increase contrast
 * - Convert to grayscale
 * - Apply threshold for cleaner text
 */
async function preprocessImage(dataUrl: string): Promise<string> {
  if (typeof document === 'undefined') {
    return dataUrl // Skip preprocessing in non-browser environment
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        resolve(dataUrl)
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      // Draw original image
      ctx.drawImage(img, 0, 0)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Convert to grayscale and increase contrast
      for (let i = 0; i < data.length; i += 4) {
        // Grayscale
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114

        // Increase contrast
        const contrast = 1.3 // Contrast factor
        const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255))
        let newGray = factor * (gray - 128) + 128

        // Clamp to valid range
        newGray = Math.max(0, Math.min(255, newGray))

        // Apply simple threshold for cleaner text (optional, can be tuned)
        // if (newGray < 180) newGray = 0
        // else newGray = 255

        data[i] = newGray
        data[i + 1] = newGray
        data[i + 2] = newGray
      }

      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }

    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

/**
 * Check if an image is likely to have good OCR results
 * Based on image dimensions and file size
 */
export function checkImageQuality(file: File): { suitable: boolean; reason?: string } {
  // Check file size (very small files likely won't OCR well)
  if (file.size < 10000) {
    return { suitable: false, reason: 'Image file too small for reliable OCR' }
  }

  // Check file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/tiff', 'image/webp']
  if (!validTypes.includes(file.type)) {
    return { suitable: false, reason: `Unsupported image type: ${file.type}` }
  }

  return { suitable: true }
}

/**
 * Terminate the worker to free resources
 */
export async function terminateOCRWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.terminate()
    workerInstance = null
    workerInitPromise = null
    workerInitializing = false
  }
}
