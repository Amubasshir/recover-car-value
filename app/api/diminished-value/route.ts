// app/api/diminished-value/route.ts

import { NextResponse } from 'next/server';
import { fetchCleanListings, fetchDamagedListings } from '@/lib/api/marketCheck';

// Constants for radius settings
const BASE_CLEAN_RADIUS = parseInt(process.env.BASE_CLEAN_RADIUS || '50', 10);
const BASE_DAMAGED_RADIUS = parseInt(process.env.BASE_DAMAGED_RADIUS || '100', 10);
const RADIUS_INCREMENT = parseInt(process.env.RADIUS_INCREMENT || '50', 10);
const MAX_RADIUS = parseInt(process.env.MAX_RADIUS || '200', 10);

interface DiminishedValueRequest {
  year: number;
  make: string;
  model: string;
  trim: string;
  accidentMileage: number;
  accidentZip: string;
  repairCost: number;
  accidentDate: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as DiminishedValueRequest;
    const { year, make, model, trim, accidentMileage, accidentZip, repairCost, accidentDate } = body;
    
    // Input validation
    if (!year || !make || !model || !trim || !accidentMileage || !accidentZip || !repairCost || !accidentDate) {
      return NextResponse.json(
        { error: 'All vehicle and accident details are required' },
        { status: 400 }
      );
    }
    
    const vehicleDetails = {
      year,
      make,
      model,
      trim,
      mileage: accidentMileage,
      zip: accidentZip
    };
    
    // Fetch clean and damaged listings with dynamic radius expansion
    const { listings: cleanListings, radius: cleanRadius } = await fetchListingsWithRadiusExpansion(
      () => fetchCleanListings(vehicleDetails),
      BASE_CLEAN_RADIUS
    );
    
    const { listings: damagedListings, radius: damagedRadius } = await fetchListingsWithRadiusExpansion(
      () => fetchDamagedListings(vehicleDetails),
      BASE_DAMAGED_RADIUS
    );
    
    // Process listings and calculate values
    const topCleanListings = selectAndCleanListings(cleanListings, 'clean', 5);
    const bottomDamagedListings = selectAndCleanListings(damagedListings, 'damaged', 5);
    
    // Calculate averages
    const avgCleanPrice = calculateAverage(topCleanListings.map(listing => listing.price));
    const avgDamagedPrice = calculateAverage(bottomDamagedListings.map(listing => listing.price));
    
    // Calculate diminished value
    const diminishedValue = avgCleanPrice && avgDamagedPrice 
      ? Math.round((avgCleanPrice - avgDamagedPrice) * 100) / 100
      : 0;
    
    // Build response
    const result = {
      vehicle_info_input: {
        year,
        make,
        model,
        trim,
        accident_mileage: accidentMileage,
        accident_zip: accidentZip,
        repair_cost: repairCost,
        accident_date: accidentDate
      },
      search_parameters: {
        clean_radius_used_miles: cleanRadius,
        damaged_radius_used_miles: damagedRadius,
        mileage_range_searched: `${accidentMileage - 10000}-${accidentMileage + 10000}`,
      },
      valuation: {
        average_clean_price_top5: avgCleanPrice,
        average_damaged_price_bottom5: avgDamagedPrice,
        estimated_diminished_value: diminishedValue,
        repair_cost: repairCost
      },
      comps_data: {
        top_clean_listings: topCleanListings,
        bottom_damaged_listings: bottomDamagedListings
      },
      comps_found_summary: {
        number_of_clean_listings: cleanListings.length,
        number_of_damaged_listings: damagedListings.length,
      }
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Diminished value calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate diminished value' },
      { status: 500 }
    );
  }
}

// Helper function to fetch listings with automatic radius expansion
async function fetchListingsWithRadiusExpansion(
  fetchFunction: Function,
  baseRadius: number,
  minCount = 5
) {
  let radius = baseRadius;
  let listings = [];
  
  while (radius <= MAX_RADIUS) {
    try {
      const response = await fetchFunction(radius);
      listings = response.listings || [];
      
      if (listings.length >= minCount) {
        break;
      }
      
      radius += RADIUS_INCREMENT;
    } catch (error) {
      console.error('Error fetching listings:', error);
      break;
    }
  }
  
  return { listings, radius };
}

// Helper function to clean and select top/bottom listings
function selectAndCleanListings(listings: any[], type: 'clean' | 'damaged', count: number) {
  // Filter out listings without prices
  const validListings = listings.filter(car => car.price);
  
  // Sort by price (descending for clean, ascending for damaged)
  const sortedListings = [...validListings].sort((a, b) => {
    return type === 'clean' 
      ? b.price - a.price  // Descending for clean (top prices)
      : a.price - b.price; // Ascending for damaged (bottom prices)
  });
  
  // Take the requested number of listings
  const selectedListings = sortedListings.slice(0, count);
  
  // Clean and transform the data
  return selectedListings.map(car => ({
    year: car.year,
    make: car.make,
    model: car.model,
    trim: car.trim,
    price: car.price,
    miles: car.miles,
    vin: car.vin,
    exterior_color: car.exterior_color,
    drivetrain: car.drivetrain,
    transmission: car.transmission,
    title_status: car.title_status,
    dealer_name: car.dealer?.name,
    dealer_city: car.dealer?.city,
    dealer_state: car.dealer?.state,
    dealer_zip: car.dealer?.zip
  }));
}

// Helper function to calculate average
function calculateAverage(values: number[]): number {
  if (!values.length) return 0;
  const sum = values.reduce((total, val) => total + val, 0);
  return Math.round((sum / values.length) * 100) / 100;
}