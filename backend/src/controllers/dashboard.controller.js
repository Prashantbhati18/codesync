const asyncHandler = require('../utils/asyncHandler');
const participationService = require('../services/participation.service');
const { success } = require('../utils/apiResponse');

// Aggregates analytics used by the Chart.js dashboard:
// favorite platform, monthly participation, success rate, heatmap data, etc.
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await participationService.getDashboardStats(req.user.id);
  return success(res, 200, 'Dashboard stats fetched', stats);
});
