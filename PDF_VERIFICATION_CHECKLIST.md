# PDF Verification Checklist — Pre/Post-Accident Comps Requirements

Use this checklist to verify that the diminished-value report (and underlying logic) meets the stated requirements. You can verify in **the PDF**, in the **API response**, or in **raw data**.

---

## Pre-Accident Comps

| Requirement | Where to verify | What to check |
|-------------|-----------------|---------------|
| **Search within ±15,000 miles of current mileage** | PDF: "Parameters applied" box on the comps page | `Mileage range: ±15,000 miles — searched: [min]-[max]` — range should be subject mileage −15,000 to +15,000 (e.g. 0–30,000 if mileage 15,000). |
| | API: `mileage_range_searched` in saved record | Same range as above. |
| **Minimum 2 pre-accident comps required** | PDF: Pre-accident comps table + "Parameters applied" | `Pre-accident comps: N used` — N ≥ 2. Table shows at least 2 rows. |
| | API: `pre_accident_comps` | ≥ 2. |
| **Use trim if provided; if not enough results, ignore trim** | Logic only (no direct PDF field) | Run with trim → if few results, backend refetches without trim. Pre comp count ≥ 2 confirms sufficiency. |
| **Take up to 10 nearest comps by mileage** | PDF: Pre-accident comps table | Row count ≤ 10. Mileage values should be close to subject mileage (nearest by mileage). |
| | API: `top_clean_listings` length | ≤ 10. |
| **Perform linear regression to estimate pre-accident value** | PDF: Pre-accident chart | Chart shows scatter points + regression line; subject vehicle marked at subject mileage. |
| | PDF: "Fair Market Value with No Accident" | Value is regression estimate at subject mileage. |
| **Always generate plot if regression is possible** | PDF: Pre-accident chart | Pre-accident chart is always present when there are ≥2 pre comps (regression possible). |

---

## Post-Accident Comps

| Requirement | Where to verify | What to check |
|-------------|-----------------|---------------|
| **Search within ±15,000 miles of current mileage** | Same as pre-accident | Post-accident comps are from the same ±15k mileage window. |
| **Filter cars priced 75–90% of pre-accident value** | PDF: Post-accident comps table | Each listed price is between 75% and 90% of "Fair Market Value with No Accident" shown in the PDF. Manually: `0.75 * pre_value ≤ price ≤ 0.90 * pre_value`. |
| | API: `bottom_damaged_listings[].price` vs `average_clean_price_top5` | Same check. |
| **Minimum 2 post-accident comps required for regression** | PDF: "Parameters applied" | `Post-accident comps: N used` — if N ≥ 2, regression/chart expected; if N &lt; 2, fallback. |
| **Use trim if provided; if not enough results, ignore trim** | Logic only | Same as pre-accident; post comp count reflects this. |
| **Take up to 10 lowest comps by price** | PDF: Post-accident comps table | Row count ≤ 10. Prices should be the lowest among the 75–90% band (sorted low to high). |
| | API: `bottom_damaged_listings` | Length ≤ 10; prices are lowest in band. |
| **If linear regression slope ≥ 0, make slope = 0 and post value = average of comp prices** | Logic / API | When slope ≥ 0, backend sets slope = 0 and post value = mean of comp prices. In PDF, "Fair Market Value with Accident" reflects that (flat line in post chart when applied). |
| **If &lt;2 comps after filtering: fallback 90% of pre-accident value** | PDF: "Parameters applied" | `Post-accident regression/chart: No (90% fallback; &lt;2 comps)`. |
| | PDF: "Fair Market Value with Accident" | Should equal 90% of "Fair Market Value with No Accident". |
| **If fallback used: no post-accident plot** | PDF: Post-accident section | When fallback: no post-accident chart image; only pre-accident chart and comp table. |
| **If ≥2 comps: perform linear regression and generate post-accident plot** | PDF: "Parameters applied" | `Post-accident regression/chart: Yes`. |
| | PDF: Post-accident chart | Chart is present; scatter + regression line; subject at subject mileage. |

---

## Quick verification flow

1. **Generate a report** (qualify flow or dashboard) and open the PDF.
2. **Open "Parameters applied"** on the page with "Pre-Accident Comparable Listings":
   - Mileage range ±15k ✓  
   - Pre-accident comps ≥ 2, up to 10 ✓  
   - Post-accident comps count and "Yes/No" for regression/chart ✓  
3. **Pre-accident table**: 2–10 rows; mileages near subject ✓  
4. **Pre-accident chart**: Present; regression line and subject point ✓  
5. **Post-accident table**: If present, 2–10 rows; prices in 75–90% of pre-value ✓  
6. **Post-accident chart**: Present only when "Post-accident regression/chart: Yes" ✓  
7. **Fallback case**: When "No (90% fallback; &lt;2 comps)", post value = 90% of pre and no post chart ✓  

---

## API / raw data checks (optional)

- **GET or inspect saved record** (e.g. from dashboard or DB):  
  `mileage_range_searched`, `pre_accident_comps`, `post_accident_comps`, `post_plot_generated`, `top_clean_listings`, `bottom_damaged_listings`, `average_clean_price_top5`, `average_damaged_price_bottom5`.
- **Pre comps**: `top_clean_listings.length` in [2, 10]; mileages within subject ±15,000.
- **Post comps**: `bottom_damaged_listings.length`; each `price` in [0.75 * pre, 0.90 * pre]; if `post_plot_generated === false`, post value = 0.90 * pre.

This checklist aligns with `car_diminish_value.py` and the React/API logic described in the codebase.
