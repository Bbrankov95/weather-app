import { memo, useContext, useEffect, useState, useRef } from "react";
import { stagger, useAnimate, usePresence } from "framer-motion";

import { getDailyWeather } from "api";
import { WeatherContext } from "contexts";
import { resolveDailyWeather } from "utils";
import { WeatherItem } from "../WeatherCurrent/components";

import classes from "./WeatherToday.module.scss";

const WeatherToday = () => {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
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

  const animation = async () => {
    await animate(
      "div",
      {
        x: [-100, 0],
        visibility: "visible",
      },
      { duration: 1, delay: stagger(0.1), ease: "easeInOut" }
    );
  };

  useEffect(() => {
    if (isPresent && scope.current?.children?.length) {
      animation();
    }
  }, [isPresent, data]);

  return loading ? null : (
    <div className={classes.WeatherToday}>
      <h2 className={classes.Heading}>Today's Weather</h2>
      <div ref={scope} className={classes.ItemsWrapper}>
        {data.map(([label, value], i: number) => (
          <WeatherItem key={`{label}-${i}`} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};

export default memo(WeatherToday);
