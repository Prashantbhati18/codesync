// Main contest list with platform/date/duration/search filters and bookmarking.
import { useState } from 'react';
import useContests from '../hooks/useContests';
import { addBookmark } from '../services/contest.service';

export default function Contests() {
  const [filters, setFilters] = useState({});
  const { contests, loading } = useContests(filters);

  if (loading) return <div>Loading contests...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contests</h1>
      {/* Filter bar (platform / date / duration / search) goes here, updates `filters` */}
      <ul className="space-y-2">
        {contests.map((contest) => (
          <li key={contest.id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{contest.name} — {contest.platform}</span>
            <button onClick={() => addBookmark(contest.id)} className="text-sm underline">Bookmark</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
