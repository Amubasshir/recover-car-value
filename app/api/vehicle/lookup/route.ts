// app/api/convert/route.ts

import { lookupLicensePlate } from "@/lib/api/plateToVin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { licensePlate, state } = body;

    if (!licensePlate || !state) {
      return NextResponse.json(
        { error: "License plate and state are required" },
        { status: 400 }
      );
    }

    const vehicleInfo = await lookupLicensePlate({ licensePlate, state });

    return NextResponse.json(vehicleInfo);

  } catch (error) {
    console.error("License plate lookup error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to lookup license plate";
    
    // Check if it's an API key error
    if (errorMessage.includes("Incorrect API key") || errorMessage.includes("API key not configured")) {
      return NextResponse.json(
        { 
          error: "PlateToVin API key is required. Please configure PLATETOVIN_API_KEY in your .env file. You can get a free API key at https://platetovin.com/register (includes $0.25 free credits). Alternatively, use the 'Select Vehicle' tab to enter vehicle details manually.",
          requiresApiKey: true
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
