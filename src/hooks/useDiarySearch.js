import { useEffect, useMemo, useState } from 'react';
import { ALL_MOODS } from '../constants/moods';

export function useDiarySearch(entries, selectedMood = ALL_MOODS) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    const keyword = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesMood =
        selectedMood === ALL_MOODS || entry.mood === selectedMood;
      const searchableText = [
        entry.title,
        entry.date,
        entry.preview,
        entry.body,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesMood && (!keyword || searchableText.includes(keyword));
    });
  }, [entries, debouncedQuery, selectedMood]);

  return {
    query,
    setQuery,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
