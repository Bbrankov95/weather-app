import { weatherModels } from "shared";

type WeatherCode = keyof typeof weatherModels;

const resolveLottieFromWeatherCode = (
  weathercode: WeatherCode,
  is_day: number
) => {
  return (
    typeof weatherModels?.[weathercode]?.lottie !== "undefined" &&
    weatherModels?.[weathercode]?.lottie?.[is_day]
  );
};

export default resolveLottieFromWeatherCode;
