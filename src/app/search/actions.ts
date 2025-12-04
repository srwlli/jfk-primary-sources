"use server"

import { createClient } from "@supabase/supabase-js"
import { getAllEvidence } from "@/data/evidence"
import { getAllSources } from "@/data/sources"
import { lhoTimelineSections } from "@/data/lho-timeline"
import {
  SearchResult,
  GroupedSearchResults,
  createSnippet,
  scoreMatch,
  textMatches,
  emptyResults
} from "@/lib/search"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function search(query: string): Promise<GroupedSearchResults> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery || trimmedQuery.length < 2) {
    return emptyResults()
  }

  // Run all searches in parallel
  const [
    peopleResults,
    locationResults,
    investigationResults,
    incidentResults,
    evidenceResults,
    sourceResults,
    timelineResults
  ] = await Promise.all([
    searchPeople(trimmedQuery),
    searchLocations(trimmedQuery),
    searchInvestigations(trimmedQuery),
    searchIncidents(trimmedQuery),
    searchEvidence(trimmedQuery),
    searchSources(trimmedQuery),
    searchTimeline(trimmedQuery)
  ])

  const totalCount =
    peopleResults.length +
    locationResults.length +
    investigationResults.length +
    incidentResults.length +
    evidenceResults.length +
    sourceResults.length +
    timelineResults.length

  return {
    people: peopleResults,
    locations: locationResults,
    investigations: investigationResults,
    incidents: incidentResults,
    evidence: evidenceResults,
    sources: sourceResults,
    timeline: timelineResults,
    totalCount
  }
}

// Database searches
async function searchPeople(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase
    .from('people')
    .select('id, slug, display_name, description, occupation')
    .or(`display_name.ilike.%${query}%,description.ilike.%${query}%,occupation.ilike.%${query}%`)
    .limit(10)

  if (error || !data) return []

  return data.map(person => ({
    id: person.id,
    type: 'person' as const,
    title: person.display_name,
    snippet: createSnippet(person.description || person.occupation || '', query),
    href: `/people/${person.slug}`,
    rank: scoreMatch(person.display_name + ' ' + (person.description || ''), query)
  })).sort((a, b) => b.rank - a.rank)
}

async function searchLocations(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('id, slug, name, description, city, significance')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,city.ilike.%${query}%,significance.ilike.%${query}%`)
    .limit(10)

  if (error || !data) return []

  return data.map(location => ({
    id: location.id,
    type: 'location' as const,
    title: location.name,
    snippet: createSnippet(location.description || location.significance || '', query),
    href: `/locations/${location.slug}`,
    rank: scoreMatch(location.name + ' ' + location.city + ' ' + (location.description || ''), query)
  })).sort((a, b) => b.rank - a.rank)
}

async function searchInvestigations(query: string): Promise<SearchResult[]> {
  // Fetch all investigations and filter client-side since JSONB search is complex
  const { data, error } = await supabase
    .from('investigations')
    .select('id, slug, data')

  if (error || !data) return []

  const lowerQuery = query.toLowerCase()

  return data
    .filter(item => {
      const d = item.data
      const searchText = `${d.title || ''} ${d.shortTitle || ''} ${d.summary || ''} ${d.background || ''} ${(d.keyFindings || []).join(' ')}`.toLowerCase()
      return searchText.includes(lowerQuery)
    })
    .map(item => ({
      id: item.id,
      type: 'investigation' as const,
      title: item.data.shortTitle || item.data.title,
      snippet: createSnippet(item.data.summary || '', query),
      href: `/investigations/${item.slug}`,
      rank: scoreMatch((item.data.title || '') + ' ' + (item.data.shortTitle || '') + ' ' + (item.data.summary || ''), query)
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 10)
}

async function searchIncidents(query: string): Promise<SearchResult[]> {
  // Fetch all incidents and filter client-side since JSONB search is complex
  const { data, error } = await supabase
    .from('incidents')
    .select('id, slug, data')

  if (error || !data) return []

  const lowerQuery = query.toLowerCase()

  return data
    .filter(item => {
      const d = item.data
      const searchText = `${d.title || ''} ${d.summary || ''} ${d.background || ''} ${d.location || ''} ${d.significance || ''}`.toLowerCase()
      return searchText.includes(lowerQuery)
    })
    .map(item => ({
      id: item.id,
      type: 'incident' as const,
      title: item.data.title,
      snippet: createSnippet(item.data.summary || '', query),
      href: `/incidents/${item.slug}`,
      rank: scoreMatch((item.data.title || '') + ' ' + (item.data.summary || ''), query)
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 10)
}

// Static data searches
async function searchEvidence(query: string): Promise<SearchResult[]> {
  const evidence = getAllEvidence()
  const lowerQuery = query.toLowerCase()

  return evidence
    .filter(item => {
      const searchText = `${item.title} ${item.summary} ${item.description} ${item.significance} ${item.category}`.toLowerCase()
      return searchText.includes(lowerQuery)
    })
    .map(item => ({
      id: item.id,
      type: 'evidence' as const,
      title: item.title,
      snippet: createSnippet(item.summary || item.description, query),
      href: `/evidence/${item.id}`,
      rank: scoreMatch(item.title + ' ' + item.summary, query)
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 10)
}

async function searchSources(query: string): Promise<SearchResult[]> {
  const sources = getAllSources()
  const lowerQuery = query.toLowerCase()

  return sources
    .filter(item => {
      const searchText = `${item.name} ${item.description} ${item.about} ${item.topics?.join(' ') || ''}`.toLowerCase()
      return searchText.includes(lowerQuery)
    })
    .map(item => ({
      id: item.id,
      type: 'source' as const,
      title: item.name,
      snippet: createSnippet(item.description || item.about, query),
      href: `/sources/${item.id}`,
      rank: scoreMatch(item.name + ' ' + item.description, query)
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 10)
}

async function searchTimeline(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = []
  const lowerQuery = query.toLowerCase()

  for (const section of lhoTimelineSections) {
    for (const event of section.events) {
      const searchText = `${event.title} ${event.description} ${event.datetime}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        results.push({
          id: event.id,
          type: 'timeline' as const,
          title: event.title,
          snippet: createSnippet(event.description, query),
          href: `/chronology#${section.id}`,
          rank: scoreMatch(event.title + ' ' + event.description, query)
        })
      }
    }
  }

  return results.sort((a, b) => b.rank - a.rank).slice(0, 10)
}
