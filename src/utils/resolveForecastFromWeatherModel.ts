import { weatherModels } from "shared";

const resolveForecastFromWeatherModel = (weathercode: number) => {
  return typeof weatherModels?.[weathercode]?.forecast !== "undefined"
    ? [
        weatherModels?.[weathercode]?.forecast,
        weatherModels?.[weathercode].lottie,
      ]
    : ["N/A", ""];
};

export default resolveForecastFromWeatherModel;
