const bookmarkModel = require('../models/bookmark.model');

exports.addBookmark = async (userId, contestId) => bookmarkModel.create({ userId, contestId });

exports.removeBookmark = async (userId, bookmarkId) => bookmarkModel.delete(userId, bookmarkId);

exports.getUserBookmarks = async (userId) => bookmarkModel.findByUser(userId);
