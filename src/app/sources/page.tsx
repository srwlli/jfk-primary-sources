import Link from "next/link"
import { getSourcesByType } from "@/data/sources"

const blogs = getSourcesByType("blog")
const podcasts = getSourcesByType("podcast")
const youtube = getSourcesByType("youtube")

interface SourceSectionProps {
  title: string
  icon: string
  sources: ReturnType<typeof getSourcesByType>
}

function SourceSection({ title, icon, sources }: SourceSectionProps) {
  if (sources.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[var(--icon-color)]">
          {icon}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">
        {sources.map((source) => (
          <Link
            key={source.id}
            href={`/sources/${source.id}`}
            className="block bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[var(--icon-color)] shrink-0 mt-1">
                {source.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold">{source.name}</h3>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    arrow_forward_ios
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {source.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function SourcesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Additional Sources</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Blogs, podcasts, and YouTube channels for JFK assassination research
      </p>
      <div className="space-y-8">
        <SourceSection title="Blogs" icon="article" sources={blogs} />
        <SourceSection title="Podcasts" icon="podcasts" sources={podcasts} />
        <SourceSection title="YouTube" icon="play_circle" sources={youtube} />
      </div>
    </div>
  )
}
