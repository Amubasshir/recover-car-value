import { NextResponse } from "next/server";

const API_KEY = process.env.MARKETCHECK_API_KEY;

export async function GET(request: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }


  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field");
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");

  console.log({field})

  if (!field) {
    return NextResponse.json(
      {
        error:
          "The 'field' parameter is required to know what data to extract.",
      },
      { status: 400 } // Bad Request
    );
  } 

//   const baseUrl = "https://api.marketcheck.com/v2/search/car/active";
  const baseUrl = `https://rcv.btkdeals.com/api/vehicles${field ? `/${field}` : ""}`;
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

    console.log({response})

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

 console.log(field,{data})
    // const listings = data?.facets[field] || [];
    // let extractedData = [...new Set(listings?.map((facet) => facet?.item))];

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in GET request handler:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
