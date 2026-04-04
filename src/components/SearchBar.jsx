import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Loader } from "lucide-react";
import { searchCities, getApiKey } from "../hooks/useWeather";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [locating, setLocating] = useState(false);
  const [skipFetch, setSkipFetch] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDrop(false);
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (skipFetch) return;
    if (query.length < 2) {
      setResults([]);
      setShowDrop(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      setShowDrop(true);
      const cities = await searchCities(query);
      setResults(cities);
      setSearching(false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const closeDropdown = () => {
    clearTimeout(debounceRef.current);
    setShowDrop(false);
    setResults([]);
    setSkipFetch(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      closeDropdown();
      onSearch(query.trim());
    }
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  const handleSelect = (city) => {
    const label = `${city.name}${city.state ? ", " + city.state : ""}`;
    setQuery(label);
    closeDropdown();
    onSearch(city.name);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDrop(false);
    setSkipFetch(false);
    clearTimeout(debounceRef.current);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const key = getApiKey();
          if (key) {
            const res = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`
            );
            if (res.ok) {
              const data = await res.json();
              if (data?.[0]) {
                setQuery(data[0].name);
                closeDropdown();
                onSearch(data[0].name);
                setLocating(false);
                return;
              }
            }
          }
          onSearch(`${latitude},${longitude}`);
        } catch {
          onSearch(`${latitude},${longitude}`);
        }
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) alert("Location permission denied.");
        else alert("Could not get location. Please search manually.");
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="relative w-full max-w-2xl z-50" ref={wrapperRef}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-white/70 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setSkipFetch(false);
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for any city worldwide......"
          className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:bg-white/15"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={locating}
          title="Use my location"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-40"
        >
          {locating ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </button>
      </div>

      {showDrop && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-[100]">
          {searching ? (
            <div className="p-5 flex items-center justify-center gap-3 text-white/60">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">Searching cities...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((city, i) => (
              <button
                key={i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(city)}
                className="w-full px-5 py-3 text-left hover:bg-white/15 transition-all flex items-center justify-between border-b border-white/10 last:border-b-0"
              >
                <span className="text-white font-medium">
                  {city.name}
                  {city.state && (
                    <span className="text-white/50">, {city.state}</span>
                  )}
                </span>
                <span className="text-white/50 text-sm">{city.country}</span>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-white/40 text-sm">
              No cities found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
