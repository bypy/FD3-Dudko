import React from 'react';
import ReactDOM from 'react-dom';

import '../public/page.css';
import MobileCompany from './components/MobileCompany';

const subscribers = require('./data/subscribers.json').map((subscriber) => {
  // hashing FIO
  subscriber.id = concatAndHash(subscriber.lastName, subscriber.firstName, subscriber.surName);
  return subscriber;
});

ReactDOM.render(
  <div className="container">
    <MobileCompany subscribers={subscribers} loggerMode="debug" />
  </div>,
  document.getElementById('root')
);

function concatAndHash() {
  return Array.from(arguments)
    .join('')
    .split('')
    .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
}
