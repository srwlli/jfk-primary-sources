# Database Schema Reference

**Date:** 2025-12-03
**Schema Version:** 0.1.0
**Database:** PostgreSQL (Supabase)

---

## Overview

The database stores historical data about the JFK assassination including people, investigations, incidents, locations, and application themes.

All tables:
- Use Row Level Security (RLS) with public read access
- Have `created_at` and `updated_at` timestamps
- Use UUID primary keys (except `people` which uses TEXT slugs)

---

## Tables

### people

Key figures related to the JFK assassination.

**Migration:** `20251203170321_create_people_table.sql`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | TEXT | NO | - | Primary key (slug format) |
| name | TEXT | NO | - | Full name |
| description | TEXT | NO | - | Brief description |
| birth | TEXT | YES | - | Birth date (e.g., "October 18, 1939") |
| death | TEXT | YES | - | Death date |
| birth_place | TEXT | YES | - | Place of birth |
| occupation | TEXT | YES | - | Primary occupation |
| background | TEXT | YES | - | Extended biography |
| documents | JSONB | YES | `[]` | Related documents |
| events | JSONB | YES | `[]` | Timeline events |
| connections | JSONB | YES | `[]` | Related people |
| created_at | TIMESTAMPTZ | YES | `NOW()` | Created timestamp |
| updated_at | TIMESTAMPTZ | YES | `NOW()` | Updated timestamp |

**Indexes:**
- `idx_people_name` on `name`

**RLS Policy:**
```sql
CREATE POLICY "Allow public read access" ON people
  FOR SELECT USING (true);
```

**Example Row:**
```json
{
  "id": "lee-harvey-oswald",
  "name": "Lee Harvey Oswald",
  "description": "Alleged assassin of President Kennedy",
  "birth": "October 18, 1939",
  "death": "November 24, 1963",
  "birth_place": "New Orleans, Louisiana",
  "occupation": "Former U.S. Marine",
  "background": "...",
  "documents": [],
  "events": [
    { "date": "1959-10-31", "description": "Defected to Soviet Union" }
  ],
  "connections": ["marina-oswald", "jack-ruby"]
}
```

---

### investigations

Official investigations into the assassination.

**Migration:** `20251203181826_create_investigations_table.sql`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | `gen_random_uuid()` | Primary key |
| slug | TEXT | NO | - | URL-friendly identifier (unique) |
| data | JSONB | NO | - | Complete investigation data |
| created_at | TIMESTAMPTZ | YES | `NOW()` | Created timestamp |
| updated_at | TIMESTAMPTZ | YES | `NOW()` | Updated timestamp |

**Indexes:**
- `idx_investigations_slug` on `slug`

**Data JSONB Structure:**
```typescript
interface InvestigationData {
  name: string
  fullName: string
  date: string
  description: string
  findings: string
  members?: { name: string; role: string }[]
  keyFindings?: string[]
  documents?: { name: string; url?: string }[]
}
```

**Example Row:**
```json
{
  "id": "uuid",
  "slug": "warren-commission",
  "data": {
    "name": "Warren Commission",
    "fullName": "President's Commission on the Assassination of President Kennedy",
    "date": "1963-1964",
    "description": "...",
    "findings": "Oswald acted alone...",
    "members": [
      { "name": "Earl Warren", "role": "Chairman" }
    ],
    "keyFindings": [
      "Lee Harvey Oswald acted alone",
      "Three shots were fired from the sixth floor"
    ]
  }
}
```

---

### incidents

Key incidents related to the assassination.

**Migration:** `20251203192453_create_incidents_table.sql`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | `gen_random_uuid()` | Primary key |
| slug | TEXT | NO | - | URL-friendly identifier (unique) |
| data | JSONB | NO | - | Complete incident data |
| created_at | TIMESTAMPTZ | YES | `NOW()` | Created timestamp |
| updated_at | TIMESTAMPTZ | YES | `NOW()` | Updated timestamp |

**Indexes:**
- `idx_incidents_slug` on `slug`

**Data JSONB Structure:**
```typescript
interface IncidentData {
  name: string
  date: string
  time?: string
  location: string
  description: string
  significance?: string
  figures?: { name: string; slug?: string; role: string }[]
  aftermath?: string[]
  relatedDocuments?: string[]
}
```

