import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const locations = [
  // Dallas, Texas
  {
    slug: "texas-school-book-depository",
    name: "Texas School Book Depository",
    short_name: "TSBD",
    description: "A seven-story building in downtown Dallas that served as a warehouse for textbooks. On November 22, 1963, Lee Harvey Oswald allegedly fired shots from the sixth floor window, striking President Kennedy.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "411 Elm Street, Dallas, TX 75202",
    coordinates: { lat: 32.7802, lng: -96.8083 },
    significance: "Location of the alleged sniper's nest on the sixth floor. The Warren Commission concluded Oswald fired three shots from the southeast corner window.",
    events: [
      { date: "1963-11-22", description: "Shots fired from sixth floor window during presidential motorcade" },
      { date: "1963-11-22", description: "Rifle and three spent cartridges found on sixth floor" }
    ],
    current_status: "Museum - The Sixth Floor Museum at Dealey Plaza",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "dealey-plaza",
    name: "Dealey Plaza",
    short_name: null,
    description: "A city park in the West End Historic District of downtown Dallas. The plaza was the site of President Kennedy's assassination and is now a National Historic Landmark.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "Dealey Plaza, Dallas, TX 75202",
    coordinates: { lat: 32.7788, lng: -96.8084 },
    significance: "The assassination site. The presidential motorcade was traveling through the plaza when shots were fired. The grassy knoll, triple underpass, and picket fence are key areas of interest to researchers.",
    events: [
      { date: "1963-11-22", description: "President Kennedy assassinated at 12:30 PM" },
      { date: "1963-11-22", description: "Multiple witnesses report hearing shots from different directions" }
    ],
    current_status: "National Historic Landmark District",
    images: [],
    related_people: ["john-f-kennedy", "lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "dallas-police-department",
    name: "Dallas Police Department Headquarters",
    short_name: "DPD",
    description: "The municipal headquarters of the Dallas Police Department where Lee Harvey Oswald was held and interrogated after his arrest. Oswald was shot by Jack Ruby in the basement while being transferred.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "2014 Main Street, Dallas, TX (1963 location)",
    coordinates: { lat: 32.7825, lng: -96.7975 },
    significance: "Oswald was interrogated here for approximately 12 hours over two days. No recordings were made of the interrogations. Jack Ruby shot Oswald in the basement on November 24, 1963.",
    events: [
      { date: "1963-11-22", description: "Oswald brought in for questioning" },
      { date: "1963-11-22", description: "Oswald charged with murder of Officer Tippit" },
      { date: "1963-11-23", description: "Oswald charged with assassination of President Kennedy" },
      { date: "1963-11-24", description: "Jack Ruby shoots Oswald during jail transfer" }
    ],
    current_status: "Building demolished; new headquarters at different location",
    images: [],
    related_people: ["lee-harvey-oswald", "jack-ruby"],
    related_incidents: []
  },
  {
    slug: "parkland-memorial-hospital",
    name: "Parkland Memorial Hospital",
    short_name: "Parkland",
    description: "The public hospital where President Kennedy was taken after being shot. He was pronounced dead at 1:00 PM. Governor Connally was also treated here and survived his wounds.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "5200 Harry Hines Blvd, Dallas, TX 75235",
    coordinates: { lat: 32.8121, lng: -96.8406 },
    significance: "Emergency medical efforts to save President Kennedy took place in Trauma Room One. Lee Harvey Oswald was also brought here after being shot and died in the same hospital two days later.",
    events: [
      { date: "1963-11-22", description: "President Kennedy pronounced dead at 1:00 PM" },
      { date: "1963-11-22", description: "Governor Connally undergoes emergency surgery" },
      { date: "1963-11-24", description: "Lee Harvey Oswald dies after being shot by Jack Ruby" }
    ],
    current_status: "Active hospital - new building constructed",
    images: [],
    related_people: ["john-f-kennedy", "lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "texas-theatre",
    name: "Texas Theatre",
    short_name: null,
    description: "A historic movie theater in the Oak Cliff neighborhood of Dallas where Lee Harvey Oswald was arrested approximately 80 minutes after the assassination. He had entered without paying.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "231 W Jefferson Blvd, Dallas, TX 75208",
    coordinates: { lat: 32.7437, lng: -96.8272 },
    significance: "Oswald was apprehended here after a shoe store manager saw him duck into the theater without buying a ticket. Police surrounded the building and arrested Oswald after a brief struggle.",
    events: [
      { date: "1963-11-22", description: "Oswald enters theater without paying around 1:40 PM" },
      { date: "1963-11-22", description: "Police arrest Oswald after brief struggle in the theater" }
    ],
    current_status: "Operating theater and event venue",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "carousel-club",
    name: "Carousel Club",
    short_name: null,
    description: "A nightclub owned by Jack Ruby, located on Commerce Street in downtown Dallas. Ruby operated the club and was known to have relationships with Dallas police officers who frequented the establishment.",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    address: "1312½ Commerce Street, Dallas, TX (1963)",
    coordinates: { lat: 32.7815, lng: -96.7985 },
    significance: "Jack Ruby's business establishment. Ruby's connections to organized crime and local law enforcement through this club have been subjects of investigation.",
    events: [
      { date: "1963-11-22", description: "Ruby closes club out of respect after assassination" },
      { date: "1963-11-24", description: "Ruby shoots Oswald hours before club was to reopen" }
    ],
    current_status: "Building no longer exists",
    images: [],
    related_people: ["jack-ruby"],
    related_incidents: []
  },
  // New Orleans, Louisiana
  {
    slug: "544-camp-street",
    name: "544 Camp Street",
    short_name: null,
    description: "A building in New Orleans that housed Guy Banister's detective agency. Lee Harvey Oswald used this address on pro-Castro leaflets, though the building also housed anti-Castro organizations.",
    city: "New Orleans",
    state: "Louisiana",
    country: "USA",
    address: "544 Camp Street, New Orleans, LA",
    coordinates: { lat: 29.9496, lng: -90.0697 },
    significance: "The connection between Oswald's pro-Castro activities and Banister's anti-Castro operations at the same address has fueled conspiracy theories about intelligence connections.",
    events: [
      { date: "1963-08", description: "Oswald distributes Fair Play for Cuba leaflets with this address" }
    ],
    current_status: "Building still standing",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "reily-coffee-company",
    name: "William B. Reily Coffee Company",
    short_name: "Reily Coffee",
    description: "A coffee company in New Orleans where Lee Harvey Oswald worked as a maintenance man from May to July 1963. The company had connections to anti-Castro Cuban exiles.",
    city: "New Orleans",
    state: "Louisiana",
    country: "USA",
    address: "640 Magazine Street, New Orleans, LA",
    coordinates: { lat: 29.9442, lng: -90.0704 },
    significance: "Oswald's employment here during the summer of 1963, along with the company's alleged CIA connections and anti-Castro ties, has been a focus of researchers examining his New Orleans activities.",
    events: [
      { date: "1963-05-10", description: "Oswald begins work at Reily Coffee" },
      { date: "1963-07-19", description: "Oswald fired for poor work performance" }
    ],
    current_status: "Company still operates, different location",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  },
  // Mexico City
  {
    slug: "cuban-embassy-mexico-city",
    name: "Cuban Embassy",
    short_name: null,
    description: "The Cuban diplomatic mission in Mexico City that Lee Harvey Oswald allegedly visited in late September 1963, seeking a visa to travel to Cuba en route to the Soviet Union.",
    city: "Mexico City",
    state: null,
    country: "Mexico",
    address: "Mexico City, Mexico",
    coordinates: { lat: 19.4326, lng: -99.1332 },
    significance: "Oswald's visits to the Cuban and Soviet embassies weeks before the assassination raised questions about his motives and possible foreign connections. CIA surveillance of these embassies has been a source of controversy.",
    events: [
      { date: "1963-09-27", description: "Oswald allegedly visits seeking Cuban visa" },
      { date: "1963-09-28", description: "Oswald returns after being told to get Soviet visa first" }
    ],
    current_status: "Active embassy at different location",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  },
  {
    slug: "soviet-embassy-mexico-city",
    name: "Soviet Embassy",
    short_name: null,
    description: "The Soviet diplomatic mission in Mexico City that Lee Harvey Oswald allegedly visited in late September 1963, seeking a visa to return to the USSR.",
    city: "Mexico City",
    state: null,
    country: "Mexico",
    address: "Mexico City, Mexico",
    coordinates: { lat: 19.4284, lng: -99.1677 },
    significance: "Oswald's contacts with Soviet officials, including alleged meetings with KGB officer Valeriy Kostikov, have been subjects of investigation regarding possible Soviet involvement.",
    events: [
      { date: "1963-09-28", description: "Oswald visits seeking Soviet visa" },
      { date: "1963-10-01", description: "Oswald makes final visit before returning to Dallas" }
    ],
    current_status: "Russian Embassy at different location",
    images: [],
    related_people: ["lee-harvey-oswald"],
    related_incidents: []
  }
]

async function seed() {
  console.log('Seeding locations table...')

  const { data, error } = await supabase
    .from('locations')
    .upsert(locations, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} location(s)`)

  // Group by city for display
  const byCity = data.reduce((acc, loc) => {
    const key = `${loc.city}, ${loc.state || loc.country}`
    if (!acc[key]) acc[key] = []
    acc[key].push(loc.name)
    return acc
  }, {})

  Object.entries(byCity).forEach(([city, locs]) => {
    console.log(`\n${city}:`)
    locs.forEach(name => console.log(`  - ${name}`))
  })
}

seed()
