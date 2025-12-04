# Components Reference

**Framework:** React 19 / Next.js 16
**Version:** 0.1.0

Component library for JFK Primary Sources PWA.

---

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| Button | UI Primitive | `src/components/ui/button.tsx` |
| Sheet | UI Primitive | `src/components/ui/sheet.tsx` |
| Tabs | UI Primitive | `src/components/ui/tabs.tsx` |
| Header | Layout | `src/components/header.tsx` |
| Navigation | Layout | `src/components/navigation.tsx` |
| ThemeToggle | Interactive | `src/components/theme-toggle.tsx` |
| ThemeProvider | Context | `src/components/theme-provider.tsx` |
| LinkCard | Content | `src/components/link-card.tsx` |
| TimelineAccordion | Content | `src/components/timeline-accordion.tsx` |
| ScrollToTop | Utility | `src/components/scroll-to-top.tsx` |

---

## UI Primitives (shadcn/ui)

### Button

Polymorphic button with variants.

**Location:** `src/components/ui/button.tsx`

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style |
| size | `"default" \| "sm" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"default"` | Button size |
| asChild | `boolean` | `false` | Render as Slot for composition |

**Usage:**

```tsx
import { Button } from "@/components/ui/button"

// Default button
<Button>Click me</Button>

// Icon button
<Button variant="ghost" size="icon">
  <span className="material-symbols-outlined">menu</span>
</Button>

// As Link
<Button asChild>
  <Link href="/settings">Settings</Link>
</Button>
```

---

### Sheet

Slide-out drawer/panel component.

**Location:** `src/components/ui/sheet.tsx`

**Exports:**
- `Sheet` - Root container
- `SheetTrigger` - Click target to open
- `SheetContent` - Slide-out panel
- `SheetHeader` - Header section
- `SheetTitle` - Accessible title
- `SheetDescription` - Description text
- `SheetFooter` - Footer section
- `SheetClose` - Close button

**Props (SheetContent):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| side | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Slide direction |

**Usage:**

```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <span className="material-symbols-outlined">menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-72">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    {/* Nav content */}
  </SheetContent>
</Sheet>
```

---

### Tabs

Tab navigation component.

**Location:** `src/components/ui/tabs.tsx`

**Exports:**
- `Tabs` - Root container
- `TabsList` - Tab button container
- `TabsTrigger` - Individual tab button
- `TabsContent` - Content for each tab

**Usage:**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="timeline">Timeline</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="timeline">Timeline content</TabsContent>
</Tabs>
```

---

## Layout Components

### Header

Fixed app header with hamburger menu and navigation drawer.

**Location:** `src/components/header.tsx`

**Features:**
- Fixed position at top
- Hamburger menu (left) opens Sheet with full navigation
- Title centered
- Account button (right, placeholder)
- ThemeToggle in drawer

**Usage:**

```tsx
// Used in layout.tsx, no props needed
import { Header } from "@/components/header"

<Header />
```

**Navigation Links:**

| Name | Path | Icon |
|------|------|------|
| Home | `/` | home |
| Search | `/search` | search |
| Chronology | `/chronology` | history |
| People | `/people` | groups |
| Archives | `/archives` | article |
| Investigations | `/investigations` | manage_search |
| Evidence | `/evidence` | inventory_2 |
| Incidents | `/incidents` | warning |
| Media | `/media` | movie |
| Latest | `/latest` | update |
| Saved | `/saved` | bookmark |
| Settings | `/settings` | settings |

---

### Navigation

Fixed bottom tab bar for primary navigation.

**Location:** `src/components/navigation.tsx`

**Features:**
- Fixed position at bottom
- 4 primary tabs
- Active state highlighting
- Material icons

**Tabs:**

| Name | Path | Icon |
|------|------|------|
| Home | `/` | home |
| Latest | `/latest` | update |
| Saved | `/saved` | bookmark |
| Settings | `/settings` | settings |

**Usage:**

```tsx
// Used in layout.tsx, no props needed
import { Navigation } from "@/components/navigation"

<Navigation />
```

---

## Interactive Components

### ThemeToggle

Light/dark mode toggle button.

**Location:** `src/components/theme-toggle.tsx`

**Features:**
- Uses next-themes for state
- Sun icon (light mode) / Moon icon (dark mode)
- Handles hydration mismatch

**Usage:**

```tsx
import { ThemeToggle } from "@/components/theme-toggle"

<ThemeToggle />
```

---

### ThemeProvider

Wrapper for next-themes.

**Location:** `src/components/theme-provider.tsx`

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| attribute | `string` | `"class"` | HTML attribute for theme |
| defaultTheme | `string` | `"system"` | Initial theme |
| enableSystem | `boolean` | `true` | Use system preference |

**Usage:**

```tsx
// In layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

---

## Content Components

### LinkCard

Displays a list of external links with icons.

**Location:** `src/components/link-card.tsx`

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| links | `ExternalLink[]` | Array of link objects |

**ExternalLink Type:**

```typescript
interface ExternalLink {
  title: string
  description: string
  url: string
  icon?: string  // Material Symbols icon name
}
```

**Usage:**

```tsx
import { LinkCard } from "@/components/link-card"

const archives = [
  {
    title: "National Archives",
    description: "JFK Assassination Records",
    url: "https://www.archives.gov/research/jfk",
    icon: "archive"
  }
]

<LinkCard links={archives} />
```

---

### TimelineAccordion

Expandable timeline entries.

**Location:** `src/components/timeline-accordion.tsx`

**Usage:** Used in chronology page for expandable timeline events.

---

## Utility Components

### ScrollToTop

Automatically scrolls to top on route changes.

**Location:** `src/components/scroll-to-top.tsx`

**Features:**
- Listens to pathname changes
- Scrolls window to top
- No visual output

**Usage:**

```tsx
// In layout.tsx
import { ScrollToTop } from "@/components/scroll-to-top"

<ScrollToTop />
```

---

## Styling Patterns

### CSS Variables (Theming)

All components use CSS custom properties for colors:

```tsx
// Use semantic color variables
<div className="bg-card text-foreground">
<span className="text-muted-foreground">
<button className="bg-primary text-primary-foreground">
```

### Material Symbols Icons

Icons use Google Material Symbols:

```tsx
<span className="material-symbols-outlined text-[var(--icon-color)]">
  place
</span>
```

Common icon classes:
- `text-lg`, `text-xl`, `text-2xl`, `text-4xl` - size
- `text-[var(--icon-color)]` - themed icon color
- `text-muted-foreground` - secondary icon color

### Card Pattern

Standard card styling:

```tsx
<div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
  {/* Content */}
</div>
```

### Utility Classes

Common Tailwind patterns:

```tsx
// Truncate text
<p className="truncate">
<p className="line-clamp-2">

// Spacing
<div className="space-y-4">
<div className="gap-3">

// Flex layout
<div className="flex items-center gap-2">
<div className="flex-1 min-w-0">
```

---

## Adding New Components

1. Create file in appropriate location:
   - `src/components/ui/` for primitives
   - `src/components/` for app-specific

2. Follow patterns:
   - Use `"use client"` if interactive
   - Type props with TypeScript interfaces
   - Use `cn()` for conditional classes
   - Apply theme CSS variables

3. Export from component file:

```tsx
export { ComponentName }
export type { ComponentProps }
```

---

*Last Updated: 2025-12-03*
