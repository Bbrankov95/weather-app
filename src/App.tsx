import { memo, useCallback, useEffect, useState } from "react";

import { CurrentWeather, LoadingSpinner } from "components";
import { useGeoLocation } from "hooks";
import { Weather } from "types";
import { getCurrentWeather } from "api/weatherApi";

import classes from "./App.module.scss";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [{ latitude, longitude }, geoLocationError] = useGeoLocation();
  const currentWeatherData = weather
    ? { ...weather.current_weather, daily: weather.daily }
    : null;

  const getSetWeather = useCallback(async () => {
    try {
      if (latitude && longitude) {
        const data = await getCurrentWeather(latitude, longitude);
        setWeather(data);
      }
    } catch (error) {
      setError(error);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    setError(geoLocationError);
  }, [geoLocationError]);

  useEffect(() => {
    if (latitude && longitude) {
      getSetWeather();
    }
  }, [latitude, longitude]);

  return (
    <div className={classes.App}>
      {currentWeatherData ? (
        <CurrentWeather {...currentWeatherData} />
      ) : error ? (
        <p>
          {error instanceof Error
            ? error?.message
            : "Error Occurred. Please refresh and try again."}
        </p>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default memo(App);
