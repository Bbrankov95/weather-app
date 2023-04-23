import { CurrentWeather, DailyWeather, Weather } from "types";
import { BASE_URL, urls } from "./apiUrls";

interface CurrentWeatherPromise extends Weather {
  current_weather: CurrentWeather;
}

export const getCurrentWeather = async (
  latitue: number,
  longitude: number
): Promise<CurrentWeatherPromise> => {
  return await (
    await fetch(`${BASE_URL}${urls.get.currentWeather(latitue, longitude)}`)
  ).json();
};

interface DailyWeatherPromise extends Weather {
  daily: DailyWeather;
}

export const getDailyWeather = async (
  latitue: number,
  longitude: number
): Promise<DailyWeatherPromise> => {
  return await (
    await fetch(`${BASE_URL}${urls.get.dailyWeather(latitue, longitude)}`)
  ).json();
};
