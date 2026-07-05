// Fine-grained ownership check, e.g. "can this user modify this bookmark?"
// Separate from restrictTo (role-based) since this is resource-based.
module.exports = function checkOwnership(getResourceOwnerId) {
  return async (req, res, next) => {
    const ownerId = await getResourceOwnerId(req);
    if (ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized for this resource' });
    }
    next();
  };
};
