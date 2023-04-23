import { convertDegreesToCardinal } from "utils";
import convertToLocalTimeWithOffset from "./convertToLocalTimeWithOffset";

const resolveDailyWeather = (obj: object) => {
  const resolvedEntries = Object.entries(obj).map(([key, val]) => {
    switch (key) {
      case "winddirection_10m_dominant":
        return [key, convertDegreesToCardinal(val[0])];
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
        return [key, val[0]];
    }
  });

  return resolvedEntries;
};

export default resolveDailyWeather;
