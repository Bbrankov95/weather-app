import React, {
  FC,
  SetStateAction,
  createContext,
  memo,
  useState,
} from "react";

import { useGeoLocation } from "hooks";
import { GeoLocation, CurrentWeather, DailyWeather } from "types";

type WeatherContextProps = {
  longitude: GeoLocation["longitude"];
  latitude: GeoLocation["latitude"];
  currentWeather: CurrentWeather;
  setCurrentWeather: React.Dispatch<SetStateAction<CurrentWeather>>;
  dailyWeather: DailyWeather;
  setDailyWeather: React.Dispatch<SetStateAction<DailyWeather>>;
  geoLocationError: unknown;
  loading: boolean;
  getGeoLocation: () => void;
};

export const WeatherContext = createContext<WeatherContextProps>({
  longitude: 0,
  latitude: 0,
  currentWeather: {
    is_day: 0,
    weathercode: 0,
    temperature: 0,
    winddirection: 0,
    windspeed: 0,
    time: "",
  },
  setCurrentWeather: (prevState) => prevState,
  dailyWeather: {
    apparent_temperature_max: [],
    apparent_temperature_min: [],
    sunrise: [],
    sunset: [],
    time: [],
    weathercode: [],
    winddirection_10m_dominant: [],
    windspeed_10m_max: [],
  },
  setDailyWeather: (prevState) => prevState,
  geoLocationError: "",
  loading: true,
  getGeoLocation() {},
});

type WeatherContextProviderProps = {
  children: React.ReactNode;
};

const weatherInitialState: CurrentWeather = {
  is_day: 0,
  weathercode: 0,
  temperature: 0,
  winddirection: 0,
  windspeed: 0,
  time: "",
};

const dailyWeatherInitialState: DailyWeather = {
  apparent_temperature_max: [],
  apparent_temperature_min: [],
  sunrise: [],
  sunset: [],
  time: [],
  weathercode: [],
  winddirection_10m_dominant: [],
  windspeed_10m_max: [],
};

const WeatherContextProvider: FC<WeatherContextProviderProps> = ({
  children,
}) => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeather>(weatherInitialState);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>(
    dailyWeatherInitialState
  );

  const [{ latitude, longitude }, geoLocationError, loading, getGeoLocation] =
    useGeoLocation();

  const value = {
    latitude,
    longitude,
    currentWeather,
    setCurrentWeather,
    dailyWeather,
    setDailyWeather,
    geoLocationError,
    loading,
    getGeoLocation,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default memo(WeatherContextProvider);
