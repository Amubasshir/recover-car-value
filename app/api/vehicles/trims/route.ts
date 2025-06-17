import { NextResponse } from "next/server";

const API_KEY = process.env.MARKETCHECK_API_KEY;

export async function GET(request: Request) {
  if (!API_KEY) {
    console.error("MarketCheck API key is not configured in .env");
    return NextResponse.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  console.log({ API_KEY });

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

// const baseUrl = "https://mc-api.marketcheck.com/v2/search/car/active";
const baseUrl = "https://api.marketcheck.com/v2/search/car/active";
// https://api.marketcheck.com/v2/search/car/active?api_key=U6N8lDZRXuH8T7Yq5JyKwZ2l1xNnFojR&car_type=used&rows=0&facet_sort=index&facets=year|0|1000
const url = new URL(baseUrl);
url.searchParams.append("api_key", API_KEY);
url.searchParams.append("facet_sort", "index");
url.searchParams.append("rows", "0");
url.searchParams.append("car_type", "used");
url.searchParams.append("facets", `${field}|0|1000`);

if (year) url.searchParams.append("year", year);
// if(field === 'year'){
//     if (year) url.searchParams.append("year", year);
// }
if(field === 'make'){
    if (make) url.searchParams.append("make", make);
}
if(field === 'trim'){
    if (model) url.searchParams.append("model", model);
}

console.log("urls ", url.toString());

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

    console.log("i am from data ", {data});

    const listings = data?.facets[field] || [];
    let extractedData = [...new Set(listings?.map(facet=> facet?.item))];

    // if(field === "trim"){
    //     extractedData = [...new Set(
    //     listings.map((listing: any) => listing?.build?.["trim"])
    //     )];
    // }else{
    //     extractedData = [...new Set(
    //     listings.map((listing: any) => listing?.build?.["model"])
    //     )];
    // }

    return NextResponse.json({ data: extractedData });
  } catch (error) {
    console.error("Error in GET request handler:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
