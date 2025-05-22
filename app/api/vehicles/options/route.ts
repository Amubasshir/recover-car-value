import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type CarRecord = {
  id: string;
  ymm_id: number;
  make: string;
  model: string;
  year: number;
  engine: string;
  engine_liter: string;
  submodel: string;
  trim: string;
  body: string;
  vehicle_display_name: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field");
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");

  // Validate field parameter
  if (!field) {
    return NextResponse.json(
      { error: "Field parameter is required" },
      { status: 400 }
    );
  }

  console.log("Fetching options for:", { field, year, make, model });

  //   try{
  //  let query = await supabase
  //       .from("cars_year_make_model_master_advanced")
  //       .select()
  //       .limit(50);
  //       console.log("Query:", query);
  //   }catch(er){
  //     console.log(er);
  //   }
  try {
    // Build query
    let query = supabase
      .from("cars_year_make_model_master_advanced")
      .select(field);

    // Apply filters based on previous selections
    if (year) {
      query = query.eq("year", parseInt(year));
    }
    if (make) {
      query = query.eq("make", make);
    }
    if (model) {
      query = query.eq("model", model);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } // Extract unique values and sort them
    const uniqueValues = Array.from(
      new Set(data.map((item) => item[field as keyof typeof item]))
    ).filter(Boolean); // Remove null/undefined values

    // Sort the values
    const sortedValues = uniqueValues.sort((a, b) => {
      if (field === "year") {
        return Number(b) - Number(a); // Years in descending order
      }
      return String(a).localeCompare(String(b)); // Alphabetical for others
    });

    return NextResponse.json({ data: sortedValues });
  } catch (error) {
    console.error("Error fetching options:", error);
    return NextResponse.json(
      { error: "Failed to fetch options" },
      { status: 500 }
    );
  }
}
