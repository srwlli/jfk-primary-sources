import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const people = [
  {
    slug: 'lee-harvey-oswald',
    first_name: 'Lee',
    middle_name: 'Harvey',
    last_name: 'Oswald',
    description: 'Figure identified as the primary suspect in the assassination of President John F. Kennedy.',
    birth: '1939-10-18',
    death: '1963-11-24',
    birth_city: 'New Orleans',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Former U.S. Marine, Factory Worker',
    background: 'Lee Harvey Oswald was a former U.S. Marine who defected to the Soviet Union in 1959, returning to the United States in 1962 with his Russian wife Marina. He worked at the Texas School Book Depository in Dallas at the time of the assassination. He was arrested for the murder of Dallas police officer J.D. Tippit and later charged with assassinating President Kennedy. He was shot and killed by Jack Ruby two days after the assassination while being transferred between jails.',
    documents: [
      { title: 'Warren Commission Report', href: '#' },
      { title: 'HSCA Report Volume XI', href: '#' },
      { title: 'Military Service Record', href: '#' }
    ],
    events: [
      { title: 'JFK Assassination', href: '#' },
      { title: 'Time in Soviet Union', href: '#' },
      { title: 'Shooting of J.D. Tippit', href: '#' }
    ],
    connections: [
      { name: 'Marina Oswald Porter', href: '/people/marina-oswald-porter' },
      { name: 'Jack Ruby', href: '/people/jack-ruby' },
      { name: 'George de Mohrenschildt', href: '/people/george-de-mohrenschildt' }
    ]
  },
  {
    slug: 'jack-ruby',
    first_name: 'Jack',
    middle_name: null,
    last_name: 'Ruby',
    description: 'Dallas nightclub owner who shot and killed Lee Harvey Oswald on November 24, 1963.',
    birth: '1911-03-25',
    death: '1967-01-03',
    birth_city: 'Chicago',
    birth_state: 'Illinois',
    birth_country: 'USA',
    occupation: 'Nightclub Owner',
    background: 'Jack Ruby, born Jacob Leon Rubenstein, operated the Carousel Club, a Dallas nightclub. On November 24, 1963, he shot and killed Lee Harvey Oswald in the basement of Dallas Police Headquarters during a jail transfer, an event broadcast live on national television. Ruby was convicted of murder and sentenced to death, but the conviction was overturned on appeal. He died of lung cancer while awaiting a new trial.',
    documents: [
      { title: 'Warren Commission Testimony', href: '#' },
      { title: 'FBI Background Report', href: '#' }
    ],
    events: [
      { title: 'Shooting of Lee Harvey Oswald', href: '#' },
      { title: 'Ruby Trial', href: '#' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' }
    ]
  },
  {
    slug: 'john-f-kennedy',
    first_name: 'John',
    middle_name: 'Fitzgerald',
    last_name: 'Kennedy',
    description: '35th President of the United States, assassinated in Dallas, Texas on November 22, 1963.',
    birth: '1917-05-29',
    death: '1963-11-22',
    birth_city: 'Brookline',
    birth_state: 'Massachusetts',
    birth_country: 'USA',
    occupation: '35th President of the United States',
    background: 'John Fitzgerald Kennedy served as the 35th President of the United States from January 1961 until his assassination. A decorated World War II naval officer and U.S. Senator from Massachusetts, Kennedy was the youngest person elected to the presidency. He was assassinated while riding in a motorcade through Dealey Plaza in Dallas, Texas. His death prompted the largest criminal investigation in U.S. history and continues to be the subject of significant debate and research.',
    documents: [
      { title: 'Autopsy Report', href: '#' },
      { title: 'Warren Commission Report', href: '#' }
    ],
    events: [
      { title: 'JFK Assassination', href: '#' },
      { title: 'Motorcade Through Dallas', href: '#' }
    ],
    connections: [
      { name: 'Jacqueline Kennedy', href: '/people/jacqueline-kennedy' },
      { name: 'Lyndon B. Johnson', href: '/people/lyndon-b-johnson' }
    ]
  },
  {
    slug: 'jacqueline-kennedy',
    first_name: 'Jacqueline',
    middle_name: 'Lee',
    last_name: 'Kennedy',
    description: 'First Lady of the United States and wife of President John F. Kennedy.',
    birth: '1929-07-28',
    death: '1994-05-19',
    birth_city: 'Southampton',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'First Lady of the United States',
    background: "Jacqueline Lee Kennedy Onassis served as First Lady during her husband's presidency. She was seated next to him in the presidential limousine during the assassination and cradled him after he was shot. Her composure and dignity during the funeral proceedings earned widespread admiration. She later married Greek shipping magnate Aristotle Onassis and worked as a book editor in New York City.",
    documents: [
      { title: 'Warren Commission Testimony', href: '#' }
    ],
    events: [
      { title: 'JFK Assassination', href: '#' }
    ],
    connections: [
      { name: 'John F. Kennedy', href: '/people/john-f-kennedy' }
    ]
  },
  {
    slug: 'marina-oswald-porter',
    first_name: 'Marina',
    middle_name: 'Nikolayevna',
    last_name: 'Oswald Porter',
    description: 'Soviet-born wife of Lee Harvey Oswald.',
    birth: '1941-07-17',
    death: null,
    birth_city: 'Severodvinsk',
    birth_state: null,
    birth_country: 'Soviet Union',
    occupation: 'Pharmacist',
    background: "Marina Nikolayevna Oswald Porter met Lee Harvey Oswald at a dance in Minsk in March 1961. They married six weeks later and moved to the United States in June 1962. She provided crucial testimony to the Warren Commission, including information about Oswald's attempted shooting of General Edwin Walker. She has since remarried and continues to live in the Dallas area.",
    documents: [
      { title: 'Warren Commission Testimony', href: '#' },
      { title: 'HSCA Testimony', href: '#' }
    ],
    events: [
      { title: 'Life in Soviet Union', href: '#' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' },
      { name: 'Ruth Paine', href: '#' }
    ]
  },
  {
    slug: 'lyndon-b-johnson',
    first_name: 'Lyndon',
    middle_name: 'Baines',
    last_name: 'Johnson',
    description: "36th President of the United States, sworn in after Kennedy's assassination.",
    birth: '1908-08-27',
    death: '1973-01-22',
    birth_city: 'Stonewall',
    birth_state: 'Texas',
    birth_country: 'USA',
    occupation: '36th President of the United States',
    background: 'Lyndon Baines Johnson was Vice President under Kennedy and was sworn in as President aboard Air Force One at Love Field, approximately two hours after the assassination. He established the Warren Commission by Executive Order 11130 to investigate the assassination. He served as President until 1969, overseeing major civil rights legislation and the escalation of the Vietnam War.',
    documents: [
      { title: 'Warren Commission Executive Order', href: '#' }
    ],
    events: [
      { title: 'Swearing In Ceremony', href: '#' },
      { title: 'JFK Assassination', href: '#' }
    ],
    connections: [
      { name: 'John F. Kennedy', href: '/people/john-f-kennedy' }
    ]
  },
  {
    slug: 'abraham-zapruder',
    first_name: 'Abraham',
    middle_name: null,
    last_name: 'Zapruder',
    description: 'Dallas clothing manufacturer who filmed the assassination with his 8mm home movie camera.',
    birth: '1905-05-15',
    death: '1970-08-30',
    birth_city: 'Kovel',
    birth_state: null,
    birth_country: 'Russian Empire',
    occupation: 'Clothing Manufacturer',
    background: 'Abraham Zapruder was a Dallas dress manufacturer who captured the assassination on his Bell & Howell 8mm home movie camera. The 26.6-second film, known as the Zapruder film, is considered the most complete recording of the assassination and has been crucial evidence in all subsequent investigations. He sold the original film to Life magazine for $150,000.',
    documents: [
      { title: 'Zapruder Film Analysis', href: '#' },
      { title: 'Warren Commission Testimony', href: '#' }
    ],
    events: [
      { title: 'JFK Assassination', href: '#' }
    ],
    connections: []
  },
  {
    slug: 'clay-shaw',
    first_name: 'Clay',
    middle_name: 'LaVerne',
    last_name: 'Shaw',
    description: 'New Orleans businessman tried and acquitted of conspiracy to assassinate President Kennedy.',
    birth: '1913-03-17',
    death: '1974-08-15',
    birth_city: 'Kentwood',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Businessman, Trade Mart Director',
    background: 'Clay LaVerne Shaw was a decorated World War II veteran and director of the International Trade Mart in New Orleans. In 1967, New Orleans District Attorney Jim Garrison charged Shaw with conspiring to assassinate President Kennedy. Shaw was the only person ever brought to trial for the assassination. He was acquitted in 1969 after less than an hour of jury deliberation.',
    documents: [
      { title: 'Garrison Investigation Files', href: '#' },
      { title: 'Trial Transcripts', href: '#' }
    ],
    events: [
      { title: 'Shaw Trial', href: '#' }
    ],
    connections: [
      { name: 'David Ferrie', href: '/people/david-ferrie' }
    ]
  },
  {
    slug: 'david-ferrie',
    first_name: 'David',
    middle_name: 'William',
    last_name: 'Ferrie',
    description: 'Pilot and alleged associate of Lee Harvey Oswald, investigated by Jim Garrison.',
    birth: '1918-03-18',
    death: '1967-02-22',
    birth_city: 'Cleveland',
    birth_state: 'Ohio',
    birth_country: 'USA',
    occupation: 'Pilot, Private Investigator',
    background: "David William Ferrie was a pilot, amateur cancer researcher, and alleged associate of Lee Harvey Oswald through the Civil Air Patrol in New Orleans. He was investigated by Jim Garrison as part of a suspected conspiracy. Ferrie died of a brain hemorrhage in February 1967, shortly after Garrison's investigation became public. His death was ruled natural causes, though controversy surrounds the circumstances.",
    documents: [
      { title: 'Garrison Investigation Files', href: '#' }
    ],
    events: [
      { title: 'Civil Air Patrol', href: '#' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' },
      { name: 'Clay Shaw', href: '/people/clay-shaw' }
    ]
  },
  {
    slug: 'earl-warren',
    first_name: 'Earl',
    middle_name: null,
    last_name: 'Warren',
    description: 'Chief Justice of the United States who chaired the Warren Commission.',
    birth: '1891-03-19',
    death: '1974-07-09',
    birth_city: 'Los Angeles',
    birth_state: 'California',
    birth_country: 'USA',
    occupation: 'Chief Justice of the United States',
    background: "Earl Warren served as the 14th Chief Justice of the United States from 1953 to 1969. President Johnson appointed him to chair the commission investigating the Kennedy assassination, which became known as the Warren Commission. The commission's report, released in September 1964, concluded that Lee Harvey Oswald acted alone. Warren's legacy also includes landmark civil rights decisions such as Brown v. Board of Education.",
    documents: [
      { title: 'Warren Commission Report', href: '#' }
    ],
    events: [
      { title: 'Warren Commission Hearings', href: '#' }
    ],
    connections: []
  },
  {
    slug: 'george-de-mohrenschildt',
    first_name: 'George',
    middle_name: null,
    last_name: 'de Mohrenschildt',
    description: 'Russian-born petroleum geologist who befriended Lee Harvey Oswald in Dallas.',
    birth: '1911-04-17',
    death: '1977-03-29',
    birth_city: 'Mozyr',
    birth_state: null,
    birth_country: 'Russian Empire',
    occupation: 'Petroleum Geologist',
    background: 'George de Mohrenschildt was a Russian-born petroleum geologist who befriended Lee Harvey Oswald after his return from the Soviet Union. Despite their significant differences in social status, de Mohrenschildt and his wife Jeanne became close to the Oswalds in Dallas. He testified before the Warren Commission and later the HSCA. He died of a self-inflicted gunshot wound on the day an HSCA investigator arrived to interview him.',
    documents: [
      { title: 'Warren Commission Testimony', href: '#' },
      { title: 'HSCA Interview', href: '#' }
    ],
    events: [
      { title: 'Friendship with Oswald', href: '#' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' },
      { name: 'Marina Oswald Porter', href: '/people/marina-oswald-porter' }
    ]
  }
]

async function seed() {
  console.log('Seeding people table...')

  const { data, error } = await supabase
    .from('people')
    .upsert(people, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} people`)
  console.log('Sample record:', JSON.stringify(data[0], null, 2))
}

seed()
