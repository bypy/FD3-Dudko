import React from "react";
import { Fragment } from "react";
import { PropTypes } from "prop-types";

import { withRainbowFrame } from "./withRainbowFrameHoc";

const RainbowFrame = ({ colors }) => {
  let FramedFragment = withRainbowFrame(colors)(Fragment);
  return <FramedFragment>Hello!</FramedFragment>;
};

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RainbowFrame;
