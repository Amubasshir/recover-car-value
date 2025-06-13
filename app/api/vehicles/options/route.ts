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

    console.log("😶😶😶😶😶", data)

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


// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// type CarRecord = {
//   id: string;
//   ymm_id: number;
//   make: string;
//   model: string;
//   year: number;
//   engine: string;
//   engine_liter: string;
//   submodel: string;
//   trim: string;
//   body: string;
//   vehicle_display_name: string;
// };

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const field = searchParams.get("field");
//   const year = searchParams.get("year");
//   const make = searchParams.get("make");
//   const model = searchParams.get("model");

//   console.log("Fetching options:", { field, year, make, model });

//   // Validate field parameter
//   if (!field || !["year", "make", "model", "trim"].includes(field)) {
//     return NextResponse.json(
//       { error: "Invalid field parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     if (field === "year") {
//       try {
//         // Simple query to get all years
//         const { data, error } = await supabase
//           .from("cars_year_make_model_master_advanced")
//           .select("year");

//         if (error) {
//           console.error("Failed to fetch years:", error);
//           throw error;
//         }

//         // Extract unique years using Set
//         const yearSet = new Set<number>();
//         data.forEach((item) => {
//           if (item.year && typeof item.year === "number") {
//             yearSet.add(item.year);
//           }
//         });

//         // Convert to array and sort descending
//         const years = Array.from(yearSet).sort((a, b) => b - a);
//         console.log(`Found ${years.length} unique years`);
//         return NextResponse.json({ data: years });
//       } catch (yearError) {
//         console.error("Error in year query:", yearError);
//         throw yearError;
//       }
//     }

//     // For other fields, use optimized distinct queries
//     let result;
//     if (field === "make") {
//       result = await supabase
//         .from("cars_year_make_model_master_advanced")
//         .select("DISTINCT make")
//         .order("make");
//     } else if (field === "model") {
//       result = await supabase
//         .from("cars_year_make_model_master_advanced")
//         .select("DISTINCT model")
//         .eq("make", make || "")
//         .eq("year", year ? parseInt(year) : null)
//         .order("model");
//     } else if (field === "trim") {
//       result = await supabase
//         .from("cars_year_make_model_master_advanced")
//         .select("DISTINCT trim")
//         .eq("make", make || "")
//         .eq("model", model || "")
//         .eq("year", year ? parseInt(year) : null)
//         .order("trim");
//     }

//     if (result?.error) {
//       console.error(`Query error for ${field}:`, {
//         error: result.error,
//         message: result.error.message,
//       });
//       throw result.error;
//     }

//     if (!result?.data?.length) {
//       console.log(`No data found for ${field} with filters:`, {
//         year,
//         make,
//         model,
//       });
//       return NextResponse.json({ data: [] });
//     }

//     const uniqueValues = result.data
//       .map((item) => item[field as keyof typeof item])
//       .filter(Boolean);
//     const sortedValues = uniqueValues.sort((a, b) =>
//       String(a).localeCompare(String(b))
//     );

//     console.log(`Found ${sortedValues.length} unique values for ${field}`);
//     return NextResponse.json({ data: sortedValues });
//   } catch (error: any) {
//     console.error("Error fetching options:", {
//       error,
//       message: error?.message || "Unknown error",
//       stack: error?.stack,
//       type: typeof error,
//     });

//     return NextResponse.json(
//       {
//         error: `Failed to fetch options: ${error?.message || "Unknown error"}`,
//       },
//       { status: 500 }
//     );
//   }
// }
