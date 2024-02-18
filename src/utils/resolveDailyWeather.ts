import { convertDegreesToCardinal } from "utils";
import convertToLocalTimeWithOffset from "./convertToLocalTimeWithOffset";

import { type DailyWeather } from "types";

const resolveDailyWeather = (obj: DailyWeather, index = 0) => {
  const resolvedEntries = Object.entries(obj).map(([key, val]) => {
    switch (key) {
      case "winddirection_10m_dominant":
        return [key, convertDegreesToCardinal(Number(val[index]))];
      case "sunrise":
        return [key, convertToLocalTimeWithOffset(val[index]?.toString?.())];
      case "sunset":
        return [key, convertToLocalTimeWithOffset(val[index]?.toString?.())];
      case "apparent_temperature_min":
        return [key, Math.round(Number(val[index]) || 0)];
      case "apparent_temperature_max":
        return [key, Math.round(Number(val[index]) || 0)];
      case "time":
        return [
          key,
          new Date().toLocaleTimeString([], {
            hour12: false,
            timeStyle: "short",
          }),
        ];
      default:
        return [key, val[index]];
    }
  });

  return resolvedEntries;
};

export default resolveDailyWeather;
