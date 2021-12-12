import React from 'react';
import ReactDOM from 'react-dom';

import '../public/page.css';
import MobileCompany from './components/MobileCompany';
import { eventBus } from './components/eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT } from './components/eventsAvailable';
import { LOG_MODE } from './components/logModes';

const loggerMode = LOG_MODE.DEBUG;
const logger = makeLogger(console, loggerMode); // an interface of the logging object must provide .info and .log methods

const subscribers = require('./data/subscribers.json').map((subscriber) => {
  // hashing FIO
  subscriber.id = concatAndHash(subscriber.lastName, subscriber.firstName, subscriber.surName);
  return subscriber;
});

eventBus.addListener(LIFECYCLE_EVENT, logger);
eventBus.addListener(RENDER_EVENT, logger);

ReactDOM.render(
  <div className="container">
    <MobileCompany company="A1" subscribers={subscribers} loggerMode={loggerMode} />
  </div>,
  document.getElementById('root')
);

function concatAndHash() {
  return Math.abs(Array.from(arguments)
    .join('')
    .split('')
    .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));
}

function makeLogger(output, mode) {
  if (!output || !output.log) throw Error('Provide logging entity with .info and .log methods implementation!');
  return mode === LOG_MODE.INFO ? (message) => output.info(message) : (message) => output.log(message);
}
