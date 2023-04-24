import { FC, memo, useState, useEffect, useCallback, useContext } from "react";

import Lottie from "react-lottie";

import { getCurrentWeather } from "api";
import { WeatherContext } from "contexts";
import { type CurrentWeather } from "types";

import {
  resolveForecastFromWeatherModel,
  resolveLottieFromWeatherCode,
} from "utils";

import classes from "./WeatherCurrent.module.scss";

const options = {
  animationData: "",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CurrentWeather = () => {
  const [error, setError] = useState<unknown | null>(null);
  const { latitude, longitude, currentWeather, setCurrentWeather } =
    useContext(WeatherContext);
  const { is_day, weathercode, temperature } = currentWeather;
  const forecast = resolveForecastFromWeatherModel(weathercode);
  const lottie = resolveLottieFromWeatherCode(weathercode, is_day);

  const loading = !is_day && !weathercode && !temperature;

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
      {loading ? null : (
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
      )}
    </div>
  );
};

export default memo(CurrentWeather);
