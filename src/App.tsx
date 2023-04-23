import { memo, useContext } from "react";

import { CurrentWeather, LoadingSpinner, WeatherToday } from "components";

import { GeoLocationContext } from "contexts";
import classes from "./App.module.scss";

function App() {
  const { latitude, longitude } = useContext(GeoLocationContext);

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
