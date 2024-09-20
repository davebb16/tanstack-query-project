const WEATHERSTACK_API_URL = "http://api.weatherstack.com/current";
const API_KEY = "73fdb71033c20520e11df040d62ce1e9"; 

export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    temperature: number;
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
  };
}

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await fetch(
    `${WEATHERSTACK_API_URL}?access_key=${API_KEY}&query=${location}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return data;
};
