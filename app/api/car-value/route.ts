/**
 * Car Value API Route
 * 
 * This endpoint provides the exact same functionality as car__value.py
 * Returns pre-accident value, post-accident value, and diminished value
 */

import { NextResponse } from "next/server";
import { calculateAndPlot } from "@/lib/utils/carValueCalculator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { year, make, model, mileage, trim } = body;

    // Validate required inputs
    if (!year || !make || !model || !mileage) {
      return NextResponse.json(
        { error: "Missing required fields: year, make, model, mileage" },
        { status: 400 }
      );
    }

    // Calculate values using the same logic as Python
    const result = await calculateAndPlot(
      Number(year),
      make,
      model,
      Number(mileage),
      trim
    );

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Error in car value calculation:", error);
    return NextResponse.json(
      {
        error: "Failed to calculate car values",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
