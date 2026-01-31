/**
 * Car Value Calculator - TypeScript implementation of car__value.py
 * 
 * This module provides the exact same logic as the Python version:
 * - Fetches listings from RCV API
 * - Calculates pre-accident and post-accident values
 * - Uses constrained linear regression (slope ≤ 0)
 * - Filters and selects comparable vehicles
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CarListing {
  price: string | number;
  mileage: string | number;
  make?: string;
  model?: string;
  model_name?: string;
  year?: number;
  model_year?: number;
  trim?: string;
  vin?: string;
  dealer_name?: string;
  dealer_city?: string;
  dealer_state?: string;
  dealer_zip?: string;
  seller_location?: string;
  title_status?: string;
  is_accidental?: number;
  [key: string]: any;
}

export interface RegressionResult {
  slope: number;
  intercept: number;
}

export interface CalculationResult {
  pre_value: number;
  post_value: number;
  diminished_value: number;
  pre_comps: CarListing[];
  post_comps: CarListing[];
  pre_regression: RegressionResult;
  post_regression: RegressionResult;
  /** True when ≥2 post-accident comps and regression/plot was performed; false when fallback 90% was used. */
  post_plot_generated: boolean;
}

// ============================================================================
// API FETCHING
// ============================================================================

/**
 * Fetch listings from RCV API (matches Python fetch_listings)
 */
export async function fetchListings(
  make: string,
  model: string,
  year: number,
  is_accident: number,
  min_miles: number,
  max_miles: number,
  trim?: string,
  limit: number = 2000
): Promise<CarListing[]> {
  const url = "https://rcv.btkdeals.com/api/fetchSimilarCars.php";
  const params: Record<string, string> = {
    make,
    model,
    year: year.toString(),
    is_accidental: is_accident.toString(),
    min_mileage: min_miles.toString(),
    max_mileage: max_miles.toString(),
    limit: limit.toString(),
    sort: "price",
    order: "desc"
  };

  if (trim) {
    params.trim = trim;
  }

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${queryString}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.cars || [];
}

// ============================================================================
// FILTERING & SELECTION
// ============================================================================

/**
 * Pick nearest cars by mileage (for pre-accident; matches Python pick_nearest_by_mileage)
 */
export function pickNearestByMileage(
  cars: CarListing[],
  currentMileage: number,
  n: number = 20
): CarListing[] {
  const carsWithMileage = cars.map(car => ({
    ...car,
    mileageNum: typeof car.mileage === 'string' ? parseFloat(car.mileage) : car.mileage
  }));

  const carsSorted = carsWithMileage.sort(
    (a, b) => Math.abs(a.mileageNum - currentMileage) - Math.abs(b.mileageNum - currentMileage)
  );

  return carsSorted.slice(0, Math.min(n, carsSorted.length));
}

/**
 * Pick up to n lowest comps by price (for post-accident; matches Python pick_lowest_by_price)
 */
export function pickLowestByPrice(cars: CarListing[], n: number = 10): CarListing[] {
  const withPrice = cars.map(car => ({
    ...car,
    priceNum: typeof car.price === 'string' ? parseFloat(car.price) : car.price
  }));
  const sorted = withPrice.sort((a, b) => a.priceNum - b.priceNum);
  return sorted.slice(0, Math.min(n, sorted.length));
}

/**
 * Filter cars by price band (matches Python filter_by_price_band)
 */
export function filterByPriceBand(
  cars: CarListing[],
  minPrice: number,
  maxPrice: number
): CarListing[] {
  return cars.filter(car => {
    const price = typeof car.price === 'string' ? parseFloat(car.price) : car.price;
    return price >= minPrice && price <= maxPrice;
  });
}

// ============================================================================
// REGRESSION
// ============================================================================

/**
 * Safe regression that ensures slope ≤ 0 (matches Python safe_regression)
 */
export function safeRegression(
  miles: number[],
  prices: number[]
): RegressionResult {
  if (miles.length < 2) {
    return {
      slope: 0,
      intercept: prices.length > 0 ? prices.reduce((a, b) => a + b) / prices.length : 0
    };
  }

  // Simple linear regression: y = mx + b
  const n = miles.length;
  const sumX = miles.reduce((a, b) => a + b, 0);
  const sumY = prices.reduce((a, b) => a + b, 0);
  const sumXY = miles.reduce((sum, x, i) => sum + x * prices[i], 0);
  const sumX2 = miles.reduce((sum, x) => sum + x * x, 0);

  let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const meanMiles = sumX / n;
  const meanPrices = sumY / n;

  // If slope ≥ 0, set slope = 0 and intercept = mean(prices) so post value = average of comp prices
  if (slope >= 0) {
    slope = 0;
  }

  // Recalculate intercept with (potentially adjusted) slope
  const intercept = meanPrices - slope * meanMiles;

  return { slope, intercept };
}

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

/**
 * Fetch with trim fallback (matches Python fetch_with_trim_fallback)
 * If trim is provided and results >= min_required, return those.
 * Otherwise, fetch without trim.
 */
