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

interface ListingParamsExpanded {
  api_key: string | null;
  year: string | null;
  model: string | null;
  make: string | null;
  zip: string | null;
  radius: string | null;
  history?: string | null;
  title_status?: string | null;
  sort_by?: string;
  sort_order?: string;
  rows: string | null;
  start: string;
  trim?: string;
  state?: string;
  accident?: string;
  min_miles?: number;
  max_miles?: number;
}

export async function fetchListings({
  api_key,
  year,
  model,
  make,
  zip,
  trim,
  radius,
  history,
  rows,
  title_status,
  sort_by,
  sort_order,
  start,
  state,
  min_miles,
  max_miles,
  accident,
}: ListingParamsExpanded) {
  if (!api_key) {
    throw new Error('MarketCheck API key not configured');
  }

  // Construct API URL
  //   const baseUrl = "https://mc-api.marketcheck.com/v2/search/car/recents";
  const baseUrl = 'https://mc-api.marketcheck.com/v2/search/car/active';

  // Create URL with parameters
  const url = new URL(baseUrl);
  url.searchParams.append('api_key', api_key);
  url.searchParams.append('year', year as string);
  url.searchParams.append('model', model as string);
  url.searchParams.append('make', make as string);
  //   url.searchParams.append("zip", "32771");
  //   url.searchParams.append("zip", zip as string);
  //   url.searchParams.append("state", state as string);
  url.searchParams.append('state', state as string);
  //   url.searchParams.append("state", "CA");
  url.searchParams.append('min_miles', String(min_miles));
  url.searchParams.append('max_miles', String(max_miles));
  //   url.searchParams.append("radius", radius as string);
  //   url.searchParams.append("title_status", "clean");
  url.searchParams.append('accident', accident as string);
  url.searchParams.append('listing_type', "used");
  //   if (trim) {
  //       url.searchParams.append("trim", trim as string);
  //   }
  //   console.log({ history });
  //   if (history) {
  //     url.searchParams.append("history", history as string);
  //   }
  //   if (title_status) {
  //     url.searchParams.append("title_status", title_status);
  //   }
  //   url.searchParams.append("rows", rows as string);
  if (sort_by) {
    url.searchParams.append('sort_by', sort_by);
  }
  if (sort_order) {
    url.searchParams.append('sort_order', sort_order);
  }
  //   if (start) {
  //     url.searchParams.append("start", start);
  //   }
  console.log(url.toString());

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!data) throw new Error('Failed to fetch vehicle listings');

    return data;
  } catch (error) {
    console.error('MarketCheck API error:', error);
    throw error;
  }
}

export async function fetchVinHistory({
  vin,
  order = 'desc',
  page = 1,
}: {
  vin: string;
  order?: 'asc' | 'desc';
  page?: number;
}) {
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
  url.searchParams.append('page', (page || '').toString());

  try {
    const response = await fetch(url.toString());

    const data = await response.json();

    // console.log("i am from all data ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥", data);

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(
    //     errorData.error_message || "Failed to fetch vehicle vin history"
    //   );
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    console.error('MarketCheck API error:', error);
    throw error;
  }
}

export async function fetchCleanListings(
  vehicleDetails: VehicleDetails,
  radius: number = 50
) {
  return fetchListings({
    vehicleDetails,
    history: 'clean',
    radius,
    rows: 10,
  });
}

export async function fetchDamagedListings(
  vehicleDetails: VehicleDetails,
  radius: number = 100
) {
  return fetchListings({
    vehicleDetails,
    titleStatus: 'salvage,rebuild',
    radius,
    rows: 10,
  });
}
