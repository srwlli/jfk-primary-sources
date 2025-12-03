import Link from "next/link"
import { notFound } from "next/navigation"
import { getEvidenceById, getAllEvidenceIds } from "@/data/evidence"

interface LinkSectionProps {
  title: string
  items: { title?: string; name?: string; href: string }[]
}

function LinkSection({ title, items }: LinkSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="bg-card rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-1">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
          >
            <span className="flex-1 min-w-0">{item.title || item.name}</span>
            <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
              arrow_forward_ios
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return getAllEvidenceIds().map((id) => ({ id }))
}

export default async function EvidenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = getEvidenceById(id)

  if (!item) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/evidence"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Evidence
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and summary */}
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[var(--icon-color)] mb-2">
            {item.icon}
          </span>
          <h2 className="text-3xl font-bold">{item.title}</h2>
          <p className="text-primary mt-2">{item.category}</p>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <p className="text-muted-foreground leading-relaxed">{item.summary}</p>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        {/* Details */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Details</h3>
          <div className="space-y-1">
            {item.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-3 border-b border-border last:border-b-0"
              >
                <span className="text-muted-foreground shrink-0 w-32">{detail.label}</span>
                <span className="flex-1 text-right">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chain of Custody */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Chain of Custody</h3>
          <p className="text-muted-foreground leading-relaxed">{item.chainOfCustody}</p>
        </div>

        {/* Significance */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Historical Significance</h3>
          <p className="text-muted-foreground leading-relaxed">{item.significance}</p>
        </div>

        {/* Controversies */}
        {item.controversies && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Controversies & Debates</h3>
            <p className="text-muted-foreground leading-relaxed">{item.controversies}</p>
          </div>
        )}

        {/* Related sections */}
        <div className="space-y-6">
          <LinkSection title="Related People" items={item.relatedPeople} />
          <LinkSection title="Related Documents" items={item.relatedDocuments} />
          <LinkSection title="Sources" items={item.sources} />
        </div>
      </div>
    </div>
  )
}
