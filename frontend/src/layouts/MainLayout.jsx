// Shared shell (navbar/sidebar) wrapping every authenticated page.
// <Outlet /> renders whichever child route matched (Dashboard, Contests, etc.)
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function MainLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-4">{/* Sidebar nav goes here */}</aside>
      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
