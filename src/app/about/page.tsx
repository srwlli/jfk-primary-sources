export default function AboutPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">About</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Our mission and purpose
      </p>

      <div className="space-y-6">
        {/* Mission Statement */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
              target
            </span>
            <h2 className="text-lg font-semibold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            JFK Primary Sources exists to provide researchers with objective, easily accessible sources and information on the Kennedy assassination. We aim to organize and present this vast amount of historical data in a way that helps users understand complex issues and provides essential context.
          </p>
        </div>

        {/* Primary Sources Focus */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
              description
            </span>
            <h2 className="text-lg font-semibold">Primary Sources First</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This site does not promote any particular theory about the assassination. Instead, we promote primary source materials - the original documents, testimonies, evidence, and records that allow researchers to examine the facts and draw their own conclusions.
          </p>
        </div>

        {/* What We Provide */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
              checklist
            </span>
            <h2 className="text-lg font-semibold">What We Provide</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Organized access to primary source materials and archives</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Comprehensive timelines and chronologies of events</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Biographical information on key individuals</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Context for understanding complex issues and controversies</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Links to official investigations and their findings</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-muted-foreground">Curated resources for further research</span>
            </li>
          </ul>
        </div>

        {/* Objectivity */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
              balance
            </span>
            <h2 className="text-lg font-semibold">Our Commitment to Objectivity</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            We present information from multiple perspectives without advocating for any single interpretation. Our goal is to empower researchers with the tools and sources they need to conduct their own investigations and form their own informed opinions based on the historical record.
          </p>
        </div>
      </div>
    </div>
  )
}
