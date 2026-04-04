const StatCard = ({ icon, label, value, color = "text-white" }) => {
  return (
    <div className="group bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-4 transition-all duration-300 cursor-default hover:scale-105 hover:border-white/30 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg transition-transform duration-300 group-hover:scale-125">
          {icon}
        </span>
        <span className="text-xs text-white/50 uppercase tracking-widest font-medium group-hover:text-white/80 transition-colors duration-300">
          {label}
        </span>
      </div>

      <div
        className={`text-xl font-bold ${color} group-hover:tracking-wide transition-all duration-300`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatCard;
