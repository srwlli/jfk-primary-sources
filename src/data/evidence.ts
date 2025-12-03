export interface EvidenceItem {
  id: string
  title: string
  category: string
  icon: string
  summary: string
  description: string
  details: {
    label: string
    value: string
  }[]
  chainOfCustody: string
  significance: string
  controversies?: string
  relatedPeople: { name: string; href: string }[]
  relatedDocuments: { title: string; href: string }[]
  sources: { title: string; href: string }[]
}

const evidence: EvidenceItem[] = [
  {
    id: "backyard-photos",
    title: "Backyard Photos",
    category: "Photographic Evidence",
    icon: "photo_camera",
    summary:
      "Photographs showing Lee Harvey Oswald holding a rifle and pistol, taken in the backyard of his Dallas residence in March 1963.",
    description:
      "The backyard photographs are among the most iconic and controversial pieces of evidence in the JFK assassination. They depict Lee Harvey Oswald holding a Mannlicher-Carcano rifle in one hand and copies of socialist newspapers in the other, with a pistol holstered on his hip. Marina Oswald testified that she took the photographs at their Neely Street apartment in Dallas in late March 1963. Oswald himself, when shown the photos after his arrest, claimed they were fakes created by superimposing his face onto another person's body.",
    details: [
      { label: "Commission Exhibits", value: "CE 133-A, CE 133-B, CE 133-C" },
      { label: "Date Taken", value: "March 31, 1963" },
      { label: "Location", value: "214 W. Neely Street, Dallas, TX" },
      { label: "Photographer", value: "Marina Oswald (per her testimony)" },
      { label: "Camera Used", value: "Imperial Reflex camera" },
    ],
    chainOfCustody:
      "The photographs were discovered by Dallas police during a search of the Paine residence in Irving, Texas on November 23, 1963. They were found among Oswald's possessions that had been stored in the Paine garage. The original prints and negatives were taken into evidence and later examined by the FBI and Warren Commission.",
    significance:
      "The photographs were crucial evidence linking Oswald to the murder weapon before the assassination. They showed him in possession of both the rifle identified as the assassination weapon and the pistol used to kill Officer J.D. Tippit. The photos also demonstrated Oswald's apparent embrace of communist ideology through the newspapers he held.",
    controversies:
      "The photographs have been subject to extensive analysis and debate. Critics have pointed to apparent shadow anomalies, questions about body proportions, and Oswald's own claim of forgery. However, multiple photographic experts, including those employed by the HSCA, have concluded the photographs are genuine and unaltered. Digital analysis techniques developed since the 1970s have generally supported their authenticity.",
    relatedPeople: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "Marina Oswald", href: "/people/marina-oswald" },
    ],
    relatedDocuments: [
      { title: "Warren Commission Report - Chapter 4", href: "/archives" },
      { title: "HSCA Photographic Evidence Panel Report", href: "/archives" },
    ],
    sources: [
      { title: "Warren Commission Hearings, Volume XVI", href: "https://www.archives.gov/research/jfk" },
      { title: "HSCA Report, Volume VI", href: "https://www.archives.gov/research/jfk" },
    ],
  },
  {
    id: "mannlicher-carcano-rifle",
    title: "Mannlicher-Carcano Rifle",
    category: "Firearms",
    icon: "target",
    summary:
      "The 6.5mm Italian rifle identified as the weapon used to assassinate President Kennedy, found on the sixth floor of the Texas School Book Depository.",
    description:
      "The rifle recovered from the Texas School Book Depository was a 6.5×52mm Italian Carcano Model 91/38 bolt-action rifle equipped with a four-power telescopic sight. It was manufactured in 1940 at the Italian government arsenal in Terni. The rifle was traced through its serial number (C2766) to a mail-order purchase made by 'A. Hidell' - an alias used by Lee Harvey Oswald - from Klein's Sporting Goods in Chicago in March 1963.",
    details: [
      { label: "Commission Exhibit", value: "CE 139" },
      { label: "Make/Model", value: "Carcano Model 91/38" },
      { label: "Caliber", value: "6.5×52mm Italian" },
      { label: "Serial Number", value: "C2766" },
      { label: "Manufacturer", value: "Italian State Arsenal, Terni" },
      { label: "Year of Manufacture", value: "1940" },
      { label: "Scope", value: "Ordnance Optics 4x18" },
      { label: "Purchase Price", value: "$19.95 (with scope)" },
    ],
    chainOfCustody:
      "The rifle was discovered by Deputy Sheriff Eugene Boone and Deputy Constable Seymour Weitzman on the sixth floor of the Texas School Book Depository at approximately 1:22 PM on November 22, 1963. It was found partially hidden between boxes near the northwest corner staircase. Captain Will Fritz of the Dallas Police took custody of the rifle, which was later transferred to the FBI for ballistic analysis.",
    significance:
      "Ballistic tests conducted by the FBI conclusively matched the rifle to bullet fragments recovered from the presidential limousine and to the nearly whole bullet (CE 399) found at Parkland Hospital. Oswald's palm print was found on the barrel of the rifle. The rifle, along with three spent cartridge cases found near the sixth-floor window, formed the core physical evidence linking Oswald to the assassination.",
    controversies:
      "Initial reports from the scene incorrectly identified the rifle as a 7.65mm German Mauser, leading to confusion and conspiracy theories. Questions have also been raised about whether the rifle's bolt action could be operated quickly enough to fire three shots in the timeframe suggested by the Zapruder film. The rifle's accuracy with its cheap scope has also been debated, though tests showed it was capable of the shots attributed to it.",
    relatedPeople: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
    ],
    relatedDocuments: [
      { title: "FBI Ballistics Report", href: "/archives" },
      { title: "Klein's Sporting Goods Order Form", href: "/archives" },
    ],
    sources: [
      { title: "Warren Commission Report - Appendix X", href: "https://www.archives.gov/research/jfk" },
      { title: "FBI Laboratory Reports", href: "https://www.archives.gov/research/jfk" },
    ],
  },
  {
    id: "smith-wesson-revolver",
    title: "Smith & Wesson Revolver",
    category: "Firearms",
    icon: "gps_fixed",
    summary:
      "The .38 caliber revolver used to kill Dallas Police Officer J.D. Tippit, taken from Lee Harvey Oswald at his arrest.",
    description:
      "The revolver was a Smith & Wesson Model 10 Military & Police .38 Special with a 2-inch barrel, modified to also accept .38 S&W cartridges. It was purchased by mail order from Seaport Traders in Los Angeles by 'A.J. Hidell' in January 1963. The pistol was taken from Oswald when he was arrested at the Texas Theatre approximately 80 minutes after the assassination of President Kennedy.",
    details: [
      { label: "Commission Exhibit", value: "CE 143" },
      { label: "Make/Model", value: "Smith & Wesson Model 10 M&P" },
      { label: "Caliber", value: ".38 Special" },
      { label: "Serial Number", value: "V510210" },
      { label: "Barrel Length", value: "2 inches" },
      { label: "Purchase Date", value: "January 27, 1963" },
      { label: "Purchase Price", value: "$29.95" },
    ],
    chainOfCustody:
      "The revolver was taken from Oswald by Dallas Police Officer M.N. McDonald during a struggle at the Texas Theatre on November 22, 1963, at approximately 1:50 PM. Officer McDonald testified that Oswald attempted to fire the weapon during his arrest but the hammer fell on the webbing of McDonald's hand. The pistol was fully loaded with six rounds, five of which were .38 Special and one .38 S&W.",
    significance:
      "Ballistic evidence linked this revolver to the four bullets recovered from Officer Tippit's body. The cartridge cases found at the Tippit murder scene were matched to this specific weapon through breech face and firing pin marks. Multiple eyewitnesses identified Oswald as Tippit's killer, and the pistol provided crucial physical evidence connecting him to the crime.",
    controversies:
      "Some researchers have questioned the ballistic evidence, noting that the bullets recovered from Tippit were too damaged for conclusive rifling comparisons. However, the cartridge cases provided definitive matches to Oswald's revolver. Questions have also been raised about the timeline of Oswald's movements between Dealey Plaza and the Tippit shooting scene.",
    relatedPeople: [
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
      { name: "J.D. Tippit", href: "/people/jd-tippit" },
    ],
    relatedDocuments: [
      { title: "Dallas Police Reports - Tippit Murder", href: "/archives" },
      { title: "FBI Ballistics Analysis", href: "/archives" },
    ],
    sources: [
      { title: "Warren Commission Report - Chapter 4", href: "https://www.archives.gov/research/jfk" },
      { title: "Warren Commission Hearings, Volume III", href: "https://www.archives.gov/research/jfk" },
    ],
  },
  {
    id: "ce-399",
    title: "CE 399 - The 'Magic Bullet'",
    category: "Ballistic Evidence",
    icon: "adjust",
    summary:
      "The nearly intact bullet found at Parkland Hospital, central to the single-bullet theory explaining how one bullet caused seven wounds to Kennedy and Connally.",
    description:
      "Commission Exhibit 399 is a 6.5mm Mannlicher-Carcano bullet that was found on a stretcher at Parkland Memorial Hospital on November 22, 1963. According to the Warren Commission's single-bullet theory, this bullet passed through President Kennedy's neck and then struck Governor John Connally, causing wounds to his back, chest, wrist, and thigh. The bullet's relatively pristine condition despite allegedly causing seven wounds has made it one of the most debated pieces of evidence in the case.",
    details: [
      { label: "Commission Exhibit", value: "CE 399" },
      { label: "Caliber", value: "6.5×52mm Italian" },
      { label: "Weight", value: "158.6 grains (lost ~2.4 grains)" },
      { label: "Condition", value: "Nearly intact, slightly flattened" },
      { label: "Found By", value: "Darrell Tomlinson, hospital engineer" },
      { label: "Time Found", value: "Approximately 1:45 PM, Nov 22, 1963" },
      { label: "Location Found", value: "Stretcher, Parkland Hospital" },
    ],
    chainOfCustody:
      "The bullet was found by Parkland Hospital senior engineer Darrell Tomlinson while moving stretchers in a hallway near the emergency area. He gave the bullet to O.P. Wright, the hospital's personnel officer, who turned it over to Secret Service Agent Richard Johnsen. The bullet was then transported to Washington and examined by FBI ballistics experts, who matched it to Oswald's rifle.",
    significance:
      "CE 399 is fundamental to the Warren Commission's conclusion that only three shots were fired, all from behind and above the motorcade. The single-bullet theory explains how one bullet could account for the wounds to both Kennedy and Connally, making it possible for a lone gunman to have committed the assassination. Without this theory, the timing between shots becomes problematic for the lone-gunman scenario.",
    controversies:
      "CE 399 is perhaps the most controversial piece of evidence in the assassination. Critics argue that the bullet is too intact to have caused the damage attributed to it, particularly Connally's shattered rib and fractured radius. Tests attempting to replicate the bullet's condition have produced mixed results. Questions have also been raised about which stretcher the bullet was actually found on and whether it could have been planted. Supporters note that the bullet's copper jacket remained intact and that it lost consistent weight with the fragments found in Connally's wrist.",
    relatedPeople: [
      { name: "John F. Kennedy", href: "/people/john-f-kennedy" },
      { name: "John Connally", href: "/people/john-connally" },
      { name: "Lee Harvey Oswald", href: "/people/lee-harvey-oswald" },
    ],
    relatedDocuments: [
      { title: "Warren Commission Report - Chapter 3", href: "/archives" },
      { title: "HSCA Forensic Pathology Panel Report", href: "/archives" },
      { title: "Neutron Activation Analysis Reports", href: "/archives" },
    ],
    sources: [
      { title: "Warren Commission Hearings, Volume XVII", href: "https://www.archives.gov/research/jfk" },
      { title: "HSCA Report, Volume VII", href: "https://www.archives.gov/research/jfk" },
    ],
  },
]

export function getEvidenceById(id: string): EvidenceItem | undefined {
  return evidence.find((item) => item.id === id)
}

export function getAllEvidenceIds(): string[] {
  return evidence.map((item) => item.id)
}

export function getAllEvidence(): EvidenceItem[] {
  return evidence
}
