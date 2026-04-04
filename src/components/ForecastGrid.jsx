import ForecastCard from "./ForecastCard";

const ForecastGrid = ({ forecast, unit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-5">
        <span>📅</span>
        <h3 className="text-white font-bold text-lg">5-Day Forecast</h3>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {forecast.map((item, i) => (
          <ForecastCard key={i} {...item} unit={unit} isToday={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default ForecastGrid;
