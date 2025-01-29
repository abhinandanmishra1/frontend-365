import { NextResponse } from "next/server";

async function fetchWeatherData(city: string) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY;

  if (!API_KEY) {
    throw new Error("API key not found");
  }

  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return data;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const weatherData = await fetchWeatherData(query);

    return NextResponse.json({ weatherData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
