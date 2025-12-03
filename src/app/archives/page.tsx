import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Archive {
  id: string
  title: string
  description: string
  url: string
  icon: string
}

export default async function ArchivesPage() {
  const { data: archives } = await supabase
    .from("archives")
    .select("*")
    .order("title")

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Archives</h1>
      <p className="text-sm text-muted-foreground mb-6">
        External resources and document collections
      </p>
      <div className="flex flex-col gap-3">
        {(archives || []).map((archive: Archive) => (
          <Link
            key={archive.id}
            href={archive.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)] shrink-0">
              {archive.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold">{archive.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {archive.description}
              </p>
            </div>
            <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
              open_in_new
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
