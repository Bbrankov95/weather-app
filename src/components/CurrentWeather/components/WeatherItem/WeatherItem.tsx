import { FC, memo } from "react";

import classes from "./WeatherItem.module.scss";

type WeatherItem = {
  label: string;
  value: string | number;
};

const labelMap: { [key: string]: string } = {
  winddirection: "Wind Direction",
  windspeed: "Wind Speed",
  apparent_temperature_min: "Min Temp",
  apparent_temperature_max: "Max Temp",
  weathercode: "Weather",
  time: "Last updated",
};

const WeatherItem: FC<WeatherItem> = ({ label, value }) => {
  const mappedLabel = labelMap[label];
  const shouldPutCelsius =
    label === "apparent_temperature_min" ||
    label === "apparent_temperature_max";
  const shouldPutKmH = label === "windspeed";
  return (
    <div className={classes.Wrapper}>
      <p>{mappedLabel ?? label}</p>
      <p>
        {value}
        {shouldPutCelsius && "°C"}
        {shouldPutKmH && "kmH"}
      </p>
    </div>
  );
};

export default memo(WeatherItem);
