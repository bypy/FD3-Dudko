import { LOG_MODE } from './logModes';

function concatAndHash() {
  return Math.abs(
    Array.from(arguments)
      .join('')
      .split('')
      .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
  );
}

function makeLogger(output, mode) {
  if (!output || !output.log) throw Error('Provide logging entity with .info and .log methods implementation!');
  return mode === LOG_MODE.INFO
    ? (message) => output.info(message)
    : (message) => output.log(`${LOG_MODE.DEBUG}: ${message}`);
}

function subscriberFilterFunc(currentFilter, subscriber) {
  return (
    currentFilter === 0 ||
    (currentFilter === 1 && !(subscriber.balance < 0)) ||
    (currentFilter === 2 && subscriber.balance < 0)
  );
}

const newSubscriberTempId = 0;
const newSubscriberInitBalance = 0;

export { concatAndHash, makeLogger, subscriberFilterFunc, newSubscriberTempId, newSubscriberInitBalance };
