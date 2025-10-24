import { useEffect, useState } from "react";

type WeatherResponseItem = {
  city: string;
  temperature: number;
};

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherResponseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/weather");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data: WeatherResponseItem = await res.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Weather Information</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {weather && (
        <div>
          <p>
            <strong>City:</strong> {weather.city}
          </p>
          <p>
            <strong>Temperature:</strong> {weather.temperature} °F
          </p>
        </div>
      )}
    </div>
  );
}
