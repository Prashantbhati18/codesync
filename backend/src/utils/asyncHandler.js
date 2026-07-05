// Wraps async controller functions so rejected promises are forwarded to
// Express's error middleware instead of crashing the process (no more try/catch
// boilerplate in every controller).
module.exports = function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
