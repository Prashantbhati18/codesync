// Admin-only page: user management, platform sync trigger, log viewer.
// Route-guarding by role should also be enforced (redirect non-admins away).
export default function Admin() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>Manage users, platforms, contest sync, and logs here.</p>
    </div>
  );
}
