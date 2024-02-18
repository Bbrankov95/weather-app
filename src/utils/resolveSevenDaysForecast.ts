import { DailyWeather } from "types";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type Day = (typeof weekday)[number];

const resolveSevenDaysForecast = (dailyWeather: DailyWeather) => {
  const forecast = [];
  const {
    apparent_temperature_max = [],
    apparent_temperature_min = [],
    time,
    weathercode,
  } = dailyWeather ?? {};

  for (let i = 0; i < 7; i++) {
    const day: Day = weekday[new Date(time[i]).getDay()];
    const forecastData = {
      weathercode,
      apparent_temperature_min: apparent_temperature_min.map((val) =>
        Math.round(val)
      ),
      apparent_temperature_max: apparent_temperature_max.map((val) =>
        Math.round(val)
      ),
    };
    const resolvedForecast = Object.entries(forecastData ?? {}).map(
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
