import { NextResponse } from "next/server";
import { getJson } from "serpapi";

async function fetchSuggestions(query: string) {
  const json = await getJson(
    {
      engine: "google_autocomplete",
      q: query,
      api_key:
        "cfd303eee914438273fbd3b5e81cafbed781bcd84f750288e2c7cb22b7c6ec92",
    },
    (json) => {
      return json["suggestions"];
    }
  );

  return json["suggestions"];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const suggestions = await fetchSuggestions(query);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
