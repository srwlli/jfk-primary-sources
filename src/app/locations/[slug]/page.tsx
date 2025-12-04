import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LocationEvent {
  date: string
  description: string
}

interface Location {
  id: string
  slug: string
  name: string
  short_name: string | null
  description: string
  city: string
  state: string | null
  country: string
  address: string | null
  coordinates: { lat: number; lng: number } | null
  significance: string | null
  events: LocationEvent[]
  current_status: string | null
  images: string[]
  related_people: string[]
  related_incidents: string[]
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: location } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!location) {
    notFound()
  }

  const loc = location as Location
  const cityDisplay = loc.state
    ? `${loc.city}, ${loc.state}`
    : `${loc.city}, ${loc.country}`

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/locations"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Location
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and location */}
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[var(--icon-color)] mb-2">
            place
          </span>
          <h2 className="text-3xl font-bold">{loc.name}</h2>
          {loc.short_name && (
            <p className="text-primary font-medium mt-1">{loc.short_name}</p>
          )}
          <p className="text-muted-foreground text-sm mt-2">{cityDisplay}</p>
          {loc.address && (
            <p className="text-muted-foreground text-xs mt-1">{loc.address}</p>
          )}
        </div>

        {/* Current Status */}
        {loc.current_status && (
          <div className="bg-accent/10 rounded-xl p-4 text-center">
            <span className="material-symbols-outlined text-accent text-xl mb-1">
              info
            </span>
            <p className="text-sm text-accent font-medium">{loc.current_status}</p>
          </div>
        )}

        {/* Description */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">{loc.description}</p>
        </div>

        {/* Significance */}
        {loc.significance && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Historical Significance</h3>
            <p className="text-muted-foreground leading-relaxed">{loc.significance}</p>
          </div>
        )}

        {/* Timeline of Events */}
        {loc.events && loc.events.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Key Events</h3>
            <div className="space-y-4">
              {loc.events.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-lg">
                      schedule
                    </span>
                    {index < loc.events.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-primary">{event.date}</p>
                    <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related People */}
        {loc.related_people && loc.related_people.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Related People</h3>
            <div className="space-y-1">
              {loc.related_people.map((personSlug, index) => (
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

        {/* Map placeholder */}
        {loc.coordinates && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <span className="material-symbols-outlined text-4xl mb-2">map</span>
                <p className="text-sm">
                  {loc.coordinates.lat.toFixed(4)}, {loc.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
