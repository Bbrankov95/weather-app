import { useCallback, useEffect, useState } from "react";

import { GeoLocation } from "types";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const initialState: GeoLocation = {
  longitude: 0,
  latitude: 0,
};

const useGeoLocation = (): [GeoLocation, unknown] => {
  const [location, setLocation] = useState<GeoLocation>(initialState);
  const [error, setError] = useState<null | unknown>(null);

  const getGeoLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      options
    );
  };

  const onSuccess = useCallback((pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
  }, []);

  const onError = useCallback((error: unknown) => {
    setError(error);
  }, []);

  useEffect(() => {
    getGeoLocation();
  }, []);

  return [location, error];
};

export default useGeoLocation;
