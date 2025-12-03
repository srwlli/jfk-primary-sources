import { TimelineAccordion } from "@/components/timeline-accordion"
import { lhoTimelineSections } from "@/data/lho-timeline"

export default function ChronologyPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">Lee Harvey Oswald Timeline</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Comprehensive chronology from ancestry to assassination
      </p>
      <TimelineAccordion sections={lhoTimelineSections} />
    </main>
  )
}
