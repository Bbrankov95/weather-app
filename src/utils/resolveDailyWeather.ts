import { convertDegreesToCardinal } from "utils";
import convertToLocalTimeWithOffset from "./convertToLocalTimeWithOffset";

const resolveDailyWeather = (obj: object) => {
  const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();

  const resolvedEntries = Object.entries(obj).map(([key, val]) => {
    switch (key) {
      case "winddirection":
        return [key, convertDegreesToCardinal(val)];
      case "sunrise":
        return [key, convertToLocalTimeWithOffset(val[0])];
      case "sunset":
        return [key, convertToLocalTimeWithOffset(val[0])];
      case "time":
        return [
          key,
          new Date().toLocaleTimeString([], {
            hour12: false,
            timeStyle: "short",
          }),
        ];
      default:
        return Array.isArray(val) ? [key, val[0]] : [key, val];
    }
  });

  return resolvedEntries;
};

export default resolveDailyWeather;
