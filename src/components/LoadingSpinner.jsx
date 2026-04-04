const LoadingSpinner = ({ message = "Fetching latest weather data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-white/80" />
        <div
          className="absolute inset-2 w-8 h-8 border-4 border-blue-300/30 rounded-full animate-spin border-t-blue-300/80"
          style={{ animationDirection: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
      <p className="text-white/70 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
