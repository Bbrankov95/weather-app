import { weatherModels } from "shared";

const resolveLottieFromWeatherCode = (weathercode: number, is_day: number) => {
  return typeof weatherModels?.[weathercode]?.lottie !== "undefined"
    ? weatherModels?.[weathercode]?.lottie?.[is_day]
    : "";
};

export default resolveLottieFromWeatherCode;
