import { weatherModels } from "shared";

type WeatherCode = keyof typeof weatherModels;

const resolveLottieFromWeatherCode = (
  weathercode: WeatherCode,
  is_day: number
) => {
  const { lottie } = weatherModels?.[weathercode] ?? {};

  return typeof lottie !== "undefined" && lottie?.[is_day];
};

export default resolveLottieFromWeatherCode;
