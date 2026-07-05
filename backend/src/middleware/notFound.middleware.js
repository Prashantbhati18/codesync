// Catches any request that didn't match a route, before it reaches errorMiddleware.
module.exports = function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};
