"use client"

import { useState } from "react"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="mb-6">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
            <div className="text-muted-foreground flex border-none bg-card items-center justify-center pl-4 rounded-l-lg">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-0 border-none bg-card h-full placeholder:text-muted-foreground px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
              placeholder="Search people, events, documents..."
              autoFocus
            />
          </div>
        </label>
      </div>

      {/* Search Results Placeholder */}
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
            search
          </span>
          <h1 className="text-xl font-bold tracking-tight">Search</h1>
          <p className="mt-2 text-muted-foreground">
            {query ? `No results for "${query}"` : "Enter a search term to begin"}
          </p>
        </div>
      </div>
    </div>
  )
}
