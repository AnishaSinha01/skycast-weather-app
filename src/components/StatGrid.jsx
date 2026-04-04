import StatCard from "./StatCard";
import { displayTemp } from "../utils/weatherHelpers";

const StatGrid = ({ weather, unit }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
      <StatCard
        icon="💧"
        label="Humidity"
        value={`${weather.humidity}%`}
        color="text-blue-300"
      />
      <StatCard
        icon="💨"
        label="Wind"
        value={`${weather.wind} m/s`}
        color="text-cyan-300"
      />
      <StatCard
        icon="👁️"
        label="Visibility"
        value={`${weather.visibility} km`}
        color="text-purple-300"
      />
      <StatCard
        icon="🌡️"
        label="Pressure"
        value={`${weather.pressure} hPa`}
        color="text-yellow-300"
      />
      <StatCard
        icon="🌅"
        label="Sunrise"
        value={weather.sunrise}
        color="text-orange-300"
      />
      <StatCard
        icon="🌇"
        label="Sunset"
        value={weather.sunset}
        color="text-pink-300"
      />
    </div>
  );
};

export default StatGrid;
