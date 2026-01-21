/**
 * Diminished Value Engine - Comprehensive Valuation System
 *
 * Framework:
 * - Pre-Accident Value Calculation: Estimate fair market value before accident
 * - Post-Accident Value Calculation: Estimate fair market value after repair with accident history
 * - Diminished Value Calculation: DV = Pre-Accident Value - Post-Accident Value
 *
 * Requirements:
 * - Constrained Linear Regression (β₁ ≤ 0 to ensure depreciation)
 * - IQR Outlier Filtering (remove prices outside 1.5×IQR range)
 * - Automatic Radius Expansion (if insufficient comps)
 * - Quality Assurance: β₁ ≤ 0, R² > 0.3, clean data logging
 */

import { SimpleLinearRegression } from "ml-regression-simple-linear";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
}

export interface ComparableListing {
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  vin: string;
  title_status?: string;
  is_accidental?: number;
  dealer_name?: string;
  dealer_city?: string;
  dealer_state?: string;
  dealer_zip?: string;
  [key: string]: any;
}

export interface RegressionResult {
  slope: number; // β₁ (price per mile)
  intercept: number; // β₀ (base price)
  rSquared: number;
  predictedValue: number;
  compsUsed: number;
  isValid: boolean;
  validationDetails: string;
}

export interface ValuationResult {
  preAccidentValue: number;
  postAccidentValue: number;
  diminishedValue: number;
  diminishedPercentage: number;
  isWithinRange: boolean; // 15-25% of pre-accident value
  preAccidentDetails: RegressionResult;
  postAccidentDetails: RegressionResult;
  qualityScore: number; // 0-100
}

export interface CleaningResult {
  originalCount: number;
  afterRemovingDuplicates: number;
  afterRemovingInvalid: number;
  afterRemovingOutliers: number;
  removedOutliersDetails: {
    q1: number;
    q3: number;
    iqr: number;
    lowerBound: number;
    upperBound: number;
  };
}

// ============================================================================
// DATA CLEANSING UTILITIES
// ============================================================================

/**
 * Remove duplicate listings based on VIN
 */
export function removeDuplicates(
  listings: ComparableListing[]
): ComparableListing[] {
  const seen = new Map<string, ComparableListing>();

  listings.forEach((listing) => {
    if (listing.vin && !seen.has(listing.vin)) {
      seen.set(listing.vin, listing);
    }
  });

  return Array.from(seen.values());
}

/**
 * Remove listings with invalid prices (0, null, undefined, or "call for price")
 */
export function removeInvalidPrices(
  listings: ComparableListing[]
): ComparableListing[] {
  return listings.filter((listing) => {
    const price = listing.price;

    // Remove if price is 0, null, undefined
    if (!price || price === 0) return false;

    // Remove if price is not a valid number
    if (typeof price !== "number" || isNaN(price)) return false;

    return true;
  });
}

/**
 * Calculate Q1, Q3, and IQR for outlier detection
 */
function calculateQuartiles(prices: number[]): {
  q1: number;
  q3: number;
  iqr: number;
  lowerBound: number;
  upperBound: number;
} {
  const sorted = [...prices].sort((a, b) => a - b);
  const n = sorted.length;

  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);

  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return { q1, q3, iqr, lowerBound, upperBound };
}

/**
 * Remove outliers using IQR method (1.5×IQR range)
 */
export function removeOutliers(listings: ComparableListing[]): {
  cleaned: ComparableListing[];
  details: ReturnType<typeof calculateQuartiles>;
} {
  if (listings.length === 0) {
    return {
      cleaned: [],
      details: { q1: 0, q3: 0, iqr: 0, lowerBound: 0, upperBound: 0 },
    };
  }

  const prices = listings.map((l) => l.price);
  const quartiles = calculateQuartiles(prices);

  const cleaned = listings.filter(
    (listing) =>
      listing.price >= quartiles.lowerBound &&
      listing.price <= quartiles.upperBound
  );

  return { cleaned, details: quartiles };
}

/**
 * Comprehensive data cleaning pipeline
 */
export function cleanListings(listings: ComparableListing[]): {
  cleaned: ComparableListing[];
  report: CleaningResult;
} {
  const originalCount = listings.length;

  // Step 1: Remove duplicates
  let cleaned = removeDuplicates(listings);
  const afterDuplicates = cleaned.length;

  // Step 2: Remove invalid prices
  cleaned = removeInvalidPrices(cleaned);
  const afterInvalid = cleaned.length;

  // Step 3: Remove outliers (IQR method)
  const { cleaned: afterOutliers, details } = removeOutliers(cleaned);
  const afterOutliersCount = afterOutliers.length;

  return {
    cleaned: afterOutliers,
    report: {
      originalCount,
      afterRemovingDuplicates: afterDuplicates,
      afterRemovingInvalid: afterInvalid,
      afterRemovingOutliers: afterOutliersCount,
      removedOutliersDetails: details,
    },
  };
}

