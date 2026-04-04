import { getWeatherIcon, toFahrenheit } from "../utils/weatherHelpers";

const ForecastCard = ({ day, high, low, code, desc, unit, isToday }) => {
  const WeatherIcon = getWeatherIcon(code);
  const h = unit === "C" ? high : toFahrenheit(high);
  const l = unit === "C" ? low : toFahrenheit(low);

  return (
    <div
      className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 cursor-default
        hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10
        ${
          isToday
            ? "bg-blue-500/15 border-blue-400/30"
            : "bg-white/8 border-white/10 hover:bg-white/12 hover:border-white/30"
        }`}
    >
      <span className="text-xs text-white/50 uppercase tracking-widest font-semibold group-hover:text-white/80 transition-colors duration-300">
        {day}
      </span>

      <WeatherIcon className="text-[2.5rem] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

      <span className="text-xs text-white/50 text-center leading-tight group-hover:text-white/70 transition-colors duration-300">
        {desc}
      </span>

      <div className="flex gap-2 mt-1">
        <span className="text-sm font-bold text-white group-hover:tracking-wide transition-all duration-20">
          {h}°
        </span>
        <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-20">
          {l}°
        </span>
      </div>
    </div>
  );
};

export default ForecastCard;
