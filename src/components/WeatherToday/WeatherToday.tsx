import { memo, useContext, useEffect, useState, useRef } from "react";

import { getDailyWeather } from "api";
import { WeatherContext } from "contexts";
import { resolveDailyWeather } from "utils";
import { WeatherItem } from "../WeatherCurrent/components";

import classes from "./WeatherToday.module.scss";

const WeatherToday = () => {
  const [loading, setLoading] = useState(true);
  const { latitude, longitude, dailyWeather, setDailyWeather } =
    useContext(WeatherContext);
  const mountRef = useRef(true);
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
    if (mountRef.current) {
      getSetDailyWeather();
      mountRef.current = false;
    }
  }, []);

  return loading ? null : (
    <div className={classes.WeatherToday}>
      <h2 className={classes.Heading}>Today's Weather</h2>
      <div className={classes.ItemsWrapper}>
        {data.map(([label, value], i: number) => (
          <WeatherItem key={`{label}-${i}`} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};

export default memo(WeatherToday);
