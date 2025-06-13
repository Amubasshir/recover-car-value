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

  const baseUrl = "https://mc-api.marketcheck.com/v2/search/car/active";
  const url = new URL(baseUrl);
  url.searchParams.append("api_key", API_KEY);
  if (year) url.searchParams.append("year", year);
  if (make) url.searchParams.append("make", make);
  if (model) url.searchParams.append("model", model);
  if (model) url.searchParams.append("rows", "50");
  if (model) url.searchParams.append("start", "0");

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

    const listings = data.listings || [];
    const extractedData = listings.map(
      (listing: any) => listing?.build?.["trim"]
    );

    return NextResponse.json({ data: extractedData });
  } catch (error) {
    console.error("Error in GET request handler:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
