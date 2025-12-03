import { LinkCard, ExternalLink } from "@/components/link-card"

const archiveLinks: ExternalLink[] = [
  {
    title: "Mary Ferrell Foundation",
    description: "Comprehensive JFK assassination archive and documents",
    url: "https://www.maryferrell.org/pages/Main_Page.html",
    icon: "library_books",
  },
  {
    title: "History Matters",
    description: "Primary source documents and encyclopedic archive",
    url: "https://www.history-matters.com/index.htm",
    icon: "history_edu",
  },
  {
    title: "The Sixth Floor Museum",
    description: "Official museum at Dealey Plaza, Dallas",
    url: "https://www.jfk.org/",
    icon: "museum",
  },
  {
    title: "Cuban Exile History",
    description: "Cuban exile encyclopedic archive and documents",
    url: "https://cuban-exile.com/",
    icon: "public",
  },
  {
    title: "JFK Presidential Library",
    description: "Official presidential library and museum, Boston",
    url: "https://www.jfklibrary.org/",
    icon: "account_balance",
  },
  {
    title: "AARC Library",
    description: "Assassination Archives and Research Center",
    url: "https://aarclibrary.org/",
    icon: "folder_open",
  },
  {
    title: "National Archives",
    description: "JFK Assassination Records Collection",
    url: "https://www.archives.gov/research/jfk",
    icon: "assured_workload",
  },
  {
    title: "Hood College Collection",
    description: "JFK Assassination Document Collection",
    url: "http://jfk.hood.edu/",
    icon: "school",
  },
]

export default function ArchivesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Archives</h1>
      <p className="text-sm text-muted-foreground mb-6">
        External resources and document collections
      </p>
      <LinkCard links={archiveLinks} />
    </div>
  )
}
