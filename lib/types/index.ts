// lib/types/index.ts

// Vehicle Information Types
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

// API Response Types
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

// Form State Types
export interface VehicleFormState {
  identificationType: 'licensePlate' | 'manual';
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