// ============================================================================
// CONSTRAINED LINEAR REGRESSION
// ============================================================================

/**
 * Calculate simple linear regression with constraint β₁ ≤ 0
 * If slope is positive, auto-trim anomalies and retry
 */
export function calculateConstrainedRegression(
  mileages: number[],
  prices: number[],
  subjectMileage: number,
  maxRetries = 3
): RegressionResult {
  if (mileages.length < 3) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      predictedValue: 0,
      compsUsed: mileages.length,
      isValid: false,
      validationDetails: `Insufficient comparables: ${mileages.length} < 3`,
    };
  }

  let currentMileages = [...mileages];
  let currentPrices = [...prices];
  let retryCount = 0;

  while (retryCount < maxRetries) {
    // Perform regression
    const regression = new SimpleLinearRegression(
      currentMileages,
      currentPrices
    );
    const slope = regression.slope;
    const intercept = regression.intercept;

    // Check if slope is valid (depreciation: β₁ ≤ 0)
    if (slope <= 0) {
      const predictedValue = intercept + slope * subjectMileage;
      const rSquared = calculateRSquared(
        currentMileages,
        currentPrices,
        intercept,
        slope
      );

      const isValid = rSquared > 0.3 && currentMileages.length >= 3;
      const validationDetails = isValid
        ? `Valid regression: R² = ${rSquared.toFixed(
            3
          )}, slope = ${slope.toFixed(4)}`
        : `Warning: R² = ${rSquared.toFixed(3)} (threshold: 0.3)`;

      return {
        slope,
        intercept,
        rSquared,
        predictedValue,
        compsUsed: currentMileages.length,
        isValid,
        validationDetails,
      };
    }

    // Slope is positive (invalid) - trim high-mileage/high-price or low-mileage/low-price anomalies
    const indices = currentMileages.map((_, i) => i);
    const zScores = indices.map((i) => ({
      index: i,
      mileage: currentMileages[i],
      price: currentPrices[i],
      mileageZ: Math.abs(
        (currentMileages[i] - mean(currentMileages)) / stdDev(currentMileages)
      ),
      priceZ: Math.abs(
        (currentPrices[i] - mean(currentPrices)) / stdDev(currentPrices)
      ),
    }));

    // Remove the point with highest combined z-score
    const maxZIndex = zScores.reduce((maxIdx, current, idx) => {
      const maxZ = zScores[maxIdx].mileageZ + zScores[maxIdx].priceZ;
      const currentZ = current.mileageZ + current.priceZ;
      return currentZ > maxZ ? idx : maxIdx;
    }, 0);

    currentMileages.splice(maxZIndex, 1);
    currentPrices.splice(maxZIndex, 1);
    retryCount++;

    if (currentMileages.length < 3) {
      return {
        slope: 0,
        intercept: 0,
        rSquared: 0,
        predictedValue: 0,
        compsUsed: 0,
        isValid: false,
        validationDetails: `Failed to find valid regression after ${maxRetries} retries`,
      };
    }
  }

  return {
    slope: 0,
    intercept: 0,
    rSquared: 0,
    predictedValue: 0,
    compsUsed: currentMileages.length,
    isValid: false,
    validationDetails: `Max retries (${maxRetries}) exceeded - positive slope persists`,
  };
}

/**
 * Calculate R² (coefficient of determination)
 */
function calculateRSquared(
  mileages: number[],
  prices: number[],
  intercept: number,
  slope: number
): number {
  const n = mileages.length;
  const meanPrice = mean(prices);

  const ssRes = mileages.reduce((sum, m, i) => {
    const predicted = intercept + slope * m;
    return sum + Math.pow(prices[i] - predicted, 2);
  }, 0);

  const ssTot = prices.reduce((sum, p) => sum + Math.pow(p - meanPrice, 2), 0);

  if (ssTot === 0) return 0;
  return 1 - ssRes / ssTot;
}

/**
 * Calculate mean of array
 */
function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculate standard deviation
 */
function stdDev(values: number[]): number {
  const avg = mean(values);
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) /
    values.length;
  return Math.sqrt(variance);
}

// ============================================================================
// COMPARABLE VEHICLE MATCHING
// ============================================================================

/**
 * Match comparable vehicles (with flexibility for insufficient data)
 */
