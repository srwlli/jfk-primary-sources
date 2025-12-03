"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Person {
  id: string
  slug: string
  display_name: string
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([])
  const [sortAsc, setSortAsc] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPeople() {
      const { data, error } = await supabase
        .from("people")
        .select("id, slug, display_name")
        .order("last_name", { ascending: true })

      if (error) {
        console.error("Error fetching people:", error)
      } else {
        setPeople(data || [])
      }
      setLoading(false)
    }

    fetchPeople()
  }, [])

  const sortedPeople = [...people].sort((a, b) =>
    sortAsc
      ? a.display_name.localeCompare(b.display_name)
      : b.display_name.localeCompare(a.display_name)
  )

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-muted-foreground animate-spin">
            progress_activity
          </span>
        </div>
      </div>
    )
  }

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
          {sortedPeople.map((person) => (
            <Link
              key={person.id}
              href={`/people/${person.slug}`}
              className="flex items-center justify-between py-4 hover:bg-muted/50 -mx-4 px-4 transition-colors"
            >
              <div className="flex-1 pr-2">
                <p className="font-medium">{person.display_name}</p>
              </div>
              <span className="material-symbols-outlined text-muted-foreground text-xl">
                arrow_forward_ios
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
