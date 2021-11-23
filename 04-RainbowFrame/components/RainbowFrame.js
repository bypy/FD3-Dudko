import React from 'react';
import { PropTypes } from 'prop-types';

const RainbowFrame = (props) => {
  return (
    <div
      style={{
        border: '12px solid ' + props.colors.pop(),
        padding: '10px',
        maxWidth: '800px',
        fontSize: '2rem',
        lineHeight: '3',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {props.colors.length > 0 ? <RainbowFrame colors={props.colors}>{props.children}</RainbowFrame> : props.children}
    </div>
  );
};

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default RainbowFrame;
