# JFK Primary Sources

**Version:** 0.1.0
**Date:** 2025-12-03
**Maintainer:** willh

A Progressive Web App (PWA) for exploring primary source materials related to the JFK assassination. Built with Next.js 16, React 19, Tailwind CSS 4, and Supabase.

---

## Overview

JFK Primary Sources provides a mobile-first interface for researchers, historians, and enthusiasts to explore:
- **People** - Key figures (Oswald, Ruby, witnesses, officials)
- **Investigations** - Warren Commission, HSCA, ARRB reports
- **Incidents** - Related events (Tippit shooting, Ruby shooting Oswald)
- **Locations** - Points of interest (Dealey Plaza, TSBD, embassies)
- **Archives** - Links to official document repositories
- **Chronology** - Timeline of events
- **Evidence** - Physical materials
- **Media** - News coverage and film

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase account (for database)

### Installation

```bash
# Clone repository
git clone https://github.com/srwlli/jfk-primary-sources.git
cd jfk-primary-sources

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add your Supabase credentials to .env.local
```

### Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx  # For seeding only
```

### Development

```bash
# Run development server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## Project Structure

```
jfk-primary-sources/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home dashboard
│   │   ├── people/          # People list and detail pages
│   │   ├── investigations/  # Investigations pages
│   │   ├── incidents/       # Incidents pages
│   │   ├── locations/       # Locations pages
│   │   ├── archives/        # Archive links
│   │   ├── chronology/      # Timeline
│   │   ├── evidence/        # Evidence items
│   │   ├── media/           # Media coverage
│   │   ├── settings/        # Theme settings
│   │   └── layout.tsx       # Root layout with providers
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── header.tsx       # App header with nav drawer
│   │   └── navigation.tsx   # Bottom tab bar
│   ├── contexts/            # React contexts
│   │   └── theme-context.tsx # Dynamic theming
│   ├── lib/                 # Utilities
│   │   ├── supabase.ts      # Supabase client
│   │   └── utils.ts         # Helper functions
│   └── data/                # Static data fallbacks
├── supabase/
│   ├── migrations/          # SQL migrations
│   └── AGENT_INSTRUCTIONS.json
├── scripts/                 # Seed scripts
└── public/                  # Static assets & PWA icons
```

---

## Database Management

### Apply Migrations

```bash
npx supabase db push
```

### Seed Data

```bash
# Seed a specific table
SUPABASE_SERVICE_ROLE_KEY="sb_secret_xxx" node scripts/seed-people.mjs
SUPABASE_SERVICE_ROLE_KEY="sb_secret_xxx" node scripts/seed-locations.mjs
```

See `supabase/AGENT_INSTRUCTIONS.json` for complete database management instructions.

---

## Theming System

The app supports dynamic themes stored in Supabase:
- **Default** - Clean, neutral palette
- **Editorial** - Serif typography (Playfair Display)
- **Brutalist** - Stark contrasts, monospace (Space Mono)

Themes control:
- Colors (27 CSS variables for light/dark modes)
- Fonts (display, body, mono)
- Border radius

Switch themes in Settings page.

---

## PWA Features

- Installable on iOS/Android home screens
- Offline-capable (via service worker)
- Native app-like experience
- Status bar theming

---

## Common Tasks

| Task | Command |
|------|---------|
| Run dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Push migrations | `npx supabase db push` |
| Check migration status | `npx supabase migration list` |

---

## Troubleshooting

### "Row violates row-level security policy"
- **Cause:** Using anon key for inserts
- **Fix:** Use `SUPABASE_SERVICE_ROLE_KEY` environment variable

### "Table not found in schema cache"
- **Cause:** Migration not applied
- **Fix:** Run `npx supabase db push`

### Theme not applying
- **Cause:** localStorage conflict
- **Fix:** Clear localStorage or check Settings page

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0.6 | React framework (App Router) |
| React | 19.2.0 | UI library |
| Tailwind CSS | 4.x | Styling |
| Supabase | 2.86.0 | Database & auth |
| Radix UI | - | Accessible primitives |
| next-pwa | 10.2.9 | PWA support |

---

## AI Agent Instructions

For AI agents working on this project:
- See `supabase/AGENT_INSTRUCTIONS.json` for database operations
- See `theme/AGENT_INSTRUCTIONS.json` for theme system
- Use Supabase CLI (already linked to project)
- Service role key format: `sb_secret_xxx`

---

*Last Updated: 2025-12-03*
