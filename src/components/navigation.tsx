"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Latest", href: "/latest", icon: "update" },
  { name: "Saved", href: "/saved", icon: "bookmark" },
  { name: "Settings", href: "/settings", icon: "settings" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-card/90 backdrop-blur-sm border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)] z-50">
      <div className="flex justify-around items-start h-full pt-2.5">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined",
                  isActive && "fill"
                )}
              >
                {tab.icon}
              </span>
              <span
                className={cn(
                  "text-xs",
                  isActive ? "font-bold" : "font-medium"
                )}
              >
                {tab.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
