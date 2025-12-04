import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Location {
  id: string
  slug: string
  name: string
  short_name: string | null
  description: string
  city: string
  state: string | null
  country: string
  current_status: string
}

export default async function LocationsPage() {
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .order("city")
    .order("name")

  // Group locations by city
  const groupedLocations: Record<string, Location[]> = (locations || []).reduce(
    (acc: Record<string, Location[]>, location: Location) => {
      const key = location.state
        ? `${location.city}, ${location.state}`
        : `${location.city}, ${location.country}`
      if (!acc[key]) acc[key] = []
      acc[key].push(location)
      return acc
    },
    {}
  )

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Points of Interest</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Key locations related to the JFK assassination and investigation
      </p>

      <div className="space-y-6">
        {Object.entries(groupedLocations).map(([cityKey, cityLocations]) => (
          <div key={cityKey}>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-lg text-[var(--icon-color)]">
                location_city
              </span>
              <h2 className="font-bold text-lg">{cityKey}</h2>
            </div>
            <div className="space-y-3">
              {cityLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/locations/${location.slug}`}
                  className="block bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-2xl text-[var(--icon-color)] shrink-0 mt-1">
                      place
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold">{location.name}</h3>
                        <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                          arrow_forward_ios
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {location.description}
                      </p>
                      {location.current_status && (
                        <p className="text-xs text-accent mt-2">
                          {location.current_status}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
