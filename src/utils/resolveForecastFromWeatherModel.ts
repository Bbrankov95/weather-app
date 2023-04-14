import { weatherModels } from "shared";

const resolveForecastFromWeatherModel = (weathercode: number) => {
  if (weathercode) {
    return typeof weatherModels?.[weathercode]?.forecast !== "undefined"
      ? [
          weatherModels?.[weathercode]?.forecast,
          weatherModels?.[weathercode].lottie,
        ]
      : ["N/A", ""];
  }

  return "N/A";
};

export default resolveForecastFromWeatherModel;
