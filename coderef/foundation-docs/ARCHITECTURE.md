# Architecture

**Date:** 2025-12-03
**Version:** 0.1.0

System architecture for JFK Primary Sources PWA.

---

## System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (PWA)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Next.js App Router                     │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │  │
│  │  │  Pages  │  │Components│  │Contexts │  │  Lib    │     │  │
│  │  │ (RSC)   │  │ (Client)│  │(Client) │  │         │     │  │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘     │  │
│  │       │            │            │            │           │  │
│  │       └────────────┴────────────┴────────────┘           │  │
│  │                         │                                 │  │
│  │              ┌──────────▼──────────┐                     │  │
│  │              │   Supabase Client   │                     │  │
│  │              └──────────┬──────────┘                     │  │
│  └──────────────────────────┼───────────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────────┘
                               │ HTTPS
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      SUPABASE (Backend)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │     RLS      │  │   Storage    │          │
│  │   Database   │  │   Policies   │  │   (Future)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Module Boundaries

### 1. Pages Layer (`src/app/`)

Server and client components organized by route:

| Route | Type | Description |
|-------|------|-------------|
| `/` | RSC | Home dashboard with category cards |
| `/people` | RSC | People list, fetches from Supabase |
| `/people/[slug]` | RSC | Person detail page |
| `/investigations` | RSC | Investigations list |
| `/investigations/[slug]` | RSC | Investigation detail |
| `/incidents` | RSC | Incidents list |
| `/incidents/[slug]` | RSC | Incident detail |
| `/locations` | RSC | Locations grouped by city |
| `/locations/[slug]` | RSC | Location detail |
| `/settings` | Client | Theme selection |
| `/chronology` | RSC | Timeline view |
| `/archives` | RSC | External archive links |

**RSC = React Server Component** - fetches data at request time, no client JavaScript.

### 2. Components Layer (`src/components/`)

```
components/
├── ui/                  # shadcn/ui primitives
│   ├── button.tsx       # Button variants
│   ├── sheet.tsx        # Side drawer
│   └── tabs.tsx         # Tab navigation
├── header.tsx           # App header + nav drawer
├── navigation.tsx       # Bottom tab bar
├── theme-toggle.tsx     # Light/dark toggle
├── theme-provider.tsx   # next-themes wrapper
├── scroll-to-top.tsx    # Auto scroll on route change
├── timeline-accordion.tsx
└── link-card.tsx
```

### 3. Contexts Layer (`src/contexts/`)

| Context | Purpose |
|---------|---------|
| `ThemeContextProvider` | Manages custom themes from Supabase, applies CSS variables |

### 4. Library Layer (`src/lib/`)

| Module | Purpose |
|--------|---------|
| `supabase.ts` | Supabase client singleton |
| `utils.ts` | `cn()` helper for Tailwind class merging |

### 5. Data Layer (`src/data/`)

Static TypeScript files providing fallback data or legacy support:
- `people.ts`, `incidents.ts`, `investigations.ts`
- `lho-timeline.ts` - Lee Harvey Oswald timeline
- `sources.ts`, `evidence.ts`

---

## Data Flow

### Read Flow (Server Components)

```
User Request
     │
     ▼
┌─────────────────┐
│  Next.js Route  │
│  (Server Side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Supabase Client │
│   (Server)      │
└────────┬────────┘
         │ SQL via PostgREST
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   + RLS Check   │
└────────┬────────┘
         │
         ▼
   Rendered HTML
```

### Theme Flow (Client)

```
Page Load
     │
     ▼
┌──────────────────────┐
│ ThemeContextProvider │
│   (useEffect)        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Fetch themes from    │
│ Supabase             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Apply CSS variables  │
│ to :root             │
└──────────────────────┘
```

---

## Stack Decisions

### Why Next.js 16 App Router?

- **Server Components**: Data fetching happens on server, reduces client JS
- **File-based routing**: Matches content structure (people, incidents, etc.)
- **Built-in optimization**: Images, fonts, code splitting

### Why Supabase?

- **PostgreSQL**: Relational model fits structured historical data
- **Row Level Security**: Public read, admin write pattern
- **Real-time (future)**: Could add live updates
- **No custom backend**: Direct database access via PostgREST

### Why Tailwind CSS 4?

- **CSS variables native**: Enables dynamic theming
- **Utility-first**: Rapid UI development
- **Small bundle**: Only ships used styles

### Why PWA?

- **Mobile-first audience**: Researchers on mobile devices
- **Offline access**: Can cache content for offline reading
- **No app store**: Direct installation from browser

---

## Security Model

### Row Level Security (RLS)

All tables have RLS enabled with public read access:

```sql
CREATE POLICY "Allow public read access" ON table_name
  FOR SELECT USING (true);
```

No public write access. Seed scripts use `SUPABASE_SERVICE_ROLE_KEY`.

### Authentication

- Currently: No user authentication required
- Future: Could add Supabase Auth for saved items, annotations

---

## Theming Architecture

### CSS Variable Injection

```typescript
// theme-context.tsx applies to :root
root.style.setProperty(`--${key}`, colorData.value)
root.style.setProperty("--font-display", fontFamily)
root.style.setProperty("--radius", borderRadius)
```

### Font Loading

Fonts pre-loaded via `next/font/google` in `layout.tsx`:
- Inter (default)
- Playfair Display (editorial)
- Source Sans 3 (editorial body)
- Space Mono (brutalist)

### Theme Storage

- Supabase `themes` table stores complete theme definitions
- localStorage stores user's selected theme name
- CSS variables applied client-side on theme change

---

## Directory Structure Rationale

```
src/
├── app/           # Next.js convention for App Router
├── components/    # Reusable UI pieces
│   └── ui/        # Primitive components (shadcn pattern)
├── contexts/      # React Context providers
├── lib/           # Shared utilities
└── data/          # Static data (legacy/fallback)

supabase/
├── migrations/    # SQL schema changes (version controlled)
└── AGENT_INSTRUCTIONS.json  # AI agent guidelines

scripts/
└── seed-*.mjs     # Database seeding scripts
```

---

## Performance Considerations

1. **Server Components**: Most pages are RSC, minimizing client JS
2. **Static generation**: Could add `generateStaticParams` for pre-rendering
3. **Image optimization**: Next.js Image component (when images added)
4. **Font loading**: Google Fonts with `next/font` for optimal loading

---

## Future Considerations

- **Search**: Add full-text search via Supabase pg_trgm or external service
- **User accounts**: Supabase Auth for saved items
- **Document viewer**: PDF/image viewer for primary sources
- **Timeline visualization**: Interactive chronology
- **Cross-references**: Link people ↔ incidents ↔ locations

---

*Last Updated: 2025-12-03*
