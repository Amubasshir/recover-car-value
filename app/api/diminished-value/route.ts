// app/api/diminished-value/route.ts

import { fetchListings } from "@/lib/api/marketCheck";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Constants for radius settings
// const BASE_CLEAN_RADIUS = parseInt(process.env.BASE_CLEAN_RADIUS || '50', 10);
const BASE_CLEAN_RADIUS = 100;
const TITLE_STATUS = "salvage|rebuild";
const HISTORY = "clean";
const SORT_BY = "price";
const SORT_ORDER_DESC = "desc";
const SORT_ORDER_ASC = "asc";
const api_key = process.env.MARKETCHECK_API_KEY as string;
const BASE_DAMAGED_RADIUS = parseInt(
  process.env.BASE_DAMAGED_RADIUS || "100",
  10
);
const RADIUS_INCREMENT = parseInt(process.env.RADIUS_INCREMENT || "50", 10);
const MAX_RADIUS = parseInt(process.env.MAX_RADIUS || "200", 10);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    //   const { year, make, model, trim, accidentMileage, accidentZip, repairCost, accidentDate, vin, order, page } = req.query;
    // const { searchParams } = new URL(req.url);
    const {
      year,
      make,
      model,
      trim,
      accidentMileage,
      accidentZip,
      repairCost,
      accidentDate,
      vin,
      order,
      page,
      zip,
      client_info,
      qualify_answers,
      heading,
      state,
      mileage,
    } = body;

    console.log({ mileage });

    // const min_miles = Number(mileage) - 10000;
    // const max_miles = Number(mileage) + 10000;

    const min_miles = 10001 - 10000;
    const max_miles = 10001 + 10000;

    // const vinHistoryData = await fetchVinHistory({ vin, order, page });

    const cleanListingsData = await fetchListings({
      api_key,
      year,
      model,
      make,
      zip,
      trim,
      radius: String(BASE_CLEAN_RADIUS),
      history: HISTORY,
      rows: String(5),
      sort_order: SORT_ORDER_DESC,
      sort_by: SORT_BY,
      start: "0",
      state,
      min_miles,
      max_miles,
      accident: "false",
    });
    // console.log("sorted 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨", cleanListingsData)
    if (cleanListingsData?.num_found < 1) {
      return NextResponse.json(
        { error: "No data found. Please try with valid information." },
        { status: 400 }
      );
    }

    const damagedListingsData = await fetchListings({
      api_key,
      year,
      model,
      make,
      zip,
      trim,
      radius: String(BASE_CLEAN_RADIUS),
      title_status: TITLE_STATUS,
      sort_order: SORT_ORDER_DESC, // asc should be
      sort_by: SORT_BY,
      rows: String(10),
      start: String(cleanListingsData?.num_found - 20),
      state,
      min_miles,
      max_miles,
      accident: "true",
    });
    // Input validation
    // console.log("clean", damagedListingsData)
    if (!damagedListingsData?.listings?.length) {
      return NextResponse.json(
        { error: "Damaged data retrieving failed!" },
        { status: 400 }
      );
    }

    // // Fetch clean and damaged listings with dynamic radius expansion
    // const { listings: cleanListings, radius: cleanRadius } = await fetchListingsWithRadiusExpansion(
    //     () => fetchCleanListings(vehicleDetails),
    //     BASE_CLEAN_RADIUS
    // );

    // const { listings: damagedListings, radius: damagedRadius } = await fetchListingsWithRadiusExpansion(
    //   () => fetchDamagedListings(vehicleDetails),
    //   BASE_DAMAGED_RADIUS
    // );

    // // Process listings and calculate values
    const topCleanListings = selectAndCleanListings(
      cleanListingsData.listings,
      "clean",
      5
    );
    const bottomDamagedListings = selectAndCleanListings(
      damagedListingsData.listings,
      "damaged",
      5
    );

    // // Calculate averages
    const avgCleanPrice = calculateAverage(
      topCleanListings.map((listing) => listing.price)
    );
    const avgDamagedPrice = calculateAverage(
      bottomDamagedListings.map((listing) => listing.price)
    );

    // // Calculate diminished value
    const diminishedValue =
      avgCleanPrice && avgDamagedPrice
        ? Math.round((avgCleanPrice - avgDamagedPrice) * 100) / 100
        : 0;

    // // Build response
    const result = {
      // vehicle_info_input: {
      year: Number(year),
      make,
      model,
      trim,
      accident_mileage: accidentMileage,
      //   accident_zip: "accidentZip",
      //   accident_zip: "45646",
      //   repair_cost: repairCost,
      accident_date: accidentDate,
      heading: heading,
      dealer_name: "",

      //   },
      //   search_parameters: {
      //     clean_radius_used_miles: cleanRadius,
      //     damaged_radius_used_miles: damagedRadius,
      //     mileage_range_searched: `${accidentMileage - 10000}-${accidentMileage + 10000}`,
      //   },
      // valuation: {
      average_clean_price_top5: avgCleanPrice,
      average_damaged_price_bottom5: avgDamagedPrice,
      estimated_diminished_value: diminishedValue,
      // repair_cost: repairCost,
      // },
      // comps_data: {
      top_clean_listings: topCleanListings,
      bottom_damaged_listings: bottomDamagedListings,
      client_info,
      qualify_answers,
      // },

      //   comps_found_summary: {
      //         number_of_clean_listings: cleanListings.length,
      //         number_of_damaged_listings: damagedListings.length,
      //       }
    };

    console.log({ result });

    let queries = await supabase
      .from("diminished_car_value")
      .insert(result)
      .select("*")
      .single();

    if (queries.error) {
      console.error("Error inserting data into Supabase:", queries.error);
      return NextResponse.json(
        { error: "Failed to proceed!" },
        { status: 500 }
      );
    }

    return NextResponse.json(queries);
  } catch (error) {
    console.error("Diminished value calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate diminished value" },
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
      console.error("Error fetching listings:", error);
      break;
    }
  }

  return { listings, radius };
}

// Helper function to clean and select top/bottom listings
function selectAndCleanListings(
  listings: any[],
  type: "clean" | "damaged",
  count: number
) {
  // Filter out listings without prices
  //   console.log({listings});
  const validListings = listings?.filter((car) => car?.price) || [];
  //   console.log(validListings);

  // Sort by price (descending for clean, ascending for damaged)
  const sortedListings = [...validListings].sort((a, b) => {
    return type === "clean"
      ? b.price - a.price // Descending for clean (top prices)
      : a.price - b.price; // Ascending for damaged (bottom prices)
  });

  //   console.log("sorted 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨", sortedListings, sortedListings.length)

  // Take the requested number of listings
  const selectedListings = sortedListings.slice(0, count);

  // Clean and transform the data
  return selectedListings.map((car) => ({
    year: car.build.year,
    make: car.build.make,
    model: car.build.model,
    trim: car.build.trim,
    price: car.price,
    miles: car.miles,
    vin: car.vin,
    exterior_color: car.exterior_color,
    drivetrain: car.build.drivetrain,
    transmission: car.build.transmission,
    title_status: car.title_status,
    dealer_name: car.dealer?.name,
    dealer_city: car.dealer?.city,
    dealer_state: car.dealer?.state,
    dealer_zip: car.dealer?.zip,
    first_seen_at_source_date: car?.first_seen_at_source_date,
  }));
}

// Helper function to calculate average
function calculateAverage(values: number[]): number {
  if (!values.length) return 0;
  const sum = values.reduce((total, val) => total + val, 0);
  return Math.round((sum / values.length) * 100) / 100;
}
