import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contests from './pages/Contests';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import CalendarPage from './pages/CalendarPage';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
