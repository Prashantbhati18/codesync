// Example reusable component — a single contest's summary card,
// used by both Contests.jsx and CalendarPage.jsx detail popups.
export default function ContestCard({ contest }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{contest.name}</h3>
      <p className="text-sm text-slate-500">{contest.platform} · {contest.start_time}</p>
    </div>
  );
}
