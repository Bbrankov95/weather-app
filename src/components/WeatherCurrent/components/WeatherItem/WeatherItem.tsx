import { FC, memo, useCallback, useContext, useEffect, useMemo } from "react";
import Lottie from "react-lottie";

import {
  compass,
  sunrise,
  sunset,
  thermometer,
  thermometerColder,
  windsock,
} from "assets";
import { resolveLottieFromWeatherCode } from "utils";
import { WeatherContext } from "contexts";

import classes from "./WeatherItem.module.scss";
import { stagger, useAnimate, usePresence } from "framer-motion";

type WeatherItemProps = {
  label: string;
  value: string | number;
  className?: string;
  animationDelay?: number;
};

const options = {
  animationData: "",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const labelMap: { [key: string]: string } = {
  winddirection_10m_dominant: "Wind Direction",
  windspeed_10m_max: "Wind Speed",
  apparent_temperature_min: "Min Temp",
  apparent_temperature_max: "Max Temp",
  weathercode: "Forecast",
  time: "Last updated",
};

const labelLottieMap: { [key: string]: unknown } = {
  winddirection_10m_dominant: compass,
  windspeed_10m_max: windsock,
  apparent_temperature_min: thermometerColder,
  apparent_temperature_max: thermometer,
  sunrise: sunrise,
  sunset: sunset,
};

const WeatherItem: FC<WeatherItemProps> = ({
  label = "--|--",
  value,
  className,
  animationDelay = 2,
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const {
    currentWeather: { is_day },
  } = useContext(WeatherContext);

  const mappedLabel = labelMap[label];
  const isweathercode = label === "weathercode";
  const mappedLottie = useMemo(
    () =>
      isweathercode
        ? resolveLottieFromWeatherCode(Number(value), is_day)
        : labelLottieMap[label],
    [is_day, isweathercode, label, value]
  );
  const shouldPutCelsius =
    label === "apparent_temperature_min" ||
    label === "apparent_temperature_max";
  const shouldPutKmH = label === "windspeed_10m_max";

  const enterAnimation = useCallback(async () => {
    await animate(
      "div",
      {
        opacity: [0, 1],
      },
      {
        duration: 0.5,
        ease: "easeInOut",
        delay: stagger(0.3, { startDelay: animationDelay }),
      }
    );
  }, [animate, animationDelay]);

  useEffect(() => {
    if (isPresent) {
      enterAnimation();
    } else {
      safeToRemove();
    }
  }, [isPresent, value, enterAnimation, safeToRemove]);

  return (
    <div ref={scope} className={[classes.Wrapper, className].join(" ")}>
      <label className={classes.Label}>{mappedLabel ?? label}</label>
      <div className={classes.ValueWrapper}>
        <p>
          {isweathercode ? null : value}
          {shouldPutCelsius ? "°C" : null}
          {shouldPutKmH ? " kmH" : null}
        </p>
        {mappedLottie ? (
          <Lottie
            isClickToPauseDisabled
            width={50}
            options={{ ...options, animationData: mappedLottie }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default memo(WeatherItem);
