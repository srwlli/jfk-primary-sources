export interface Incident {
  id: string
  title: string
  date: string
  location: string
  icon: string
  summary: string
  background: string
  keyFacts: string[]
  significance: string
  relatedPeople: { name: string; href: string }[]
  relatedDocuments: { title: string; href: string }[]
  sources: { title: string; href: string }[]
}

const incidents: Incident[] = [
  {
    id: "walker-incident",
    title: "The Walker Incident",
    date: "April 10, 1963",
    location: "Dallas, Texas",
    icon: "gps_fixed",
    summary:
      "Lee Harvey Oswald allegedly fired a single shot at General Edwin Walker through the window of his Dallas home. Walker, a controversial right-wing figure, was uninjured. The incident remained unsolved until after the assassination when Marina Oswald revealed her husband's involvement.",
    background:
      "General Edwin Walker was a controversial figure in 1963. He had resigned from the Army in 1961 after being admonished for distributing right-wing literature to his troops. He became an outspoken critic of the Kennedy administration and a prominent figure in ultra-conservative politics. On the evening of April 10, 1963, while Walker sat at his desk in his Dallas home, a bullet crashed through his window, narrowly missing his head. The bullet was deflected by the wooden window frame. Dallas police investigated but the case remained unsolved for months.",
    keyFacts: [
      "Occurred at approximately 9:00 PM on April 10, 1963",
      "Walker was seated at his desk when the shot was fired",
      "The bullet narrowly missed Walker's head, deflected by the window frame",
      "A 6.5mm Mannlicher-Carcano bullet was recovered from the scene",
      "Marina Oswald later testified that Lee told her he had shot at Walker",
      "Oswald allegedly surveilled Walker's home and took photographs beforehand",
      "A note Oswald left for Marina before the attempt was later discovered",
      "The rifle used was later identified as the same one used in the JFK assassination",
    ],
    significance:
      "The Walker incident is significant because it established a pattern of violent behavior by Oswald months before the Kennedy assassination. Marina Oswald's testimony about her husband's confession became key evidence for the Warren Commission in establishing Oswald's capability and willingness to commit political violence. However, some researchers question aspects of the evidence and Marina's changing testimony over the years.",
    relatedPeople: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Marina Oswald", href: "/people/marina-oswald" },
      { name: "General Edwin Walker", href: "/people/edwin-walker" },
    ],
    relatedDocuments: [
      { title: "Warren Commission Report - Walker Incident", href: "/archives" },
      { title: "Marina Oswald's Testimony", href: "/archives" },
      { title: "Dallas Police Report", href: "/archives" },
    ],
    sources: [
      { title: "Warren Commission Report, Chapter 4", href: "https://www.archives.gov/research/jfk/warren-commission-report" },
      { title: "Mary Ferrell Foundation - Walker Shooting", href: "https://www.maryferrell.org" },
    ],
  },
  {
    id: "odio-incident",
    title: "The Odio Incident",
    date: "Late September 1963",
    location: "Dallas, Texas",
    icon: "group",
    summary:
      "Silvia Odio, a Cuban exile, claimed that three men visited her Dallas apartment in late September 1963, one of whom was introduced as 'Leon Oswald.' The visit allegedly occurred while Oswald was traveling to Mexico City, raising questions about his associations and timeline.",
    background:
      "Silvia Odio was a young Cuban exile living in Dallas whose father was a political prisoner in Cuba. She was involved with JURE (Junta Revolucionaria), an anti-Castro organization. According to her account, three men came to her apartment door in late September 1963. Two were Cubans or Latin Americans who identified themselves as members of JURE, and one was an American introduced as 'Leon Oswald.' The next day, one of the Cubans allegedly called Odio and made comments about 'Leon' saying Kennedy should have been killed after the Bay of Pigs.",
    keyFacts: [
      "Visit occurred around September 25-27, 1963",
      "Three men appeared at Odio's apartment in Dallas",
      "Two men were Cuban or Latin American, one was American",
      "The American was introduced as 'Leon Oswald'",
      "Odio's sister Annie also witnessed the men at the door",
      "A follow-up phone call referenced 'Leon' and violence against Kennedy",
      "The timing conflicts with official accounts of Oswald's trip to Mexico City",
      "Odio positively identified Oswald from photos after the assassination",
    ],
    significance:
      "The Odio incident is one of the most troubling loose ends in the JFK assassination investigation. If true, it suggests Oswald had connections to anti-Castro Cuban exiles and was being introduced to exile groups just weeks before the assassination. The Warren Commission struggled to explain the incident, initially attempting to identify the visitors as other individuals. The House Select Committee on Assassinations later found Odio's testimony credible and the incident genuine, concluding that Oswald or an impersonator had visited her.",
    relatedPeople: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Silvia Odio", href: "/people/silvia-odio" },
    ],
    relatedDocuments: [
      { title: "Warren Commission - Odio Testimony", href: "/archives" },
      { title: "HSCA Report on Odio Incident", href: "/archives" },
      { title: "FBI Investigation Reports", href: "/archives" },
    ],
    sources: [
      { title: "HSCA Final Report, Volume X", href: "https://www.archives.gov/research/jfk" },
      { title: "Mary Ferrell Foundation - Odio Incident", href: "https://www.maryferrell.org" },
      { title: "History Matters - Silvia Odio", href: "https://www.history-matters.com" },
    ],
  },
]

export function getIncidentById(id: string): Incident | undefined {
  return incidents.find((incident) => incident.id === id)
}

export function getAllIncidentIds(): string[] {
  return incidents.map((incident) => incident.id)
}

export function getAllIncidents(): Incident[] {
  return incidents
}
