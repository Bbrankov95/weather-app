import { Weather } from "types";
import { BASE_URL, urls } from "./apiUrls";

export const getCurrentWeather = async (
  latitue: number,
  longitude: number
): Promise<Weather> => {
  return await (
    await fetch(`${BASE_URL}${urls.get.currentWeather(latitue, longitude)}`)
  ).json();
};
