import { memo } from "react";
import Lottie from "react-lottie";

import loadingSpinner from "assets/weather-loading.json";

import classes from "./LoadingSpinner.module.scss";

const options = {
  animationData: loadingSpinner,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoadingSpinner = () => {
  return (
    <div className={classes.LoadingSpinnerWrapper}>
      <Lottie
        options={options}
        style={{
          width: "30%",
        }}
      />
      <p>We are currently checking your geolocation, please wait...</p>
    </div>
  );
};

export default memo(LoadingSpinner);
