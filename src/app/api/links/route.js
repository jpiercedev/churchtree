import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Handle GET requests (Fetch links by userId)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId in query params" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Handle POST requests (Add a new link)
export async function POST(request) {
  try {
    const body = await request.json(); // Parse JSON body from the request

    const { label, url, user_id } = body; // Destructure necessary fields from the request body

    // Validate required fields
    if (!label || !url || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields (label, url, user_id)" },
        { status: 400 }
      );
    }

    // Insert the new link into the database
    const { data, error } = await supabase
      .from("links")
      .insert([{ label, url, user_id }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
