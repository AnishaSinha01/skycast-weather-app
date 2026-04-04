import { useState } from "react";
import useWeather from "./hooks/useWeather";

import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import CurrentWeather from "./components/CurrentWeather";
import ForecastGrid from "./components/ForecastGrid";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [unit, setUnit] = useState("C");
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  const overlayStyle = weather
    ? "bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-indigo-900/50"
    : "bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-indigo-900/60";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      <div
        className={`fixed inset-0 transition-all duration-1000 ${overlayStyle}`}
      />
      <div className="fixed inset-0 bg-black/20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-3 drop-shadow-2xl">
            Sky
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cast
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Experience weather like never before with real-time data, beautiful
            visuals, and precise forecasts for any location worldwide
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <SearchBar onSearch={fetchWeather} />
          <TemperatureToggle unit={unit} onToggle={setUnit} />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl">
              <LoadingSpinner />
            </div>
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => {}} />
        ) : weather ? (
          <div className="space-y-6">
            <CurrentWeather weather={weather} unit={unit} />
            <ForecastGrid forecast={forecast} unit={unit} />
            <p className="text-center text-white/30 text-xs pb-4">
              SkyCast· Live via OpenWeatherMap · React + Tailwind
            </p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <p className="text-white/40 text-base">
              🔍 Search a city above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
