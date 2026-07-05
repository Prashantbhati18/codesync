const asyncHandler = require('../utils/asyncHandler');
const contestService = require('../services/contest.service');
const { success } = require('../utils/apiResponse');

exports.getAllContests = asyncHandler(async (req, res) => {
  const contests = await contestService.getContests(req.query);
  return success(res, 200, 'Contests fetched', contests);
});

exports.getUpcomingContests = asyncHandler(async (req, res) => {
  const contests = await contestService.getUpcomingContests();
  return success(res, 200, 'Upcoming contests fetched', contests);
});

exports.getContestsByPlatform = asyncHandler(async (req, res) => {
  const contests = await contestService.getContestsByPlatform(req.params.id);
  return success(res, 200, 'Platform contests fetched', contests);
});

exports.getContestById = asyncHandler(async (req, res) => {
  const contest = await contestService.getContestById(req.params.id);
  return success(res, 200, 'Contest fetched', contest);
});

exports.syncContests = asyncHandler(async (req, res) => {
  const result = await contestService.syncFromExternalAPIs();
  return success(res, 200, 'Contests synced', result);
});
