import { memo, useContext } from "react";

import { WeatherContext } from "contexts";

import classes from "./SevenDaysForecast.module.scss";
import { resolveSevenDaysForecast } from "utils";
import { WeatherItem } from "components/WeatherCurrent/components";

const SevenDaysForecast = () => {
  const { dailyWeather } = useContext(WeatherContext);
  const forecast = resolveSevenDaysForecast(dailyWeather);

  return (
    <div className={classes.Wrapper}>
      <h1>Seven Days Forecast</h1>
      <div className={classes.InnerWrapper}>
        {forecast.map(({ name, forecast }, i) => (
          <div key={`${i}-${name}`} className={classes.ForecastWrapper}>
            <h3>{name}</h3>
            {forecast.map(([label, value], ii: number) => (
              <WeatherItem
                key={`${i}-${label}-${ii}`}
                className={classes.Item}
                label={label as string}
                value={value}
                animationDelay={0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SevenDaysForecast);
