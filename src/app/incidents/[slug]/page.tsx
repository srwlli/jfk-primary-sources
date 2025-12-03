import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface IncidentData {
  title: string
  date: string
  location: string
  icon: string
  summary: string
  background: string
  keyFacts: string[]
  significance: string
  relatedPeople: { name: string; href: string }[]
  relatedDocuments: { title: string; href: string }[]
  sources: { title: string; href: string }[]
}

interface Incident {
  id: string
  slug: string
  data: IncidentData
}

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

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: incident } = await supabase
    .from("incidents")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!incident) {
    notFound()
  }

  const item = incident as Incident
  const data = item.data

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/incidents"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Incident
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and summary */}
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[var(--icon-color)] mb-2">
            {data.icon}
          </span>
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <p className="text-primary mt-2">{data.date}</p>
          <p className="text-muted-foreground text-sm mt-1">{data.location}</p>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </div>

        {/* Background */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Background</h3>
          <p className="text-muted-foreground leading-relaxed">{data.background}</p>
        </div>

        {/* Key Facts */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Key Facts</h3>
          <ul className="space-y-2">
            {data.keyFacts.map((fact, index) => (
              <li key={index} className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-muted-foreground">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Significance */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Historical Significance</h3>
          <p className="text-muted-foreground leading-relaxed">{data.significance}</p>
        </div>

        {/* Related sections */}
        <div className="space-y-6">
          <LinkSection title="Related People" items={data.relatedPeople} />
          <LinkSection title="Related Documents" items={data.relatedDocuments} />
          <LinkSection title="Sources" items={data.sources} />
        </div>
      </div>
    </div>
  )
}
