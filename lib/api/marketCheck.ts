interface VehicleDetails {
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  zip: string;
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
  price_range?: string;
  min_miles?: number;
  max_miles?: number;
  isAccident?: number;
}

// export async function fetchListings({
//   api_key,
//   year,
//   model,
//   make,
//   zip,
//   trim,
//   radius,
//   history,
//   rows,
//   title_status,
//   sort_by,
//   sort_order,
//   start,
//   state,
//   min_miles,
//   max_miles,
//   accident,
//   price_range,
//   isAccident,
// }: ListingParamsExpanded) {
//   if (!api_key) {
//     throw new Error("MarketCheck API key not configured");
//   }

// //   const baseUrl = "https://mc-api.marketcheck.com/v2/search/car/recents";
//   const baseUrl = "https://rcv.btkdeals.com/api/fetchSimilarCars.php";

//   // Create URL with parameters
//   const url = new URL(baseUrl);
// //   url.searchParams.append("api_key", api_key);
// url.searchParams.append("make", make as string);
// url.searchParams.append("model", model as string);
//   url.searchParams.append("year", year as string);
//   url.searchParams.append("is_accident", String(isAccident));
// //   url.searchParams.append("state", state as string);
// //   url.searchParams.append("min_miles", String(min_miles));
// //   url.searchParams.append("max_miles", String(max_miles));
// //   url.searchParams.append("accident", accident as string);
// //   url.searchParams.append("listing_type", "used");
// //   if (trim) {
// //     url.searchParams.append("trim", trim as string);
// //   }
// //   if (sort_by) {
// //     url.searchParams.append("sort_by", sort_by);
// //   }
// //   url.searchParams.append("facet_fields", "miles");
// //   url.searchParams.append("stats_fields", "miles");
// //   // Add mileage filters only if both are provided and valid
// //   if (typeof min_miles === "number" && min_miles >= 0) {
// //     url.searchParams.append("min_miles", min_miles.toString());
// //   }

// //   if (typeof max_miles === "number" && max_miles > 0) {
// //     // Some APIs require max_miles > min_miles
// //     if (typeof min_miles === "number" && max_miles <= min_miles) {
// //       console.warn("max_miles should be greater than min_miles");
// //     } else {
// //       url.searchParams.append("max_miles", max_miles.toString());
// //     }
// //   }
// console.log({url, us: url.toString()})
//   try {
//     const response = await fetch(url.toString());
//     const data = await response.json();

//     console.log({data})
//     if (!data) throw new Error("Failed to fetch vehicle listings");

//     // return data;
//   } catch (error) {
//     console.error("MarketCheck API error:", error);
//     throw error;
//   }
// }

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
  price_range,
  isAccident,
}: ListingParamsExpanded) {
  if (!api_key) {
    throw new Error('MarketCheck API key not configured');
  }
  // https://rcv.btkdeals.com/api/fetchSimilarCars.php?Make=Tesla&Model=Model%20Y&Year=2022&isAccidental=1&min_mileage=10000&max_mileage=50000&limit=10&sort=price&order=desc

  const baseUrl = 'https://rcv.btkdeals.com/api/fetchSimilarCars.php';
  //   const baseUrl = "https://rcv.btkdeals.com/api/fetchSimilarCars.php?make=Tesla&model=Model%20Y&year_from=2020&year_to=2026&is_accidental=1";
  //   const baseUrl = "https://rcv.btkdeals.com/api/fetchSimilarCars.php?Make=Tesla&Model=Model%20Y&YearFrom=2022&YearTo=2022&isAccidental=1";
  const url = new URL(baseUrl);

  url.searchParams.append('make', make as string);
  url.searchParams.append('model', model as string);
  url.searchParams.append('year', year as string);
  url.searchParams.append('is_accidental', String(isAccident));
  url.searchParams.append('min_mileage', String(min_miles));
  url.searchParams.append('max_mileage', String(max_miles));
  url.searchParams.append('limit', '10');
  url.searchParams.append('sort', 'price');
  url.searchParams.append('order', String(sort_order));

  console.log({ url: url.toString() });

  try {
    const response = await fetch(url.toString());

    // // Check if response is OK (status 200-299)
    // if (!response.ok) {
    //   const errorText = await response.json();
    // //   throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    // }

    // // Check content type to ensure it's JSON
    // const contentType = response.headers.get('content-type');
    // if (!contentType || !contentType.includes('application/json')) {
    //   const body = await response.text();
    //   console.error('Received non-JSON response:', body.substring(0, 200));
    //   throw new Error('Server returned non-JSON response');
    // }

    const data = await response.json();
    // console.log({data});

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