export function findComparableListings(
  listings: ComparableListing[],
  subject: Vehicle,
  options: {
    strict?: boolean; // If true, enforce trim matching
    mileageTolerance?: number;
  } = {}
): ComparableListing[] {
  const { strict = true, mileageTolerance = 15000 } = options;

  let candidates = listings.filter((listing) => {
    // Must match year, make, model
    if (
      listing.year !== subject.year ||
      listing.make.toLowerCase() !== subject.make.toLowerCase() ||
      listing.model.toLowerCase() !== subject.model.toLowerCase()
    ) {
      return false;
    }

    // Trim matching (can be relaxed if insufficient data)
    if (
      strict &&
      listing.trim &&
      listing.trim.toLowerCase() !== subject.trim.toLowerCase()
    ) {
      return false;
    }

    // Mileage tolerance
    if (
      listing.mileage < subject.mileage - mileageTolerance ||
      listing.mileage > subject.mileage + mileageTolerance
    ) {
      return false;
    }

    return true;
  });

  // If insufficient candidates and strict mode, relax trim requirement
  if (strict && candidates.length < 3) {
    candidates = listings.filter((listing) => {
      if (
        listing.year !== subject.year ||
        listing.make.toLowerCase() !== subject.make.toLowerCase() ||
        listing.model.toLowerCase() !== subject.model.toLowerCase()
      ) {
        return false;
      }

      if (
        listing.mileage < subject.mileage - mileageTolerance ||
        listing.mileage > subject.mileage + mileageTolerance
      ) {
        return false;
      }

      return true;
    });
  }

  return candidates;
}

// ============================================================================
// RADIUS EXPANSION LOGIC
// ============================================================================

/**
 * Expand search radius iteratively if insufficient comparables
 */
export async function expandRadiusForComparables(
  fetchFunction: (radius: number) => Promise<ComparableListing[]>,
  initialRadius: number,
  options: {
    minComps?: number;
    radiusIncrement?: number;
    maxRadius?: number;
  } = {}
): Promise<{
  listings: ComparableListing[];
  radiusUsed: number;
  attempts: number;
}> {
  const { minComps = 5, radiusIncrement = 50, maxRadius = 500 } = options;

  let currentRadius = initialRadius;
  let attempts = 0;

  while (currentRadius <= maxRadius) {
    attempts++;
    const listings = await fetchFunction(currentRadius);

    if (listings.length >= minComps) {
      return { listings, radiusUsed: currentRadius, attempts };
    }

    currentRadius += radiusIncrement;
  }

  // Return what we have even if below minimum
  const listings = await fetchFunction(maxRadius);
  return { listings, radiusUsed: maxRadius, attempts };
}

// ============================================================================
// MAIN VALUATION ENGINE
// ============================================================================

/**
 * Calculate pre-accident value using comparable clean vehicles
 */
export async function calculatePreAccidentValue(
  subject: Vehicle,
  cleanListingsData: ComparableListing[]
): Promise<{
  value: number;
  regression: RegressionResult;
  compsUsed: ComparableListing[];
}> {
  // Clean the data
  const { cleaned, report } = cleanListings(cleanListingsData);

  // Find comparables
  let comparables = findComparableListings(cleaned, subject, { strict: true });

  // If insufficient, relax trim requirement
  if (comparables.length < 3) {
    comparables = findComparableListings(cleaned, subject, { strict: false });
  }

  // Prepare data for regression
  const mileages = comparables.map((c) => c.mileage);
  const prices = comparables.map((c) => c.price);

  // Calculate regression
  const regression = calculateConstrainedRegression(
    mileages,
    prices,
    subject.mileage
  );

  return {
    value: regression.predictedValue,
    regression,
    compsUsed: comparables,
  };
}

/**
 * Calculate post-accident value using comparable vehicles with accident history
 */
export async function calculatePostAccidentValue(
  subject: Vehicle,
  damagedListingsData: ComparableListing[]
): Promise<{
  value: number;
  regression: RegressionResult;
  compsUsed: ComparableListing[];
}> {
  // Clean the data
  const { cleaned, report } = cleanListings(damagedListingsData);

  // Find comparables with accident history
  let comparables = findComparableListings(cleaned, subject, { strict: true });

  // If insufficient, relax trim requirement
  if (comparables.length < 3) {
    comparables = findComparableListings(cleaned, subject, { strict: false });
  }

  // Prepare data for regression
  const mileages = comparables.map((c) => c.mileage);
  const prices = comparables.map((c) => c.price);

  // Calculate regression
  const regression = calculateConstrainedRegression(
    mileages,
    prices,
    subject.mileage
  );

  return {
    value: regression.predictedValue,
    regression,
    compsUsed: comparables,
  };
}

/**
 * Main Diminished Value Calculation Engine
 */
