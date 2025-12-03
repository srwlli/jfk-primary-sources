import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Investigation {
  id: string
  slug: string
  data: {
    title: string
    shortTitle: string
    dateRange: string
    icon: string
    summary: string
  }
}

export default async function InvestigationsPage() {
  const { data: investigations } = await supabase
    .from("investigations")
    .select("*")
    .order("created_at")

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Investigations</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Official reports and inquiries into the assassination
      </p>
      <div className="space-y-4">
        {(investigations || []).map((item: Investigation) => (
          <Link
            key={item.id}
            href={`/investigations/${item.slug}`}
            className="block bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[var(--icon-color)] shrink-0 mt-1">
                {item.data.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold">{item.data.shortTitle}</h2>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </div>
                <p className="text-sm text-primary mt-1">{item.data.dateRange}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {item.data.summary}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
