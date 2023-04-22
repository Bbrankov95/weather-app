import { FC, memo } from "react";

import Lottie from "react-lottie";

import { DailyWeather, type CurrentWeather } from "types";

import classes from "./CurrentWeather.module.scss";
import { WeatherItem } from "./components";
import { resolveDailyWeather, resolveForecastFromWeatherModel } from "utils";
import animation from "assets/day/freezing-drizzle.json";
const options = {
  animationData: "",
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
  // const animation = lottie?.[is_day];
  const resolvedDailyWeather = resolveDailyWeather({
    ...daily,
    windspeed,
    winddirection,
  });

  return (
    <div className={classes.CurrentWeatherWrapper}>
      <div className={classes.WeatherNow}>
        <h3 className={classes.Heading}>Now</h3>
        <Lottie
          options={{ ...options, animationData: animation }}
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
        <div className={classes.ItemsWrapper}>
          {resolvedDailyWeather.map(([label, value], i: number) => (
            <WeatherItem key={`{label}-${i}`} label={label} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(CurrentWeather);
