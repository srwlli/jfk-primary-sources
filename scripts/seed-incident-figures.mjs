import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const people = [
  {
    slug: 'edwin-walker',
    first_name: 'Edwin',
    middle_name: 'Anderson',
    last_name: 'Walker',
    description: 'Controversial right-wing Army general who was the target of an alleged assassination attempt by Lee Harvey Oswald.',
    birth: '1909-11-10',
    death: '1993-10-31',
    birth_city: 'Melrose',
    birth_state: 'Texas',
    birth_country: 'USA',
    occupation: 'U.S. Army Major General',
    background: 'Edwin Walker was a decorated U.S. Army Major General who became a controversial political figure in the early 1960s. He resigned from the Army in 1961 after being admonished for distributing right-wing John Birch Society literature to his troops. He became an outspoken segregationist and critic of the Kennedy administration. On April 10, 1963, someone fired a rifle shot through his window while he sat at his desk, narrowly missing him. The case remained unsolved until after the JFK assassination, when Marina Oswald testified that her husband had confessed to the attempt.',
    documents: [
      { title: 'Warren Commission Report - Walker Incident', href: '/investigations/warren-commission' },
      { title: 'Dallas Police Report', href: '#' }
    ],
    events: [
      { title: 'Walker Shooting Incident', href: '/incidents/walker-incident' },
      { title: 'Ole Miss Riot', href: '#' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' }
    ]
  },
  {
    slug: 'silvia-odio',
    first_name: 'Silvia',
    middle_name: null,
    last_name: 'Odio',
    description: 'Cuban exile who claimed three men, including someone introduced as "Leon Oswald," visited her apartment weeks before the assassination.',
    birth: '1937-01-01',
    death: null,
    birth_city: 'Havana',
    birth_state: null,
    birth_country: 'Cuba',
    occupation: 'Office Worker, Cuban Exile Activist',
    background: 'Silvia Odio was a Cuban exile living in Dallas in 1963. Her parents were political prisoners in Cuba, and she was involved with JURE (Junta Revolucionaria Cubana), an anti-Castro organization. In late September 1963, she reported that three men visited her apartment, two Cubans and an American introduced as "Leon Oswald." The next day, one caller made ominous comments about Kennedy. After the assassination, Odio positively identified Lee Harvey Oswald as the American visitor. The HSCA found her testimony credible, calling the incident one of the most troubling aspects of the investigation.',
    documents: [
      { title: 'Warren Commission Testimony', href: '#' },
      { title: 'HSCA Report on Odio Incident', href: '/investigations/hsca' }
    ],
    events: [
      { title: 'Odio Incident', href: '/incidents/odio-incident' }
    ],
    connections: [
      { name: 'Lee Harvey Oswald', href: '/people/lee-harvey-oswald' },
      { name: 'Annie Odio', href: '/people/annie-odio' }
    ]
  },
  {
    slug: 'annie-odio',
    first_name: 'Annie',
    middle_name: null,
    last_name: 'Odio',
    description: 'Sister of Silvia Odio who also witnessed three men at their Dallas apartment door in September 1963.',
    birth: '1940-01-01',
    death: null,
    birth_city: 'Havana',
    birth_state: null,
    birth_country: 'Cuba',
    occupation: 'Cuban Exile',
    background: 'Annie Odio was the younger sister of Silvia Odio. On the evening of the alleged visit by "Leon Oswald" and two Latin men to their Dallas apartment in late September 1963, Annie was present and briefly saw the three men at the door. Her corroboration of her sister\'s account strengthened Silvia\'s testimony. The Warren Commission and later the HSCA interviewed both sisters about the incident.',
    documents: [
      { title: 'Warren Commission Interview', href: '#' }
    ],
    events: [
      { title: 'Odio Incident', href: '/incidents/odio-incident' }
    ],
    connections: [
      { name: 'Silvia Odio', href: '/people/silvia-odio' }
    ]
  }
]

async function seed() {
  console.log('Seeding incident figures...')

  const { data, error } = await supabase
    .from('people')
    .upsert(people, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} incident figures`)
}

seed()
