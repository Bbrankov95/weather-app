import { useCallback, useState } from "react";

import { GeoLocation } from "types";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const initialState: GeoLocation = {
  longitude: null,
  latitude: null,
};

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocation>(initialState);

  const onSuccess = useCallback((pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
  }, []);

  const onError = useCallback((error: unknown) => {
    console.error(error);
  }, []);

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  return location;
};

export default useGeoLocation;
