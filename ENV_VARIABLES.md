# Environment Variables Configuration

This document lists all environment variables required for this project.

## Required Environment Variables

### `VEHICLE_API_KEY` ⚠️ **REQUIRED**
- **Used in:**
  - `lib/api/marketCheck.ts` (lines 129, 194)
  - `app/api/diminished-value/route.ts` (line 36)
  - `app/api/vehicle-value/route.ts` (line 37)
  - `app/api/vehicles/route.ts` (line 84)
- **Purpose:** API key for vehicle data API (RCV API: `https://rcv.btkdeals.com/api/`)
- **Error if missing:** "Vehicle API key not configured"
- **Status:** ❌ **NOT CONFIGURED** (causing current error)

### `PLATETOVIN_API_KEY` ⚠️ **REQUIRED**
- **Used in:** `lib/api/plateToVin.ts` (line 17)
- **Purpose:** API key for PlateToVin service
- **Error if missing:** "PlateToVin API key not configured"

## Optional Environment Variables

### `RADIUS_INCREMENT`
- **Used in:** `app/api/diminished-value/route.ts` (line 37)
- **Default:** `"50"`
- **Purpose:** Increment for radius expansion when searching for comparable vehicles

### `MAX_RADIUS`
- **Used in:** `app/api/diminished-value/route.ts` (line 38)
- **Default:** `"500"`
- **Purpose:** Maximum radius (in miles) for vehicle search expansion

### `CLIO_CLIENT_ID`
- **Used in:** `lib/connectors/clio/clio.ts` (line 30)
- **Purpose:** Clio integration client ID

### `CLIO_CLIENT_SECRET`
- **Used in:** `lib/connectors/clio/clio.ts` (line 31)
- **Purpose:** Clio integration client secret

### `APP_URL`
- **Used in:** 
  - `lib/connectors/clio/clio.ts` (line 34)
  - `lib/connectors/base-connector.ts` (line 24)
- **Purpose:** Base URL of the application

### `MARKETVERIFY_API_URL`
- **Used in:** `lib/connectors/base-connector.ts` (line 24)
- **Default:** `${process.env.APP_URL}/api/reports/generate`
- **Purpose:** MarketVerify API endpoint URL

## Supabase Configuration

**Note:** Currently hardcoded in `lib/supabase.ts`:
- Supabase URL: `https://uhpxzchujnxtsncgmiwn.supabase.co`
- Supabase Anon Key: (hardcoded in file)

**Recommendation:** Move these to environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### `DATABASE_URL` (for `npm run db:migrate`)

- **Used in:** `scripts/run-migrations.js` (running Supabase migrations locally)
- **Purpose:** Direct Postgres connection string so the migration script can run SQL
- **How to get it:**
  1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
  2. **Settings** (gear) → **Database**
  3. Under **Connection string**, choose **URI**
  4. Copy the URI (e.g. `postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`)
  5. Replace `[YOUR-PASSWORD]` with your database password (same as in **Database password** on that page, or reset it there)
- **Where to set:** Add to `.env.local` in the project root:
  ```bash
  DATABASE_URL=postgresql://postgres.uhpxzchujnxtsncgmiwn:YOUR_DB_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
  ```
  (Use the exact host/ref from your Dashboard; the port is often `6543` for connection pooling.)
- **Error if missing:** `Missing DATABASE_URL or SUPABASE_DB_URL` when running `npm run db:migrate`

## Setup Instructions

1. Create a `.env.local` file in the project root (this file is gitignored)
2. Add the required variables:

```bash
# Required
VEHICLE_API_KEY=your_vehicle_api_key_here
PLATETOVIN_API_KEY=your_platetovin_api_key_here

# Optional (with defaults)
RADIUS_INCREMENT=50
MAX_RADIUS=500

# Integration (if using)
CLIO_CLIENT_ID=your_clio_client_id
CLIO_CLIENT_SECRET=your_clio_client_secret
APP_URL=http://localhost:3000

# Supabase (recommended to move from hardcoded)
NEXT_PUBLIC_SUPABASE_URL=https://uhpxzchujnxtsncgmiwn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database URL for running migrations (npm run db:migrate)
# Get from Supabase Dashboard → Settings → Database → Connection string (URI)
DATABASE_URL=postgresql://postgres.[ref]:[YOUR-PASSWORD]@[host].pooler.supabase.com:6543/postgres
```

3. Restart your Next.js development server after adding environment variables

## Current Issue

The error "Vehicle API key not configured" is occurring because `VEHICLE_API_KEY` is not set in your environment. This is checked in:
- `lib/api/marketCheck.ts:133` - throws error when missing
- Used by the `/api/diminished-value` endpoint which is failing

## Verification

To verify your environment variables are loaded, you can temporarily add a console.log in your API route:

```typescript
console.log('VEHICLE_API_KEY exists:', !!process.env.VEHICLE_API_KEY);
```

**Note:** Never commit `.env.local` or any `.env*` files to git (they're already in `.gitignore`).
