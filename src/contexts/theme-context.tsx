"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useTheme as useNextTheme } from "next-themes"
import { supabase } from "@/lib/supabase"

interface ThemeColors {
  [key: string]: {
    value: string
    description: string
  }
}

interface ThemeData {
  id: string
  name: string
  description: string
  is_active: boolean
  fonts: {
    display?: { family: string; fallback: string[] }
    body?: { family: string; fallback: string[] }
    mono?: { family: string; fallback: string[] }
  }
  light: { colors: ThemeColors }
  dark: { colors: ThemeColors }
  border_radius: { [key: string]: string }
}

interface ThemeContextType {
  themes: ThemeData[]
  currentTheme: ThemeData | null
  setCurrentTheme: (themeName: string) => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<ThemeData[]>([])
  const [currentTheme, setCurrentThemeState] = useState<ThemeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useNextTheme()

  // Fetch themes from Supabase
  useEffect(() => {
    async function fetchThemes() {
      const { data, error } = await supabase
        .from("themes")
        .select("*")
        .order("name")

      if (error) {
        console.error("Error fetching themes:", error)
        setIsLoading(false)
        return
      }

      setThemes(data || [])

      // Get saved theme from localStorage or use active theme
      const savedThemeName = localStorage.getItem("app-theme")
      const themeToUse = savedThemeName
        ? data?.find((t) => t.name === savedThemeName)
        : data?.find((t) => t.is_active)

      if (themeToUse) {
        setCurrentThemeState(themeToUse)
      }

      setIsLoading(false)
    }

    fetchThemes()
  }, [])

  // Font family mapping from theme names to actual font-family strings
  const fontMap: Record<string, string> = {
    "Playfair Display": "'Playfair Display', Georgia, serif",
    "Source Sans Pro": "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
    "Source Sans 3": "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
    "Inter": "'Inter', system-ui, sans-serif",
    "Geist Sans": "'Inter', system-ui, sans-serif",
    "Space Mono": "'Space Mono', monospace",
  }

  // Apply CSS variables when theme or mode changes
  useEffect(() => {
    if (!currentTheme || !resolvedTheme) return

    const colors = resolvedTheme === "dark"
      ? currentTheme.dark.colors
      : currentTheme.light.colors

    const root = document.documentElement

    // Apply color variables
    Object.entries(colors).forEach(([key, colorData]) => {
      root.style.setProperty(`--${key}`, colorData.value)
    })

    // Apply border radius
    if (currentTheme.border_radius) {
      root.style.setProperty("--radius", currentTheme.border_radius.base || currentTheme.border_radius.lg)
    }

    // Apply font variables
    const defaultFont = "'Inter', system-ui, sans-serif"
    if (currentTheme.fonts?.display) {
      const displayFont = fontMap[currentTheme.fonts.display.family] || defaultFont
      root.style.setProperty("--font-display", displayFont)
    } else {
      root.style.setProperty("--font-display", defaultFont)
    }
    if (currentTheme.fonts?.body) {
      const bodyFont = fontMap[currentTheme.fonts.body.family] || defaultFont
      root.style.setProperty("--font-body", bodyFont)
    } else {
      root.style.setProperty("--font-body", defaultFont)
    }

  }, [currentTheme, resolvedTheme])

  const setCurrentTheme = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName)
    if (theme) {
      setCurrentThemeState(theme)
      localStorage.setItem("app-theme", themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{ themes, currentTheme, setCurrentTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useAppTheme must be used within a ThemeContextProvider")
  }
  return context
}
