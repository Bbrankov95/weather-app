import { memo, useContext, useState } from "react";

import {
  WeatherCurrent,
  LoadingSpinner,
  SevenDaysForecast,
  Tabber,
  WeatherToday,
} from "components";

import { WeatherContext } from "contexts";

import classes from "./App.module.scss";

const tabs = [
  {
    id: "TODAY",
    label: "Today's Weather",
    component: (
      <>
        <WeatherCurrent />
        <WeatherToday />
      </>
    ),
  },
  { id: "FORECAST", label: "7d Forecast", component: <SevenDaysForecast /> },
];
type Tabs = typeof tabs;

function App() {
  const { geoLocationError, loading, getGeoLocation } =
    useContext(WeatherContext);
  const [component, setComponent] = useState<Tabs[0]["component"] | null>(null);
  const shouldShowContent = !loading && !geoLocationError;
  const shouldShowError = geoLocationError;
  const errorMsg =
    geoLocationError instanceof Error
      ? geoLocationError.message
      : "Error occurred! Please try again.";
  return (
    <div className={classes.App}>
      {shouldShowContent ? (
        <div className={classes.ContentWrapper}>
          <Tabber
            tabs={tabs as Tabs}
            onTabChange={({ component }) => setComponent(component)}
          />
          <div className={classes.CurrentWeatherWrapper}>{component}</div>
        </div>
      ) : null}
      {!shouldShowError && loading ? <LoadingSpinner /> : null}
      {shouldShowError ? (
        <p className={classes.ErrorMsg}>
          {errorMsg}
          <button onClick={getGeoLocation}>Try again</button>
        </p>
      ) : null}
    </div>
  );
}

export default memo(App);
