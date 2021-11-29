import React from "react";
import { Fragment } from "react";
import { PropTypes } from "prop-types";

const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {
  return (
    <Fragment>
      <input
        type="button"
        name="first"
        value={caption1}
        onClick={(EO) => cbPressed && cbPressed(EO.target.value)}
        style={{ fontSize: "1.5rem", marginRight: "1ex"}}
      />
      {children}
      <input
        type="button"
        name="second"
        value={caption2}
        onClick={(EO) => cbPressed && cbPressed(EO.target.value)}
        style={{ fontSize: "1.5rem", marginLeft: "1ex"}}
      />
    </Fragment>
  );
};

DoubleButton.propTypes = {
  caption1: PropTypes.string.isRequired,
  caption2: PropTypes.string.isRequired,
  cbPressed: PropTypes.func,
};

export default DoubleButton;
