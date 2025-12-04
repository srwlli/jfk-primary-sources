"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import {
  DocumentCategory,
  DocumentAgency,
  agencyDisplayNames,
  categoryDisplayNames,
  categoryIcons
} from "@/types/document"

interface DocumentRow {
  id: string
  slug: string
  title: string
  description: string | null
  date: string | null
  category: DocumentCategory
  agency: DocumentAgency
  agency_other: string | null
  pages: number | null
  file_type: string | null
}

const ITEMS_PER_PAGE = 25

const categories: { key: DocumentCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Categories' },
  { key: 'testimony', label: 'Testimony' },
  { key: 'report', label: 'Reports' },
  { key: 'memo', label: 'Memos' },
  { key: 'correspondence', label: 'Correspondence' },
  { key: 'photograph', label: 'Photographs' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'transcript', label: 'Transcripts' },
  { key: 'affidavit', label: 'Affidavits' },
  { key: 'autopsy', label: 'Autopsy Reports' },
  { key: 'other', label: 'Other' },
]

const agencies: { key: DocumentAgency | 'all'; label: string }[] = [
  { key: 'all', label: 'All Agencies' },
  { key: 'fbi', label: 'FBI' },
  { key: 'cia', label: 'CIA' },
  { key: 'secret_service', label: 'Secret Service' },
  { key: 'dpd', label: 'Dallas Police' },
  { key: 'dso', label: "Dallas Sheriff" },
  { key: 'usmc', label: 'Marines' },
  { key: 'state_dept', label: 'State Dept' },
  { key: 'warren', label: 'Warren Commission' },
  { key: 'hsca', label: 'HSCA' },
  { key: 'arrb', label: 'ARRB' },
  { key: 'nara', label: 'NARA' },
  { key: 'other', label: 'Other' },
]

type SortField = 'title' | 'date' | 'agency' | 'category'
type SortDir = 'asc' | 'desc'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | 'all'>('all')
  const [agencyFilter, setAgencyFilter] = useState<DocumentAgency | 'all'>('all')

  // Sorting
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchDocuments() {
      setLoading(true)

      let query = supabase
        .from("documents")
        .select("id, slug, title, description, date, category, agency, agency_other, pages, file_type", { count: 'exact' })

      // Apply filters
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter)
      }
      if (agencyFilter !== 'all') {
        query = query.eq('agency', agencyFilter)
      }

      // Apply sorting
      query = query.order(sortField, { ascending: sortDir === 'asc', nullsFirst: false })

      // Apply pagination
      const from = (page - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error("Error fetching documents:", error)
      } else {
        setDocuments(data || [])
        setTotalCount(count || 0)
      }
      setLoading(false)
    }

    fetchDocuments()
  }, [categoryFilter, agencyFilter, sortField, sortDir, page])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [categoryFilter, agencyFilter])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const getAgencyLabel = (doc: DocumentRow) => {
    if (doc.agency === 'other' && doc.agency_other) {
      return doc.agency_other
    }
    return agencyDisplayNames[doc.agency]
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Document Library</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Primary source documents related to the JFK assassination
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as DocumentCategory | 'all')}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value as DocumentAgency | 'all')}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {agencies.map((agency) => (
            <option key={agency.key} value={agency.key}>
              {agency.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {totalCount.toLocaleString()} document{totalCount !== 1 ? 's' : ''}
        {categoryFilter !== 'all' && ` in ${categoryDisplayNames[categoryFilter]}`}
        {agencyFilter !== 'all' && ` from ${agencyDisplayNames[agencyFilter]}`}
      </p>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-muted-foreground animate-spin">
            progress_activity
          </span>
        </div>
      ) : documents.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
              folder_open
            </span>
            <p className="text-muted-foreground">No documents found</p>
          </div>
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div className="hidden sm:flex text-sm font-semibold text-muted-foreground border-b border-border">
            <button
              onClick={() => handleSort('title')}
              className="flex-1 py-3 pr-2 flex items-center gap-1 text-left hover:text-primary"
            >
              <span>Title</span>
              {sortField === 'title' && (
                <span className="material-symbols-outlined text-base">
                  {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSort('agency')}
              className="w-28 py-3 flex items-center gap-1 hover:text-primary"
            >
              <span>Agency</span>
              {sortField === 'agency' && (
                <span className="material-symbols-outlined text-base">
                  {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSort('category')}
              className="w-28 py-3 flex items-center gap-1 hover:text-primary"
            >
              <span>Type</span>
              {sortField === 'category' && (
                <span className="material-symbols-outlined text-base">
                  {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSort('date')}
              className="w-28 py-3 flex items-center gap-1 hover:text-primary"
            >
              <span>Date</span>
              {sortField === 'date' && (
                <span className="material-symbols-outlined text-base">
                  {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                </span>
              )}
            </button>
            <div className="w-8" />
          </div>

          {/* Document List */}
          <div className="divide-y divide-border">
            {documents.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.slug}`}
                className="flex flex-col sm:flex-row sm:items-center py-4 hover:bg-muted/50 -mx-4 px-4 transition-colors gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-lg text-[var(--icon-color)] shrink-0 mt-0.5">
                      {categoryIcons[doc.category] || 'draft'}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{doc.title}</p>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground sm:shrink-0 pl-7 sm:pl-0">
                  <span className="w-28 truncate">{getAgencyLabel(doc)}</span>
                  <span className="w-28 truncate hidden sm:block">{categoryDisplayNames[doc.category]}</span>
                  <span className="w-28 truncate">{doc.date || '—'}</span>
                  <span className="material-symbols-outlined text-xl hidden sm:block">
                    arrow_forward_ios
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="flex items-center gap-1">
                {/* First page */}
                {page > 3 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="w-10 h-10 rounded-lg hover:bg-muted"
                    >
                      1
                    </button>
                    {page > 4 && <span className="px-2">...</span>}
                  </>
                )}

                {/* Pages around current */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }
                  if (pageNum < 1 || pageNum > totalPages) return null
                  if ((page > 3 && pageNum === 1) || (page < totalPages - 2 && pageNum === totalPages)) return null

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        page === pageNum
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Last page */}
                {page < totalPages - 2 && totalPages > 5 && (
                  <>
                    {page < totalPages - 3 && <span className="px-2">...</span>}
                    <button
                      onClick={() => setPage(totalPages)}
                      className="w-10 h-10 rounded-lg hover:bg-muted"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
