import React, { FC, createContext, memo } from "react";

import { useGeoLocation } from "hooks";
import { GeoLocation } from "types";

export const GeoLocationContext = createContext<GeoLocation>({
  longitude: 0,
  latitude: 0,
});

type GeoLocationProvider = {
  children: React.ReactNode;
};

const GeoLocationContextProvider: FC<GeoLocationProvider> = ({ children }) => {
  const [{ latitude, longitude }, geoLocationError] = useGeoLocation();

  const value = { latitude, longitude };

  return (
    <GeoLocationContext.Provider value={value}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export default memo(GeoLocationContextProvider);
