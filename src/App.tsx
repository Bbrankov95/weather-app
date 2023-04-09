import { useEffect, useState } from "react";

import { useGeoLocation } from "hooks";

import classes from "./App.module.scss";

function App() {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState<unknown | null>(null);
  const location = useGeoLocation();

  const getCurrentWeather = async () => {
    try {
      // const { latitude, longitude } = geoLocation;
      // const { current_weather } = await (
      //   await fetch(API_URL(latitude, longitude))
      // ).json();
      // if (current_weather) {
      //   setWeather(current_weather);
      // }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  useEffect(() => {}, []);
  return <div className="App"></div>;
}

export default App;
