import { FC, memo } from "react";

import Lottie from "react-lottie";

import { DailyWeather, type CurrentWeather } from "types";

import rainy from "assets/weather-day-rain.json";

import classes from "./CurrentWeather.module.scss";
import { WeatherItem } from "./components";
import { resolveForecastFromWeatherModel } from "utils";

const options = {
  animationData: rainy,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

type CurrentWeatherProps = {
  daily: DailyWeather;
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

const CurrentWeather: FC<CurrentWeatherProps> = ({
  daily,
  is_day,
  temperature,
  time,
  weathercode,
  winddirection,
  windspeed,
}) => {
  const [forecast, lottie] = resolveForecastFromWeatherModel(weathercode);

  return (
    <div className={classes.CurrentWeatherWrapper}>
      <div className={classes.WeatherNow}>
        <h3 className={classes.Heading}>Now</h3>
        <Lottie
          options={{ ...options, animationData: lottie }}
          style={{
            width: "60%",
          }}
        />
        <p className={classes.WeatherInfo}>
          Current Temp: {temperature ? Math.round(temperature) : "--"}°C
        </p>
        <p className={classes.WeatherInfo}>{forecast}</p>
      </div>
      <div className={classes.WeatherToday}>
        <h3 className={classes.Heading}>Today's Weather</h3>
        <div></div>
      </div>
    </div>
  );
};

export default memo(CurrentWeather);
