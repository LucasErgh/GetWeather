import { useEffect, useState } from "react";

type WeatherResponseItem = {
    city: string;
    temperature: number;
};

export default function WeatherPage() {
    const [weather, setWeather] = useState<WeatherResponseItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [Longitude, setLongitude] = useState<string | null>(null);
    const [Latitude, setLatitude] = useState<string | null>(null);

    async function fetchWeather() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/weather?lat=${Latitude}&lon=${Longitude}`);
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

//    useEffect(() => {
//        async function fetchWeather() {
//            setLoading(true);
//            setError(null);
//
//            try {
//                const res = await fetch("/api/weather?lat=41.13667&lon=-81.54156");
//                if (!res.ok) {
//                    throw new Error(`Failed to fetch: ${res.status}`);
//                }
//
//                const data: WeatherResponseItem = await res.json();
//                setWeather(data);
//            } catch (err: any) {
//                setError(err.message);
//            } finally {
//                setLoading(false);
//            }
//        }
//
//        fetchWeather();
//    }, []);

    return (
        <div>
            <h1>Choose Location</h1>
            <div>
                <label>Longitude</label>
                <input onChange={(e) => setLongitude(e.target.value)}></input>
                <p></p>
                <label>Latitude</label>
                <input onChange={(e) => setLatitude(e.target.value)}></input>
                <p></p>
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
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
