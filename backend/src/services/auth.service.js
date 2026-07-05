// All auth business logic lives here: hashing, token creation, DB reads/writes.
// Controllers stay thin and just call these functions.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/user.model');
const emailService = require('./email.service');

const SALT_ROUNDS = 12;

exports.registerUser = async ({ name, email, password }) => {
  const existing = await userModel.findByEmail(email);
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.create({ name, email, password: hashedPassword });

  await emailService.sendWelcomeEmail(user.email, user.name);
  delete user.password;
  return user;
};

exports.loginUser = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  delete user.password;
  return { token, user };
};

exports.logoutUser = async (userId) => {
  // With stateless JWT, logout is typically handled client-side (discard token).
  // If using refresh-token rotation/blacklisting, invalidate it here.
  return true;
};

exports.sendPasswordResetEmail = async (email) => {
  const user = await userModel.findByEmail(email);
  if (!user) return; // Don't reveal whether the email exists

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  await userModel.setResetToken(user.id, hashedToken, Date.now() + 60 * 60 * 1000);

  await emailService.sendPasswordResetEmail(user.email, resetToken);
};

exports.resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await userModel.findByValidResetToken(hashedToken);
  if (!user) {
    const err = new Error('Token invalid or expired');
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await userModel.updatePassword(user.id, hashedPassword);
};

exports.getProfile = async (userId) => userModel.findById(userId);

exports.updateProfile = async (userId, data) => userModel.update(userId, data);
