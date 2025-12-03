"use client"

import { useState } from "react"

const people = [
  "Abraham Zapruder",
  "Clay Shaw",
  "David Ferrie",
  "Earl Warren",
  "George de Mohrenschildt",
  "Jack Ruby",
  "Jacqueline Kennedy",
  "John F. Kennedy",
  "Lee Harvey Oswald",
  "Lyndon B. Johnson",
  "Marina Oswald Porter",
]

export default function PeoplePage() {
  const [sortAsc, setSortAsc] = useState(true)

  const sortedPeople = [...people].sort((a, b) =>
    sortAsc ? a.localeCompare(b) : b.localeCompare(a)
  )

  return (
    <div className="px-4 pt-4">
      <div className="w-full">
        {/* Table Header */}
        <div className="flex text-sm font-semibold text-muted-foreground border-b border-border">
          <div className="flex-1 py-3 pr-2">
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 w-full text-left text-primary"
            >
              <span>Name</span>
              <span className="material-symbols-outlined text-base">
                {sortAsc ? "arrow_downward" : "arrow_upward"}
              </span>
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {sortedPeople.map((name) => (
            <div key={name} className="flex items-center py-4">
              <div className="flex-1 pr-2">
                <p className="font-medium">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
