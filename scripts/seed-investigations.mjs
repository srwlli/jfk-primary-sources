import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const investigations = [
  {
    slug: "warren-commission",
    data: {
      title: "President's Commission on the Assassination of President Kennedy",
      shortTitle: "Warren Commission",
      dateRange: "November 1963 - September 1964",
      icon: "gavel",
      summary: "The official investigation established by President Lyndon B. Johnson to investigate the assassination of President Kennedy, concluding that Lee Harvey Oswald acted alone.",
      background: "One week after the assassination, on November 29, 1963, President Lyndon B. Johnson issued Executive Order 11130, creating the President's Commission on the Assassination of President Kennedy. The commission was chaired by Chief Justice Earl Warren and included members of Congress from both parties, a former CIA director, and a prominent attorney. The commission was given broad powers to investigate all facts and circumstances surrounding the assassination.",
      mandate: "The commission was charged with evaluating all the facts and circumstances surrounding the assassination and the subsequent killing of the alleged assassin, and to report its findings and conclusions to the President. It had the power to subpoena witnesses, administer oaths, and obtain evidence from any executive department or agency.",
      keyFindings: [
        "Lee Harvey Oswald acted alone in assassinating President Kennedy",
        "Three shots were fired from the sixth floor of the Texas School Book Depository",
        "One bullet caused the wounds to both Kennedy and Governor Connally (single-bullet theory)",
        "Oswald also killed Dallas Police Officer J.D. Tippit",
        "Jack Ruby acted alone in killing Oswald",
        "No evidence of conspiracy, foreign or domestic, was found",
        "The Secret Service, FBI, and other agencies had deficiencies in protecting the President"
      ],
      methodology: "The commission heard testimony from 552 witnesses, with 94 appearing before commission members. Staff lawyers conducted additional depositions. The FBI and Secret Service conducted the primary investigative work, with the commission reviewing their findings. The 26 volumes of hearings and exhibits totaled over 17,000 pages.",
      controversies: "The Warren Commission has faced sustained criticism over the decades. Critics have questioned the single-bullet theory, the thoroughness of the investigation, the commission's reliance on FBI and CIA information, and alleged suppression of evidence pointing to conspiracy. The commission did not have access to information about CIA plots against Castro or FBI surveillance of Oswald. Many records were sealed for 75 years, fueling suspicion.",
      legacy: "The Warren Report shaped the official narrative of the assassination for decades. However, public confidence in its conclusions declined over time, particularly after the Zapruder film became public and following revelations about government misconduct in the 1970s. The HSCA later concluded that the commission's investigation was inadequate in several respects, though it upheld most factual findings.",
      keyFigures: [
        { name: "Earl Warren", role: "Chairman, Chief Justice of the United States" },
        { name: "Richard Russell", role: "Senator from Georgia" },
        { name: "John Sherman Cooper", role: "Senator from Kentucky" },
        { name: "Hale Boggs", role: "Representative from Louisiana" },
        { name: "Gerald Ford", role: "Representative from Michigan" },
        { name: "Allen Dulles", role: "Former CIA Director" },
        { name: "John J. McCloy", role: "Former World Bank President" },
        { name: "J. Lee Rankin", role: "General Counsel" }
      ],
      keyDocuments: [
        { title: "Warren Commission Report", href: "/archives" },
        { title: "26 Volumes of Hearings and Exhibits", href: "/archives" },
        { title: "Executive Order 11130", href: "/archives" }
      ],
      sources: [
        { title: "Warren Commission Report", href: "https://www.archives.gov/research/jfk/warren-commission-report" },
        { title: "National Archives - Warren Commission", href: "https://www.archives.gov/research/jfk" }
      ]
    }
  },
  {
    slug: "clay-shaw-trial",
    data: {
      title: "State of Louisiana v. Clay Shaw",
      shortTitle: "Clay Shaw Trial",
      dateRange: "January - March 1969",
      icon: "balance",
      summary: "The only criminal trial related to the JFK assassination, brought by New Orleans District Attorney Jim Garrison against businessman Clay Shaw for conspiracy to assassinate President Kennedy. Shaw was acquitted after less than one hour of jury deliberation.",
      background: "In 1966, New Orleans District Attorney Jim Garrison launched an investigation into the assassination, focusing on alleged New Orleans connections. Garrison claimed to have uncovered a conspiracy involving CIA-connected individuals, anti-Castro Cuban exiles, and right-wing extremists. On March 1, 1967, Garrison arrested Clay Shaw, a prominent New Orleans businessman and director of the International Trade Mart, charging him with conspiracy to murder President Kennedy. The arrest made national headlines and sparked intense media coverage.",
      mandate: "As a criminal prosecution, the case required Garrison to prove beyond a reasonable doubt that Clay Shaw conspired with Lee Harvey Oswald, David Ferrie, and others to assassinate President Kennedy. Garrison alleged that Shaw, using the alias 'Clay Bertrand,' was part of a CIA-connected conspiracy that met in New Orleans to plan the assassination.",
      keyFindings: [
        "Clay Shaw was acquitted of all charges on March 1, 1969",
        "The jury deliberated for less than one hour before returning a not guilty verdict",
        "Key prosecution witness Perry Russo's testimony was undermined under cross-examination",
        "The defense demonstrated Shaw had no proven connection to Oswald or the alleged conspiracy",
        "The Zapruder film was shown publicly for the first time during the trial",
        "Garrison failed to establish the existence of 'Clay Bertrand' as Shaw's alias",
        "Several prosecution witnesses were discredited or recanted their statements"
      ],
      methodology: "Garrison's investigation relied heavily on witness testimony, including individuals who claimed to have seen Shaw with Oswald and David Ferrie. The prosecution used hypnosis and sodium pentothal on key witness Perry Russo, raising questions about the reliability of his memories. Garrison also pursued leads connecting Shaw to the CIA through his work with the International Trade Mart and alleged involvement with Permindex, a trade organization.",
      controversies: "The Garrison investigation remains highly controversial. Critics accused Garrison of prosecutorial misconduct, witness intimidation, and pursuing a case based on unreliable evidence. Some witnesses later claimed they were coerced or their testimony was fabricated. However, supporters note that documents released decades later confirmed Shaw had CIA connections that were denied at trial. The HSCA later found Garrison's investigation was flawed but contained some legitimate leads that warranted further examination.",
      legacy: "Despite the acquittal, the Shaw trial had lasting impact on assassination research. It brought national attention to conspiracy theories and inconsistencies in the official account. The trial's public showing of the Zapruder film shocked viewers and fueled skepticism about the Warren Commission. Oliver Stone's 1991 film 'JFK' was largely based on Garrison's theories, reigniting public interest and contributing to passage of the JFK Records Act. Documents released years later revealed Shaw did have CIA connections, though this does not prove involvement in assassination conspiracy.",
      keyFigures: [
        { name: "Jim Garrison", role: "New Orleans District Attorney, Prosecutor" },
        { name: "Clay Shaw", role: "Defendant" },
        { name: "F. Irvin Dymond", role: "Lead Defense Attorney" },
        { name: "Edward Haggerty", role: "Presiding Judge" },
        { name: "Perry Russo", role: "Key Prosecution Witness" },
        { name: "Dean Andrews", role: "Witness, claimed contact with 'Clay Bertrand'" },
        { name: "David Ferrie", role: "Alleged Co-conspirator (died before trial)" }
      ],
      keyDocuments: [
        { title: "Shaw Trial Transcripts", href: "/archives" },
        { title: "Garrison Investigation Files", href: "/archives" },
        { title: "Perry Russo Testimony", href: "/archives" }
      ],
      sources: [
        { title: "Mary Ferrell Foundation - Garrison Investigation", href: "https://www.maryferrell.org" },
        { title: "National Archives - Garrison Files", href: "https://www.archives.gov/research/jfk" }
      ]
    }
  },
  {
    slug: "hsca",
    data: {
      title: "United States House Select Committee on Assassinations",
      shortTitle: "HSCA",
      dateRange: "1976 - 1979",
      icon: "account_balance",
      summary: "Congressional investigation that reinvestigated the assassinations of President Kennedy and Martin Luther King Jr., concluding that Kennedy was 'probably assassinated as a result of a conspiracy.'",
      background: "In the wake of Watergate and revelations about intelligence agency abuses, Congress established the House Select Committee on Assassinations in 1976 to reinvestigate the assassinations of President Kennedy and Dr. Martin Luther King Jr. The committee was created amid growing public skepticism about the Warren Commission's conclusions and new evidence that had emerged in the intervening years.",
      mandate: "The HSCA was authorized to conduct a full and complete investigation of the circumstances surrounding the assassination of President Kennedy, including determining whether the existing laws of the United States were adequate to protect the President and whether agencies of the U.S. government adequately performed their duties.",
      keyFindings: [
        "President Kennedy was probably assassinated as a result of a conspiracy",
        "Lee Harvey Oswald fired three shots at President Kennedy, two of which struck him",
        "Scientific acoustical evidence established a high probability that two gunmen fired at the President",
        "The committee was unable to identify the second gunman or the extent of the conspiracy",
        "The Soviet Union, Cuba, anti-Castro groups, and organized crime were not involved as organizations",
        "Individual members of anti-Castro groups or organized crime may have been involved",
        "The Warren Commission, FBI, and CIA performed inadequately in investigating the assassination",
        "The Secret Service was deficient in its protection of the President"
      ],
      methodology: "The HSCA employed modern forensic techniques unavailable in 1964, including neutron activation analysis, photographic enhancement, trajectory analysis, and acoustic analysis of the Dallas Police dictabelt recording. The committee also had access to previously classified documents and conducted new witness interviews.",
      controversies: "The HSCA's conspiracy conclusion, based largely on acoustic evidence from a Dallas Police dictabelt recording, was later challenged. A 1982 National Academy of Sciences panel concluded the acoustic evidence was invalid, finding the sounds were not from Dealey Plaza. However, subsequent analyses have disputed the NAS findings, and the acoustic evidence remains debated. The committee's final report was rushed due to the expiration of its mandate.",
      legacy: "Despite questions about the acoustic evidence, the HSCA investigation brought renewed attention to the case and produced valuable new research. Its finding that intelligence agencies had withheld information from the Warren Commission was significant. The committee's work contributed to the eventual passage of the JFK Records Act and the release of millions of pages of documents.",
      keyFigures: [
        { name: "Louis Stokes", role: "Chairman (1977-1979)" },
        { name: "Henry Gonzalez", role: "Chairman (1976-1977)" },
        { name: "G. Robert Blakey", role: "Chief Counsel (1977-1979)" },
        { name: "Richard Sprague", role: "Chief Counsel (1976-1977)" },
        { name: "Michael Baden", role: "Chairman, Forensic Pathology Panel" },
        { name: "Cyril Wecht", role: "Forensic Pathology Panel member" }
      ],
      keyDocuments: [
        { title: "HSCA Final Report", href: "/archives" },
        { title: "HSCA Volumes I-XII", href: "/archives" },
        { title: "Forensic Pathology Panel Report", href: "/archives" },
        { title: "Acoustic Evidence Analysis", href: "/archives" }
      ],
      sources: [
        { title: "HSCA Final Report", href: "https://www.archives.gov/research/jfk/select-committee-report" },
        { title: "Mary Ferrell Foundation - HSCA", href: "https://www.maryferrell.org" }
      ]
    }
  },
  {
    slug: "jfk-records-act",
    data: {
      title: "President John F. Kennedy Assassination Records Collection Act",
      shortTitle: "JFK Records Act",
      dateRange: "1992 - Present",
      icon: "folder_open",
      summary: "Landmark legislation mandating the collection and release of all government records related to the Kennedy assassination, creating the most comprehensive declassification effort in U.S. history.",
      background: "The 1991 release of Oliver Stone's film 'JFK' sparked renewed public interest in the assassination and widespread calls for the release of government records. The film depicted a vast conspiracy and government cover-up, leading millions of Americans to demand access to classified documents. Congress responded by passing the JFK Records Act with overwhelming bipartisan support, and President George H.W. Bush signed it into law on October 26, 1992.",
      mandate: "The Act mandated that all assassination-related records be collected, preserved, and made publicly available within 25 years (by October 2017). It established the Assassination Records Review Board (ARRB), an independent federal agency, to identify, secure, and ensure the release of records from all government agencies. The Act created a presumption of disclosure, requiring agencies to demonstrate specific harm to justify withholding records.",
      keyFindings: [
        "Over 5 million pages of records have been released to the public",
        "Created the JFK Assassination Records Collection at the National Archives",
        "The ARRB operated from 1994-1998, reviewing records from CIA, FBI, Secret Service, and other agencies",
        "Many previously classified documents revealed new information about Oswald, intelligence operations, and the investigation",
        "Some records remain classified or redacted, with ongoing releases through 2023",
        "The Act established precedent for government transparency regarding historical events"
      ],
      methodology: "The ARRB reviewed records from across the federal government, including the CIA, FBI, Secret Service, State Department, and military agencies. The Board held public hearings, took depositions from key witnesses, and worked with agencies to balance transparency with legitimate security concerns. Records were transferred to the National Archives, where they are publicly accessible.",
      legacy: "The JFK Records Act transformed assassination research by making millions of pages of previously classified documents available. It established the principle that the public has a right to access government records about significant historical events. The Act has served as a model for subsequent transparency legislation. However, controversy continues over records that remain classified, with presidential decisions in 2017, 2018, 2021, and 2023 delaying full release of some documents.",
      keyFigures: [
        { name: "John Tunheim", role: "ARRB Chairman" },
        { name: "Henry Graff", role: "ARRB Member" },
        { name: "Kermit Hall", role: "ARRB Member" },
        { name: "William Joyce", role: "ARRB Member" },
        { name: "Anna Nelson", role: "ARRB Member" },
        { name: "David Marwell", role: "ARRB Executive Director" }
      ],
      keyDocuments: [
        { title: "JFK Records Act (Public Law 102-526)", href: "/archives" },
        { title: "ARRB Final Report", href: "/archives" },
        { title: "JFK Assassination Records Collection", href: "/archives" }
      ],
      sources: [
        { title: "National Archives - JFK Records", href: "https://www.archives.gov/research/jfk" },
        { title: "ARRB Final Report", href: "https://www.archives.gov/research/jfk/review-board/report" },
        { title: "Mary Ferrell Foundation - JFK Records Act", href: "https://www.maryferrell.org" }
      ]
    }
  }
]

async function seed() {
  console.log('Seeding investigations table...')

  const { data, error } = await supabase
    .from('investigations')
    .upsert(investigations, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} investigations`)
}

seed()
