// app/api/diminished-value/route.ts

import { fetchListings } from "@/lib/api/marketCheck";
import { supabase } from "@/lib/supabase";
import { calculateDiminishedPercentValue } from "@/lib/utils/calculateDiminishedPercentValue";
import { NextResponse } from "next/server";

const BASE_CLEAN_RADIUS = 100;
const TITLE_STATUS = "salvage|rebuild";
const SORT_BY = "miles";
const SORT_ORDER_DESC = "desc";
const SORT_ORDER_ASC = "asc";
const api_key = process.env.MARKETCHECK_API_KEY as string;
const RADIUS_INCREMENT = parseInt(process.env.RADIUS_INCREMENT || "50", 10);
const MAX_RADIUS = parseInt(process.env.MAX_RADIUS || "200", 10);

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    let min_miles = Number(mileage) - 10000;
    let max_miles = Number(mileage) + 10000;

    if (min_miles < 3000) {
      min_miles = 3000;
      max_miles = 3000 + 10000;
    }


    const cleanListingsData = await fetchListings({
      api_key,
      year,
      model,
      make,
      zip,
      trim,
      radius: String(BASE_CLEAN_RADIUS),
      rows: String(5),
      sort_order: SORT_ORDER_DESC,
      sort_by: SORT_BY,
      start: "0",
      state,
      min_miles,
      max_miles,
      accident: "false",
      isAccident: 0,
    });

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
      //   trim,
      radius: String(BASE_CLEAN_RADIUS),
      title_status: TITLE_STATUS,
      sort_order: SORT_ORDER_ASC, // asc should be
      sort_by: SORT_BY,
      rows: String(10),
      start: String(cleanListingsData?.num_found - 20),
      state,
      min_miles,
      max_miles,
      accident: "true",
      price_range: "1-9999999",
      isAccident: 1,
    });

    // Input validation
    if (!damagedListingsData?.cars?.length) {
        return NextResponse.json(
            { error: "Damaged data retrieving failed!" },
            { status: 400 }
        );
    }

    //  console.log("damaged data ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥", cleanListingsData, damagedListingsData);
    
    
    // Process listings and calculate values
    // const topCleanListings = selectAndCleanListings(
    //     cleanListingsData.listings,
    //     "clean",
    //     5
    // );
    // const bottomDamagedListings = selectAndCleanListings(
    //     damagedListingsData.listings,
    //     "damaged",
    //   5
    // );
    // const topCleanListings = selectAndCleanListings(
    //     cleanListingsData?.cars?.slice(0, 10),
    //     "clean",
    //     5
    // );
    // const bottomDamagedListings = selectAndCleanListings(
    //     damagedListingsData?.cars?.slice(0, 10),
    //     "damaged",
    //   5
    // );

    // Calculate averages
    // const avgCleanPrice = calculateSum(
    //     topCleanListings.map((listing) => listing.price)
    // );
    // const avgDamagedPrice = calculateSum(
    //     bottomDamagedListings.map((listing) => listing.price)
    // );
    const avgCleanPrice = calculateSum(
          cleanListingsData?.cars?.map((listing) => listing?.price)
        );

        const avgDamagedPrice = calculateSum(
              damagedListingsData?.cars?.map((listing) => listing?.price)
            );
            
            // Calculate diminished value
            // const diminishedValue = calculateDiminishedPercentValue(
            //     Number(avgCleanPrice),
            //     Number(avgDamagedPrice)
            // );
            // const diminishedValue = calculateDiminishedPercentValue(
            //     cleanListingsData.cars,
            //     damagedListingsData.cars
            // );
            const diminishedValue = avgCleanPrice - avgDamagedPrice;
            
            // console.log("damaged data ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥", topCleanListings, bottomDamagedListings);


            // [{"year":"2019","make":"Toyota","model":"Tundra","trim":"","accident_mileage":"29383","accident_zip":null,"accident_date":"1981-02-01","average_clean_price_top5":"179124","average_damaged_price_bottom5":"179124","estimated_diminished_value":"26868.6","created_at":"2025-08-19 19:04:48.719722+00","heading":"2019 Toyota Tundra","dealer_name":""}]
    // Build response
    const result = {
      year: Number(year),
      make,
      model,
      trim,
      accident_mileage: accidentMileage,
      accident_date: accidentDate,
      heading: heading,
      dealer_name: "",
      average_clean_price_top5: avgCleanPrice?.toFixed(0),
      average_damaged_price_bottom5: avgDamagedPrice?.toFixed(0),
    //   estimated_diminished_value: diminishedValue.diminishedValue?.toFixed(0),
      estimated_diminished_value: diminishedValue?.toFixed(0),
    //   top_clean_listings: topCleanListings,
    //   bottom_damaged_listings: bottomDamagedListings,
      top_clean_listings: cleanListingsData?.cars,
      bottom_damaged_listings: damagedListingsData?.cars,
      client_info,
      qualify_answers,
    };

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
  const validListings = listings?.filter((car) => car?.price) || [];

  // Sort by price (descending for clean, ascending for damaged)
  const sortedListings = [...validListings].sort((a, b) => {
    return type === "clean"
      ? b.price - a.price // Descending for clean (top prices)
      : a.price - b.price; // Ascending for damaged (bottom prices)
  });

  // Take the requested number of listings
  const selectedListings = sortedListings.slice(0, count);

  // Clean and transform the data
  return selectedListings.map((car) => ({
    year: car.model_year,
    make: car.make,
    model: car.model_name,
    trim: car.trim,
    price: car.price,
    miles: car.mileage,
    vin: car.vin,
    // exterior_color: car.exterior_color,
    // drivetrain: car.build.drivetrain,
    // transmission: car.build.transmission,
    // title_status: car.title_status,
    dealer_name: car.seller_name,
    // dealer_city: car.dealer?.city,
    // dealer_state: car.dealer?.state,
    dealer_zip: car.seller_location,
    // first_seen_at_source_date: car?.first_seen_at_source_date,
  }));
}

// Helper function to calculate average
function calculateAverage(values: number[]): number {
  if (!values.length) return 0;
  const sum = values.reduce((total, val) => total + val, 0);
  return Math.round((sum / values.length) * 100) / 100;
}
function calculateSum(values: number[]): number {
  if (!values.length) return 0;
  const sum = values.reduce((total, val) => total + val, 0);
  return sum;
}
