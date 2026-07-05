// Controllers stay "thin": parse request, call a service, shape the response.
// All business logic (hashing, token signing, etc.) lives in auth.service.js
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
const { success } = require('../utils/apiResponse');

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  return success(res, 201, 'User registered successfully', user);
});

exports.login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);
  return success(res, 200, 'Login successful', { token, user });
});

exports.logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.id);
  return success(res, 200, 'Logged out successfully');
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  await authService.sendPasswordResetEmail(req.body.email);
  return success(res, 200, 'Password reset email sent');
});

exports.resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  return success(res, 200, 'Password reset successful');
});
