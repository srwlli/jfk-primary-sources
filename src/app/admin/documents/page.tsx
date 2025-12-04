"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  DocumentCategory,
  DocumentAgency,
  categoryDisplayNames,
  agencyDisplayNames
} from "@/types/document"
import {
  createDocument,
  getDocuments,
  deleteDocument,
  uploadDocumentFile,
  DocumentFormData
} from "./actions"
import {
  extractDocumentMetadata,
  ExtractionResult,
  ExtractionProgress,
  isFileTypeSupported,
  getSupportedFileTypes
} from "@/lib/extraction"
import { ExtractionPreview, AppliedMetadata } from "@/components/extraction-preview"

const categoryOptions: DocumentCategory[] = [
  'testimony', 'report', 'memo', 'correspondence', 'photograph',
  'evidence', 'transcript', 'affidavit', 'autopsy', 'other'
]

const agencyOptions: DocumentAgency[] = [
  'fbi', 'cia', 'secret_service', 'dpd', 'dso', 'usmc',
  'state_dept', 'warren', 'hsca', 'arrb', 'nara', 'other'
]

interface DocumentRow {
  id: string
  slug: string
  title: string
  category: DocumentCategory
  agency: DocumentAgency
  date: string | null
  created_at: string
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Extraction state
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionResult, setExtractionResult] = useState<ExtractionResult | null>(null)
  const [extractionProgress, setExtractionProgress] = useState<ExtractionProgress | null>(null)

  // Form state
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    slug: '',
    description: '',
    date: '',
    category: 'report',
    agency: 'fbi',
    agency_other: '',
    source: '',
    document_number: '',
    pages: undefined,
    summary: '',
    transcript: '',
  })

  useEffect(() => {
    loadDocuments()
  }, [])

  async function loadDocuments() {
    setLoading(true)
    const docs = await getDocuments()
    setDocuments(docs)
    setLoading(false)
  }

  async function handleExtractMetadata() {
    if (!selectedFile) return
    if (!isFileTypeSupported(selectedFile)) {
      setMessage({
        type: 'error',
        text: `File type not supported for extraction. Supported: ${getSupportedFileTypes().join(', ')}`
      })
      return
    }

    setIsExtracting(true)
    setExtractionResult(null)
    setMessage(null)

    try {
      const result = await extractDocumentMetadata(selectedFile, (progress) => {
        setExtractionProgress(progress)
      })
      setExtractionResult(result)
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    } finally {
      setIsExtracting(false)
    }
  }

  function handleApplyExtraction(data: AppliedMetadata) {
    setFormData(prev => ({
      ...prev,
      title: data.title || prev.title,
      slug: data.title ? generateSlug(data.title) : prev.slug,
      date: data.date || prev.date,
      agency: data.agency || prev.agency,
      document_number: data.documentNumber || prev.document_number
    }))
    setExtractionResult(null)
    setMessage({ type: 'success', text: 'Metadata applied to form!' })
  }

  function handleCancelExtraction() {
    setExtractionResult(null)
    setExtractionProgress(null)
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100)
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const result = await createDocument(formData)

    if (result.success && result.data) {
      // Upload file if selected
      if (selectedFile) {
        setUploading(true)
        setUploadProgress(10)

        const fileFormData = new FormData()
        fileFormData.append('file', selectedFile)

        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90))
        }, 200)

        const uploadResult = await uploadDocumentFile(result.data.id, fileFormData)

        clearInterval(progressInterval)
        setUploadProgress(100)

        if (!uploadResult.success) {
          setMessage({ type: 'error', text: `Document created but file upload failed: ${uploadResult.error}` })
          setUploading(false)
          setSaving(false)
          loadDocuments()
          return
        }

        setUploading(false)
      }

      setMessage({ type: 'success', text: 'Document created successfully!' })
      setFormData({
        title: '',
        slug: '',
        description: '',
        date: '',
        category: 'report',
        agency: 'fbi',
        agency_other: '',
        source: '',
        document_number: '',
        pages: undefined,
        summary: '',
        transcript: '',
      })
      setSelectedFile(null)
      setUploadProgress(0)
      setExtractionResult(null)
      setExtractionProgress(null)
      setShowForm(false)
      loadDocuments()
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to create document' })
    }

    setSaving(false)
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    const result = await deleteDocument(id)
    if (result.success) {
      setMessage({ type: 'success', text: 'Document deleted' })
      loadDocuments()
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete' })
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Document Admin</h1>
          <p className="text-sm text-muted-foreground">Manage primary source documents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90"
        >
          <span className="material-symbols-outlined text-lg">
            {showForm ? 'close' : 'add'}
          </span>
          {showForm ? 'Cancel' : 'Add Document'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${
          message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4">New Document</h2>

          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Document title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          {/* Category & Agency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as DocumentCategory }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{categoryDisplayNames[cat]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Agency *</label>
              <select
                value={formData.agency}
                onChange={(e) => setFormData(prev => ({ ...prev, agency: e.target.value as DocumentAgency }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {agencyOptions.map(agency => (
                  <option key={agency} value={agency}>{agencyDisplayNames[agency]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Agency Other */}
          {formData.agency === 'other' && (
            <div>
              <label className="block text-sm font-medium mb-1">Agency Name</label>
              <input
                type="text"
                value={formData.agency_other}
                onChange={(e) => setFormData(prev => ({ ...prev, agency_other: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Specify agency"
              />
            </div>
          )}

          {/* Date & Document Number */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="1963-11-22 or November 1963"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Document #</label>
              <input
                type="text"
                value={formData.document_number}
                onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Original document ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pages</label>
              <input
                type="number"
                value={formData.pages || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Number of pages"
              />
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="NARA, Mary Ferrell Foundation, etc."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Brief description"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              rows={3}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Summary of document contents"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Document File</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                onChange={(e) => {
                  setSelectedFile(e.target.files?.[0] || null)
                  setExtractionResult(null)
                  setExtractionProgress(null)
                }}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="text-sm">{selectedFile.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedFile(null)
                      }}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <span className="material-symbols-outlined text-3xl text-muted-foreground mb-2 block">
                      upload_file
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Click to upload PDF, image, or document
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Extract Metadata Button */}
            {selectedFile && isFileTypeSupported(selectedFile) && !extractionResult && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleExtractMetadata}
                  disabled={isExtracting}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 disabled:opacity-50"
                >
                  {isExtracting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Extracting metadata...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">auto_fix_high</span>
                      Extract metadata from file
                    </>
                  )}
                </button>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically detect title, date, agency, and document number
                </p>
              </div>
            )}
          </div>

          {/* Extraction Preview */}
          <ExtractionPreview
            result={extractionResult}
            progress={extractionProgress}
            isExtracting={isExtracting}
            onApply={handleApplyExtraction}
            onCancel={handleCancelExtraction}
          />

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !formData.title}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {saving && <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>}
              {saving ? 'Saving...' : 'Create Document'}
            </button>
          </div>
        </form>
      )}

      {/* Documents List */}
      <div className="bg-card rounded-xl">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Documents ({documents.length})</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-3xl text-muted-foreground">
              progress_activity
            </span>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <span className="material-symbols-outlined text-4xl mb-2 block">folder_open</span>
            <p>No documents yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex-1 min-w-0">
                  <Link href={`/documents/${doc.slug}`} className="font-medium hover:underline">
                    {doc.title}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{categoryDisplayNames[doc.category]}</span>
                    <span>•</span>
                    <span>{agencyDisplayNames[doc.agency]}</span>
                    {doc.date && (
                      <>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/documents/${doc.slug}`}
                    className="p-2 hover:bg-muted rounded-lg"
                    title="View"
                  >
                    <span className="material-symbols-outlined text-muted-foreground">visibility</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(doc.id, doc.title)}
                    className="p-2 hover:bg-red-500/10 rounded-lg"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-red-500">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-6">
        <Link href="/documents" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Document Library
        </Link>
      </div>
    </div>
  )
}
