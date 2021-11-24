import React from 'react';
import { PropTypes } from 'prop-types';

const RainbowFrame = (props) => {
  return (
    <div
      style={{
        // props.colors.pop() короче, но пропсы менять нельзя
        border: props.colors.length > 0 && '12px solid ' + props.colors.slice(props.colors.length - 1),
        padding: '10px',
        maxWidth: '800px',
        fontSize: '2rem',
        lineHeight: '3',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {props.colors.length > 0 ? (
        <RainbowFrame colors={props.colors.slice(0, props.colors.length - 1)}>{props.children}</RainbowFrame>
      ) : (
        props.children
      )}
    </div>
  );
};

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default RainbowFrame;
