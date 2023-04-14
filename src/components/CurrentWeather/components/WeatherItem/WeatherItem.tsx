import { FC, memo } from "react";

type WeatherItem = {
  label: string | number;
  value: string | number;
};

const WeatherItem: FC<WeatherItem> = ({ label, value }) => {
  return (
    <div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default memo(WeatherItem);
