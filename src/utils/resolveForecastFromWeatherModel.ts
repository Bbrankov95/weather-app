import { weatherModels } from "shared";

type WeatherCode = keyof typeof weatherModels;

const resolveForecastFromWeatherModel = (weathercode: WeatherCode) => {
  return typeof weatherModels?.[weathercode]?.forecast !== "undefined"
    ? weatherModels?.[weathercode].forecast
    : "N/A";
};

export default resolveForecastFromWeatherModel;
