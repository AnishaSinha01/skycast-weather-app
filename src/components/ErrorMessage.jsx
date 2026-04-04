import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/20 rounded-3xl p-8 max-w-md mx-auto text-center">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="p-2 bg-red-500/20 rounded-full">
          <AlertCircle className="w-5 h-5 text-red-300" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          Something Went Wrong
        </h3>
      </div>

      <p className="text-white/70 text-sm mb-6">{message}</p>

      <button
        onClick={onRetry}
        className="flex items-center justify-center gap-2 mx-auto bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-6 py-3 text-white text-sm font-medium transition-all hover:scale-105"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
