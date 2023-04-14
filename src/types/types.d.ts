export type GeoLocation = {
  longitude: number | null;
  latitude: number | null;
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
};

export type Weather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily: DailyWeather;
};
