// Encapsulates fetch + loading/error state for contest lists, so pages
// (Contests, Dashboard, Calendar) can reuse the same data-fetching logic.
import { useState, useEffect, useCallback } from 'react';
import { getContests } from '../services/contest.service';

export default function useContests(filters = {}) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContests = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getContests(filters);
      setContests(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  return { contests, loading, error, refetch: fetchContests };
}
