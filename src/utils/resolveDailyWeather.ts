import { convertDegreesToCardinal } from "utils";
import convertToLocalTimeWithOffset from "./convertToLocalTimeWithOffset";

import { type DailyWeather } from "types";

const resolveDailyWeather = (obj: DailyWeather, index = 0) => {
  const resolvedEntries = Object.entries(obj).map(([key, val]) => {
    switch (key) {
      case "winddirection_10m_dominant":
        return [key, convertDegreesToCardinal(val[index] as number)];
      case "sunrise":
        return [key, convertToLocalTimeWithOffset(val[index] as string)];
      case "sunset":
        return [key, convertToLocalTimeWithOffset(val[index] as string)];
      case "apparent_temperature_min":
        return [key, Math.round((val[index] as number) ?? 0)];
      case "apparent_temperature_max":
        return [key, Math.round((val[index] as number) ?? 0)];
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
