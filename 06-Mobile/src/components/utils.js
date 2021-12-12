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

const newSubscriberTempId = 99999;

export { concatAndHash, makeLogger, newSubscriberTempId };
