import {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";

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
  const { is_day, weathercode, temperature, time } = currentWeather;
  const forecast = resolveForecastFromWeatherModel(weathercode);
  const lottie = resolveLottieFromWeatherCode(weathercode, is_day);
  const loading = !is_day && !weathercode && !temperature;
  const shouldFetch = latitude && longitude;
  const mountRef = useRef(true);
  const getSetCurrentWeather = useCallback(async () => {
    try {
      if (latitude && longitude && shouldFetch) {
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
    if (mountRef.current && shouldFetch) {
      getSetCurrentWeather();
      mountRef.current = false;
    }
  }, [latitude, longitude]);

  return (
    <div className={classes.CurrentWeatherWrapper}>
      {loading ? null : (
        <div className={classes.WeatherNow}>
          <h1 className={classes.Heading}>Now</h1>
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
