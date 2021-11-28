import React from "react";

const withRainbowFrame = (colors) => {
  return (Component) => {
    return (props) => {
      let code = <Component {...props}>{props.children}</Component>;
      colors.forEach((color) => {
        code = (
          <div style={{ border: "12px solid " + color, padding: "10px", maxWidth: "800px", fontSize: "2rem", lineHeight: "3", fontWeight: "bold", textAlign: "center", }}>{code}</div>
        );
      });
      return code;
    };
  };
};

export { withRainbowFrame };
