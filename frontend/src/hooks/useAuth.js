// Small convenience hook so components write `const { user, login } = useAuth()`
// instead of importing useContext + AuthContext everywhere.
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
