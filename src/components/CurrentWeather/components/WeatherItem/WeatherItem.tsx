import { FC, memo } from "react";

import classes from "./WeatherItem.module.scss";
import Lottie from "react-lottie";
import {
  compass,
  sunrise,
  sunset,
  thermometer,
  thermometerColder,
  windsock,
} from "assets";
import { resolveLottieFromWeatherCode } from "utils";

type WeatherItem = {
  label: string;
  value: string | number;
};

const options = {
  animationData: "",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const labelMap: { [key: string]: string } = {
  winddirection_10m_dominant: "Wind Direction",
  windspeed_10m_max: "Wind Speed",
  apparent_temperature_min: "Min Temp",
  apparent_temperature_max: "Max Temp",
  weathercode: "Forecast",
  time: "Last updated",
};

const labelLottieMap: { [key: string]: any } = {
  winddirection_10m_dominant: compass,
  windspeed_10m_max: windsock,
  apparent_temperature_min: thermometerColder,
  apparent_temperature_max: thermometer,
  // weathercode: "Weather",
  // time: "Last updated",
  sunrise: sunrise,
  sunset: sunset,
};

const WeatherItem: FC<WeatherItem> = ({ label = "--|--", value }) => {
  const mappedLabel = labelMap[label];
  const isweathercode = label === "weathercode";
  const mappedLottie = isweathercode
    ? resolveLottieFromWeatherCode(Number(value), 1)
    : labelLottieMap[label];
  const shouldPutCelsius =
    label === "apparent_temperature_min" ||
    label === "apparent_temperature_max";
  const shouldPutKmH = label === "windspeed";
  return (
    <div className={classes.Wrapper}>
      <label className={classes.Label}>{mappedLabel ?? label}</label>
      <div className={classes.ValueWrapper}>
        <p>
          {isweathercode ? null : value}
          {shouldPutCelsius && "°C"}
          {shouldPutKmH && "kmH"}
        </p>
        {mappedLottie ? (
          <Lottie
            isClickToPauseDisabled
            width={50}
            options={{ ...options, animationData: mappedLottie }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default memo(WeatherItem);
