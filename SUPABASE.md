# Supabase CLI Documentation

## Connection Status
- **Project Ref:** `grdwmwhqzvvjkfpfeauh`
- **URL:** `https://grdwmwhqzvvjkfpfeauh.supabase.co`
- **Status:** Connected and linked

## Environment Variables
Located in `.env.local` (gitignored):
```
NEXT_PUBLIC_SUPABASE_URL=https://grdwmwhqzvvjkfpfeauh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

## CLI Commands

### Database Inspection
```bash
# Show table statistics
npx supabase inspect db table-stats --linked

# Show database stats (cache hit rates, sizes)
npx supabase inspect db db-stats --linked

# Show index statistics
npx supabase inspect db index-stats --linked

# Show long-running queries
npx supabase inspect db long-running-queries --linked
```

### Migrations
```bash
# Create a new migration file
npx supabase migration new <migration_name>

# Push migrations to remote database
npx supabase db push

# Pull remote schema to local
npx supabase db pull

# Show pending migrations
npx supabase migration list
```

### Database Management
```bash
# Dump remote schema
npx supabase db dump --schema public > schema.sql

# Dump remote data
npx supabase db dump --data-only > data.sql
```

### Project Management
```bash
# Check link status
npx supabase status

# Unlink project
npx supabase unlink

# Relink project
npx supabase link --project-ref grdwmwhqzvvjkfpfeauh
```

## File Structure
```
supabase/
├── config.toml          # Supabase configuration
├── migrations/          # SQL migration files
│   └── *.sql
└── seed.sql             # Seed data (optional)
```

## Client Usage (in Next.js)
```typescript
import { supabase } from '@/lib/supabase'

// Query data
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' })

// Update data
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', 1)

// Delete data
const { error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 1)
```

## Creating Tables via Migration

1. Create migration: `npx supabase migration new create_people_table`
2. Edit the file in `supabase/migrations/`
3. Push to remote: `npx supabase db push`

## Notes
- The CLI is linked to the remote project
- Migrations are the preferred way to manage schema changes
- Use the Supabase client (`src/lib/supabase.ts`) for runtime queries
