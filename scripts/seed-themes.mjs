import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grdwmwhqzvvjkfpfeauh.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const themes = [
  {
    name: "Default",
    description: "Cool gray and purple theme with modern aesthetic",
    is_active: true,
    fonts: {
      display: {
        family: "Geist Sans",
        fallback: ["system-ui", "sans-serif"],
        variable: "--font-geist-sans",
        usage: "All text elements"
      },
      mono: {
        family: "Geist Mono",
        fallback: ["monospace"],
        variable: "--font-geist-mono",
        usage: "Code and monospace text"
      }
    },
    light: {
      name: "Light Mode - Cool Gray",
      colors: {
        background: {
          value: "#f0f2f5",
          description: "Cool gray background"
        },
        foreground: {
          value: "#1c1e21",
          description: "Dark gray text"
        },
        card: {
          value: "#ffffff",
          description: "White cards"
        },
        "card-foreground": {
          value: "#1c1e21",
          description: "Dark gray text on cards"
        },
        popover: {
          value: "#ffffff",
          description: "White popovers"
        },
        "popover-foreground": {
          value: "#1c1e21",
          description: "Dark gray text on popovers"
        },
        primary: {
          value: "#4A55A2",
          description: "Purple-blue primary color"
        },
        "primary-foreground": {
          value: "#ffffff",
          description: "White text on primary surfaces"
        },
        secondary: {
          value: "#e4e6eb",
          description: "Light gray secondary"
        },
        "secondary-foreground": {
          value: "#1c1e21",
          description: "Dark text on secondary surfaces"
        },
        muted: {
          value: "#e4e6eb",
          description: "Light gray muted tone"
        },
        "muted-foreground": {
          value: "#65676b",
          description: "Medium gray subdued text"
        },
        accent: {
          value: "#e4e6eb",
          description: "Light gray accent"
        },
        "accent-foreground": {
          value: "#1c1e21",
          description: "Dark text on accent surfaces"
        },
        destructive: {
          value: "oklch(0.577 0.245 27.325)",
          description: "Red for errors/warnings"
        },
        border: {
          value: "#e4e6eb",
          description: "Light gray border"
        },
        input: {
          value: "#e4e6eb",
          description: "Light gray input border"
        },
        ring: {
          value: "#4A55A2",
          description: "Purple focus ring"
        },
        "icon-color": {
          value: "#3A4750",
          description: "Dark teal-gray icons"
        },
        sidebar: {
          value: "#ffffff",
          description: "White sidebar"
        },
        "sidebar-foreground": {
          value: "#1c1e21",
          description: "Dark text on sidebar"
        },
        "sidebar-primary": {
          value: "#4A55A2",
          description: "Purple sidebar primary"
        },
        "sidebar-primary-foreground": {
          value: "#ffffff",
          description: "White text on sidebar primary"
        },
        "sidebar-accent": {
          value: "#e4e6eb",
          description: "Light gray sidebar accent"
        },
        "sidebar-accent-foreground": {
          value: "#1c1e21",
          description: "Dark text on sidebar accent"
        },
        "sidebar-border": {
          value: "#e4e6eb",
          description: "Light gray sidebar border"
        },
        "sidebar-ring": {
          value: "#4A55A2",
          description: "Purple sidebar focus ring"
        }
      }
    },
    dark: {
      name: "Dark Mode - Deep Purple",
      colors: {
        background: {
          value: "#1a1a2e",
          description: "Deep purple-navy background"
        },
        foreground: {
          value: "#e4e6eb",
          description: "Light gray text"
        },
        card: {
          value: "#232946",
          description: "Navy card background"
        },
        "card-foreground": {
          value: "#e4e6eb",
          description: "Light gray text on cards"
        },
        popover: {
          value: "#232946",
          description: "Navy popover background"
        },
        "popover-foreground": {
          value: "#e4e6eb",
          description: "Light gray text on popovers"
        },
        primary: {
          value: "#4A55A2",
          description: "Purple primary color"
        },
        "primary-foreground": {
          value: "#ffffff",
          description: "White text on primary surfaces"
        },
        secondary: {
          value: "#2d2d44",
          description: "Muted purple secondary"
        },
        "secondary-foreground": {
          value: "#e4e6eb",
          description: "Light text on secondary surfaces"
        },
        muted: {
          value: "#2d2d44",
          description: "Muted purple tone"
        },
        "muted-foreground": {
          value: "#b0b3b8",
          description: "Medium gray subdued text"
        },
        accent: {
          value: "#2d2d44",
          description: "Muted purple accent"
        },
        "accent-foreground": {
          value: "#e4e6eb",
          description: "Light text on accent surfaces"
        },
        destructive: {
          value: "oklch(0.704 0.191 22.216)",
          description: "Red for errors/warnings"
        },
        border: {
          value: "rgba(255, 255, 255, 0.1)",
          description: "Subtle white border"
        },
        input: {
          value: "rgba(255, 255, 255, 0.15)",
          description: "Subtle white input border"
        },
        ring: {
          value: "#4A55A2",
          description: "Purple focus ring"
        },
        "icon-color": {
          value: "#C5D86D",
          description: "Lime green icons"
        },
        sidebar: {
          value: "#232946",
          description: "Navy sidebar"
        },
        "sidebar-foreground": {
          value: "#e4e6eb",
          description: "Light text on sidebar"
        },
        "sidebar-primary": {
          value: "#4A55A2",
          description: "Purple sidebar primary"
        },
        "sidebar-primary-foreground": {
          value: "#ffffff",
          description: "White text on sidebar primary"
        },
        "sidebar-accent": {
          value: "#2d2d44",
          description: "Muted purple sidebar accent"
        },
        "sidebar-accent-foreground": {
          value: "#e4e6eb",
          description: "Light text on sidebar accent"
        },
        "sidebar-border": {
          value: "rgba(255, 255, 255, 0.1)",
          description: "Subtle white sidebar border"
        },
        "sidebar-ring": {
          value: "#4A55A2",
          description: "Purple sidebar focus ring"
        }
      }
    },
    border_radius: {
      base: "0.625rem",
      sm: "calc(0.625rem - 4px)",
      md: "calc(0.625rem - 2px)",
      lg: "0.625rem",
      xl: "calc(0.625rem + 4px)"
    },
    transitions: {
      default: "all 0.2s ease-out"
    }
  },
  {
    name: "Editorial",
    description: "Warm, editorial aesthetic with cream/ivory tones and navy accents",
    is_active: false,
    fonts: {
      display: {
        family: "Playfair Display",
        fallback: ["Georgia", "serif"],
        weights: [400, 600, 700],
        usage: "Headings (h1-h6), titles, and display text"
      },
      body: {
        family: "Source Sans Pro",
        fallback: ["system-ui", "sans-serif"],
        weights: [400, 600],
        usage: "Body text, labels, and UI elements"
      }
    },
    light: {
      name: "Light Mode - Warm Cream",
      colors: {
        background: {
          value: "#F7F4EF",
          description: "Warm cream background"
        },
        foreground: {
          value: "#141D2E",
          description: "Dark navy text"
        },
        card: {
          value: "#FDFBF8",
          description: "Slightly lighter cream for cards"
        },
        "card-foreground": {
          value: "#141D2E",
          description: "Dark navy text on cards"
        },
        popover: {
          value: "#FDFBF8",
          description: "Cream popovers"
        },
        "popover-foreground": {
          value: "#141D2E",
          description: "Dark navy text on popovers"
        },
        primary: {
          value: "#141D2E",
          description: "Navy primary color"
        },
        "primary-foreground": {
          value: "#FDFBF8",
          description: "Cream text on primary surfaces"
        },
        secondary: {
          value: "#EFE9E0",
          description: "Warm beige secondary"
        },
        "secondary-foreground": {
          value: "#141D2E",
          description: "Navy text on secondary surfaces"
        },
        muted: {
          value: "#E5DFD6",
          description: "Muted warm tone"
        },
        "muted-foreground": {
          value: "#626B7F",
          description: "Subdued text color"
        },
        accent: {
          value: "#F5A623",
          description: "Gold accent color"
        },
        "accent-foreground": {
          value: "#141D2E",
          description: "Navy text on accent surfaces"
        },
        destructive: {
          value: "#EF4444",
          description: "Red for errors/warnings"
        },
        border: {
          value: "#E6E0D7",
          description: "Subtle warm border"
        },
        input: {
          value: "#E6E0D7",
          description: "Warm input border"
        },
        ring: {
          value: "#F5A623",
          description: "Gold focus ring"
        },
        "icon-color": {
          value: "#F5A623",
          description: "Gold icons"
        },
        sidebar: {
          value: "#FDFBF8",
          description: "Cream sidebar"
        },
        "sidebar-foreground": {
          value: "#141D2E",
          description: "Navy text on sidebar"
        },
        "sidebar-primary": {
          value: "#141D2E",
          description: "Navy sidebar primary"
        },
        "sidebar-primary-foreground": {
          value: "#FDFBF8",
          description: "Cream text on sidebar primary"
        },
        "sidebar-accent": {
          value: "#EFE9E0",
          description: "Warm beige sidebar accent"
        },
        "sidebar-accent-foreground": {
          value: "#141D2E",
          description: "Navy text on sidebar accent"
        },
        "sidebar-border": {
          value: "#E6E0D7",
          description: "Warm sidebar border"
        },
        "sidebar-ring": {
          value: "#F5A623",
          description: "Gold sidebar focus ring"
        }
      }
    },
    dark: {
      name: "Dark Mode - Deep Navy",
      colors: {
        background: {
          value: "#0E1117",
          description: "Deep navy background"
        },
        foreground: {
          value: "#EDE8DF",
          description: "Warm cream text"
        },
        card: {
          value: "#171C26",
          description: "Slightly lighter navy for cards"
        },
        "card-foreground": {
          value: "#EDE8DF",
          description: "Warm cream text on cards"
        },
        popover: {
          value: "#171C26",
          description: "Navy popovers"
        },
        "popover-foreground": {
          value: "#EDE8DF",
          description: "Warm cream text on popovers"
        },
        primary: {
          value: "#EDE8DF",
          description: "Cream primary color"
        },
        "primary-foreground": {
          value: "#0E1117",
          description: "Navy text on primary surfaces"
        },
        secondary: {
          value: "#252A35",
          description: "Muted navy secondary"
        },
        "secondary-foreground": {
          value: "#EDE8DF",
          description: "Cream text on secondary surfaces"
        },
        muted: {
          value: "#252A35",
          description: "Muted navy tone"
        },
        "muted-foreground": {
          value: "#A39B8B",
          description: "Subdued cream text"
        },
        accent: {
          value: "#E9A835",
          description: "Warm gold accent"
        },
        "accent-foreground": {
          value: "#0E1117",
          description: "Navy text on accent surfaces"
        },
        destructive: {
          value: "#7F1D1D",
          description: "Dark red for errors/warnings"
        },
        border: {
          value: "#2A303D",
          description: "Subtle navy border"
        },
        input: {
          value: "#2A303D",
          description: "Navy input border"
        },
        ring: {
          value: "#E9A835",
          description: "Gold focus ring"
        },
        "icon-color": {
          value: "#E9A835",
          description: "Gold icons"
        },
        sidebar: {
          value: "#171C26",
          description: "Navy sidebar"
        },
        "sidebar-foreground": {
          value: "#EDE8DF",
          description: "Cream text on sidebar"
        },
        "sidebar-primary": {
          value: "#EDE8DF",
          description: "Cream sidebar primary"
        },
        "sidebar-primary-foreground": {
          value: "#0E1117",
          description: "Navy text on sidebar primary"
        },
        "sidebar-accent": {
          value: "#252A35",
          description: "Muted navy sidebar accent"
        },
        "sidebar-accent-foreground": {
          value: "#EDE8DF",
          description: "Cream text on sidebar accent"
        },
        "sidebar-border": {
          value: "#2A303D",
          description: "Navy sidebar border"
        },
        "sidebar-ring": {
          value: "#E9A835",
          description: "Gold sidebar focus ring"
        }
      }
    },
    border_radius: {
      base: "0.75rem",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem"
    },
    transitions: {
      default: "all 0.3s ease-out",
      fast: "all 0.2s ease-out"
    }
  },
  {
    name: "Brutalist",
    description: "Raw, bold aesthetic with stark contrasts, sharp edges, and unapologetic minimalism",
    is_active: false,
    fonts: {
      display: {
        family: "Space Mono",
        fallback: ["monospace"]
      },
      body: {
        family: "Space Mono",
        fallback: ["monospace"]
      }
    },
    light: {
      name: "Light Mode",
      colors: {
        background: { value: "#FFFFFF", description: "Pure white background" },
        foreground: { value: "#000000", description: "Pure black text" },
        card: { value: "#FFFFFF", description: "White card backgrounds" },
        "card-foreground": { value: "#000000", description: "Black text on cards" },
        popover: { value: "#FFFFFF", description: "White popover background" },
        "popover-foreground": { value: "#000000", description: "Black popover text" },
        primary: { value: "#000000", description: "Black primary buttons" },
        "primary-foreground": { value: "#FFFFFF", description: "White text on primary" },
        secondary: { value: "#F0F0F0", description: "Light gray secondary" },
        "secondary-foreground": { value: "#000000", description: "Black text on secondary" },
        muted: { value: "#E5E5E5", description: "Muted gray tone" },
        "muted-foreground": { value: "#666666", description: "Medium gray text" },
        accent: { value: "#FF0000", description: "Bold red accent" },
        "accent-foreground": { value: "#FFFFFF", description: "White text on accent" },
        destructive: { value: "#FF0000", description: "Red for errors/delete" },
        border: { value: "#000000", description: "Bold black borders" },
        input: { value: "#000000", description: "Black input borders" },
        ring: { value: "#000000", description: "Black focus ring" },
        "icon-color": { value: "#000000", description: "Black icon color" },
        sidebar: { value: "#F0F0F0", description: "Light gray sidebar" },
        "sidebar-foreground": { value: "#000000", description: "Black sidebar text" },
        "sidebar-primary": { value: "#000000", description: "Black active item" },
        "sidebar-primary-foreground": { value: "#FFFFFF", description: "White active text" },
        "sidebar-accent": { value: "#E5E5E5", description: "Gray hover background" },
        "sidebar-accent-foreground": { value: "#000000", description: "Black hover text" },
        "sidebar-border": { value: "#000000", description: "Black sidebar borders" },
        "sidebar-ring": { value: "#000000", description: "Black sidebar focus ring" }
      }
    },
    dark: {
      name: "Dark Mode",
      colors: {
        background: { value: "#000000", description: "Pure black background" },
        foreground: { value: "#FFFFFF", description: "Pure white text" },
        card: { value: "#111111", description: "Near-black card backgrounds" },
        "card-foreground": { value: "#FFFFFF", description: "White text on cards" },
        popover: { value: "#111111", description: "Near-black popover background" },
        "popover-foreground": { value: "#FFFFFF", description: "White popover text" },
        primary: { value: "#FFFFFF", description: "White primary buttons" },
        "primary-foreground": { value: "#000000", description: "Black text on primary" },
        secondary: { value: "#1A1A1A", description: "Dark gray secondary" },
        "secondary-foreground": { value: "#FFFFFF", description: "White text on secondary" },
        muted: { value: "#222222", description: "Muted dark tone" },
        "muted-foreground": { value: "#888888", description: "Medium gray text" },
        accent: { value: "#FF0000", description: "Bold red accent" },
        "accent-foreground": { value: "#FFFFFF", description: "White text on accent" },
        destructive: { value: "#CC0000", description: "Dark red for errors/delete" },
        border: { value: "#FFFFFF", description: "Bold white borders" },
        input: { value: "#FFFFFF", description: "White input borders" },
        ring: { value: "#FFFFFF", description: "White focus ring" },
        "icon-color": { value: "#FFFFFF", description: "White icon color" },
        sidebar: { value: "#111111", description: "Near-black sidebar" },
        "sidebar-foreground": { value: "#FFFFFF", description: "White sidebar text" },
        "sidebar-primary": { value: "#FFFFFF", description: "White active item" },
        "sidebar-primary-foreground": { value: "#000000", description: "Black active text" },
        "sidebar-accent": { value: "#222222", description: "Dark gray hover" },
        "sidebar-accent-foreground": { value: "#FFFFFF", description: "White hover text" },
        "sidebar-border": { value: "rgba(255, 255, 255, 0.3)", description: "Subtle white borders" },
        "sidebar-ring": { value: "#FFFFFF", description: "White sidebar focus ring" }
      }
    },
    border_radius: {
      base: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0"
    },
    transitions: {
      default: "all 0.1s linear"
    }
  }
]

async function seed() {
  console.log('Seeding themes table...')

  const { data, error } = await supabase
    .from('themes')
    .upsert(themes, { onConflict: 'name' })
    .select()

  if (error) {
    console.error('Error seeding:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} theme(s)`)
  data.forEach(t => console.log(`- ${t.name} (active: ${t.is_active})`))
}

seed()
