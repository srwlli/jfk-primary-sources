import Link from "next/link"

const categories = [
  {
    name: "Chronology",
    description: "Timeline of events",
    icon: "history",
    href: "/chronology",
  },
  {
    name: "People",
    description: "Key individuals",
    icon: "groups",
    href: "/people",
  },
  {
    name: "Documents",
    description: "Official records",
    icon: "article",
    href: "/documents",
  },
  {
    name: "Investigations",
    description: "Reports & inquiries",
    icon: "manage_search",
    href: "/investigations",
  },
  {
    name: "Evidence",
    description: "Physical materials",
    icon: "inventory_2",
    href: "/evidence",
  },
  {
    name: "Witnesses",
    description: "Eyewitness accounts",
    icon: "visibility",
    href: "/witnesses",
  },
  {
    name: "Media",
    description: "News & film",
    icon: "movie",
    href: "/media",
  },
  {
    name: "More",
    description: "Additional resources",
    icon: "more_horiz",
    href: "/more",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-1 gap-3 rounded-xl bg-card p-4 flex-col shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-[var(--icon-color)]">
              {category.icon}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold leading-tight">
                {category.name}
              </h2>
              <p className="text-muted-foreground text-sm font-normal leading-normal">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Spacer */}
      <div className="h-5" />
    </>
  )
}
