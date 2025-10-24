import type {NextApiRequest, NextApiResponse} from "next";
import { env } from "process";

type WeatherResponseItem = {
    city: string;
    temperature: number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<NextApiResponse<WeatherResponseItem> | void> {
    const apiKey = env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=41.13667&lon=-81.54156&appid=${apiKey}&units=imperial`;
    let data;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather");
        data = await response.json();
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }

    const result: WeatherResponseItem = {
        city: data.city.name,
        temperature: data.list[data.list.length - 1].main.temp,
    };

    return res.status(200).json(result);
}