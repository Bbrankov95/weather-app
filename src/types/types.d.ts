export type GeoLocation = {
  longitude: number;
  latitude: number;
};

export type CurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
};

export type DailyWeather = {
  time: string[];
  sunrise: string[];
  sunset: string[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  weatherCode: number[];
  windspeed_10m_max: number[];
  winddirection_10m_dominant: number[];
};

export type Weather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};
