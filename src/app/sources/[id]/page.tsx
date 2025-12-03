import Link from "next/link"
import { notFound } from "next/navigation"
import { getSourceById, getAllSourceIds } from "@/data/sources"

export function generateStaticParams() {
  return getAllSourceIds().map((id) => ({ id }))
}

export default async function SourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const source = getSourceById(id)

  if (!source) {
    notFound()
  }

  const typeLabels = {
    blog: "Blog",
    podcast: "Podcast",
    youtube: "YouTube Channel",
    website: "Website",
  }

  return (
    <div className="flex flex-col">
      {/* Sub-header with back button */}
      <div className="flex items-center px-3 py-2 justify-between">
        <div className="flex w-12 items-center justify-start">
          <Link
            href="/sources"
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Source
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and type */}
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[var(--icon-color)] mb-2">
            {source.icon}
          </span>
          <h2 className="text-3xl font-bold">{source.name}</h2>
          <p className="text-primary mt-2">{typeLabels[source.type]}</p>
        </div>

        {/* Visit Link */}
        <Link
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl p-4 font-semibold"
        >
          <span className="material-symbols-outlined">open_in_new</span>
          Visit {source.name}
        </Link>

        {/* Description */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{source.description}</p>
        </div>

        {/* About */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-muted-foreground leading-relaxed">{source.about}</p>
        </div>

        {/* Details */}
        {(source.creator || source.frequency || source.established) && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Details</h3>
            <div className="space-y-1">
              {source.creator && (
                <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground shrink-0 w-28">Creator</span>
                  <span className="flex-1 text-right">{source.creator}</span>
                </div>
              )}
              {source.established && (
                <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground shrink-0 w-28">Established</span>
                  <span className="flex-1 text-right">{source.established}</span>
                </div>
              )}
              {source.frequency && (
                <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground shrink-0 w-28">Frequency</span>
                  <span className="flex-1 text-right">{source.frequency}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notable Content */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Notable Content</h3>
          <ul className="space-y-2">
            {source.notableContent.map((content, index) => (
              <li key={index} className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-muted-foreground">{content}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        <div className="bg-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Topics Covered</h3>
          <div className="flex flex-wrap gap-2">
            {source.topics.map((topic, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* External Links */}
        {source.externalLinks.length > 0 && (
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <div className="space-y-1">
              {source.externalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <span className="flex-1 min-w-0">{link.title}</span>
                  <span className="material-symbols-outlined text-muted-foreground text-xl shrink-0">
                    open_in_new
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
