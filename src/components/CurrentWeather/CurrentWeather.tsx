import { FC, memo, useState, useEffect, useCallback, useContext } from "react";

import Lottie from "react-lottie";

import { getCurrentWeather } from "api";
import { type CurrentWeather } from "types";

import {
  resolveForecastFromWeatherModel,
  resolveLottieFromWeatherCode,
} from "utils";

import classes from "./CurrentWeather.module.scss";
import { GeoLocationContext } from "contexts";

const options = {
  animationData: "",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const weatherInitialState: CurrentWeather = {
  is_day: 0,
  weathercode: 0,
  temperature: 0,
  winddirection: 0,
  windspeed: 0,
  time: "",
};

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeather>(weatherInitialState);
  const [error, setError] = useState<unknown | null>(null);
  const { latitude, longitude } = useContext(GeoLocationContext);
  const { is_day, weathercode, temperature, winddirection, windspeed } =
    currentWeather;
  const forecast = resolveForecastFromWeatherModel(weathercode);
  const lottie = resolveLottieFromWeatherCode(weathercode, is_day);
  // const resolvedDailyWeather = resolveDailyWeather({
  //   ...weather?.daily,
  //   windspeed,
  //   winddirection,
  // });

  const getSetCurrentWeather = useCallback(async () => {
    try {
      if (latitude && longitude) {
        const { current_weather } = await getCurrentWeather(
          latitude,
          longitude
        );
        setCurrentWeather(current_weather);
      }
    } catch (error) {
      setError(error);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      getSetCurrentWeather();
    }
  }, [latitude, longitude]);

  return (
    <div className={classes.CurrentWeatherWrapper}>
      <div className={classes.WeatherNow}>
        <h3 className={classes.Heading}>Now</h3>
        <Lottie
          isClickToPauseDisabled
          options={{ ...options, animationData: lottie }}
          style={{
            maxWidth: "400px",
            height: "auto",
          }}
        />
        <p className={classes.WeatherInfo}>
          Current Temp: {temperature ? Math.round(temperature) : "--"}°C
        </p>
        <p className={classes.WeatherInfo}>{forecast}</p>
      </div>
    </div>
  );
};

export default memo(CurrentWeather);
