// Analytics dashboard: pulls aggregated stats and renders Chart.js visualizations
// (favorite platform, monthly participation, success rate, etc.)
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/contest.service';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(({ data }) => setStats(data.data));
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Contests: {stats.totalContests}</div>
        <div className="bg-white p-4 rounded shadow">Success Rate: {stats.successRate}%</div>
        <div className="bg-white p-4 rounded shadow">Missed: {stats.missed}</div>
      </div>
      {/* Chart.js components (Bar/Line/Doughnut) go here, fed by `stats` */}
    </div>
  );
}
