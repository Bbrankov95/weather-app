import { useCallback, useEffect, useState } from "react";

import { CurrentWeather, LoadingSpinner } from "components";
import { useGeoLocation } from "hooks";
import { Weather } from "types";
import { getCurrentWeather } from "api/weatherApi";

import classes from "./App.module.scss";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const { latitude, longitude } = useGeoLocation();

  const currentWeather = !!weather?.current_weather;

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

  // const getSetWeekWeather = useCallback(async () => {
  //   try {
  //     if (latitude && longitude) {
  //       const data = await getWeekWeather(latitude, longitude);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   }
  // }, [longitude, latitude]);

  useEffect(() => {
    if (latitude && longitude) {
      getSetWeather();
    }
  }, [latitude, longitude]);

  return (
    <div className={classes.App}>
      {currentWeather ? (
        <CurrentWeather {...weather.current_weather} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default App;
