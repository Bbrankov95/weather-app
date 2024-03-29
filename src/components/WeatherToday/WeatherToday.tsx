import {
  memo,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { stagger, useAnimate, usePresence } from "framer-motion";

import { getDailyWeather } from "api";
import { WeatherContext } from "contexts";
import { resolveDailyWeather } from "utils";
import { WeatherItem } from "../WeatherCurrent/components";

import classes from "./WeatherToday.module.scss";

const WeatherToday = () => {
  const [scope, animate] = useAnimate();
  const [isPresent] = usePresence();
  const [loading] = useState(true);
  const { latitude, longitude, dailyWeather, setDailyWeather } =
    useContext(WeatherContext);
  const mountRef = useRef(true);

  const data = resolveDailyWeather(dailyWeather);

  const getSetDailyWeather = useCallback(async () => {
    try {
      const { daily } = await getDailyWeather(latitude, longitude);
      setDailyWeather(daily);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, [latitude, longitude, setDailyWeather]);

  const animation = useCallback(async () => {
    await animate(
      "div",
      {
        x: [-100, 0],
        visibility: "visible",
      },
      { duration: 0.7, delay: stagger(0.1), ease: "backOut" }
    );
  }, [animate]);

  useEffect(() => {
    if (mountRef.current) {
      getSetDailyWeather();
      mountRef.current = false;
    }
  }, [getSetDailyWeather]);

  useEffect(() => {
    if (isPresent && scope.current?.children?.length) {
      animation();
    }
  }, [isPresent, data, scope, animation]);

  return (
    <div
      style={{
        visibility: loading ? "hidden" : "visible",
      }}
      className={classes.WeatherToday}
    >
      <h2 className={classes.Heading}>Today's Weather</h2>
      <div ref={scope} className={classes.ItemsWrapper}>
        {data.map(([label, value], i: number) => (
          <WeatherItem
            key={`{label}-${i}`}
            label={label as string}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(WeatherToday);
