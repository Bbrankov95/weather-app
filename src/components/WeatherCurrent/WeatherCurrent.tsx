import {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useMemo,
} from "react";

import Lottie from "react-lottie";

import { getCurrentWeather } from "api";
import { WeatherContext } from "contexts";

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

const WeatherCurrent = () => {
  const [, setError] = useState<unknown | null>(null);
  const { latitude, longitude, currentWeather, setCurrentWeather } =
    useContext(WeatherContext);
  const { is_day, weathercode, temperature } = currentWeather;
  const forecast = useMemo(
    () => resolveForecastFromWeatherModel(weathercode),
    [weathercode]
  );
  const lottie = useMemo(
    () => resolveLottieFromWeatherCode(weathercode, is_day),
    [weathercode, is_day]
  );
  const loading = useMemo(
    () => !is_day && !weathercode && !temperature,
    [is_day, temperature, weathercode]
  );
  const shouldFetch = useMemo(
    () => latitude && longitude,
    [latitude, longitude]
  );
  const mountRef = useRef(true);

  const getSetCurrentWeather = useCallback(async () => {
    try {
      if (shouldFetch) {
        const { current_weather } = await getCurrentWeather(
          latitude,
          longitude
        );
        setCurrentWeather(current_weather);
      }
    } catch (error) {
      setError(error);
    }
  }, [latitude, longitude, setCurrentWeather, shouldFetch]);

  useEffect(() => {
    if (mountRef.current && shouldFetch) {
      getSetCurrentWeather();
      mountRef.current = false;
    }
  }, [getSetCurrentWeather, latitude, longitude, shouldFetch]);
  return (
    <div className={classes.CurrentWeatherWrapper}>
      {loading ? (
        <div
          style={{
            width: "400px",
            background: "rgba(#FFFFFF,0.1)",
          }}
        />
      ) : (
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
            Current Temp: {Math.round(temperature)}°C
          </p>
          <p className={classes.WeatherInfo}>{forecast}</p>
        </div>
      )}
    </div>
  );
};

export default memo(WeatherCurrent);
