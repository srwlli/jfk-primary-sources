"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import { search } from "./actions"
import { GroupedSearchResults, SearchResult } from "@/lib/search"

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Category configuration
const categories = [
  { key: 'people', label: 'People', icon: 'person' },
  { key: 'locations', label: 'Locations', icon: 'place' },
  { key: 'investigations', label: 'Investigations', icon: 'gavel' },
  { key: 'incidents', label: 'Incidents', icon: 'warning' },
  { key: 'evidence', label: 'Evidence', icon: 'inventory_2' },
  { key: 'sources', label: 'Sources', icon: 'menu_book' },
  { key: 'timeline', label: 'Timeline', icon: 'schedule' },
] as const

type CategoryKey = typeof categories[number]['key']

function ResultItem({ result }: { result: SearchResult }) {
  return (
    <Link
      href={result.href}
      className="block bg-card rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h4 className="font-medium">{result.title}</h4>
      <p
        className="text-sm text-muted-foreground mt-1 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: result.snippet }}
      />
    </Link>
  )
}

function ResultSection({
  title,
  icon,
  results
}: {
  title: string
  icon: string
  results: SearchResult[]
}) {
  if (results.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-lg text-[var(--icon-color)]">
          {icon}
        </span>
        <h3 className="font-bold">{title}</h3>
        <span className="text-sm text-muted-foreground">({results.length})</span>
      </div>
      <div className="space-y-2">
        {results.map(result => (
          <ResultItem key={`${result.type}-${result.id}`} result={result} />
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GroupedSearchResults | null>(null)
  const [isPending, startTransition] = useTransition()

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults(null)
      return
    }

    startTransition(async () => {
      const searchResults = await search(debouncedQuery)
      setResults(searchResults)
    })
  }, [debouncedQuery])

  const hasResults = results && results.totalCount > 0
  const showEmptyState = debouncedQuery.length >= 2 && results && results.totalCount === 0 && !isPending

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="mb-6">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
            <div className="text-muted-foreground flex border-none bg-card items-center justify-center pl-4 rounded-l-lg">
              {isPending ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">search</span>
              )}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-0 border-none bg-card h-full placeholder:text-muted-foreground px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
              placeholder="Search people, events, documents..."
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex items-center justify-center pr-4 bg-card rounded-r-lg"
              >
                <span className="material-symbols-outlined text-muted-foreground">close</span>
              </button>
            )}
          </div>
        </label>
      </div>

      {/* Results */}
      {hasResults && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {results.totalCount} result{results.totalCount !== 1 ? 's' : ''} for &quot;{debouncedQuery}&quot;
          </p>

          {categories.map(cat => (
            <ResultSection
              key={cat.key}
              title={cat.label}
              icon={cat.icon}
              results={results[cat.key as CategoryKey]}
            />
          ))}
        </div>
      )}

      {/* Initial State */}
      {!hasResults && !showEmptyState && !isPending && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
              search
            </span>
            <h1 className="text-xl font-bold tracking-tight">Search</h1>
            <p className="mt-2 text-muted-foreground">
              Enter a search term to begin
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isPending && !hasResults && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block animate-spin">
              progress_activity
            </span>
            <p className="text-muted-foreground">Searching...</p>
          </div>
        </div>
      )}

      {/* No Results State */}
      {showEmptyState && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
              search_off
            </span>
            <h1 className="text-xl font-bold tracking-tight">No results found</h1>
            <p className="mt-2 text-muted-foreground">
              No results for &quot;{debouncedQuery}&quot;
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try different keywords or check your spelling
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
