// lib/types/index.ts

// ============================================================================
// VEHICLE INFORMATION TYPES
// ============================================================================

export interface VehicleInfo {
  vin?: string;
  year: number;
  make: string;
  model: string;
  trim: string;
}

export interface AccidentInfo {
  accidentDate: string;
  repairCost: number;
  accidentMileage: number;
  accidentZip: string;
}

export interface DiminishedValueParams extends VehicleInfo, AccidentInfo {}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface CleanedListing {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  miles: number;
  vin: string;
  exterior_color?: string;
  drivetrain?: string;
  transmission?: string;
  title_status?: string;
  dealer_name?: string;
  dealer_city?: string;
  dealer_state?: string;
  dealer_zip?: string;
}

/**
 * @deprecated Use ValuationResult from diminishedValueEngine instead
 */
export interface DiminishedValueResult {
  vehicle_info_input: {
    year: number;
    make: string;
    model: string;
    trim: string;
    accident_mileage: number;
    accident_zip: string;
    repair_cost: number;
    accident_date: string;
  };
  search_parameters: {
    clean_radius_used_miles: number;
    damaged_radius_used_miles: number;
    mileage_range_searched: string;
  };
  valuation: {
    average_clean_price_top5: number;
    average_damaged_price_bottom5: number;
    estimated_diminished_value: number;
    repair_cost: number;
  };
  comps_data: {
    top_clean_listings: CleanedListing[];
    bottom_damaged_listings: CleanedListing[];
  };
  comps_found_summary: {
    number_of_clean_listings: number;
    number_of_damaged_listings: number;
  };
}

/**
 * Enhanced Diminished Value API Response
 * Includes comprehensive valuation details and QA metrics
 */
export interface DiminishedValueAPIResponse {
  success: boolean;
  data: {
    // Vehicle identification
    year: number;
    make: string;
    model: string;
    trim: string;

    // Accident information
    accident_mileage: number;
    accident_date: string;
    accident_zip?: string;
    repair_cost?: number;

    // Valuation results
    average_clean_price_top5: number;
    average_damaged_price_bottom5: number;
    estimated_diminished_value: number;
    diminished_value_percentage: string;

    // Quality assurance metrics
    quality_score: number;
    is_within_dv_range: boolean;
    pre_accident_r_squared: string;
    post_accident_r_squared: string;
    pre_accident_slope: string;
    post_accident_slope: string;
    pre_accident_comps: number;
    post_accident_comps: number;

    // Search parameters
    clean_radius_used_miles: number;
    damaged_radius_used_miles: number;
    mileage_range_searched: string;

    // Comparable listings
    top_clean_listings: CleanedListing[];
    bottom_damaged_listings: CleanedListing[];

    // Additional metadata
    heading: string;
    dealer_name: string;
    qa_report: string;
    client_info?: any;
    qualify_answers?: any;
    selected_method?: string;
  };
  valuation: {
    preAccidentValue: number;
    postAccidentValue: number;
    diminishedValue: number;
    diminishedPercentage: number;
    qualityScore: number;
    isWithinRange: boolean;
  };
}

// ============================================================================
// REGRESSION AND VALUATION TYPES
// ============================================================================

export interface RegressionDetails {
  slope: number;
  intercept: number;
  rSquared: number;
  compsUsed: number;
  isValid: boolean;
}

export interface ValuationMetrics {
  preAccidentValue: number;
  postAccidentValue: number;
  diminishedValue: number;
  diminishedPercentage: number;
  isWithinRange: boolean; // 15-25% of pre-accident value
  qualityScore: number; // 0-100
}

// ============================================================================
// FORM STATE TYPES
// ============================================================================

export interface VehicleFormState {
  identificationType: "licensePlate" | "manual";
  licensePlate?: string;
  state?: string;
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
}

export interface FormState {
  vehicle: VehicleInfo;
  accident: AccidentInfo;
}
