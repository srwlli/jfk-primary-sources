import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const archives = [
  {
    title: "Mary Ferrell Foundation",
    description: "Comprehensive JFK assassination archive and documents",
    url: "https://www.maryferrell.org/pages/Main_Page.html",
    icon: "library_books",
  },
  {
    title: "History Matters",
    description: "Primary source documents and encyclopedic archive",
    url: "https://www.history-matters.com/index.htm",
    icon: "history_edu",
  },
  {
    title: "The Sixth Floor Museum",
    description: "Official museum at Dealey Plaza, Dallas",
    url: "https://www.jfk.org/",
    icon: "museum",
  },
  {
    title: "Cuban Exile History",
    description: "Cuban exile encyclopedic archive and documents",
    url: "https://cuban-exile.com/",
    icon: "public",
  },
  {
    title: "JFK Presidential Library",
    description: "Official presidential library and museum, Boston",
    url: "https://www.jfklibrary.org/",
    icon: "account_balance",
  },
  {
    title: "AARC Library",
    description: "Assassination Archives and Research Center",
    url: "https://aarclibrary.org/",
    icon: "folder_open",
  },
  {
    title: "National Archives",
    description: "JFK Assassination Records Collection",
    url: "https://www.archives.gov/research/jfk",
    icon: "assured_workload",
  },
  {
    title: "Hood College Collection",
    description: "JFK Assassination Document Collection",
    url: "http://jfk.hood.edu/",
    icon: "school",
  },
]

async function seed() {
  console.log('Seeding archives table...')

  const { data, error } = await supabase
    .from('archives')
    .upsert(archives, { onConflict: 'url' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} archives`)
}

seed()
