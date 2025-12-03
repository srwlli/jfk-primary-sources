import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Person {
  id: string
  slug: string
  display_name: string
  description: string
  birth: string | null
  death: string | null
  birth_city: string | null
  birth_state: string | null
  birth_country: string | null
  occupation: string | null
  background: string | null
  documents: { title: string; href: string }[]
  events: { title: string; href: string }[]
  connections: { name: string; href: string }[]
}

interface ProfileSectionProps {
  title: string
  items: { title?: string; name?: string; href: string }[]
}

function ProfileSection({ title, items }: ProfileSectionProps) {
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

function formatDate(dateString: string | null): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatBirthplace(city: string | null, state: string | null, country: string | null): string {
  const parts = [city, state, country].filter(Boolean)
  return parts.join(", ")
}

export async function generateStaticParams() {
  const { data } = await supabase.from("people").select("slug")
  return (data || []).map((person) => ({ slug: person.slug }))
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: person, error } = await supabase
    .from("people")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !person) {
    notFound()
  }

  const birthplace = formatBirthplace(person.birth_city, person.birth_state, person.birth_country)

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/people"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Profile
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Name and description */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">{person.display_name}</h2>
          <p className="text-muted-foreground mt-2">{person.description}</p>
        </div>

        {/* Biographical Info */}
        {(person.birth || birthplace || person.occupation) && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Biographical Information</h3>
            <div className="space-y-1">
              {person.birth && (
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span className="text-muted-foreground shrink-0 w-24">Born</span>
                  <span className="flex-1 text-right">{formatDate(person.birth)}</span>
                </div>
              )}
              {person.death && (
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span className="text-muted-foreground shrink-0 w-24">Died</span>
                  <span className="flex-1 text-right">{formatDate(person.death)}</span>
                </div>
              )}
              {birthplace && (
                <div className="flex items-start gap-4 py-3 border-b border-border">
                  <span className="text-muted-foreground shrink-0 w-24">Birthplace</span>
                  <span className="flex-1 text-right">{birthplace}</span>
                </div>
              )}
              {person.occupation && (
                <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground shrink-0 w-24">Occupation</span>
                  <span className="flex-1 text-right">{person.occupation}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Background */}
        {person.background && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Background</h3>
            <p className="text-muted-foreground leading-relaxed">{person.background}</p>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-6">
          <ProfileSection title="Associated Documents" items={person.documents || []} />
          <ProfileSection title="Related Events" items={person.events || []} />
          <ProfileSection title="Connections to Other People" items={person.connections || []} />
        </div>
      </div>
    </div>
  )
}
