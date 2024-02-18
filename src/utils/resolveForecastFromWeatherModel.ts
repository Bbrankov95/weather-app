import { weatherModels } from "shared";

type WeatherCode = keyof typeof weatherModels;

const resolveForecastFromWeatherModel = (weathercode: WeatherCode) => {
  const { forecast } = weatherModels?.[weathercode] ?? {};
  return typeof forecast !== "undefined"
    ? weatherModels?.[weathercode].forecast
    : "N/A";
};

export default resolveForecastFromWeatherModel;
