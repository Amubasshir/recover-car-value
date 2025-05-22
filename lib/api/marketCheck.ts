// lib/api/marketCheck.ts

/**
 * MarketCheck API client for vehicle listings
 */

interface VehicleDetails {
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  zip: string;
}

interface ListingParams {
  vehicleDetails: VehicleDetails;
  titleStatus?: string;
  history?: string;
  radius?: number;
  rows?: number;
}


export async function fetchListings({
  vehicleDetails,
  titleStatus,
  history,
  radius = 50,
  rows = 10
}: ListingParams) {
  const apiKey = process.env.MARKETCHECK_API_KEY;
  
  if (!apiKey) {
    throw new Error('MarketCheck API key not configured');
  }

  const { year, make, model, trim, mileage, zip } = vehicleDetails;
  
  // Construct API URL
  const baseUrl = 'https://mc-api.marketcheck.com/v2/search/car/active';
  
//   https://api.marketcheck.com/v2/search/car/active?api_key=U6N8lDZRXuH8T7Yq5JyKwZ2l1xNnFojR&year=2019&make=Toyota&model=Tundra&trim=Limited CrewMax&miles_range=1500&zip=32771&radius=50
  // Create URL with parameters
  const url = new URL(baseUrl);
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('year', year.toString());
  url.searchParams.append('make', make);
  url.searchParams.append('model', model);
  url.searchParams.append('trim', trim);
  url.searchParams.append('miles_range', `${mileage - 10000},${mileage + 10000}`);
  url.searchParams.append('zip', zip);
  url.searchParams.append('radius', radius.toString());
  url.searchParams.append('rows', rows.toString());
  
  // Add optional parameters
  if (titleStatus) {
    url.searchParams.append('title_status', titleStatus);
  }
  
  if (history) {
    url.searchParams.append('history', history);
  }
  
  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_message || 'Failed to fetch vehicle listings');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('MarketCheck API error:', error);
    throw error;
  }
}

export async function fetchVinHistory({
  vin,
  order= 'desc',
  page = 1,
}: {vin: string, order?: 'asc' | 'desc', page?: number}) {
  const apiKey = process.env.MARKETCHECK_API_KEY;
  
  if (!apiKey) {
    throw new Error('MarketCheck API key not configured');
  }

  
  // Construct API URL
  const baseUrl = `https://mc-api.marketcheck.com/v2/history/car/${vin}?`;
  
  // Create URL with parameters
  const url = new URL(baseUrl);
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('sort_order', order);
  url.searchParams.append('page', (page||"").toString());
  
  
  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_message || 'Failed to fetch vehicle vin history');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('MarketCheck API error:', error);
    throw error;
  }
}

export async function fetchCleanListings(vehicleDetails: VehicleDetails, radius: number = 50) {
  return fetchListings({
    vehicleDetails,
    history: 'clean',
    radius,
    rows: 10
  });
}

export async function fetchDamagedListings(vehicleDetails: VehicleDetails, radius: number = 100) {
  return fetchListings({
    vehicleDetails,
    titleStatus: 'salvage,rebuild',
    radius,
    rows: 10
  });
}