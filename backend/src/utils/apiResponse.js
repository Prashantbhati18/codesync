// Ensures every endpoint returns the same JSON envelope shape, e.g.
// { success: true, message: "...", data: {...} }
exports.success = (res, statusCode, message, data = null) =>
  res.status(statusCode).json({ success: true, message, data });

exports.error = (res, statusCode, message) =>
  res.status(statusCode).json({ success: false, message });
