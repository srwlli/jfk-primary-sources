import { SubPageHeader } from "@/components/sub-page-header"
import { TimelineAccordion, TimelineEvent } from "@/components/timeline-accordion"

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    datetime: "Nov 22, 1963, 11:40 AM CST",
    title: "Arrival at Love Field",
    description:
      "Air Force One, carrying President John F. Kennedy and his wife Jacqueline, landed at Love Field in Dallas, Texas. They were greeted by Governor John Connally and his wife Nellie before beginning a motorcade through the city.",
  },
  {
    id: "2",
    datetime: "Nov 22, 1963, 12:29 PM CST",
    title: "Motorcade on Elm Street",
    description:
      "The presidential limousine turned onto Elm Street, passing the Texas School Book Depository. The open-top vehicle slowed to make the turn, providing a clear view of the occupants.",
  },
  {
    id: "3",
    datetime: "Nov 22, 1963, 12:30 PM CST",
    title: "Shots Fired in Dealey Plaza",
    description:
      "As the motorcade passed the Texas School Book Depository, shots were fired. President Kennedy was fatally wounded, and Governor Connally was seriously injured. Chaos erupted in Dealey Plaza as the limousine sped away.",
    defaultOpen: true,
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ldAcNINtonhXnFp-cW2sg_If3OI2x8Jy_QUrFqSoummJw1yOA-JnYk37Krgul5gEbQTUwpmgYAINXlv_olwGkqvY72uVaMAhSEWaM-xWTVCpd7tIfsEpHgi9_H10DMzh6i01ZprVn1Ah1c2Ry1OgdQEDV7Aorn0gU6ud97Fvh8SxvInHxgso4_X9Kod4ONzt-6t8hCitlA272g3O-JiF_YihGcYpN5521cawlkPzyrzWKHkh0KLKaKrMDwVGlN1Sfh1At3blhEg",
        alt: "Black and white aerial view of Dealey Plaza, Dallas, showing the motorcade route.",
        title: "Dealey Plaza",
        caption: "Aerial view",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyaqZ_7velwcC445vGQ1gtYkPmMBcaMmGwdcKmEBRSUkcbQhhnfS9Euvmr6BkYHmP9LawVjvvig6_29iIHGbFJtoo4V9BtoXLz_Yonu9nCrPpY4hqeSytSZvbiv6CTarY0Dg8gXki8KugbhDQL8yBZwzPRAyzfELgnlnwvG3dVxxlCIuOccMihMfBcoW9zZTpifhXQAME6ubTuS4cJnJEtmSo5qxACwiKU8ozKBCeMOghEbsQeFJoxjtBsBssJj9Au1ckJGMLvut4",
        alt: "Black and white photo of the presidential limousine with President and Mrs. Kennedy moments before the assassination.",
        title: "The Limousine",
        caption: "Moments before",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbTlHiWCZFdgyFdvSfxVf4Qet_bW0stptzgTWbjOTK6bW_3Zi1RFdEzZPdIp9VsLP87Q1rDDGKUvdqInoROE5ifr7r5qc301a6Q9EOSweMCo56ezmdn-8wu5s2ZRO4Zz7R5s8h4Eh7jDxSJ-1gWGnrhGFULWGipIsAQauFJXS86sbbPc9oVul9NTcJxHNnX8o3GlBNsZlsmFAB2bI2eObbg93eOK2y61f_jkfKAjBR5lr9GwKWccdSuY4r_A6mYlPF2K-GcmIZwTw",
        alt: "Map of downtown Dallas highlighting the planned motorcade route.",
        title: "Motorcade Route",
        caption: "Map",
      },
    ],
    sourceLink: "/documents",
  },
  {
    id: "4",
    datetime: "Nov 22, 1963, 12:38 PM CST",
    title: "Arrival at Parkland Hospital",
    description:
      "The presidential limousine arrived at Parkland Memorial Hospital. Medical staff immediately began efforts to save the President's life in Trauma Room 1.",
  },
  {
    id: "5",
    datetime: "Nov 22, 1963, 1:00 PM CST",
    title: "President Pronounced Dead",
    description:
      "Despite the efforts of the medical team, President John F. Kennedy was officially pronounced dead at Parkland Memorial Hospital. The cause of death was a gunshot wound to the head.",
  },
]

export default function ChronologyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubPageHeader title="JFK Chronology" />
      <main className="flex-grow p-4">
        <TimelineAccordion events={timelineEvents} />
      </main>
    </div>
  )
}
