import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Section {
  id: string
  type: string
  number: number | null
  title: string
  slug: string
  word_count: number
}

export const revalidate = 3600 // Revalidate every hour

export default async function WarrenReportPage() {
  const { data: sections } = await supabase
    .from("warren_report_sections")
    .select("id, type, number, title, slug, word_count")
    .order("type")
    .order("number")

  const foreword = sections?.find(s => s.type === 'foreword')
  const chapters = sections?.filter(s => s.type === 'chapter') || []
  const appendices = sections?.filter(s => s.type === 'appendix') || []

  const totalWords = sections?.reduce((sum, s) => sum + (s.word_count || 0), 0) || 0

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Warren Commission Report</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Report of the President&apos;s Commission on the Assassination of President Kennedy
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          September 24, 1964 &bull; {totalWords.toLocaleString()} words
        </p>
      </div>

      {/* Source Attribution */}
      <div className="bg-primary/5 rounded-lg p-3 mb-6 text-center">
        <p className="text-xs text-muted-foreground">
          Source: <a href="https://www.archives.gov/research/jfk/warren-commission-report" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">National Archives</a>
        </p>
      </div>

      {/* Foreword */}
      {foreword && (
        <div className="mb-6">
          <Link
            href={`/warren-report/${foreword.slug}`}
            className="block bg-card rounded-xl p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">Foreword</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {foreword.word_count?.toLocaleString()} words
                </p>
              </div>
              <span className="material-symbols-outlined text-muted-foreground">
                arrow_forward_ios
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Chapters */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          Chapters
        </h2>
        <div className="space-y-2">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/warren-report/${chapter.slug}`}
              className="block bg-card rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary font-bold">
                      {chapter.number}.
                    </span>
                    <h3 className="font-medium">{chapter.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {chapter.word_count?.toLocaleString()} words
                  </p>
                </div>
                <span className="material-symbols-outlined text-muted-foreground shrink-0">
                  arrow_forward_ios
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Appendices */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">attachment</span>
          Appendices
        </h2>
        <div className="space-y-2">
          {appendices.map((appendix) => (
            <Link
              key={appendix.id}
              href={`/warren-report/${appendix.slug}`}
              className="block bg-card rounded-lg p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-primary font-medium">
                      {appendix.number}.
                    </span>
                    <h3 className="text-sm">{appendix.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {appendix.word_count?.toLocaleString()} words
                  </p>
                </div>
                <span className="material-symbols-outlined text-muted-foreground text-lg shrink-0">
                  arrow_forward_ios
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8 pt-4 border-t border-border">
        <Link href="/investigations" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Investigations
        </Link>
      </div>
    </div>
  )
}
