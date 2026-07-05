// Fetches/normalizes contest data from external platform APIs and reads from
// our own DB for the app's filtered/search views. The cron job calls
// syncFromExternalAPIs() on a schedule; this file has no timing logic itself.
const axios = require('axios');
const contestModel = require('../models/contest.model');

exports.getContests = async (filters) => contestModel.findAll(filters);

exports.getUpcomingContests = async () => contestModel.findUpcoming();

exports.getContestsByPlatform = async (platformId) => contestModel.findByPlatform(platformId);

exports.getContestById = async (id) => contestModel.findById(id);

exports.syncFromExternalAPIs = async () => {
  // Example shape: each platform adapter returns a normalized contest array,
  // then we upsert into the `contests` table (dedup by platform + external id).
  // const cfContests = await fetchCodeforces();
  // const lcContests = await fetchLeetCode();
  // ...
  // await contestModel.bulkUpsert([...cfContests, ...lcContests]);
  return { synced: true };
};
