import { memo, useContext, useEffect, useState } from "react";

import {
  CurrentWeather,
  LoadingSpinner,
  SevenDaysForecast,
  WeatherToday,
} from "components";

import { WeatherContext } from "contexts";
import classes from "./App.module.scss";

function App() {
  const [drawer, setDrawer] = useState(false);
  const { latitude, longitude } = useContext(WeatherContext);

  const loading = !latitude || !longitude;

  useEffect(() => {
    document.addEventListener("wheel", (e) => {
      const { deltaY } = e;
      if (deltaY > 0) {
        setDrawer(false);
      } else {
        setDrawer(true);
      }
    });

    return () => document.removeEventListener("wheel", () => {});
  }, []);
  return (
    <div className={classes.App}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.ContentWrapper}>
          <div className={classes.CurrentWeatherWrapper}>
            <CurrentWeather />
            <WeatherToday />
          </div>
          <div
            className={[
              classes.Drawer,
              drawer ? classes.Active : classes.InActive,
            ].join(" ")}
          >
            <SevenDaysForecast />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(App);
