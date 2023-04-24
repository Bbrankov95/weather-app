import { memo, useContext, useEffect, useState } from "react";

import { CurrentWeather, LoadingSpinner, WeatherToday } from "components";

import { WeatherContext } from "contexts";
import classes from "./App.module.scss";

function App() {
  const { latitude, longitude } = useContext(WeatherContext);

  const loading = !latitude || !longitude;

  return (
    <div className={classes.App}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.ContentWrapper}>
          <CurrentWeather />
          <WeatherToday />
        </div>
      )}
    </div>
  );
}

export default memo(App);