**Example Row:**
```json
{
  "id": "uuid",
  "slug": "tippit-shooting",
  "data": {
    "name": "Tippit Shooting",
    "date": "November 22, 1963",
    "time": "1:15 PM",
    "location": "Oak Cliff, Dallas",
    "description": "Officer J.D. Tippit was shot and killed...",
    "figures": [
      { "name": "J.D. Tippit", "role": "Victim" },
      { "name": "Lee Harvey Oswald", "slug": "lee-harvey-oswald", "role": "Accused" }
    ]
  }
}
```

---

### locations

Points of interest related to the assassination.

**Migration:** `20251203210000_create_locations_table.sql`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | `gen_random_uuid()` | Primary key |
| slug | TEXT | NO | - | URL-friendly identifier (unique) |
| name | TEXT | NO | - | Location name |
| short_name | TEXT | YES | - | Abbreviated name (e.g., "TSBD") |
| description | TEXT | YES | - | Location description |
| city | TEXT | NO | - | City name |
| state | TEXT | YES | - | State (null for international) |
| country | TEXT | NO | `'USA'` | Country |
| address | TEXT | YES | - | Street address |
| coordinates | JSONB | YES | - | `{ lat: number, lng: number }` |
| significance | TEXT | YES | - | Historical significance |
| events | JSONB | YES | `[]` | Timeline of events at location |
| current_status | TEXT | YES | - | Current state (museum, demolished, etc.) |
| images | JSONB | YES | `[]` | Image URLs |
| related_people | JSONB | YES | `[]` | People slugs |
| related_incidents | JSONB | YES | `[]` | Incident slugs |
| created_at | TIMESTAMPTZ | YES | `NOW()` | Created timestamp |
| updated_at | TIMESTAMPTZ | YES | `NOW()` | Updated timestamp |

**Indexes:**
- `idx_locations_city` on `city`
- `idx_locations_country` on `country`

**Events JSONB Structure:**
```typescript
interface LocationEvent {
  date: string      // e.g., "1963-11-22"
  description: string
}
```

**Example Row:**
```json
{
  "id": "uuid",
  "slug": "texas-school-book-depository",
  "name": "Texas School Book Depository",
  "short_name": "TSBD",
  "description": "A seven-story building...",
  "city": "Dallas",
  "state": "Texas",
  "country": "USA",
  "address": "411 Elm Street, Dallas, TX 75202",
  "coordinates": { "lat": 32.7802, "lng": -96.8083 },
  "significance": "Location of the alleged sniper's nest...",
  "events": [
    { "date": "1963-11-22", "description": "Shots fired from sixth floor" }
  ],
  "current_status": "Museum - The Sixth Floor Museum at Dealey Plaza",
  "images": [],
  "related_people": ["lee-harvey-oswald"],
  "related_incidents": []
}
```

---

### themes

Application color themes.

**Migration:** `20251203202107_create_themes_table.sql`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | `gen_random_uuid()` | Primary key |
| name | TEXT | NO | - | Theme name (unique) |
| description | TEXT | YES | - | Theme description |
| is_active | BOOLEAN | YES | `FALSE` | Default theme flag |
| fonts | JSONB | YES | - | Font definitions |
| light | JSONB | NO | - | Light mode colors |
| dark | JSONB | NO | - | Dark mode colors |
| border_radius | JSONB | YES | - | Border radius values |
| transitions | JSONB | YES | - | Animation config |
| created_at | TIMESTAMPTZ | YES | `NOW()` | Created timestamp |
| updated_at | TIMESTAMPTZ | YES | `NOW()` | Updated timestamp |

**Indexes:**
- `idx_themes_name` on `name`
- `idx_themes_active` on `is_active` WHERE `is_active = TRUE`

**Fonts JSONB Structure:**
```typescript
interface ThemeFonts {
  display?: { family: string; fallback: string[] }
  body?: { family: string; fallback: string[] }
  mono?: { family: string; fallback: string[] }
}
```

**Colors JSONB Structure:**
```typescript
interface ThemeColors {
  colors: {
    [key: string]: {
      value: string       // Hex color
      description: string
    }
  }
}
```

