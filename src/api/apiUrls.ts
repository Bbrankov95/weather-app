export const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const urls = {
  get: {
    currentWeather: (latitude: number, longitude: number) =>
      `?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kmh&daily=sunrise,sunset,weathercode,apparent_temperature_max,apparent_temperature_min&timezone=GMT`,
  },
};