export async function calculateDiminishedValue(
  subject: Vehicle,
  cleanListings: ComparableListing[],
  damagedListings: ComparableListing[]
): Promise<ValuationResult> {
  // Step 1: Calculate pre-accident value
  const preAccident = await calculatePreAccidentValue(subject, cleanListings);

  // Step 2: Calculate post-accident value
  const postAccident = await calculatePostAccidentValue(
    subject,
    damagedListings
  );

  // Step 3: Calculate diminished value
  const diminishedValue = preAccident.value - postAccident.value;
  const diminishedPercentage =
    preAccident.value > 0 ? (diminishedValue / preAccident.value) * 100 : 0;

  // Step 4: Validate DV falls within expected range (15-25%)
  const isWithinRange =
    diminishedPercentage >= 15 && diminishedPercentage <= 25;

  // Step 5: Calculate quality score
  const qualityScore = calculateQualityScore(
    preAccident.regression,
    postAccident.regression,
    isWithinRange
  );

  return {
    preAccidentValue: preAccident.value,
    postAccidentValue: postAccident.value,
    diminishedValue,
    diminishedPercentage,
    isWithinRange,
    preAccidentDetails: preAccident.regression,
    postAccidentDetails: postAccident.regression,
    qualityScore,
  };
}

/**
 * Calculate quality score (0-100)
 * Based on: slope validity (β₁ ≤ 0), R² > 0.3, DV range (15-25%)
 */
function calculateQualityScore(
  preRegression: RegressionResult,
  postRegression: RegressionResult,
  isWithinDVRange: boolean
): number {
  let score = 100;

  // Pre-accident validation
  if (!preRegression.isValid) {
    score -= 30;
  }
  if (preRegression.slope > 0) {
    score -= 15;
  }
  if (preRegression.rSquared <= 0.3) {
    score -= 10;
  }
  if (preRegression.compsUsed < 3) {
    score -= 20;
  }

  // Post-accident validation
  if (!postRegression.isValid) {
    score -= 30;
  }
  if (postRegression.slope > 0) {
    score -= 15;
  }
  if (postRegression.rSquared <= 0.3) {
    score -= 10;
  }
  if (postRegression.compsUsed < 3) {
    score -= 20;
  }

  // DV range validation
  if (!isWithinDVRange) {
    score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate detailed quality assurance report
 */
export function generateQAReport(result: ValuationResult): string {
  const lines: string[] = [];

  lines.push("=== DIMINISHED VALUE ENGINE - QA REPORT ===\n");

  // Pre-Accident Analysis
  lines.push("PRE-ACCIDENT VALUATION:");
  lines.push(`  Value: $${result.preAccidentValue.toFixed(2)}`);
  lines.push(`  Comps Used: ${result.preAccidentDetails.compsUsed}`);
  lines.push(`  Slope (β₁): ${result.preAccidentDetails.slope.toFixed(6)}`);
  lines.push(`  R²: ${result.preAccidentDetails.rSquared.toFixed(4)}`);
  lines.push(`  Valid: ${result.preAccidentDetails.isValid ? "✓" : "✗"}`);
  lines.push(`  Details: ${result.preAccidentDetails.validationDetails}\n`);

  // Post-Accident Analysis
  lines.push("POST-ACCIDENT VALUATION:");
  lines.push(`  Value: $${result.postAccidentValue.toFixed(2)}`);
  lines.push(`  Comps Used: ${result.postAccidentDetails.compsUsed}`);
  lines.push(`  Slope (β₁): ${result.postAccidentDetails.slope.toFixed(6)}`);
  lines.push(`  R²: ${result.postAccidentDetails.rSquared.toFixed(4)}`);
  lines.push(`  Valid: ${result.postAccidentDetails.isValid ? "✓" : "✗"}`);
  lines.push(`  Details: ${result.postAccidentDetails.validationDetails}\n`);

  // Diminished Value Analysis
  lines.push("DIMINISHED VALUE:");
  lines.push(`  Absolute: $${result.diminishedValue.toFixed(2)}`);
  lines.push(`  Percentage: ${result.diminishedPercentage.toFixed(2)}%`);
  lines.push(`  Within Range (15-25%): ${result.isWithinRange ? "✓" : "✗"}\n`);

  // Quality Score
  lines.push("QUALITY ASSURANCE:");
  lines.push(`  Overall Score: ${result.qualityScore}/100`);
  lines.push(
    `  Status: ${
      result.qualityScore >= 75
        ? "✓ APPROVED"
        : result.qualityScore >= 50
        ? "⚠ CAUTION"
        : "✗ REJECTED"
    }`
  );

  return lines.join("\n");
}
