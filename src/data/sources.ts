export interface Source {
  id: string
  name: string
  type: "blog" | "podcast" | "youtube" | "website"
  icon: string
  url: string
  description: string
  about: string
  creator?: string
  frequency?: string
  established?: string
  notableContent: string[]
  topics: string[]
  externalLinks: { title: string; url: string }[]
}

const sources: Source[] = [
  // Blogs
  {
    id: "kennedys-and-king",
    name: "Kennedys and King",
    type: "blog",
    icon: "article",
    url: "https://www.kennedysandking.com",
    description:
      "Website featuring articles, book reviews, and analysis of the Kennedy and King assassinations by researchers and authors.",
    about:
      "Kennedys and King is a website dedicated to exploring the assassinations of President Kennedy, Robert Kennedy, and Martin Luther King Jr. The site publishes original articles, book reviews, and investigative pieces by established researchers and authors in the field. It serves as a platform for ongoing research and debate about these historical events.",
    creator: "James DiEugenio",
    notableContent: [
      "Original investigative articles",
      "Comprehensive book reviews",
      "Author interviews",
      "Document analysis",
      "Film and documentary reviews",
      "Research updates",
    ],
    topics: [
      "JFK assassination",
      "RFK assassination",
      "MLK assassination",
      "Book reviews",
      "Research analysis",
    ],
    externalLinks: [
      { title: "Articles", url: "https://www.kennedysandking.com/articles" },
      { title: "Reviews", url: "https://www.kennedysandking.com/reviews" },
    ],
  },
  // Podcasts
  {
    id: "black-op-radio",
    name: "Black Op Radio",
    type: "podcast",
    icon: "podcasts",
    url: "https://www.blackopradio.com",
    description:
      "Long-running weekly podcast featuring interviews with JFK assassination researchers, authors, and witnesses since 2000.",
    about:
      "Black Op Radio is one of the longest-running podcasts dedicated to JFK assassination research. Hosted by Len Osanic, the show has aired weekly since 2000, featuring interviews with researchers, authors, witnesses, and experts. The archive contains over 1,000 episodes covering virtually every aspect of the case, making it an invaluable audio resource for researchers.",
    creator: "Len Osanic",
    frequency: "Weekly",
    established: "2000",
    notableContent: [
      "Over 1,000 archived episodes",
      "Interviews with Jim Garrison",
      "Witness testimonies",
      "Author interviews",
      "Document discussions",
      "Research updates",
    ],
    topics: [
      "Researcher interviews",
      "Witness accounts",
      "Book discussions",
      "Document analysis",
      "Conspiracy theories",
    ],
    externalLinks: [
      { title: "Episode Archive", url: "https://www.blackopradio.com/archives.html" },
      { title: "Listen Live", url: "https://www.blackopradio.com" },
    ],
  },
  {
    id: "midnight-writer-news",
    name: "Midnight Writer News Show",
    type: "podcast",
    icon: "podcasts",
    url: "https://midnightwriternews.com",
    description:
      "Podcast covering JFK assassination research, political conspiracies, and interviews with authors and researchers.",
    about:
      "The Midnight Writer News Show is a podcast that covers JFK assassination research along with related topics in political history and conspiracy research. The show features interviews with authors, researchers, and experts, providing in-depth discussions of evidence, theories, and new developments in assassination research.",
    creator: "S.T. Patrick",
    frequency: "Weekly",
    notableContent: [
      "Author interviews",
      "Research discussions",
      "Book reviews",
      "Historical analysis",
      "Document examinations",
    ],
    topics: [
      "JFK research",
      "Political history",
      "Author interviews",
      "Book discussions",
    ],
    externalLinks: [
      { title: "Episodes", url: "https://midnightwriternews.com/category/podcast/" },
    ],
  },
  {
    id: "solitary-six",
    name: "The Solitary Six Podcast",
    type: "podcast",
    icon: "podcasts",
    url: "https://www.youtube.com/@TheSolitarySix",
    description:
      "Podcast examining the JFK assassination from multiple perspectives, featuring detailed episode series on specific topics.",
    about:
      "The Solitary Six Podcast provides detailed examinations of JFK assassination evidence and theories. The show takes a methodical approach to exploring specific aspects of the case, often dedicating multiple episodes to single topics for thorough coverage. It appeals to both newcomers and experienced researchers seeking in-depth analysis.",
    frequency: "Regular",
    notableContent: [
      "Multi-part topic deep dives",
      "Evidence analysis",
      "Witness examination",
      "Theory discussions",
      "Historical context",
    ],
    topics: [
      "Evidence analysis",
      "Witness accounts",
      "Investigation review",
      "Theory examination",
    ],
    externalLinks: [
      { title: "YouTube Channel", url: "https://www.youtube.com/@TheSolitarySix" },
    ],
  },
  // YouTube Channels
  {
    id: "jfk-revisited",
    name: "JFK Revisited",
    type: "youtube",
    icon: "play_circle",
    url: "https://www.youtube.com/@jfkrevisited",
    description:
      "YouTube channel featuring documentary content, interviews, and analysis related to the JFK assassination.",
    about:
      "JFK Revisited is a YouTube channel associated with Oliver Stone's documentary work on the Kennedy assassination. The channel features clips, interviews, and supplementary content exploring evidence and theories presented in Stone's films 'JFK Revisited: Through the Looking Glass' and related projects.",
    notableContent: [
      "Documentary clips",
      "Expert interviews",
      "Evidence presentations",
      "Historical footage",
      "Analysis videos",
    ],
    topics: [
      "Documentary content",
      "Expert analysis",
      "Evidence review",
      "Medical evidence",
    ],
    externalLinks: [
      { title: "YouTube Channel", url: "https://www.youtube.com/@jfkrevisited" },
    ],
  },
  {
    id: "jfk-what-the-doctors-saw",
    name: "JFK: What The Doctors Saw",
    type: "youtube",
    icon: "play_circle",
    url: "https://www.youtube.com/results?search_query=jfk+what+the+doctors+saw",
    description:
      "Documentary featuring Parkland Hospital doctors discussing their firsthand observations of President Kennedy's wounds.",
    about:
      "JFK: What The Doctors Saw is a documentary featuring interviews with the Parkland Memorial Hospital physicians who treated President Kennedy on November 22, 1963. The doctors describe their observations of Kennedy's wounds, which some argue conflict with the official autopsy findings. The documentary has sparked renewed interest in the medical evidence.",
    established: "2023",
    notableContent: [
      "Parkland doctor interviews",
      "Wound descriptions",
      "Medical evidence analysis",
      "Firsthand accounts",
      "Autopsy comparisons",
    ],
    topics: [
      "Medical evidence",
      "Parkland Hospital",
      "Doctor testimonies",
      "Wound analysis",
    ],
    externalLinks: [
      { title: "Paramount+", url: "https://www.paramountplus.com" },
    ],
  },
  {
    id: "the-jfk-channel",
    name: "The JFK Channel",
    type: "youtube",
    icon: "play_circle",
    url: "https://www.youtube.com/@TheJFKChannel",
    description:
      "YouTube channel dedicated to JFK assassination research, featuring document analysis, interviews, and educational content.",
    about:
      "The JFK Channel is a YouTube resource providing educational content about the Kennedy assassination. The channel features document analysis, discussions of evidence, interviews with researchers, and explanatory videos covering various aspects of the case. It serves as an accessible introduction for newcomers while offering detailed content for experienced researchers.",
    notableContent: [
      "Document analysis videos",
      "Evidence explanations",
      "Researcher interviews",
      "Historical context",
      "Theory examinations",
    ],
    topics: [
      "Document analysis",
      "Evidence review",
      "Educational content",
      "Research interviews",
    ],
    externalLinks: [
      { title: "YouTube Channel", url: "https://www.youtube.com/@TheJFKChannel" },
    ],
  },
]

export function getSourceById(id: string): Source | undefined {
  return sources.find((source) => source.id === id)
}

export function getAllSourceIds(): string[] {
  return sources.map((source) => source.id)
}

export function getAllSources(): Source[] {
  return sources
}

export function getSourcesByType(type: Source["type"]): Source[] {
  return sources.filter((source) => source.type === type)
}
