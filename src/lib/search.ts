// Search result types
export interface SearchResult {
  id: string
  type: 'person' | 'location' | 'investigation' | 'incident' | 'evidence' | 'source' | 'timeline'
  title: string
  snippet: string
  href: string
  rank: number
}

export interface GroupedSearchResults {
  people: SearchResult[]
  locations: SearchResult[]
  investigations: SearchResult[]
  incidents: SearchResult[]
  evidence: SearchResult[]
  sources: SearchResult[]
  timeline: SearchResult[]
  totalCount: number
}

// Escape special regex characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Highlight search terms in text
export function highlightMatches(text: string, query: string): string {
  if (!query.trim()) return text

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  let result = text

  terms.forEach(term => {
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi')
    result = result.replace(regex, '<mark>$1</mark>')
  })

  return result
}

// Create snippet with highlighted terms
export function createSnippet(text: string, query: string, maxLength: number = 150): string {
  if (!text) return ''

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const lowerText = text.toLowerCase()

  // Find first match position
  let firstMatchIndex = -1
  for (const term of terms) {
    const index = lowerText.indexOf(term)
    if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
      firstMatchIndex = index
    }
  }

  // Extract snippet around first match
  let start = 0
  if (firstMatchIndex > 50) {
    start = firstMatchIndex - 50
  }

  let snippet = text.slice(start, start + maxLength)
  if (start > 0) snippet = '...' + snippet
  if (start + maxLength < text.length) snippet += '...'

  return highlightMatches(snippet, query)
}

// Simple text search scoring
export function scoreMatch(text: string, query: string): number {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const lowerText = text.toLowerCase()

  let score = 0
  terms.forEach(term => {
    // Exact word match
    if (new RegExp(`\\b${escapeRegExp(term)}\\b`).test(lowerText)) {
      score += 10
    }
    // Partial match
    else if (lowerText.includes(term)) {
      score += 5
    }
  })

  // Bonus for match at start
  if (terms.length > 0 && lowerText.startsWith(terms[0])) {
    score += 5
  }

  return score
}

// Check if text matches query
export function textMatches(text: string, query: string): boolean {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  return lowerText.includes(lowerQuery)
}

// Empty results helper
export function emptyResults(): GroupedSearchResults {
  return {
    people: [],
    locations: [],
    investigations: [],
    incidents: [],
    evidence: [],
    sources: [],
    timeline: [],
    totalCount: 0
  }
}
