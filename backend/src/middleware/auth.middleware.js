// Verifies the JWT on protected routes and attaches the decoded user to req.user.
// restrictTo() adds role-based authorization on top of authentication.
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
  }
  next();
};
