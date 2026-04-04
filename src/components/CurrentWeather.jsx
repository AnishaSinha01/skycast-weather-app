import {
  getWeatherIcon,
  displayTemp,
  displayTempNum,
  toFahrenheit,
} from "../utils/weatherHelpers";
import StatGrid from "./StatGrid";

const CurrentWeather = ({ weather, unit }) => {
  const temp = unit === "C" ? weather.temp : toFahrenheit(weather.temp);
  const WeatherIcon = getWeatherIcon(weather.code, weather.isDay);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <h2 className="text-2xl font-bold text-white">{weather.city}</h2>
            <span className="text-white/40 text-lg">{weather.country}</span>
          </div>
          <p className="text-white/40 text-sm mt-1">
            {weather.date} · {weather.time}
          </p>
        </div>
        <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-sm text-white/60">
          H:{displayTempNum(weather.high, unit)} &nbsp; L:
          {displayTempNum(weather.low, unit)}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <WeatherIcon style={{ fontSize: "8rem", color: "white" }} />
        <div>
          <div className="text-8xl font-extrabold text-white leading-none tracking-tighter">
            {temp}
            <span className="text-4xl text-white/40 ml-1">°{unit}</span>
          </div>
          <p className="text-white/70 text-xl font-medium mt-1">
            {weather.description}
          </p>
          <p className="text-white/40 text-sm mt-1">
            Feels like {displayTemp(weather.feels_like, unit)}
          </p>
        </div>
      </div>

      <StatGrid weather={weather} unit={unit} />
    </div>
  );
};

export default CurrentWeather;
