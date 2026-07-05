const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

// Admin-only endpoints, protected by auth + role middleware together.
exports.getAllUsers = asyncHandler(async (req, res) => {
  return success(res, 200, 'Users fetched', []);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  return success(res, 200, 'User deleted');
});

exports.manageplatforms = asyncHandler(async (req, res) => {
  return success(res, 200, 'Platforms fetched', []);
});

exports.getLogs = asyncHandler(async (req, res) => {
  return success(res, 200, 'Logs fetched', []);
});
