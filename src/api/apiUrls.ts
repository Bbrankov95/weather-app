export const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const urls = {
  get: {
    currentWeather: (latitude: number, longitude: number) =>
      `?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kmh`,
    dailyWeather: (latitude: number, longitude: number) =>
      `?latitude=${latitude}&longitude=${longitude}&daily=weathercode,sunrise,sunset,apparent_temperature_min,apparent_temperature_max,windspeed_10m_max,winddirection_10m_dominant&timezone=GMT`,
  },
};
