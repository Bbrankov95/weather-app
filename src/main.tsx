import React from "react";
import ReactDOM from "react-dom/client";

import { WeatherContextProvider } from "contexts";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WeatherContextProvider>
      <App />
    </WeatherContextProvider>
  </React.StrictMode>
);
