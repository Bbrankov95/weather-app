import { memo, useContext, useEffect, useState } from "react";

import { DailyWeather } from "types";
import { WeatherItem } from "../CurrentWeather/components";

import classes from "./WeatherToday.module.scss";
import { getDailyWeather } from "api";
import { GeoLocationContext } from "contexts";
import { resolveDailyWeather } from "utils";

const initialState: DailyWeather = {
  apparent_temperature_max: [],
  apparent_temperature_min: [],
  sunrise: [],
  sunset: [],
  time: [],
  weatherCode: [],
  winddirection_10m_dominant: [],
  windspeed_10m_max: [],
};

const WeatherToday = () => {
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>(initialState);
  const { latitude, longitude } = useContext(GeoLocationContext);
  const data = resolveDailyWeather(dailyWeather);

  const getSetDailyWeather = async () => {
    try {
      const { daily } = await getDailyWeather(latitude, longitude);
      setDailyWeather(daily);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSetDailyWeather();
  }, []);
  return (
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
