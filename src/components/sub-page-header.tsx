"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

interface SubPageHeaderProps {
  title: string
  showSearch?: boolean
}

export function SubPageHeader({ title, showSearch = true }: SubPageHeaderProps) {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200/80 bg-background/80 p-4 pb-3 backdrop-blur-sm dark:border-gray-800/80">
      <div className="flex size-10 shrink-0 items-center justify-start">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
      </div>
      <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight">
        {title}
      </h1>
      <div className="flex w-10 shrink-0 items-center justify-end">
        {showSearch ? (
          <Link
            href="/search"
            className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent"
          >
            <span className="material-symbols-outlined">search</span>
          </Link>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </div>
  )
}
