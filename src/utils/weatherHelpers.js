import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSnow,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiDayHaze,
} from "react-icons/wi";

export const getWeatherIcon = (code, isDay = true) => {
  if (code === 800) return isDay ? WiDaySunny : WiNightClear;
  if (code === 801) return WiDayCloudy;
  if (code === 802 || code === 803 || code === 804) return WiCloudy;
  if (code >= 700) return WiFog;
  if (code >= 600) return WiSnow;
  if (code >= 500) return WiRain;
  if (code >= 300) return WiShowers;
  if (code >= 200) return WiThunderstorm;
  return WiDayHaze;
};

export const getBgGradient = (code, isDay) => {
  if (!isDay)
    return "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)";
  if (code === 800)
    return "linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 50%, #1a2a4e 100%)";
  if (code > 800)
    return "linear-gradient(135deg, #2c3e6b 0%, #3d5a8a 50%, #1a2a4e 100%)";
  if (code >= 200 && code < 600)
    return "linear-gradient(135deg, #1a1a2e 0%, #2d3561 40%, #16213e 100%)";
  if (code >= 600)
    return "linear-gradient(135deg, #1a2744 0%, #2d4a8a 40%, #1a1a3e 100%)";
  return "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)";
};

export const toFahrenheit = (c) => Math.round((c * 9) / 5 + 32);
export const displayTemp = (c, unit) =>
  unit === "C" ? `${c}°C` : `${toFahrenheit(c)}°F`;
export const displayTempNum = (c, unit) =>
  unit === "C" ? `${c}°` : `${toFahrenheit(c)}°`;
