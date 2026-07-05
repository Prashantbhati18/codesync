const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/auth.service');
const { success } = require('../utils/apiResponse');

exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user.id);
  return success(res, 200, 'Profile fetched', profile);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const updated = await userService.updateProfile(req.user.id, req.body);
  return success(res, 200, 'Profile updated', updated);
});
