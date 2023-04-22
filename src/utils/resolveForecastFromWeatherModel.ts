import { weatherModels } from "shared";
import resolveLottieFromWeatherModel from "./resolveLottieFromWeatherCode";

const resolveForecastFromWeatherModel = (weathercode: number) => {
  return typeof weatherModels?.[weathercode]?.forecast !== "undefined"
    ? weatherModels?.[weathercode].forecast
    : "N/A";
};

export default resolveForecastFromWeatherModel;
