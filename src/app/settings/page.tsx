"use client"

import { useTheme } from "next-themes"
import { useAppTheme } from "@/contexts/theme-context"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { themes, currentTheme, setCurrentTheme, isLoading } = useAppTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-4 animate-pulse h-24" />
          <div className="bg-card rounded-xl p-4 animate-pulse h-24" />
        </div>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Theme Dropdown */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
                palette
              </span>
              <div>
                <h2 className="font-semibold">Theme</h2>
                <p className="text-sm text-muted-foreground">
                  {currentTheme?.description || "Select a theme"}
                </p>
              </div>
            </div>
            <select
              value={currentTheme?.name || ""}
              onChange={(e) => setCurrentTheme(e.target.value)}
              disabled={isLoading}
              className="bg-muted text-foreground px-3 py-2 rounded-lg border border-border text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                themes.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
                {isDark ? "dark_mode" : "light_mode"}
              </span>
              <div>
                <h2 className="font-semibold">Appearance</h2>
                <p className="text-sm text-muted-foreground">
                  {isDark ? "Dark mode" : "Light mode"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`
                relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer
                ${isDark ? "bg-accent" : "bg-muted"}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform
                  ${isDark ? "translate-x-8" : "translate-x-1"}
                `}
              />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${!isDark ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Light
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Dark
            </span>
          </div>
        </div>

        {/* Theme Preview */}
        {currentTheme && (
          <div className="bg-card rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
                preview
              </span>
              <div>
                <h2 className="font-semibold">Current Theme</h2>
                <p className="text-sm text-muted-foreground">{currentTheme.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {["background", "card", "primary", "accent", "muted"].map((colorKey) => {
                const colors = isDark ? currentTheme.dark.colors : currentTheme.light.colors
                const color = colors[colorKey]
                return (
                  <div key={colorKey} className="text-center">
                    <div
                      className="w-full aspect-square rounded-lg border border-border mb-1"
                      style={{ backgroundColor: color?.value }}
                    />
                    <span className="text-xs text-muted-foreground capitalize">{colorKey}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* About */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[var(--icon-color)]">
              info
            </span>
            <div>
              <h2 className="font-semibold">About</h2>
              <p className="text-sm text-muted-foreground">JFK Primary Sources v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
