import { FC, memo } from "react";

import Lottie from "react-lottie";

import { weatherModels } from "shared";

import { type CurrentWeather } from "types";

import rainy from "assets/weather-day-rain.json";

import classes from "./CurrentWeather.module.scss";

const options = {
  animationData: rainy,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CurrentWeather: FC<CurrentWeather> = ({
  is_day,
  temperature,
  weathercode,
  winddirection,
  windspeed,
}) => {
  const forecast =
    (weathercode && weatherModels?.[weathercode]?.forecast) ?? "N/A";
  return (
    <div className={classes.CurrentWeatherWrapper}>
      <div className={classes.WeatherNow}>
        <h3 className={classes.Heading}>Now</h3>
        <Lottie
          options={options}
          style={{
            width: "60%",
          }}
        />
        <p>Current Temp: {temperature}°C</p>
        <p>{forecast}</p>
      </div>
      <div className={classes.WeatherToday}>
        <h3 className={classes.Heading}>Today's Weather</h3>
        <div></div>
      </div>
    </div>
  );
};

export default memo(CurrentWeather);
