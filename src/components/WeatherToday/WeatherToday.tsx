import { memo, useContext, useEffect, useState } from "react";

import { DailyWeather } from "types";
import { WeatherItem } from "../WeatherCurrent/components";

import classes from "./WeatherToday.module.scss";
import { getDailyWeather } from "api";
import { WeatherContext } from "contexts";
import { resolveDailyWeather } from "utils";

const WeatherToday = () => {
  const [loading, setLoading] = useState(true);
  const { latitude, longitude, dailyWeather, setDailyWeather } =
    useContext(WeatherContext);
  const data = resolveDailyWeather(dailyWeather);

  const getSetDailyWeather = async () => {
    try {
      const { daily } = await getDailyWeather(latitude, longitude);
      setDailyWeather(daily);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSetDailyWeather();
  }, []);

  return loading ? null : (
    <div className={classes.WeatherToday}>
      <h3 className={classes.Heading}>Today's Weather</h3>
      <div className={classes.ItemsWrapper}>
        {data.map(([label, value], i: number) => (
          <WeatherItem key={`{label}-${i}`} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};

export default memo(WeatherToday);
