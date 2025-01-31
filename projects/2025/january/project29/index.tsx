import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  MapPin,
  Sun,
  Wind,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";

interface WeatherData {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

interface City {
  name: string;
  country: string;
}

const cities: City[] = [
  { name: "London", country: "GB" },
  { name: "New York", country: "US" },
  { name: "Tokyo", country: "JP" },
  { name: "Paris", country: "FR" },
  { name: "Sydney", country: "AU" },
  { name: "Dubai", country: "AE" },
  { name: "Singapore", country: "SG" },
  { name: "Mumbai", country: "IN" },
  { name: "Toronto", country: "CA" },
  { name: "Berlin", country: "DE" },
];

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("London");

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const {data: {
        weatherData
      }} = await axios.get<{weatherData: WeatherData}>(`/api/weather?query=${city}`);
      setWeather(weatherData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (weatherCode: number | undefined): JSX.Element => {
    if (!weatherCode) return <Sun className="h-12 w-12 text-yellow-500" />;

    if (weatherCode >= 200 && weatherCode <= 233) {
      return <CloudLightning className="h-12 w-12 text-gray-500" />;
    } else if (
      [
        296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335,
        338, 350,
      ].includes(weatherCode)
    ) {
      return <CloudRain className="h-12 w-12 text-blue-500" />; // Rain
    } else if (
      [
        179, 182, 185, 227, 230, 281, 284, 287, 320, 323, 326, 329, 332, 335,
        338, 350,
      ].includes(weatherCode)
    ) {
      return <CloudSnow className="h-12 w-12 text-blue-200" />; // Snow
    } else if ([248, 260, 263, 266, 281, 284, 287, 293].includes(weatherCode)) {
      return <Wind className="h-12 w-12 text-gray-400" />; // Wind/Fog
    } else if (weatherCode === 113) {
      return <Sun className="h-12 w-12 text-yellow-500" />; // Clear
    } else {
      return <Cloud className="h-12 w-12 text-gray-400" />; // Cloudy
    }
  };

  return (
    <Card className="w-96 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Select a city" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem
                    key={`${city.name}-${city.country}`}
                    value={city.name}
                  >
                    {city.name}, {city.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : weather ? (
            <>
              <div className="text-xl font-semibold">
                {weather.location.name}, {weather.location.country}
              </div>

              <div className="flex items-center justify-center">
                {getWeatherIcon(weather.current.weather_code)}
              </div>

              <div className="text-4xl font-bold">
                {Math.round(weather.current.temperature)}°C
              </div>

              <div className="text-gray-500 capitalize">
                {weather.current.weather_descriptions[0]}
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center p-2 bg-gray-100 rounded-lg">
                  <span className="text-gray-500 text-sm">Humidity</span>
                  <span className="font-medium">
                    {weather.current.humidity}%
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-gray-100 rounded-lg">
                  <span className="text-gray-500 text-sm">Wind</span>
                  <span className="font-medium">
                    {weather.current.wind_speed} m/s
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Project29() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h2 className="text-2xl font-bold">Project 29</h2>
      <WeatherWidget />
    </div>
  );
}
