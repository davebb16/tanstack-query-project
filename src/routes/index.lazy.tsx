// src/index.tsx
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, WeatherData } from "../services/weatherService";

const App: React.FC = () => {
  const [location, setLocation] = useState<string>("New York");

  const { data, error, isLoading, isError, refetch } = useQuery<WeatherData, Error>({
    queryKey: ["weatherData", location],
    queryFn: () => fetchWeatherData(location),
    enabled: false, // Disable automatic fetching, allow manual triggering
  });

  const handleFetchWeather = () => {
    refetch(); // Trigger the API call manually
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error fetching weather data: {error?.message}</p>}

      {data && (
        <div>
          <h2>Weather in {data.location.name}, {data.location.country}</h2>
          <p>Temperature: {data.current.temperature}°C</p>
          <p>Weather: {data.current.weather_descriptions.join(", ")}</p>
          <p>Humidity: {data.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    rootElement
  );
} else {
  console.error("Root element not found");
}