/** Use trim if provided; if not enough results, ignore trim and fetch all trims. */
async function fetchWithTrimFallback(
  make: string,
  model: string,
  year: number,
  is_accident: number,
  min_miles: number,
  max_miles: number,
  trim?: string,
  min_required: number = 2
): Promise<CarListing[]> {
  if (trim) {
    const cars = await fetchListings(make, model, year, is_accident, min_miles, max_miles, trim);
    if (cars.length >= min_required) {
      return cars;
    }
  }
  return fetchListings(make, model, year, is_accident, min_miles, max_miles);
}

/**
 * Main calculation function (matches Python calculate_and_plot)
 * Note: SVG plotting is handled separately in React components
 */
export async function calculateAndPlot(
  year: number,
  make: string,
  model: string,
  currentMileage: number,
  trim?: string
): Promise<CalculationResult> {
  const MILEAGE_WINDOW = 15000; // ±15,000 miles for both pre and post

  // ============ PRE-ACCIDENT CALCULATION ============
  const cleanCars = await fetchWithTrimFallback(
    make,
    model,
    year,
    0, // is_accident = 0
    Math.max(0, currentMileage - MILEAGE_WINDOW),
    currentMileage + MILEAGE_WINDOW,
    trim
  );

  const preNear = pickNearestByMileage(cleanCars, currentMileage, 10);
  
  if (preNear.length < 2) {
    throw new Error(`⚠️ Not enough clean comps for ${year} ${make} ${model}`);
  }

  const preMiles = preNear.map(c => 
    typeof c.mileage === 'string' ? parseFloat(c.mileage) : c.mileage
  );
  const prePrices = preNear.map(c => 
    typeof c.price === 'string' ? parseFloat(c.price) : c.price
  );

  const preRegression = safeRegression(preMiles, prePrices);
  const preValue = preRegression.slope * currentMileage + preRegression.intercept;

  // ============ POST-ACCIDENT CALCULATION ============
  const damagedCars = await fetchWithTrimFallback(
    make,
    model,
    year,
    1, // is_accident = 1
    Math.max(0, currentMileage - MILEAGE_WINDOW),
    currentMileage + MILEAGE_WINDOW,
    trim
  );

  // Price bounds: 75-90% of pre-value
  const minPostPrice = preValue * 0.75;
  const maxPostPrice = preValue * 0.90;

  // Filter cars within 75-90% of pre-value
  const filteredPostComps = damagedCars.filter(c => {
    const price = typeof c.price === 'string' ? parseFloat(c.price) : c.price;
    return minPostPrice <= price && price <= maxPostPrice;
  });

  // Take up to 10 lowest comps by price (not nearest by mileage)
  const finalPostComps = pickLowestByPrice(filteredPostComps, 10);

  let postValue: number;
  let postRegression: RegressionResult;
  let post_plot_generated: boolean;

  if (finalPostComps.length < 2) {
    // <2 post comps: post value = 10% of pre-value; no regression, no post-accident plot
    postValue = preValue * 0.10;
    postRegression = {
      slope: 0,
      intercept: postValue
    };
    post_plot_generated = false;
  } else {
    const postMiles = finalPostComps.map(c =>
      typeof c.mileage === 'string' ? parseFloat(c.mileage) : c.mileage
    );
    const postPrices = finalPostComps.map(c =>
      typeof c.price === 'string' ? parseFloat(c.price) : c.price
    );

    // Subject mileage must fall within post-accident chart range (same bounds as chart x-axis).
    // If outside range, do not show post-accident chart; post value = 10% of pre.
    const minPostMiles = Math.min(...postMiles);
    const maxPostMiles = Math.max(...postMiles);
    const mileagePadding = (maxPostMiles - minPostMiles) * 0.1 || 5000;
    const chartMinX = Math.max(0, minPostMiles - mileagePadding) > 5000
      ? Math.max(0, minPostMiles - mileagePadding) - 5000
      : Math.max(0, minPostMiles - mileagePadding);
    const chartMaxX = maxPostMiles + mileagePadding + 5000;
    const subjectMileageInChartRange = currentMileage >= chartMinX && currentMileage <= chartMaxX;

    if (!subjectMileageInChartRange) {
      // Subject mileage does not show up in chart → 10% of pre, no graph in report
      postValue = preValue * 0.10;
      postRegression = { slope: 0, intercept: postValue };
      post_plot_generated = false;
    } else {
      postRegression = safeRegression(postMiles, postPrices);
      // If slope ≥ 0 (upward), safeRegression sets slope=0 and intercept=mean(prices) → flat line
      postValue = postRegression.slope * currentMileage + postRegression.intercept;
      post_plot_generated = true;
    }
  }

  return {
    pre_value: Math.round(preValue * 100) / 100,
    post_value: Math.round(postValue * 100) / 100,
    diminished_value: Math.round((preValue - postValue) * 100) / 100,
    pre_comps: preNear,
    post_comps: finalPostComps,
    pre_regression: preRegression,
    post_regression: postRegression,
    post_plot_generated,
  };
}
