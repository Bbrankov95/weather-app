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

const useGeoLocation = (): [GeoLocation, unknown, boolean, () => void] => {
  const [location, setLocation] = useState<GeoLocation>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  const getGeoLocation = () => {
    setError(null);
    setLoading(true);
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
    setLoading(false);
  }, []);

  const onError = useCallback((error: unknown) => {
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    getGeoLocation();
  }, []);

  return [location, error, loading, getGeoLocation];
};

export default useGeoLocation;