**Color Keys (27 total):**
- `background`, `foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `destructive`, `destructive-foreground`
- `success`, `success-foreground`
- `warning`, `warning-foreground`
- `border`, `input`, `ring`
- `chart-1` through `chart-5`
- `sidebar-*` variants

**Example Row:**
```json
{
  "id": "uuid",
  "name": "Brutalist",
  "description": "Raw, bold aesthetic with stark contrasts",
  "is_active": false,
  "fonts": {
    "display": { "family": "Space Mono", "fallback": ["monospace"] },
    "body": { "family": "Space Mono", "fallback": ["monospace"] }
  },
  "light": {
    "colors": {
      "background": { "value": "#FFFFFF", "description": "Pure white" },
      "foreground": { "value": "#000000", "description": "Pure black" }
    }
  },
  "dark": {
    "colors": {
      "background": { "value": "#000000", "description": "Pure black" },
      "foreground": { "value": "#FFFFFF", "description": "Pure white" }
    }
  },
  "border_radius": {
    "base": "0",
    "sm": "0",
    "md": "0",
    "lg": "0"
  }
}
```

---

## Entity Relationships

```
┌──────────┐
│  people  │
└────┬─────┘
     │ slug references
     │
┌────▼─────────┐      ┌─────────────────┐
│  locations   │◄────►│   incidents     │
│ related_     │      │ data.figures.   │
│ people[]     │      │ slug            │
└──────────────┘      └─────────────────┘

┌──────────────────┐
│  investigations  │
│  (standalone)    │
└──────────────────┘

┌──────────────────┐
│     themes       │
│  (standalone)    │
└──────────────────┘
```

**Notes:**
- Relationships are stored as slug arrays in JSONB, not foreign keys
- Enables flexible cross-referencing without strict constraints
- Frontend handles resolution via additional queries

---

## Migrations

| Timestamp | File | Description |
|-----------|------|-------------|
| 20251203170321 | create_people_table.sql | Initial people table |
| 20251203170638 | alter_people_dates.sql | Date column changes |
| 20251203172439 | restructure_people_table.sql | Schema restructure |
| 20251203180539 | create_archives_table.sql | Archives table |
| 20251203180645 | add_icon_to_archives.sql | Add icon column |
| 20251203180951 | add_unique_url_to_archives.sql | URL unique constraint |
| 20251203181826 | create_investigations_table.sql | Investigations table |
| 20251203192453 | create_incidents_table.sql | Incidents table |
| 20251203202107 | create_themes_table.sql | Themes table |
| 20251203210000 | create_locations_table.sql | Locations table |

**Apply migrations:**
```bash
npx supabase db push
```

**Check status:**
```bash
npx supabase migration list
```

---

## Seed Scripts

| Script | Table | Conflict Key |
|--------|-------|--------------|
| seed-people.mjs | people | id (slug) |
| seed-investigations.mjs | investigations | slug |
| seed-incidents.mjs | incidents | slug |
| seed-locations.mjs | locations | slug |
| seed-themes.mjs | themes | name |

**Run seed:**
```bash
SUPABASE_SERVICE_ROLE_KEY="sb_secret_xxx" node scripts/seed-{table}.mjs
```

All seeds use `upsert` with conflict resolution, safe to re-run.

---

## TypeScript Interfaces

```typescript
// People
interface Person {
  id: string
  name: string
  description: string
  birth?: string
  death?: string
  birth_place?: string
  occupation?: string
  background?: string
  documents: unknown[]
  events: { date: string; description: string }[]
  connections: string[]
}

// Location
interface Location {
  id: string
  slug: string
  name: string
  short_name?: string
  description?: string
  city: string
  state?: string
  country: string
  address?: string
  coordinates?: { lat: number; lng: number }
  significance?: string
  events: { date: string; description: string }[]
  current_status?: string
  images: string[]
  related_people: string[]
  related_incidents: string[]
}

// Theme
interface Theme {
  id: string
  name: string
  description?: string
  is_active: boolean
  fonts?: {
    display?: { family: string; fallback: string[] }
    body?: { family: string; fallback: string[] }
  }
  light: { colors: Record<string, { value: string; description: string }> }
  dark: { colors: Record<string, { value: string; description: string }> }
  border_radius?: Record<string, string>
}
```

---

*Last Updated: 2025-12-03*
