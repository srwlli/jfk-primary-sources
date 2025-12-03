"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface TimelineImage {
  src: string
  alt: string
  title: string
  caption: string
}

interface TimelineEvent {
  id: string
  datetime: string
  title: string
  description: string
  images?: TimelineImage[]
  sourceLink?: string
  defaultOpen?: boolean
}

interface TimelineAccordionProps {
  events: TimelineEvent[]
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const [isOpen, setIsOpen] = useState(event.defaultOpen || false)

  return (
    <div className="flex flex-col border-b border-gray-200 py-2 dark:border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full list-none cursor-pointer items-center justify-between gap-6 py-2 text-left"
      >
        <div className="flex-1">
          <p className="text-sm font-medium">{event.datetime}</p>
          <p className="text-xs text-muted-foreground">{event.title}</p>
        </div>
        <span
          className={`material-symbols-outlined text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 pt-2 pb-4">
          <p className="text-sm font-normal leading-normal text-muted-foreground">
            {event.description}
          </p>

          {/* Image Carousel */}
          {event.images && event.images.length > 0 && (
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex items-stretch gap-3">
                {event.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 flex-col gap-2 rounded-lg min-w-40"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${image.src}")` }}
                      role="img"
                      aria-label={image.alt}
                    />
                    <div>
                      <p className="text-sm font-medium leading-normal">
                        {image.title}
                      </p>
                      <p className="text-xs font-normal leading-normal text-muted-foreground">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Link */}
          {event.sourceLink && (
            <Link
              href={event.sourceLink}
              className="text-sm font-normal leading-normal text-primary underline"
            >
              View source documents
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export function TimelineAccordion({ events }: TimelineAccordionProps) {
  return (
    <div className="flex flex-col">
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} />
      ))}
    </div>
  )
}

export type { TimelineEvent, TimelineImage }
