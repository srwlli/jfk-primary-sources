# API Reference

**Date:** 2025-12-03
**Version:** 0.1.0

This project uses Supabase's auto-generated PostgREST API. No custom API routes exist.

---

## Overview

All data access happens through the Supabase JavaScript client, which communicates with PostgreSQL via PostgREST. The API is read-only for public users (enforced by RLS).

---

## Supabase Client Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## Tables & Endpoints

### People

**Table:** `people`
**Endpoint:** `https://{project}.supabase.co/rest/v1/people`

```typescript
// Fetch all people
const { data } = await supabase
  .from("people")
  .select("*")
  .order("name")

// Fetch single person by ID
const { data } = await supabase
  .from("people")
  .select("*")
  .eq("id", "lee-harvey-oswald")
  .single()
```

**Response Shape:**
```json
{
  "id": "lee-harvey-oswald",
  "name": "Lee Harvey Oswald",
  "description": "...",
  "birth": "October 18, 1939",
  "death": "November 24, 1963",
  "birth_place": "New Orleans, Louisiana",
  "occupation": "...",
  "background": "...",
  "documents": [],
  "events": [],
  "connections": []
}
```

---

### Investigations

**Table:** `investigations`
**Endpoint:** `https://{project}.supabase.co/rest/v1/investigations`

```typescript
// Fetch all investigations
const { data } = await supabase
  .from("investigations")
  .select("*")

// Fetch by slug
const { data } = await supabase
  .from("investigations")
  .select("*")
  .eq("slug", "warren-commission")
  .single()
```

**Response Shape:**
```json
{
  "id": "uuid",
  "slug": "warren-commission",
  "data": {
    "name": "Warren Commission",
    "fullName": "President's Commission on the Assassination of President Kennedy",
    "date": "1963-1964",
    "findings": "...",
    "members": [...],
    "keyFindings": [...]
  }
}
```

---

### Incidents

**Table:** `incidents`
**Endpoint:** `https://{project}.supabase.co/rest/v1/incidents`

```typescript
// Fetch all incidents
const { data } = await supabase
  .from("incidents")
  .select("*")

// Fetch by slug
const { data } = await supabase
  .from("incidents")
  .select("*")
  .eq("slug", "tippit-shooting")
  .single()
```

**Response Shape:**
```json
{
  "id": "uuid",
  "slug": "tippit-shooting",
  "data": {
    "name": "Tippit Shooting",
    "date": "November 22, 1963",
    "time": "1:15 PM",
    "location": "...",
    "description": "...",
    "figures": [...]
  }
}
```

---

### Locations

**Table:** `locations`
**Endpoint:** `https://{project}.supabase.co/rest/v1/locations`

```typescript
// Fetch all locations ordered by city
const { data } = await supabase
  .from("locations")
  .select("*")
  .order("city")
  .order("name")

// Fetch by slug
const { data } = await supabase
  .from("locations")
  .select("*")
  .eq("slug", "dealey-plaza")
  .single()
```

**Response Shape:**
```json
{
  "id": "uuid",
  "slug": "dealey-plaza",
  "name": "Dealey Plaza",
  "short_name": null,
  "description": "...",
  "city": "Dallas",
  "state": "Texas",
  "country": "USA",
  "address": "...",
  "coordinates": { "lat": 32.7788, "lng": -96.8084 },
  "significance": "...",
  "events": [
    { "date": "1963-11-22", "description": "..." }
  ],
  "current_status": "National Historic Landmark District",
  "related_people": ["john-f-kennedy", "lee-harvey-oswald"],
  "related_incidents": []
}
```

---

### Themes

**Table:** `themes`
**Endpoint:** `https://{project}.supabase.co/rest/v1/themes`

```typescript
// Fetch all themes
const { data } = await supabase
  .from("themes")
  .select("*")
  .order("name")

// Find active theme
const { data } = await supabase
  .from("themes")
  .select("*")
  .eq("is_active", true)
  .single()
```

**Response Shape:**
```json
{
  "id": "uuid",
  "name": "Default",
  "description": "Clean, neutral palette",
  "is_active": true,
  "fonts": {
    "display": { "family": "Inter", "fallback": ["system-ui"] },
    "body": { "family": "Inter", "fallback": ["system-ui"] }
  },
  "light": {
    "colors": {
      "background": { "value": "#FFFFFF", "description": "..." },
      "foreground": { "value": "#0A0A0B", "description": "..." }
    }
  },
  "dark": {
    "colors": {
      "background": { "value": "#0A0A0B", "description": "..." },
      "foreground": { "value": "#FAFAFA", "description": "..." }
    }
  },
  "border_radius": { "base": "0.5rem", "sm": "0.25rem" }
}
```

---

## Authentication

### Public Access (Anonymous)

Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`:
- **SELECT**: Allowed on all tables (RLS policy)
- **INSERT/UPDATE/DELETE**: Blocked by RLS

### Admin Access (Service Role)

Uses `SUPABASE_SERVICE_ROLE_KEY`:
- Bypasses RLS entirely
- Used only in seed scripts
- Never exposed to client

---

## Error Handling

```typescript
const { data, error } = await supabase
  .from("people")
  .select("*")

if (error) {
  console.error("Supabase error:", error.message)
  // error.code, error.details, error.hint available
}
```

**Common Errors:**

| Code | Message | Cause |
|------|---------|-------|
| `42501` | new row violates row-level security policy | Using anon key for writes |
| `42P01` | relation does not exist | Table not created/migration not run |
| `PGRST116` | JSON object requested, multiple rows returned | `.single()` on multiple results |

---

## Query Patterns

### Filtering

```typescript
// Exact match
.eq("slug", "warren-commission")

// Multiple values
.in("city", ["Dallas", "New Orleans"])

// Text search (requires index)
.ilike("name", "%oswald%")
```

### Ordering

```typescript
.order("city")
.order("name", { ascending: true })
```

### Pagination (Future)

```typescript
.range(0, 9)  // First 10 items
.range(10, 19) // Next 10 items
```

### Selecting Specific Fields

```typescript
.select("id, name, city")
.select("*, data->name")  // JSONB path
```

---

## Rate Limits

Supabase free tier limits:
- **50,000 monthly active users**
- **500 MB database**
- **1 GB file storage**
- **2 GB bandwidth**

No explicit request rate limits, but connection pooling applies.

---

## CORS

Supabase handles CORS automatically. No additional configuration needed for browser requests.

---

## Next.js Data Fetching

### Server Components (Recommended)

```typescript
// src/app/people/page.tsx
export default async function PeoplePage() {
  const { data: people } = await supabase
    .from("people")
    .select("*")
    .order("name")

  return <PeopleList people={people} />
}
```

### Client Components

```typescript
"use client"

export function PeopleSearch() {
  const [results, setResults] = useState([])

  useEffect(() => {
    supabase
      .from("people")
      .select("*")
      .ilike("name", `%${query}%`)
      .then(({ data }) => setResults(data))
  }, [query])
}
```

---

*Last Updated: 2025-12-03*
