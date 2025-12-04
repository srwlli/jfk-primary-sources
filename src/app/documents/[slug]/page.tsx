import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import {
  DocumentCategory,
  DocumentAgency,
  agencyDisplayNames,
  categoryDisplayNames,
  categoryIcons
} from "@/types/document"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Document {
  id: string
  slug: string
  title: string
  description: string | null
  date: string | null
  category: DocumentCategory
  agency: DocumentAgency
  agency_other: string | null
  source: string | null
  document_number: string | null
  pages: number | null
  file_url: string | null
  file_type: string | null
  file_size: number | null
  summary: string | null
  transcript: string | null
  related_people: string[]
  related_locations: string[]
  related_incidents: string[]
  related_investigations: string[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!document) {
    notFound()
  }

  const doc = document as Document
  const agencyLabel = doc.agency === 'other' && doc.agency_other
    ? doc.agency_other
    : agencyDisplayNames[doc.agency]

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/documents"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Document
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and category */}
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[var(--icon-color)] mb-2">
            {categoryIcons[doc.category] || 'draft'}
          </span>
          <h2 className="text-2xl font-bold">{doc.title}</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{categoryDisplayNames[doc.category]}</span>
            <span>•</span>
            <span>{agencyLabel}</span>
            {doc.date && (
              <>
                <span>•</span>
                <span>{doc.date}</span>
              </>
            )}
          </div>
        </div>

        {/* Document info card */}
        <div className="bg-card rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {doc.document_number && (
              <div>
                <p className="text-muted-foreground">Document #</p>
                <p className="font-medium">{doc.document_number}</p>
              </div>
            )}
            {doc.source && (
              <div>
                <p className="text-muted-foreground">Source</p>
                <p className="font-medium">{doc.source}</p>
              </div>
            )}
            {doc.pages && (
              <div>
                <p className="text-muted-foreground">Pages</p>
                <p className="font-medium">{doc.pages}</p>
              </div>
            )}
            {doc.file_type && (
              <div>
                <p className="text-muted-foreground">Format</p>
                <p className="font-medium uppercase">{doc.file_type}</p>
              </div>
            )}
            {doc.file_size && (
              <div>
                <p className="text-muted-foreground">File Size</p>
                <p className="font-medium">{formatFileSize(doc.file_size)}</p>
              </div>
            )}
          </div>
        </div>

        {/* View/Download button */}
        {doc.file_url && (
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 px-4 font-medium hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            <span>View Document</span>
          </a>
        )}

        {/* Description */}
        {doc.description && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{doc.description}</p>
          </div>
        )}

        {/* Summary */}
        {doc.summary && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Summary</h3>
            <p className="text-muted-foreground leading-relaxed">{doc.summary}</p>
          </div>
        )}

        {/* Transcript */}
        {doc.transcript && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Transcript</h3>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto">
              {doc.transcript}
            </div>
          </div>
        )}

        {/* Related People */}
        {doc.related_people && doc.related_people.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Related People</h3>
            <div className="space-y-1">
              {doc.related_people.map((personSlug, index) => (
                <Link
                  key={index}
                  href={`/people/${personSlug}`}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <span className="material-symbols-outlined text-[var(--icon-color)]">
                    person
                  </span>
                  <span className="flex-1 min-w-0 capitalize">
                    {personSlug.replace(/-/g, " ")}
                  </span>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Locations */}
        {doc.related_locations && doc.related_locations.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Related Locations</h3>
            <div className="space-y-1">
              {doc.related_locations.map((locationSlug, index) => (
                <Link
                  key={index}
                  href={`/locations/${locationSlug}`}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <span className="material-symbols-outlined text-[var(--icon-color)]">
                    place
                  </span>
                  <span className="flex-1 min-w-0 capitalize">
                    {locationSlug.replace(/-/g, " ")}
                  </span>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Incidents */}
        {doc.related_incidents && doc.related_incidents.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Related Incidents</h3>
            <div className="space-y-1">
              {doc.related_incidents.map((incidentSlug, index) => (
                <Link
                  key={index}
                  href={`/incidents/${incidentSlug}`}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <span className="material-symbols-outlined text-[var(--icon-color)]">
                    warning
                  </span>
                  <span className="flex-1 min-w-0 capitalize">
                    {incidentSlug.replace(/-/g, " ")}
                  </span>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Investigations */}
        {doc.related_investigations && doc.related_investigations.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Related Investigations</h3>
            <div className="space-y-1">
              {doc.related_investigations.map((invSlug, index) => (
                <Link
                  key={index}
                  href={`/investigations/${invSlug}`}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <span className="material-symbols-outlined text-[var(--icon-color)]">
                    gavel
                  </span>
                  <span className="flex-1 min-w-0 capitalize">
                    {invSlug.replace(/-/g, " ")}
                  </span>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
