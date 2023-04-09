const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const urls = {
  get: {
    currentWeather: (latitude: number, longitude: number) =>
      `?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  },
};
