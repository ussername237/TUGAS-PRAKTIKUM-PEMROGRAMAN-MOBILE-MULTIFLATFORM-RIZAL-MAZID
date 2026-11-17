import { useMemo } from 'react';

export function useLikedEntries(entries) {
  return useMemo(
    () => entries.filter((entry) => entry.liked),
    [entries]
  );
}
