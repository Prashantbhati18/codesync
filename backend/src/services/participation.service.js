const participationModel = require('../models/participationHistory.model');

exports.markParticipation = async (userId, data) =>
  participationModel.create({ userId, ...data });

exports.updateParticipation = async (id, data) => participationModel.update(id, data);

exports.getHistory = async (userId) => participationModel.findByUser(userId);

// Powers the analytics dashboard: favorite platform, monthly counts,
// platform-wise breakdown, heatmap data, success rate, etc.
exports.getDashboardStats = async (userId) => {
  const history = await participationModel.findByUser(userId);

  const totalContests = history.length;
  const participated = history.filter((h) => h.status === 'participated').length;
  const successRate = totalContests ? Math.round((participated / totalContests) * 100) : 0;

  return {
    totalContests,
    participated,
    missed: totalContests - participated,
    successRate,
    // platformBreakdown, monthlyParticipation, heatmapData computed similarly
  };
};
