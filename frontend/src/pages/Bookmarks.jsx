import { useEffect, useState } from 'react';
import { getBookmarks, removeBookmark } from '../services/contest.service';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    getBookmarks().then(({ data }) => setBookmarks(data.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
      <ul className="space-y-2">
        {bookmarks.map((b) => (
          <li key={b.id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{b.name}</span>
            <button onClick={() => removeBookmark(b.id)} className="text-sm underline">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
