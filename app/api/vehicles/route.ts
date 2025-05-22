import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get filter parameters
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const trim = searchParams.get("trim");

  // Start building the query
  let query = supabase.from("cars_year_make_model_master_advanced").select("*");

  // Add filters if they exist
  if (year) {
    query = query.eq("year", year);
  }
  if (make) {
    query = query.ilike("make", `%${make}%`);
  }
  if (model) {
    query = query.ilike("model", `%${model}%`);
  }
  if (trim) {
    query = query.ilike("trim", `%${trim}%`);
  }

  try {
    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get unique values for dropdowns
export async function POST(request: Request) {
  try {
    const { field } = await request.json();

    if (!["year", "make", "model", "trim"].includes(field)) {
      return NextResponse.json(
        { error: "Invalid field specified" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cars_year_make_model_master_advanced")
      .select(field)
      .order(field)
      .distinct();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Extract unique values
    const uniqueValues = data.map((item) => item[field]);

    return NextResponse.json({ data: uniqueValues });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
