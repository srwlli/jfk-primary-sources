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
    <main className="p-4">
      <TimelineAccordion events={timelineEvents} />
    </main>
  )
}
