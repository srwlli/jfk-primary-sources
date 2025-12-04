// Seed script for documents table
// Run: SUPABASE_SERVICE_ROLE_KEY="your_key" node scripts/seed-documents.mjs

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleDocuments = [
  {
    slug: 'warren-commission-report',
    title: 'Warren Commission Report',
    description: 'Official report of the President\'s Commission on the Assassination of President Kennedy',
    date: '1964-09-24',
    category: 'report',
    agency: 'warren',
    source: 'National Archives',
    document_number: 'Report No. 1',
    pages: 888,
    summary: 'The Warren Commission concluded that Lee Harvey Oswald acted alone in assassinating President Kennedy and that Jack Ruby acted alone in killing Oswald. The report analyzed physical evidence, witness testimony, and Oswald\'s background.',
    related_people: ['lee-harvey-oswald', 'jack-ruby', 'john-f-kennedy'],
    related_investigations: ['warren-commission'],
  },
  {
    slug: 'fbi-oswald-file-105-82555',
    title: 'FBI Oswald File 105-82555',
    description: 'FBI investigation file on Lee Harvey Oswald',
    date: '1963-11-22',
    category: 'report',
    agency: 'fbi',
    source: 'FBI Records',
    document_number: '105-82555',
    pages: 47,
    summary: 'FBI file documenting surveillance and investigation of Lee Harvey Oswald prior to and following the assassination.',
    related_people: ['lee-harvey-oswald'],
  },
  {
    slug: 'autopsy-report-jfk',
    title: 'Autopsy Report - President John F. Kennedy',
    description: 'Official autopsy report from Bethesda Naval Hospital',
    date: '1963-11-22',
    category: 'autopsy',
    agency: 'other',
    agency_other: 'Bethesda Naval Hospital',
    source: 'National Archives',
    document_number: 'A63-272',
    pages: 5,
    summary: 'Autopsy performed by Commander James J. Humes, Commander J. Thornton Boswell, and Lt. Col. Pierre Finck. Documents gunshot wounds to head and neck.',
    related_people: ['john-f-kennedy'],
    related_incidents: ['assassination'],
  },
  {
    slug: 'oswald-interrogation-notes',
    title: 'Oswald Interrogation Notes - Captain Fritz',
    description: 'Notes from Dallas Police Captain Will Fritz\'s interrogation of Oswald',
    date: '1963-11-22',
    category: 'transcript',
    agency: 'dpd',
    source: 'Dallas Police Department',
    pages: 12,
    summary: 'Captain Fritz\'s handwritten notes from multiple interrogation sessions with Lee Harvey Oswald on November 22-24, 1963.',
    related_people: ['lee-harvey-oswald'],
    related_locations: ['dallas-police-headquarters'],
  },
  {
    slug: 'cia-201-file-oswald',
    title: 'CIA 201 File - Lee Harvey Oswald',
    description: 'CIA personnel file opened on Oswald in December 1960',
    date: '1960-12-09',
    category: 'report',
    agency: 'cia',
    source: 'CIA Records',
    document_number: '201-289248',
    pages: 83,
    summary: 'CIA file documenting agency awareness of Oswald following his defection to the Soviet Union in 1959.',
    related_people: ['lee-harvey-oswald'],
  },
  {
    slug: 'secret-service-shift-report',
    title: 'Secret Service Dallas Motorcade Shift Report',
    description: 'Secret Service agents\' report on presidential protection during Dallas visit',
    date: '1963-11-22',
    category: 'report',
    agency: 'secret_service',
    source: 'Secret Service Records',
    pages: 18,
    summary: 'Detailed report from Secret Service agents assigned to protect President Kennedy during the Dallas motorcade.',
    related_people: ['john-f-kennedy'],
    related_locations: ['dealey-plaza'],
    related_incidents: ['assassination'],
  },
  {
    slug: 'hsca-acoustic-analysis',
    title: 'HSCA Acoustic Analysis Report',
    description: 'House Select Committee analysis of Dallas Police dictabelt recording',
    date: '1979-03-29',
    category: 'report',
    agency: 'hsca',
    source: 'House Select Committee on Assassinations',
    pages: 42,
    summary: 'Scientific analysis of audio recording that initially suggested the possibility of four shots fired in Dealey Plaza. Later disputed by subsequent studies.',
    related_investigations: ['hsca'],
    related_locations: ['dealey-plaza'],
  },
  {
    slug: 'tippit-shooting-witness-statements',
    title: 'Tippit Shooting Witness Statements',
    description: 'Compiled witness statements regarding the shooting of Officer J.D. Tippit',
    date: '1963-11-22',
    category: 'testimony',
    agency: 'dpd',
    source: 'Dallas Police Department',
    pages: 34,
    summary: 'Statements from witnesses who observed the shooting of Dallas Police Officer J.D. Tippit in Oak Cliff, approximately 45 minutes after the assassination.',
    related_people: ['lee-harvey-oswald'],
    related_incidents: ['tippit-shooting'],
  },
  {
    slug: 'marine-corps-oswald-records',
    title: 'USMC Service Record - Lee Harvey Oswald',
    description: 'Complete military service record of Lee Harvey Oswald',
    date: '1959-09-11',
    category: 'report',
    agency: 'usmc',
    source: 'U.S. Marine Corps',
    pages: 156,
    summary: 'Oswald\'s Marine Corps service record including enlistment, training, duty stations, court martial, and discharge. Documents his service at Atsugi, Japan where U-2 flights operated.',
    related_people: ['lee-harvey-oswald'],
  },
  {
    slug: 'state-dept-oswald-defection',
    title: 'State Department - Oswald Defection File',
    description: 'State Department records regarding Oswald\'s defection to USSR and return',
    date: '1959-10-31',
    category: 'correspondence',
    agency: 'state_dept',
    source: 'State Department',
    pages: 67,
    summary: 'Diplomatic correspondence and records documenting Oswald\'s attempted renunciation of U.S. citizenship at the American Embassy in Moscow and his subsequent return to the United States.',
    related_people: ['lee-harvey-oswald', 'marina-oswald'],
  },
]

async function seedDocuments() {
  console.log('Seeding documents...')

  for (const doc of sampleDocuments) {
    const { error } = await supabase
      .from('documents')
      .upsert(doc, { onConflict: 'slug' })

    if (error) {
      console.error(`Error seeding ${doc.slug}:`, error.message)
    } else {
      console.log(`✓ ${doc.title}`)
    }
  }

  console.log('\nDone! Seeded', sampleDocuments.length, 'documents')
}

seedDocuments()
