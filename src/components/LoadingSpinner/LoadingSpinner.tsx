import { memo } from "react";
import Lottie from "react-lottie";

import { loading } from "assets";

import classes from "./LoadingSpinner.module.scss";

const options = {
  animationData: loading,
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
        isClickToPauseDisabled
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
