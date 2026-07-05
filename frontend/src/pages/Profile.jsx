import { useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <button onClick={() => setEditing(!editing)} className="mt-2 underline text-sm">
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
}
