export interface Person {
  id: string
  name: string
  description: string
  birth?: string
  death?: string
  birthPlace?: string
  occupation?: string
  background?: string
  documents?: { title: string; href: string }[]
  events?: { title: string; href: string }[]
  connections?: { name: string; href: string }[]
}

export const people: Person[] = [
  {
    id: "lee-harvey-oswald",
    name: "Lee Harvey Oswald",
    description: "Figure identified as the primary suspect in the assassination of President John F. Kennedy.",
    birth: "October 18, 1939",
    death: "November 24, 1963",
    birthPlace: "New Orleans, Louisiana",
    occupation: "Former U.S. Marine, Factory Worker",
    background: "Lee Harvey Oswald was a former U.S. Marine who defected to the Soviet Union in 1959, returning to the United States in 1962 with his Russian wife Marina. He worked at the Texas School Book Depository in Dallas at the time of the assassination. He was arrested for the murder of Dallas police officer J.D. Tippit and later charged with assassinating President Kennedy. He was shot and killed by Jack Ruby two days after the assassination while being transferred between jails.",
    documents: [
      { title: "Warren Commission Report", href: "#" },
      { title: "HSCA Report Volume XI", href: "#" },
      { title: "Military Service Record", href: "#" },
    ],
    events: [
      { title: "JFK Assassination", href: "#" },
      { title: "Time in Soviet Union", href: "#" },
      { title: "Shooting of J.D. Tippit", href: "#" },
    ],
    connections: [
      { name: "Marina Oswald Porter", href: "/people/marina-oswald-porter" },
      { name: "Jack Ruby", href: "/people/jack-ruby" },
      { name: "George de Mohrenschildt", href: "/people/george-de-mohrenschildt" },
    ],
  },
  {
    id: "jack-ruby",
    name: "Jack Ruby",
    description: "Dallas nightclub owner who shot and killed Lee Harvey Oswald on November 24, 1963.",
    birth: "March 25, 1911",
    death: "January 3, 1967",
    birthPlace: "Chicago, Illinois",
    occupation: "Nightclub Owner",
    background: "Jack Ruby, born Jacob Leon Rubenstein, operated the Carousel Club, a Dallas nightclub. On November 24, 1963, he shot and killed Lee Harvey Oswald in the basement of Dallas Police Headquarters during a jail transfer, an event broadcast live on national television. Ruby was convicted of murder and sentenced to death, but the conviction was overturned on appeal. He died of lung cancer while awaiting a new trial.",
    documents: [
      { title: "Warren Commission Testimony", href: "#" },
      { title: "FBI Background Report", href: "#" },
    ],
    events: [
      { title: "Shooting of Lee Harvey Oswald", href: "#" },
      { title: "Ruby Trial", href: "#" },
    ],
    connections: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
    ],
  },
  {
    id: "john-f-kennedy",
    name: "John F. Kennedy",
    description: "35th President of the United States, assassinated in Dallas, Texas on November 22, 1963.",
    birth: "May 29, 1917",
    death: "November 22, 1963",
    birthPlace: "Brookline, Massachusetts",
    occupation: "35th President of the United States",
    background: "John Fitzgerald Kennedy served as the 35th President of the United States from January 1961 until his assassination. A decorated World War II naval officer and U.S. Senator from Massachusetts, Kennedy was the youngest person elected to the presidency. He was assassinated while riding in a motorcade through Dealey Plaza in Dallas, Texas. His death prompted the largest criminal investigation in U.S. history and continues to be the subject of significant debate and research.",
    documents: [
      { title: "Autopsy Report", href: "#" },
      { title: "Warren Commission Report", href: "#" },
    ],
    events: [
      { title: "JFK Assassination", href: "#" },
      { title: "Motorcade Through Dallas", href: "#" },
    ],
    connections: [
      { name: "Jacqueline Kennedy", href: "/people/jacqueline-kennedy" },
      { name: "Lyndon B. Johnson", href: "/people/lyndon-b-johnson" },
    ],
  },
  {
    id: "jacqueline-kennedy",
    name: "Jacqueline Kennedy",
    description: "First Lady of the United States and wife of President John F. Kennedy.",
    birth: "July 28, 1929",
    death: "May 19, 1994",
    birthPlace: "Southampton, New York",
    occupation: "First Lady of the United States",
    background: "Jacqueline Lee Kennedy Onassis served as First Lady during her husband's presidency. She was seated next to him in the presidential limousine during the assassination and cradled him after he was shot. Her composure and dignity during the funeral proceedings earned widespread admiration. She later married Greek shipping magnate Aristotle Onassis and worked as a book editor in New York City.",
    documents: [
      { title: "Warren Commission Testimony", href: "#" },
    ],
    events: [
      { title: "JFK Assassination", href: "#" },
    ],
    connections: [
      { name: "John F. Kennedy", href: "/people/john-f-kennedy" },
    ],
  },
  {
    id: "marina-oswald-porter",
    name: "Marina Oswald Porter",
    description: "Soviet-born wife of Lee Harvey Oswald.",
    birth: "July 17, 1941",
    birthPlace: "Severodvinsk, Soviet Union",
    occupation: "Pharmacist",
    background: "Marina Nikolayevna Oswald Porter met Lee Harvey Oswald at a dance in Minsk in March 1961. They married six weeks later and moved to the United States in June 1962. She provided crucial testimony to the Warren Commission, including information about Oswald's attempted shooting of General Edwin Walker. She has since remarried and continues to live in the Dallas area.",
    documents: [
      { title: "Warren Commission Testimony", href: "#" },
      { title: "HSCA Testimony", href: "#" },
    ],
    events: [
      { title: "Life in Soviet Union", href: "#" },
    ],
    connections: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Ruth Paine", href: "#" },
    ],
  },
  {
    id: "lyndon-b-johnson",
    name: "Lyndon B. Johnson",
    description: "36th President of the United States, sworn in after Kennedy's assassination.",
    birth: "August 27, 1908",
    death: "January 22, 1973",
    birthPlace: "Stonewall, Texas",
    occupation: "36th President of the United States",
    background: "Lyndon Baines Johnson was Vice President under Kennedy and was sworn in as President aboard Air Force One at Love Field, approximately two hours after the assassination. He established the Warren Commission by Executive Order 11130 to investigate the assassination. He served as President until 1969, overseeing major civil rights legislation and the escalation of the Vietnam War.",
    documents: [
      { title: "Warren Commission Executive Order", href: "#" },
    ],
    events: [
      { title: "Swearing In Ceremony", href: "#" },
      { title: "JFK Assassination", href: "#" },
    ],
    connections: [
      { name: "John F. Kennedy", href: "/people/john-f-kennedy" },
    ],
  },
  {
    id: "abraham-zapruder",
    name: "Abraham Zapruder",
    description: "Dallas clothing manufacturer who filmed the assassination with his 8mm home movie camera.",
    birth: "May 15, 1905",
    death: "August 30, 1970",
    birthPlace: "Kovel, Russian Empire (now Ukraine)",
    occupation: "Clothing Manufacturer",
    background: "Abraham Zapruder was a Dallas dress manufacturer who captured the assassination on his Bell & Howell 8mm home movie camera. The 26.6-second film, known as the Zapruder film, is considered the most complete recording of the assassination and has been crucial evidence in all subsequent investigations. He sold the original film to Life magazine for $150,000.",
    documents: [
      { title: "Zapruder Film Analysis", href: "#" },
      { title: "Warren Commission Testimony", href: "#" },
    ],
    events: [
      { title: "JFK Assassination", href: "#" },
    ],
    connections: [],
  },
  {
    id: "clay-shaw",
    name: "Clay Shaw",
    description: "New Orleans businessman tried and acquitted of conspiracy to assassinate President Kennedy.",
    birth: "March 17, 1913",
    death: "August 15, 1974",
    birthPlace: "Kentwood, Louisiana",
    occupation: "Businessman, Trade Mart Director",
    background: "Clay LaVerne Shaw was a decorated World War II veteran and director of the International Trade Mart in New Orleans. In 1967, New Orleans District Attorney Jim Garrison charged Shaw with conspiring to assassinate President Kennedy. Shaw was the only person ever brought to trial for the assassination. He was acquitted in 1969 after less than an hour of jury deliberation.",
    documents: [
      { title: "Garrison Investigation Files", href: "#" },
      { title: "Trial Transcripts", href: "#" },
    ],
    events: [
      { title: "Shaw Trial", href: "#" },
    ],
    connections: [
      { name: "David Ferrie", href: "/people/david-ferrie" },
    ],
  },
  {
    id: "david-ferrie",
    name: "David Ferrie",
    description: "Pilot and alleged associate of Lee Harvey Oswald, investigated by Jim Garrison.",
    birth: "March 18, 1918",
    death: "February 22, 1967",
    birthPlace: "Cleveland, Ohio",
    occupation: "Pilot, Private Investigator",
    background: "David William Ferrie was a pilot, amateur cancer researcher, and alleged associate of Lee Harvey Oswald through the Civil Air Patrol in New Orleans. He was investigated by Jim Garrison as part of a suspected conspiracy. Ferrie died of a brain hemorrhage in February 1967, shortly after Garrison's investigation became public. His death was ruled natural causes, though controversy surrounds the circumstances.",
    documents: [
      { title: "Garrison Investigation Files", href: "#" },
    ],
    events: [
      { title: "Civil Air Patrol", href: "#" },
    ],
    connections: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Clay Shaw", href: "/people/clay-shaw" },
    ],
  },
  {
    id: "earl-warren",
    name: "Earl Warren",
    description: "Chief Justice of the United States who chaired the Warren Commission.",
    birth: "March 19, 1891",
    death: "July 9, 1974",
    birthPlace: "Los Angeles, California",
    occupation: "Chief Justice of the United States",
    background: "Earl Warren served as the 14th Chief Justice of the United States from 1953 to 1969. President Johnson appointed him to chair the commission investigating the Kennedy assassination, which became known as the Warren Commission. The commission's report, released in September 1964, concluded that Lee Harvey Oswald acted alone. Warren's legacy also includes landmark civil rights decisions such as Brown v. Board of Education.",
    documents: [
      { title: "Warren Commission Report", href: "#" },
    ],
    events: [
      { title: "Warren Commission Hearings", href: "#" },
    ],
    connections: [],
  },
  {
    id: "george-de-mohrenschildt",
    name: "George de Mohrenschildt",
    description: "Russian-born petroleum geologist who befriended Lee Harvey Oswald in Dallas.",
    birth: "April 17, 1911",
    death: "March 29, 1977",
    birthPlace: "Mozyr, Russian Empire (now Belarus)",
    occupation: "Petroleum Geologist",
    background: "George de Mohrenschildt was a Russian-born petroleum geologist who befriended Lee Harvey Oswald after his return from the Soviet Union. Despite their significant differences in social status, de Mohrenschildt and his wife Jeanne became close to the Oswalds in Dallas. He testified before the Warren Commission and later the HSCA. He died of a self-inflicted gunshot wound on the day an HSCA investigator arrived to interview him.",
    documents: [
      { title: "Warren Commission Testimony", href: "#" },
      { title: "HSCA Interview", href: "#" },
    ],
    events: [
      { title: "Friendship with Oswald", href: "#" },
    ],
    connections: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Marina Oswald Porter", href: "/people/marina-oswald-porter" },
    ],
  },
]

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.id === slug)
}

export function getAllPeopleSlugs(): string[] {
  return people.map((p) => p.id)
}
