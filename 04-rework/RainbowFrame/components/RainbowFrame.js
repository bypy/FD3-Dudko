import React from 'react';
import { PropTypes } from 'prop-types';

const RainbowFrame = (props) => {
  let frames = props.children;
  // будем в цикле оборачивать содеримое `frames` рамкой-div-ом
  // передавая `frames` следующей рамке в качестве props.children
  // получим в переменной frames итоговый jsx
  props.colors.forEach((color, index) => {
    frames = <div style={{ border: props.colors.length > 0 && '12px solid ' + color }}>
      { frames } {/*между тегами vdom нужна интерполяция*/}
    </div>;
  })

  return frames; // вот тут интеполяция уже не нужна
};

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RainbowFrame;
