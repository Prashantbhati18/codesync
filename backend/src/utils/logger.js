// Minimal structured logger. Swap for winston/pino in a real production setup.
const levels = { info: 'INFO', warn: 'WARN', error: 'ERROR' };

function log(level, message, meta = {}) {
  console.log(JSON.stringify({ level, message, ...meta, timestamp: new Date().toISOString() }));
}

module.exports = {
  info: (msg, meta) => log(levels.info, msg, meta),
  warn: (msg, meta) => log(levels.warn, msg, meta),
  error: (msg, meta) => log(levels.error, msg, meta),
};
