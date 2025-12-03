import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const people = [
  // Warren Commission Members
  {
    slug: 'richard-russell',
    first_name: 'Richard',
    middle_name: 'Brevard',
    last_name: 'Russell Jr.',
    description: 'U.S. Senator from Georgia and Warren Commission member.',
    birth: '1897-11-02',
    death: '1971-01-21',
    birth_city: 'Winder',
    birth_state: 'Georgia',
    birth_country: 'USA',
    occupation: 'U.S. Senator',
    background: 'Richard Russell Jr. served as a U.S. Senator from Georgia for 38 years and was one of the most powerful members of Congress. He was appointed to the Warren Commission by President Johnson, though he was initially reluctant to serve. Russell was skeptical of the single-bullet theory and privately expressed doubts about some of the Commission\'s conclusions. He was the only Commission member to formally dissent from the single-bullet finding.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'john-sherman-cooper',
    first_name: 'John',
    middle_name: 'Sherman',
    last_name: 'Cooper',
    description: 'U.S. Senator from Kentucky and Warren Commission member.',
    birth: '1901-08-23',
    death: '1991-02-21',
    birth_city: 'Somerset',
    birth_state: 'Kentucky',
    birth_country: 'USA',
    occupation: 'U.S. Senator, Ambassador',
    background: 'John Sherman Cooper was a Republican Senator from Kentucky who served on the Warren Commission. A respected moderate, Cooper had also served as U.S. Ambassador to India and East Germany. Along with Senator Russell, he had reservations about the single-bullet theory, though he ultimately signed the final report.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'hale-boggs',
    first_name: 'Hale',
    middle_name: null,
    last_name: 'Boggs',
    description: 'U.S. Representative from Louisiana and Warren Commission member.',
    birth: '1914-02-15',
    death: '1972-10-16',
    birth_city: 'Long Beach',
    birth_state: 'Mississippi',
    birth_country: 'USA',
    occupation: 'U.S. Representative, House Majority Leader',
    background: 'Thomas Hale Boggs Sr. was a Democratic Congressman from Louisiana who rose to become House Majority Leader. He served on the Warren Commission and initially supported its conclusions. However, by 1971, Boggs publicly called for an investigation of FBI Director J. Edgar Hoover and expressed doubts about the Warren Report. He disappeared in 1972 when his plane vanished over Alaska; no wreckage was ever found.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'gerald-ford',
    first_name: 'Gerald',
    middle_name: 'Rudolph',
    last_name: 'Ford',
    description: 'U.S. Representative from Michigan, Warren Commission member, later 38th President.',
    birth: '1913-07-14',
    death: '2006-12-26',
    birth_city: 'Omaha',
    birth_state: 'Nebraska',
    birth_country: 'USA',
    occupation: 'U.S. Representative, 38th President of the United States',
    background: 'Gerald Ford was a Republican Congressman from Michigan who served on the Warren Commission. He co-authored a book defending the Commission\'s findings. Ford later became Vice President under Nixon and succeeded to the presidency after Nixon\'s resignation in 1974. Declassified documents revealed that Ford, while on the Commission, provided information to the FBI about the panel\'s deliberations.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'allen-dulles',
    first_name: 'Allen',
    middle_name: 'Welsh',
    last_name: 'Dulles',
    description: 'Former CIA Director and Warren Commission member.',
    birth: '1893-04-07',
    death: '1969-01-29',
    birth_city: 'Watertown',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'Director of Central Intelligence',
    background: 'Allen Dulles served as Director of the CIA from 1953 until President Kennedy fired him in 1961 following the Bay of Pigs invasion failure. Despite this history, President Johnson appointed him to the Warren Commission. Critics have questioned whether Dulles properly disclosed CIA activities related to Cuba and potential connections to the assassination. He was the most active member of the Commission in terms of attendance at hearings.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'john-j-mccloy',
    first_name: 'John',
    middle_name: 'Jay',
    last_name: 'McCloy',
    description: 'Former World Bank President and Warren Commission member.',
    birth: '1895-03-31',
    death: '1989-03-11',
    birth_city: 'Philadelphia',
    birth_state: 'Pennsylvania',
    birth_country: 'USA',
    occupation: 'Lawyer, Banker, Presidential Advisor',
    background: 'John J. McCloy was a prominent lawyer and government official who served as Assistant Secretary of War during World War II, U.S. High Commissioner for Germany, and President of the World Bank. He was a member of the U.S. foreign policy establishment sometimes called "The Wise Men." On the Warren Commission, he helped craft the single-bullet theory and strongly defended the Commission\'s conclusions.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },
  {
    slug: 'j-lee-rankin',
    first_name: 'J.',
    middle_name: 'Lee',
    last_name: 'Rankin',
    description: 'General Counsel of the Warren Commission.',
    birth: '1907-07-08',
    death: '1996-06-26',
    birth_city: 'Hartington',
    birth_state: 'Nebraska',
    birth_country: 'USA',
    occupation: 'Lawyer, Solicitor General of the United States',
    background: 'J. Lee Rankin served as Solicitor General under President Eisenhower before being appointed General Counsel of the Warren Commission. He oversaw the day-to-day operations of the investigation and coordinated the work of the staff attorneys. Rankin later served as Corporation Counsel for New York City. He defended the Commission\'s work throughout his life.',
    documents: [],
    events: [{ title: 'Warren Commission Hearings', href: '/investigations/warren-commission' }],
    connections: [{ name: 'Earl Warren', href: '/people/earl-warren' }]
  },

  // Clay Shaw Trial Figures
  {
    slug: 'jim-garrison',
    first_name: 'Jim',
    middle_name: null,
    last_name: 'Garrison',
    description: 'New Orleans District Attorney who prosecuted Clay Shaw for conspiracy.',
    birth: '1921-11-20',
    death: '1992-10-21',
    birth_city: 'Denison',
    birth_state: 'Iowa',
    birth_country: 'USA',
    occupation: 'District Attorney, Judge',
    background: 'Jim Garrison served as District Attorney of Orleans Parish from 1962 to 1973. In 1967, he launched an investigation into the Kennedy assassination, claiming to have uncovered a conspiracy involving Clay Shaw, David Ferrie, and others. Though Shaw was acquitted, Garrison\'s investigation brought national attention to inconsistencies in the Warren Report. Oliver Stone\'s 1991 film "JFK" was largely based on Garrison\'s theories. Garrison later served as a judge on the Louisiana Court of Appeal.',
    documents: [{ title: 'Garrison Investigation Files', href: '/investigations/clay-shaw-trial' }],
    events: [{ title: 'Clay Shaw Trial', href: '/investigations/clay-shaw-trial' }],
    connections: [
      { name: 'Clay Shaw', href: '/people/clay-shaw' },
      { name: 'David Ferrie', href: '/people/david-ferrie' }
    ]
  },
  {
    slug: 'f-irvin-dymond',
    first_name: 'F.',
    middle_name: 'Irvin',
    last_name: 'Dymond',
    description: 'Lead defense attorney for Clay Shaw.',
    birth: '1916-01-01',
    death: '1986-12-31',
    birth_city: 'New Orleans',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Criminal Defense Attorney',
    background: 'F. Irvin Dymond was a prominent New Orleans criminal defense attorney who led Clay Shaw\'s defense team. His cross-examination of prosecution witnesses, particularly Perry Russo, effectively dismantled the case against Shaw. Dymond\'s defense strategy focused on the unreliability of the prosecution\'s evidence and witnesses, leading to Shaw\'s acquittal after less than an hour of jury deliberation.',
    documents: [],
    events: [{ title: 'Clay Shaw Trial', href: '/investigations/clay-shaw-trial' }],
    connections: [{ name: 'Clay Shaw', href: '/people/clay-shaw' }]
  },
  {
    slug: 'edward-haggerty',
    first_name: 'Edward',
    middle_name: 'Aloysius',
    last_name: 'Haggerty Sr.',
    description: 'Presiding judge at the Clay Shaw trial.',
    birth: '1913-01-01',
    death: '1991-12-31',
    birth_city: 'New Orleans',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Judge',
    background: 'Judge Edward Haggerty presided over the Clay Shaw trial in 1969. He managed a high-profile case that attracted international media attention. After the jury returned a not-guilty verdict, Haggerty reportedly told Shaw, "I think this is a travesty." Haggerty later faced his own legal troubles unrelated to the Shaw case.',
    documents: [],
    events: [{ title: 'Clay Shaw Trial', href: '/investigations/clay-shaw-trial' }],
    connections: [
      { name: 'Clay Shaw', href: '/people/clay-shaw' },
      { name: 'Jim Garrison', href: '/people/jim-garrison' }
    ]
  },
  {
    slug: 'perry-russo',
    first_name: 'Perry',
    middle_name: 'Raymond',
    last_name: 'Russo',
    description: 'Key prosecution witness in the Clay Shaw trial.',
    birth: '1941-08-14',
    death: '1995-08-19',
    birth_city: 'New Orleans',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Insurance Salesman',
    background: 'Perry Russo was the key witness in Jim Garrison\'s case against Clay Shaw. Russo claimed to have attended a party in September 1963 where Shaw, David Ferrie, and a man he later identified as Oswald discussed assassinating President Kennedy. His testimony was controversial because his memories emerged under hypnosis and sodium pentothal. Under cross-examination, his account was significantly undermined, contributing to Shaw\'s acquittal.',
    documents: [],
    events: [{ title: 'Clay Shaw Trial', href: '/investigations/clay-shaw-trial' }],
    connections: [
      { name: 'Jim Garrison', href: '/people/jim-garrison' },
      { name: 'David Ferrie', href: '/people/david-ferrie' }
    ]
  },
  {
    slug: 'dean-andrews',
    first_name: 'Dean',
    middle_name: 'Adams',
    last_name: 'Andrews Jr.',
    description: 'New Orleans attorney who claimed contact with "Clay Bertrand."',
    birth: '1922-04-11',
    death: '1981-11-08',
    birth_city: 'New Orleans',
    birth_state: 'Louisiana',
    birth_country: 'USA',
    occupation: 'Attorney',
    background: 'Dean Andrews was a colorful New Orleans attorney who told the Warren Commission that someone named "Clay Bertrand" called him the day after the assassination asking him to represent Oswald. Garrison believed Bertrand was an alias for Clay Shaw. Andrews gave contradictory testimony and was convicted of perjury during the Shaw investigation. He denied that Shaw was Bertrand but never definitively identified who Bertrand actually was.',
    documents: [{ title: 'Warren Commission Testimony', href: '#' }],
    events: [{ title: 'Clay Shaw Trial', href: '/investigations/clay-shaw-trial' }],
    connections: [
      { name: 'Jim Garrison', href: '/people/jim-garrison' },
      { name: 'Clay Shaw', href: '/people/clay-shaw' }
    ]
  },

  // HSCA Figures
  {
    slug: 'louis-stokes',
    first_name: 'Louis',
    middle_name: null,
    last_name: 'Stokes',
    description: 'U.S. Representative who chaired the HSCA from 1977-1979.',
    birth: '1925-02-23',
    death: '2015-08-18',
    birth_city: 'Cleveland',
    birth_state: 'Ohio',
    birth_country: 'USA',
    occupation: 'U.S. Representative',
    background: 'Louis Stokes was a Democratic Congressman from Ohio who became chairman of the House Select Committee on Assassinations in 1977 after Henry Gonzalez resigned. Under his leadership, the committee concluded that President Kennedy was "probably assassinated as a result of a conspiracy." Stokes served in Congress for 30 years and was known for his work on ethics and intelligence oversight.',
    documents: [{ title: 'HSCA Final Report', href: '/investigations/hsca' }],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'G. Robert Blakey', href: '/people/g-robert-blakey' }]
  },
  {
    slug: 'henry-gonzalez',
    first_name: 'Henry',
    middle_name: 'Barbosa',
    last_name: 'Gonzalez',
    description: 'U.S. Representative who initially chaired the HSCA in 1976-1977.',
    birth: '1916-05-03',
    death: '2000-11-28',
    birth_city: 'San Antonio',
    birth_state: 'Texas',
    birth_country: 'USA',
    occupation: 'U.S. Representative',
    background: 'Henry B. Gonzalez was a Democratic Congressman from Texas who led the effort to establish the House Select Committee on Assassinations and served as its first chairman. He clashed with chief counsel Richard Sprague over the investigation\'s direction and budget, leading to Gonzalez\'s resignation from the chairmanship in early 1977. He continued to serve in Congress until 1999.',
    documents: [],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'Louis Stokes', href: '/people/louis-stokes' }]
  },
  {
    slug: 'g-robert-blakey',
    first_name: 'G.',
    middle_name: 'Robert',
    last_name: 'Blakey',
    description: 'Chief Counsel of the HSCA from 1977-1979.',
    birth: '1936-01-07',
    death: null,
    birth_city: 'Burlington',
    birth_state: 'North Carolina',
    birth_country: 'USA',
    occupation: 'Law Professor, Organized Crime Expert',
    background: 'G. Robert Blakey was a Notre Dame law professor and organized crime expert who served as Chief Counsel of the HSCA. He drafted the RICO statute as a Justice Department attorney. Under his direction, the committee investigated possible mob involvement in the assassination. The committee\'s conclusion of probable conspiracy was based largely on acoustic evidence that Blakey championed, though this evidence was later disputed.',
    documents: [{ title: 'HSCA Final Report', href: '/investigations/hsca' }],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'Louis Stokes', href: '/people/louis-stokes' }]
  },
  {
    slug: 'richard-sprague',
    first_name: 'Richard',
    middle_name: 'A.',
    last_name: 'Sprague',
    description: 'First Chief Counsel of the HSCA in 1976-1977.',
    birth: '1925-01-01',
    death: '2018-09-12',
    birth_city: 'Philadelphia',
    birth_state: 'Pennsylvania',
    birth_country: 'USA',
    occupation: 'Prosecutor',
    background: 'Richard Sprague was a Philadelphia prosecutor known for his aggressive style who was appointed the first Chief Counsel of the HSCA. He sought broad subpoena powers and a large budget, which led to conflicts with Congress and committee chairman Henry Gonzalez. Sprague resigned in early 1977 amid controversy over the committee\'s funding and direction. He was replaced by G. Robert Blakey.',
    documents: [],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'Henry Gonzalez', href: '/people/henry-gonzalez' }]
  },
  {
    slug: 'michael-baden',
    first_name: 'Michael',
    middle_name: 'M.',
    last_name: 'Baden',
    description: 'Forensic pathologist who chaired the HSCA Forensic Pathology Panel.',
    birth: '1934-07-27',
    death: '2024-04-28',
    birth_city: 'Bronx',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'Forensic Pathologist',
    background: 'Dr. Michael Baden was Chief Medical Examiner of New York City when he chaired the HSCA\'s nine-member Forensic Pathology Panel. The panel reviewed all medical evidence and generally supported the original autopsy findings, concluding Kennedy was struck by two bullets from behind. Baden became one of America\'s most prominent forensic pathologists, later involved in high-profile cases including O.J. Simpson and Jeffrey Epstein.',
    documents: [{ title: 'Forensic Pathology Panel Report', href: '/investigations/hsca' }],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'Cyril Wecht', href: '/people/cyril-wecht' }]
  },
  {
    slug: 'cyril-wecht',
    first_name: 'Cyril',
    middle_name: 'Harrison',
    last_name: 'Wecht',
    description: 'Forensic pathologist and HSCA panel member who dissented on key findings.',
    birth: '1931-03-20',
    death: '2024-05-13',
    birth_city: 'Dunkard Township',
    birth_state: 'Pennsylvania',
    birth_country: 'USA',
    occupation: 'Forensic Pathologist, Coroner',
    background: 'Dr. Cyril Wecht was a forensic pathologist and Allegheny County Coroner who served on the HSCA\'s Forensic Pathology Panel. He was the only panel member to formally dissent from the single-bullet theory, arguing it was anatomically impossible. Wecht became the most prominent medical critic of the Warren Commission\'s conclusions and authored several books challenging the lone gunman theory.',
    documents: [{ title: 'Forensic Pathology Panel Report', href: '/investigations/hsca' }],
    events: [{ title: 'HSCA Investigation', href: '/investigations/hsca' }],
    connections: [{ name: 'Michael Baden', href: '/people/michael-baden' }]
  },

  // ARRB Figures
  {
    slug: 'john-tunheim',
    first_name: 'John',
    middle_name: 'R.',
    last_name: 'Tunheim',
    description: 'Federal judge who chaired the Assassination Records Review Board.',
    birth: '1953-01-01',
    death: null,
    birth_city: 'Duluth',
    birth_state: 'Minnesota',
    birth_country: 'USA',
    occupation: 'Federal Judge',
    background: 'John R. Tunheim is a U.S. District Court Judge in Minnesota who served as chairman of the Assassination Records Review Board from 1994 to 1998. Under his leadership, the ARRB oversaw the release of millions of pages of previously classified documents related to the Kennedy assassination. The board\'s work significantly expanded public access to government records and set precedents for transparency.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'David Marwell', href: '/people/david-marwell' }]
  },
  {
    slug: 'henry-graff',
    first_name: 'Henry',
    middle_name: 'Franklin',
    last_name: 'Graff',
    description: 'Columbia University historian and ARRB member.',
    birth: '1921-08-11',
    death: '2020-08-06',
    birth_city: 'New York',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'Historian, Professor',
    background: 'Henry Graff was a distinguished professor of history at Columbia University who specialized in presidential history. He served on the Assassination Records Review Board, bringing academic expertise to the evaluation of historical records. His scholarly perspective helped guide the board\'s decisions on which documents merited release.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'John Tunheim', href: '/people/john-tunheim' }]
  },
  {
    slug: 'kermit-hall',
    first_name: 'Kermit',
    middle_name: 'Lance',
    last_name: 'Hall',
    description: 'Legal historian and ARRB member.',
    birth: '1944-09-30',
    death: '2006-08-13',
    birth_city: 'Akron',
    birth_state: 'Ohio',
    birth_country: 'USA',
    occupation: 'Legal Historian, University President',
    background: 'Kermit Hall was a distinguished legal historian who served on the Assassination Records Review Board. He was an expert on constitutional history and the Supreme Court. Hall later served as president of Utah State University and was president of the University at Albany at the time of his death. His expertise in legal and constitutional history informed the board\'s approach to classified records.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'John Tunheim', href: '/people/john-tunheim' }]
  },
  {
    slug: 'william-joyce',
    first_name: 'William',
    middle_name: 'L.',
    last_name: 'Joyce',
    description: 'Princeton librarian and ARRB member.',
    birth: '1947-01-01',
    death: null,
    birth_city: 'New York',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'Librarian, Archivist',
    background: 'William Joyce served as Associate University Librarian for Rare Books and Special Collections at Princeton University. His expertise in archives and special collections made him valuable to the ARRB\'s mission of identifying, collecting, and preserving assassination-related records. He brought professional standards for document preservation to the board\'s work.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'John Tunheim', href: '/people/john-tunheim' }]
  },
  {
    slug: 'anna-nelson',
    first_name: 'Anna',
    middle_name: 'Kasten',
    last_name: 'Nelson',
    description: 'Historian and ARRB member.',
    birth: '1929-01-01',
    death: '2017-08-24',
    birth_city: 'Milwaukee',
    birth_state: 'Wisconsin',
    birth_country: 'USA',
    occupation: 'Historian, Professor',
    background: 'Anna Kasten Nelson was a distinguished professor of history at American University specializing in U.S. government secrecy and national security. She brought expertise in government records and classification policies to the ARRB. Nelson was an advocate for government transparency and later wrote about the lessons learned from the board\'s work.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'John Tunheim', href: '/people/john-tunheim' }]
  },
  {
    slug: 'david-marwell',
    first_name: 'David',
    middle_name: 'G.',
    last_name: 'Marwell',
    description: 'Executive Director of the Assassination Records Review Board.',
    birth: '1952-01-01',
    death: null,
    birth_city: 'New York',
    birth_state: 'New York',
    birth_country: 'USA',
    occupation: 'Historian, Museum Director',
    background: 'David Marwell served as Executive Director of the Assassination Records Review Board, managing the day-to-day operations of the agency. Before the ARRB, he worked at the Justice Department\'s Office of Special Investigations tracking Nazi war criminals. He later became director of the Museum of Jewish Heritage in New York. Marwell oversaw the release of over 60,000 documents during his tenure at the ARRB.',
    documents: [{ title: 'ARRB Final Report', href: '/investigations/jfk-records-act' }],
    events: [{ title: 'ARRB Review', href: '/investigations/jfk-records-act' }],
    connections: [{ name: 'John Tunheim', href: '/people/john-tunheim' }]
  }
]

async function seed() {
  console.log('Seeding investigation figures...')

  const { data, error } = await supabase
    .from('people')
    .upsert(people, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} investigation figures`)
}

seed()
