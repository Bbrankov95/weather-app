import {
  clearDay,
  clearNight,
  partlyCloudyDay,
  partlyCloudyNight,
  fogDay,
  fogNight,
  drizzleDay,
  drizzleNight,
  thunderstormRainNight,
  thunderstormRainDay,
  thunderstormExtRainNight,
  thunderstormExtRainDay,
  rainDay,
  rainNight,
  snowShowersDay,
  snowShowersNight,
  snowGrains,
  rainShowersDay,
  rainShowersNight,
  snowNight,
  snowDay,
  freezingDrizzleNight,
  freezingDrizzleDay,
  freezingRainNight,
  freezingRainDay,
} from "assets";

export const weatherModels: {
  [key: string]: { forecast: string; lottie: [night: any, day: any] };
} = {
  0: { forecast: "Clear sky", lottie: [clearDay, clearNight] },
  1: {
    forecast: "Mainly clear, partly cloudy, and overcast",
    lottie: [partlyCloudyNight, partlyCloudyDay],
  },
  2: {
    forecast: "Mainly clear, partly cloudy, and overcast",
    lottie: [partlyCloudyNight, partlyCloudyDay],
  },
  3: {
    forecast: "Mainly clear, partly cloudy, and overcast",
    lottie: [partlyCloudyNight, partlyCloudyDay],
  },
  45: { forecast: "Fog and depositing rime fog", lottie: [fogNight, fogDay] },
  48: { forecast: "Fog and depositing rime fog", lottie: [fogNight, fogDay] },
  51: {
    forecast: "Drizzle: Light, moderate, and dense intensity",
    lottie: [drizzleNight, drizzleDay],
  },
  53: {
    forecast: "Drizzle: Light, moderate, and dense intensity",
    lottie: [drizzleNight, drizzleDay],
  },
  55: {
    forecast: "Drizzle: Light, moderate, and dense intensity",
    lottie: [drizzleNight, drizzleDay],
  },
  56: {
    forecast: "Freezing Drizzle: Light and dense intensity",
    lottie: [freezingDrizzleNight, freezingDrizzleDay],
  },
  57: {
    forecast: "Freezing Drizzle: Light and dense intensity",
    lottie: [freezingDrizzleNight, freezingDrizzleDay],
  },
  61: {
    forecast: "Rain: Slight, moderate and heavy intensity",
    lottie: [rainNight, rainDay],
  },
  63: {
    forecast: "Rain: Slight, moderate and heavy intensity",
    lottie: [rainNight, rainDay],
  },
  65: {
    forecast: "Rain: Slight, moderate and heavy intensity",
    lottie: [rainNight, rainDay],
  },
  66: {
    forecast: "Freezing Rain: Light and heavy intensity",
    lottie: [freezingRainNight, freezingRainDay],
  },
  67: {
    forecast: "Freezing Rain: Light and heavy intensity",
    lottie: [freezingRainNight, freezingRainDay],
  },
  71: {
    forecast: "Snow fall: Slight, moderate, and heavy intensity",
    lottie: [snowNight, snowDay],
  },
  73: {
    forecast: "Snow fall: Slight, moderate, and heavy intensity",
    lottie: [snowNight, snowDay],
  },
  75: {
    forecast: "Snow fall: Slight, moderate, and heavy intensity",
    lottie: [snowNight, snowDay],
  },
  77: { forecast: "Snow grains", lottie: [snowGrains, snowGrains] },
  80: {
    forecast: "Rain showers: Slight, moderate, and violent",
    lottie: [rainShowersNight, rainShowersDay],
  },
  81: {
    forecast: "Rain showers: Slight, moderate, and violent",
    lottie: [rainShowersNight, rainShowersDay],
  },
  82: {
    forecast: "Rain showers: Slight, moderate, and violent",
    lottie: [rainShowersNight, rainShowersDay],
  },
  85: {
    forecast: "Snow showers slight and heavy",
    lottie: [snowShowersNight, snowShowersDay],
  },
  86: {
    forecast: "Snow showers slight and heavy",
    lottie: [snowShowersNight, snowShowersDay],
  },
  95: {
    forecast: "Thunderstorm: Slight or moderate",
    lottie: [thunderstormRainNight, thunderstormRainDay],
  },
  96: {
    forecast: "Thunderstorm with slight and heavy hail",
    lottie: [thunderstormExtRainNight, thunderstormExtRainDay],
  },
  99: {
    forecast: "Thunderstorm with slight and heavy hail",
    lottie: [thunderstormExtRainNight, thunderstormExtRainDay],
  },
};
