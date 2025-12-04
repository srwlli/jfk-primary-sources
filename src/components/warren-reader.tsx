"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface WarrenReaderProps {
  title: string
  type: string
  number: number | null
  content: string
  wordCount: number
  sourceUrl: string
  prevSection?: { slug: string; title: string; type: string; number: number | null } | null
  nextSection?: { slug: string; title: string; type: string; number: number | null } | null
}

const WORDS_PER_PAGE = 500

export function WarrenReader({
  title,
  type,
  number,
  content,
  wordCount,
  sourceUrl,
  prevSection,
  nextSection
}: WarrenReaderProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Split content into pages
  const pages = useMemo(() => {
    // Split by paragraphs to avoid cutting mid-sentence
    const paragraphs = content.split(/<\/p>/i).filter(p => p.trim())

    const result: string[] = []
    let currentPageContent = ''
    let currentWordCount = 0

    for (const para of paragraphs) {
      const paraText = para.replace(/<[^>]+>/g, ' ').trim()
      const paraWords = paraText.split(/\s+/).length

      if (currentWordCount + paraWords > WORDS_PER_PAGE && currentPageContent) {
        result.push(currentPageContent)
        currentPageContent = para + '</p>'
        currentWordCount = paraWords
      } else {
        currentPageContent += para + '</p>'
        currentWordCount += paraWords
      }
    }

    if (currentPageContent) {
      result.push(currentPageContent)
    }

    return result.length > 0 ? result : [content]
  }, [content])

  const totalPages = pages.length
  const currentContent = pages[currentPage - 1] || ''

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const formatSectionLabel = (type: string, num: number | null) => {
    if (type === 'chapter') return `Chapter ${num}`
    if (type === 'appendix') return `Appendix ${num}`
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-4 pt-4 px-4 -mx-4 border-b border-border mb-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/warren-report"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Contents
          </Link>

          <div className="text-center flex-1">
            <p className="text-xs text-primary font-medium">
              {formatSectionLabel(type, number)}
            </p>
            <h1 className="text-sm font-semibold truncate">{title}</h1>
          </div>

          <div className="text-xs text-muted-foreground w-16 text-right">
            {currentPage}/{totalPages}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        <article
          className="prose prose-sm dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            [&>p]:mb-4 [&>p]:mt-0"
          dangerouslySetInnerHTML={{ __html: currentContent }}
        />
      </div>

      {/* Pagination */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between gap-4 py-4 border-t border-border">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {totalPages <= 7 ? (
              // Show all pages if 7 or fewer
              Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                    ${page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                    }`}
                >
                  {page}
                </button>
              ))
            ) : (
              // Show truncated pagination for many pages
              <>
                <button
                  onClick={() => goToPage(1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                    ${currentPage === 1
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                    }`}
                >
                  1
                </button>
                {currentPage > 3 && <span className="text-muted-foreground">...</span>}
                {currentPage > 2 && currentPage < totalPages - 1 && (
                  <button
                    onClick={() => goToPage(currentPage)}
                    className="w-8 h-8 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                  >
                    {currentPage}
                  </button>
                )}
                {currentPage < totalPages - 2 && <span className="text-muted-foreground">...</span>}
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                    ${currentPage === totalPages
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                    }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="mt-4 px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {prevSection ? (
            <Link
              href={`/warren-report/${prevSection.slug}`}
              className="bg-card rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-1">Previous</p>
              <p className="text-sm font-medium line-clamp-2">
                {formatSectionLabel(prevSection.type, prevSection.number)}: {prevSection.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextSection ? (
            <Link
              href={`/warren-report/${nextSection.slug}`}
              className="bg-card rounded-xl p-4 hover:bg-muted/50 transition-colors text-right"
            >
              <p className="text-xs text-muted-foreground mb-1">Next</p>
              <p className="text-sm font-medium line-clamp-2">
                {formatSectionLabel(nextSection.type, nextSection.number)}: {nextSection.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Source */}
      <div className="px-4 pb-8 text-center">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary"
        >
          View original at National Archives
        </a>
      </div>
    </div>
  )
}
