import React from "react";
import ReactDOM from "react-dom/client";

import { GeoLocationContextProvider } from "contexts";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GeoLocationContextProvider>
      <App />
    </GeoLocationContextProvider>
  </React.StrictMode>
);
