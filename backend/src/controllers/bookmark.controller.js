const asyncHandler = require('../utils/asyncHandler');
const bookmarkService = require('../services/bookmark.service');
const { success } = require('../utils/apiResponse');

exports.addBookmark = asyncHandler(async (req, res) => {
  const bookmark = await bookmarkService.addBookmark(req.user.id, req.body.contestId);
  return success(res, 201, 'Contest bookmarked', bookmark);
});

exports.removeBookmark = asyncHandler(async (req, res) => {
  await bookmarkService.removeBookmark(req.user.id, req.params.id);
  return success(res, 200, 'Bookmark removed');
});

exports.getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await bookmarkService.getUserBookmarks(req.user.id);
  return success(res, 200, 'Bookmarks fetched', bookmarks);
});
