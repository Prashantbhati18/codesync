// Single place that formats every thrown/passed error into a consistent JSON shape.
// Must be registered LAST in app.js (after all routes).
module.exports = function errorMiddleware(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' });
  }
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, message: 'Duplicate entry (e.g. email already registered)' });
  }

  return res.status(statusCode).json({ success: false, message });
};
