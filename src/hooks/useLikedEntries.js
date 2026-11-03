import { useMemo } from 'react';

export function useLikedEntries(entries, likedIds) {
  return useMemo(
    () => entries.filter((entry) => likedIds.has(entry.id)),
    [entries, likedIds]
  );
}
