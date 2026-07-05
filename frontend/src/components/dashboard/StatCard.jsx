// Example dashboard building block — a single metric tile.
export default function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
