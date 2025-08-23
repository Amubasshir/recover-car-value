// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   // Get filter parameters
//   const year = searchParams.get("year");
//   const make = searchParams.get("make");
//   const model = searchParams.get("model");
//   const trim = searchParams.get("trim");

//   // Start building the query
//   let query = supabase.from("cars_year_make_model_master_advanced").select("*");

//   // Add filters if they exist
//   if (year) {
//     query = query.eq("year", year);
//   }
//   if (make) {
//     query = query.ilike("make", `%${make}%`);
//   }
//   if (model) {
//     query = query.ilike("model", `%${model}%`);
//   }
//   if (trim) {
//     query = query.ilike("trim", `%${trim}%`);
//   }

//   try {
//     const { data, error } = await query;

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ data });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // Get unique values for dropdowns
// export async function POST(request: Request) {
//   try {
//     const { field } = await request.json();

//     if (!["year", "make", "model", "trim"].includes(field)) {
//       return NextResponse.json(
//         { error: "Invalid field specified" },
//         { status: 400 }
//       );
//     }

//     const { data, error } = await supabase
//       .from("cars_year_make_model_master_advanced")
//       .select(field)
//       .order(field)
//       .distinct();

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     // Extract unique values
//     const uniqueValues = data.map((item) => item[field]);

//     return NextResponse.json({ data: uniqueValues });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";

const API_KEY = process.env.MARKETCHECK_API_KEY;

export async function GET(request: Request) {
//   if (!API_KEY) {
//     return NextResponse.json(
//       { error: "Server configuration error. Please contact support." },
//       { status: 500 }
//     );
//   }


  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field");
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");


  if (!field) {
    return NextResponse.json(
      {
        error:
          "The 'field' parameter is required to know what data to extract.",
      },
      { status: 400 } // Bad Request
    );
  }

  const baseUrl = "https://rcv.btkdeals.com/api/vehicles";
  const url = new URL(baseUrl);
//   url.searchParams.append("api_key", API_KEY);
//   url.searchParams.append("facet_sort", "index");
//   url.searchParams.append("rows", "0");
//   url.searchParams.append("car_type", "used");
//   url.searchParams.append("facets", `${field}|0|1000`);

  console.log({baseUrl})

  if (year) url.searchParams.append("year", year);
  if (make) url.searchParams.append("make", make);
  if (model) url.searchParams.append("model", model);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error(
        `MarketCheck API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch data from the external API. Status: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();


    const listings = data?.facets[field] || [];
    let extractedData = [...new Set(listings?.map((facet) => facet?.item))];

    return NextResponse.json({ data: extractedData });
  } catch (error) {
    console.error("Error in GET request handler:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
