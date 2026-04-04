import { useState, useCallback } from "react";

const API_KEY = "9455197148a968c61f852303a790573d";
const BASE = "https://api.openweathermap.org/data/2.5";

export const getApiKey = () => API_KEY;

const parseWeather = (d) => {
  const now = Date.now() / 1000;
  const sunrise = new Date(d.sys.sunrise * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(d.sys.sunset * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    city: d.name,
    country: d.sys.country,
    temp: Math.round(d.main.temp),
    feels_like: Math.round(d.main.feels_like),
    description: d.weather[0].description.replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ),
    code: d.weather[0].id,
    humidity: d.main.humidity,
    wind: d.wind.speed,
    visibility: (d.visibility / 1000).toFixed(1),
    pressure: d.main.pressure,
    sunrise,
    sunset,
    high: Math.round(d.main.temp_max),
    low: Math.round(d.main.temp_min),
    isDay: now > d.sys.sunrise && now < d.sys.sunset,
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const parseForecast = (d) => {
  const days = {};
  d.list.forEach((item) => {
    const label = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    if (!days[label]) {
      days[label] = { day: label, highs: [], lows: [], codes: [], descs: [] };
    }
    days[label].highs.push(item.main.temp_max);
    days[label].lows.push(item.main.temp_min);
    days[label].codes.push(item.weather[0].id);
    days[label].descs.push(
      item.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase())
    );
  });

  return Object.values(days)
    .slice(0, 7)
    .map((d, i) => ({
      day: i === 0 ? "Today" : d.day,
      high: Math.round(Math.max(...d.highs)),
      low: Math.round(Math.min(...d.lows)),
      code: d.codes[0],
      desc: d.descs[0],
    }));
};

export const searchCities = async (query) => {
  if (!API_KEY || query.length < 2) return [];
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const data = await res.json();
    return data.map((c) => ({
      name: c.name,
      state: c.state || "",
      country: c.country,
      lat: c.lat,
      lon: c.lon,
    }));
  } catch {
    return [];
  }
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    if (!API_KEY) {
      setError(
        "API key missing! Please add your OpenWeatherMap key in src/hooks/useWeather.js"
      );
      setLoading(false);
      return;
    }

    const coordMatch = cityName.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/);
    const query = coordMatch
      ? `lat=${coordMatch[1]}&lon=${coordMatch[2]}`
      : `q=${encodeURIComponent(cityName)}`;

    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`${BASE}/weather?${query}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE}/forecast?${query}&appid=${API_KEY}&units=metric`),
      ]);

      if (!wRes.ok) throw new Error("City not found. Please try another name.");

      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);

      setWeather(parseWeather(wData));
      setForecast(parseForecast(fData));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, fetchWeather };
};

export default useWeather;
