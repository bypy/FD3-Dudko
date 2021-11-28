import React from 'react';
import { PropTypes } from 'prop-types';

const BR2JSX = (props) => {
  let paragraph = [];
  props.text
    .split(/<br\s*\/?>/gi)
    .forEach((txtLine, index) => {
      index > 0 && paragraph.push(<br key={index}/>);
      paragraph.push(txtLine);
    });
  return (
    <div style={{ width: '226px', height: 'auto', margin: '0 auto', backgroundColor: '#2f4f4f', color: 'white', padding: '40px 0', fontSize: '2rem', fontFamily: 'serif', textAlign: 'center' }}
    >
      {paragraph}
    </div>
  );
};

BR2JSX.propTypes = {
  text: PropTypes.string
};

export default BR2JSX;
