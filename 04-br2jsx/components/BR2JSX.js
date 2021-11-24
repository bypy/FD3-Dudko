import React from 'react';
import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

const BR2JSX = (props) => {
  return (
    <div
      style={{
        width: '226px',
        height: 'auto',
        margin: '0 auto',
        backgroundColor: '#2f4f4f',
        color: 'white',
        padding: '40px 0',
        fontSize: '2rem',
        fontFamily: 'serif',
        textAlign: 'center',
      }}
    >
      {props.text.split(/<br\s*\/?>/gi).map((word, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {word}
        </Fragment>
      ))}
    </div>
  );
};

BR2JSX.propTypes = {
  text: PropTypes.string,
};

export default BR2JSX;
