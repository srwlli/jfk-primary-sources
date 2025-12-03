"use client"

import Link from "next/link"

interface ExternalLink {
  title: string
  description: string
  url: string
  icon?: string
}

interface LinkCardProps {
  links: ExternalLink[]
}

export function LinkCard({ links }: LinkCardProps) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
            {link.icon || "link"}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{link.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{link.description}</p>
          </div>
          <span className="material-symbols-outlined text-muted-foreground">
            open_in_new
          </span>
        </Link>
      ))}
    </div>
  )
}

export type { ExternalLink }
