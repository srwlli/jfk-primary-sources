"use client"

import { useState } from "react"
import { ExtractionResult, ExtractionProgress } from "@/lib/extraction"
import { agencyDisplayNames, DocumentAgency } from "@/types/document"

interface ExtractionPreviewProps {
  result: ExtractionResult | null
  progress: ExtractionProgress | null
  isExtracting: boolean
  onApply: (data: AppliedMetadata) => void
  onCancel: () => void
}

export interface AppliedMetadata {
  title: string
  date: string
  agency: DocumentAgency
  documentNumber: string
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  let colorClass = "bg-red-500/20 text-red-500"
  let label = "Low"

  if (confidence >= 80) {
    colorClass = "bg-green-500/20 text-green-500"
    label = "High"
  } else if (confidence >= 50) {
    colorClass = "bg-yellow-500/20 text-yellow-500"
    label = "Medium"
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>
      {label} ({confidence}%)
    </span>
  )
}

export function ExtractionPreview({
  result,
  progress,
  isExtracting,
  onApply,
  onCancel
}: ExtractionPreviewProps) {
  const [editedData, setEditedData] = useState<AppliedMetadata | null>(null)

  // Initialize edited data when result arrives
  if (result && !editedData && result.success) {
    setEditedData({
      title: result.metadata.title.value || "",
      date: result.metadata.date.value || "",
      agency: result.metadata.agency.value || "other",
      documentNumber: result.metadata.documentNumber.value || ""
    })
  }

  // Progress indicator during extraction
  if (isExtracting && progress) {
    return (
      <div className="bg-card rounded-xl p-6 mb-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined animate-spin text-primary">
            progress_activity
          </span>
          <div>
            <h3 className="font-medium">Extracting Metadata</h3>
            <p className="text-sm text-muted-foreground">{progress.message}</p>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {progress.progress}%
        </p>
      </div>
    )
  }

  // No result yet
  if (!result) return null

  // Error state
  if (!result.success) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <div>
            <h3 className="font-medium text-red-500">Extraction Failed</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {result.warnings[0] || "Unable to extract metadata from this file."}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="mt-4 text-sm text-red-500 hover:underline"
        >
          Dismiss
        </button>
      </div>
    )
  }

  if (!editedData) return null

  const handleApply = () => {
    onApply(editedData)
  }

  return (
    <div className="bg-card rounded-xl p-6 mb-6 border-2 border-primary/30">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_fix_high</span>
            Extracted Metadata
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Review and edit before applying to the form
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Overall Confidence</div>
          <div className="text-lg font-semibold text-primary">
            {result.overallConfidence}%
          </div>
        </div>
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-yellow-500 text-lg">warning</span>
            <div>
              <p className="text-sm font-medium text-yellow-500">Warnings</p>
              <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                {result.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Extracted Fields */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Title</label>
            <ConfidenceBadge confidence={result.metadata.title.confidence} />
          </div>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Document title"
          />
          {result.metadata.title.source !== "not_found" && (
            <p className="text-xs text-muted-foreground mt-1">
              Source: {result.metadata.title.source.replace(/_/g, " ")}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Date</label>
            <ConfidenceBadge confidence={result.metadata.date.confidence} />
          </div>
          <input
            type="text"
            value={editedData.date}
            onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="1963-11-22"
          />
          {result.metadata.date.alternatives && result.metadata.date.alternatives.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Alternatives: {result.metadata.date.alternatives.join(", ")}
            </p>
          )}
        </div>

        {/* Agency */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Agency</label>
            <ConfidenceBadge confidence={result.metadata.agency.confidence} />
          </div>
          <select
            value={editedData.agency}
            onChange={(e) => setEditedData({ ...editedData, agency: e.target.value as DocumentAgency })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(agencyDisplayNames).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {result.metadata.agency.alternatives && result.metadata.agency.alternatives.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Also detected: {result.metadata.agency.alternatives.map(a => agencyDisplayNames[a]).join(", ")}
            </p>
          )}
        </div>

        {/* Document Number */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Document Number</label>
            <ConfidenceBadge confidence={result.metadata.documentNumber.confidence} />
          </div>
          <input
            type="text"
            value={editedData.documentNumber}
            onChange={(e) => setEditedData({ ...editedData, documentNumber: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Document ID"
          />
          {result.metadata.documentNumber.alternatives && result.metadata.documentNumber.alternatives.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Alternatives: {result.metadata.documentNumber.alternatives.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Extraction Info */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Method: {result.extractionMethod.replace(/_/g, " ")}
        </span>
        <span>
          Processed in {(result.processingTime / 1000).toFixed(1)}s
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90"
        >
          <span className="material-symbols-outlined text-lg">check</span>
          Apply to Form
        </button>
      </div>
    </div>
  )
}
