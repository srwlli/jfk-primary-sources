import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { WarrenReader } from "@/components/warren-reader"

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
  content: string
  word_count: number
  source_url: string
}

// Generate static params for all sections
export async function generateStaticParams() {
  const { data: sections } = await supabase
    .from("warren_report_sections")
    .select("slug")

  return (sections || []).map((section) => ({
    slug: section.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: section } = await supabase
    .from("warren_report_sections")
    .select("title, type, number")
    .eq("slug", slug)
    .single()

  if (!section) {
    return { title: "Not Found" }
  }

  const prefix = section.type === 'chapter'
    ? `Chapter ${section.number}: `
    : section.type === 'appendix'
      ? `Appendix ${section.number}: `
      : ''

  return {
    title: `${prefix}${section.title} - Warren Report`,
    description: `Read ${prefix}${section.title} from the Warren Commission Report on the assassination of President Kennedy.`
  }
}

export const revalidate = 3600

export default async function WarrenReportSectionPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch current section
  const { data: section, error } = await supabase
    .from("warren_report_sections")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !section) {
    notFound()
  }

  // Fetch all sections to determine prev/next
  const { data: allSections } = await supabase
    .from("warren_report_sections")
    .select("slug, title, type, number")
    .order("type")
    .order("number")

  // Define section order: foreword, chapters 1-8, appendices 1-18
  const orderedSections = [
    ...(allSections?.filter(s => s.type === 'foreword') || []),
    ...(allSections?.filter(s => s.type === 'chapter')?.sort((a, b) => (a.number || 0) - (b.number || 0)) || []),
    ...(allSections?.filter(s => s.type === 'appendix')?.sort((a, b) => (a.number || 0) - (b.number || 0)) || []),
  ]

  const currentIndex = orderedSections.findIndex(s => s.slug === slug)
  const prevSection = currentIndex > 0 ? orderedSections[currentIndex - 1] : null
  const nextSection = currentIndex < orderedSections.length - 1 ? orderedSections[currentIndex + 1] : null

  return (
    <WarrenReader
      title={section.title}
      type={section.type}
      number={section.number}
      content={section.content}
      wordCount={section.word_count}
      sourceUrl={section.source_url}
      prevSection={prevSection}
      nextSection={nextSection}
    />
  )
}
