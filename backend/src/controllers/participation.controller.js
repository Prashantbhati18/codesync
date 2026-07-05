const asyncHandler = require('../utils/asyncHandler');
const participationService = require('../services/participation.service');
const { success } = require('../utils/apiResponse');

exports.markParticipation = asyncHandler(async (req, res) => {
  const record = await participationService.markParticipation(req.user.id, req.body);
  return success(res, 201, 'Participation recorded', record);
});

exports.getParticipationHistory = asyncHandler(async (req, res) => {
  const history = await participationService.getHistory(req.user.id);
  return success(res, 200, 'Participation history fetched', history);
});

exports.updateParticipation = asyncHandler(async (req, res) => {
  const updated = await participationService.updateParticipation(req.params.id, req.body);
  return success(res, 200, 'Participation updated', updated);
});
