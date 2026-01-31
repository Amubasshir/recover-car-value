# Issues Resolved in Current Codebase

Summary of issues that were identified and fixed during integration of `car_diminish_value.py` with the React app and the stated pre/post-accident comp requirements.

---

## 1. Pre-Accident & Post-Accident Logic (Python + TypeScript)

| Issue | Resolution |
|-------|------------|
| **Trim fallback used min 3 comps** | Changed to **min 2** so we fall back to “all trims” only when we have fewer than 2 comps with trim (`fetch_with_trim_fallback` / `fetchWithTrimFallback` with `min_required=2`). |
| **Post-accident comps selected by “nearest by mileage”** | Post-accident comps must be **up to 10 lowest by price**. Added `pick_lowest_by_price()` (Python) and `pickLowestByPrice()` (TS); post flow now uses these instead of nearest-by-mileage. |
| **Post-accident slope ≥ 0 not explicitly handled** | When linear regression slope ≥ 0, slope is set to **0** and post-accident value is set to the **average of comp prices** (flat line). Already partially in place; made explicit and consistent in `safe_regression` (Python) and `safeRegression` (TS) using `slope >= 0`. |
| **No indicator when post-accident chart is omitted** | When &lt;2 post comps we use 90% fallback and **do not** generate a post-accident plot. Added **`post_plot_generated`** (boolean) to Python summary, TypeScript `CalculationResult`, API response, and DB so UI/PDF can show or hide the post chart correctly. |

**Files:** `car_diminish_value.py`, `lib/utils/carValueCalculator.ts`

---

## 2. API & Dashboard Integration

| Issue | Resolution |
|-------|------------|
| **Post-accident chart always shown in PDF** | Post-accident chart is shown only when **`post_plot_generated === true`** (or legacy: ≥2 post comps). `ChartPdfImage` and `PDFDocument` only render the post chart when a post image exists / flag is set. |
| **Diminished-value fallback path used “nearest by mileage” for post comps** | Fallback path in `app/api/diminished-value/route.ts` now uses **`pickLowestByPrice`** for post comps and no longer pads to 10 with comps from outside the 75–90% band. |
| **Missing imports in diminished-value route** | Route now imports **`pickLowestByPrice`**, **`pickNearestByMileage`**, **`safeRegression`**, **`filterByPriceBand`** from `carValueCalculator` so both main and fallback paths run correctly. |
| **`post_plot_generated` not available after try/catch** | Introduced **`postPlotGenerated`** variable in the route, set in both the main path (from `result.post_plot_generated`) and the fallback path (`finalPostComps.length >= 2`), and used when building the response/DB row. |

**Files:** `app/api/diminished-value/route.ts`, `app/dashboard/components/ChartPdfImage.tsx`, `app/dashboard/components/PDFDocument.tsx`

---

## 3. Supabase / “Failed to save valuation result”

| Issue | Resolution |
|-------|------------|
| **API returned only “Failed to save valuation result”** | On Supabase insert failure, the API now returns **`details`** (Supabase message), **`code`**, **`hint`**, and the **`valuation`** object so callers can debug and still use the calculated values. |
| **Table `diminished_car_value` (or column) missing** | Added migration **`002_diminished_car_value.sql`** to create the table (including **`post_plot_generated`**) and RLS policies; **`003_add_post_plot_generated.sql`** to add the column if the table already existed. |
| **No way to run migrations without Supabase CLI** | Documented **Option A:** set **`DATABASE_URL`** in `.env.local` and run **`npm run db:migrate`** (Node script using `pg`). **Option B:** run the SQL from **Supabase Dashboard → SQL Editor**. |
| **`npm install -g supabase` not supported** | Removed that instruction; documented that Supabase CLI is not installed via npm and that the Dashboard (or `npm run db:migrate`) is sufficient. |

**Files:** `app/api/diminished-value/route.ts`, `app/supabase/migrations/002_diminished_car_value.sql`, `app/supabase/migrations/003_add_post_plot_generated.sql`, `scripts/run-migrations.js`, `SUPABASE_MIGRATION.md`, `ENV_VARIABLES.md`

---

## 4. Test Page & Verification

| Issue | Resolution |
|-------|------------|
| **Test page always showed post-accident chart** | **`/test-car-value`** shows the post-accident chart only when **`post_plot_generated !== false`**; otherwise it shows a short message that the 90% fallback was used and no post chart was generated. |
| **No way to verify requirements in the PDF** | Added a **“Parameters applied”** box on the Pre-Accident Comparable Listings page showing mileage range (±15k), pre/post comp counts, and whether the post-accident regression/chart was generated. Created **`PDF_VERIFICATION_CHECKLIST.md`** mapping each requirement to what to check in the PDF/API. |

**Files:** `app/test-car-value/page.tsx`, `app/dashboard/components/PDFDocument.tsx`, `PDF_VERIFICATION_CHECKLIST.md`

---

## 5. Documentation

| Issue | Resolution |
|-------|------------|
| **Unclear how to test from the UI** | Added **“How to test from the UI”** in **`TESTING_GUIDE.md`**: Option A (full qualify flow → diminished-value API + results), Option B (quick test at `/test-car-value`), and how to open the report PDF from the dashboard. |
| **No single place for DB URL / migrations** | **`ENV_VARIABLES.md`** documents **`DATABASE_URL`** (and optional **`SUPABASE_DB_URL`**) for `npm run db:migrate`; **`SUPABASE_MIGRATION.md`** explains both the npm script and the Dashboard SQL option. |

**Files:** `TESTING_GUIDE.md`, `ENV_VARIABLES.md`, `SUPABASE_MIGRATION.md`

---

## 6. Migration Script Robustness

| Issue | Resolution |
|-------|------------|
| **Re-running 002 could fail on existing policies** | In **`002_diminished_car_value.sql`**, added **`DROP POLICY IF EXISTS`** before each **`CREATE POLICY`** so the migration can be re-run safely. |

**File:** `app/supabase/migrations/002_diminished_car_value.sql`

---

## Quick Reference: Requirements Now Reflected in Code

- **Pre-accident:** ±15k miles, min 2 comps, trim fallback, up to 10 nearest by mileage, linear regression, always generate plot when regression is possible.
- **Post-accident:** ±15k miles, filter 75–90% of pre-value, min 2 comps for regression, trim fallback, up to 10 lowest by price; if slope ≥ 0 then slope = 0 and post value = average of comp prices; if &lt;2 comps then 90% fallback and no post-accident plot; if ≥2 comps then regression and post-accident plot.
- **PDF:** Parameters-applied box and conditional post-accident chart; verification checklist document for auditing.
