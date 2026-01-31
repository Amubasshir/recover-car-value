# Run Supabase migrations

You can run migrations in two ways: **npm script** (with `DATABASE_URL`) or **Supabase Dashboard** (no env var).

---

## Option A: Run from terminal (`npm run db:migrate`)

1. **Get your database connection string**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
   - **Settings** (gear icon) → **Database**
   - Under **Connection string**, select **URI**
   - Copy the URI (it looks like `postgresql://postgres.uhpxzchujnxtsncgmiwn:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`)
   - Replace `[YOUR-PASSWORD]` with your **database password** (shown on the same page, or use “Reset database password” if you don’t know it)

2. **Add it to `.env.local`** in the project root:
   ```bash
   DATABASE_URL=postgresql://postgres.uhpxzchujnxtsncgmiwn:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   (Use the exact host and path from your Dashboard; your region/host may differ.)

3. **Run migrations**
   ```bash
   npm run db:migrate
   ```
   You should see `Running 002_diminished_car_value.sql ...`, `OK: ...`, then `Migrations done.`

---

## Option B: Run in Supabase Dashboard (no CLI, no `DATABASE_URL`)

You don’t need the Supabase CLI or `DATABASE_URL`. Use the **Supabase Dashboard** instead.

## 1. Open your project

- Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Open the project that matches the URL in `lib/supabase.ts` (e.g. `uhpxzchujnxtsncgmiwn`)

## 2. Open SQL Editor

- In the left sidebar click **SQL Editor**
- Click **New query**

## 3. Create the table (if it doesn’t exist)

If you get errors like **relation "diminished_car_value" does not exist**:

1. Copy the **entire** contents of `app/supabase/migrations/002_diminished_car_value.sql`
2. Paste into the SQL Editor
3. Click **Run** (or press Ctrl+Enter)

## 4. Or add the missing column (if the table already exists)

If you get errors like **column "post_plot_generated" does not exist**:

1. Copy the contents of `app/supabase/migrations/003_add_post_plot_generated.sql`
2. Paste into the SQL Editor
3. Click **Run**

## 5. Test the API again

Call `POST http://localhost:3000/api/diminished-value` again with the same body; the insert should succeed.

---

**Note:** `npm install -g supabase` is not supported. For this project you don’t need the CLI—using the Dashboard SQL Editor above is enough. If you ever want the CLI (e.g. for `supabase db push`), use [Supabase’s recommended install](https://github.com/supabase/cli#install-the-cli) (e.g. Scoop or Chocolatey on Windows, or `npx supabase`).
