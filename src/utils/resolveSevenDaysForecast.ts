import { DailyWeather } from "types";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const resolveSevenDaysForecast = (obj: DailyWeather) => {
  const forecast = [];
  for (let i = 0; i < 7; i++) {
    const day = weekday[new Date(obj.time[i]).getDay()];
    const forecastData = {
      weathercode: obj.weathercode,
      apparent_temperature_min: obj.apparent_temperature_min,
      apparent_temperature_max: obj.apparent_temperature_max,
    };
    const resolvedForecast = Object.entries(forecastData).map(
      ([key, val]: [key: string, val: number[]]) => [key, val?.[i]]
    );
    forecast.push({
      name: day,
      forecast: resolvedForecast,
    });
  }

  return forecast;
};

export default resolveSevenDaysForecast;
