const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg flex-shrink-0">
      <div className="flex items-center">
        {["C", "F"].map((u) => (
          <button
            key={u}
            onClick={() => onToggle(u)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              unit === u
                ? "bg-white/20 text-white shadow-md"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            ° {u}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemperatureToggle;
