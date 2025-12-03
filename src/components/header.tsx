"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Search", href: "/search", icon: "search" },
  { name: "Chronology", href: "/chronology", icon: "history" },
  { name: "People", href: "/people", icon: "groups" },
  { name: "Documents", href: "/documents", icon: "article" },
  { name: "Investigations", href: "/investigations", icon: "manage_search" },
  { name: "Evidence", href: "/evidence", icon: "inventory_2" },
  { name: "Witnesses", href: "/witnesses", icon: "visibility" },
  { name: "Media", href: "/media", icon: "movie" },
  { name: "Latest", href: "/latest", icon: "update" },
  { name: "Saved", href: "/saved", icon: "bookmark" },
  { name: "Settings", href: "/settings", icon: "settings" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center p-4 pb-2 justify-between">
      <div className="flex size-12 shrink-0 items-center justify-start">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 p-0 bg-transparent"
            >
              <span className="material-symbols-outlined">menu</span>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
        JFK Primary Sources
      </h1>
      <div className="flex w-12 items-center justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 p-0 bg-transparent"
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="sr-only">Account</span>
        </Button>
      </div>
    </header>
  )
}
