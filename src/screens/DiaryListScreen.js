import React, { useCallback, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import DiaryCard from '../components/DiaryCard';
import SearchBar from '../components/SearchBar';
import { useEntries } from '../context/EntriesContext';
import { ALL_MOODS, MOODS } from '../constants/moods';
import { useDiarySearch } from '../hooks/useDiarySearch';
import { useLikedEntries } from '../hooks/useLikedEntries';
import {
  COLORS,
  SPACE,
  TYPO,
  BREAKPOINTS,
} from '../styles/tokens';

export default function DiaryListScreen({ favoritesOnly = false }) {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useEntries();
  const [selectedMood, setSelectedMood] = useState(ALL_MOODS);
  const searchRef = useRef(null);
  const likedEntries = useLikedEntries(entries, likedIds);
  const sourceEntries = favoritesOnly ? likedEntries : entries;
  const {
    query,
    setQuery,
    filteredEntries,
    resultCount,
  } = useDiarySearch(sourceEntries, selectedMood);

  const openDetail = useCallback((id) => {
    router.push({
      pathname: '/detail/[id]',
      params: { id: String(id) },
    });
  }, [router]);

  const clearSearch = useCallback(() => {
    setQuery('');
    searchRef.current?.focus();
  }, [setQuery]);

  const resetFilters = useCallback(() => {
    setQuery('');
    setSelectedMood(ALL_MOODS);
  }, [setQuery]);

  const renderItem = useCallback(({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        mood={item.mood}
        variant={twoCols ? 'grid' : 'list'}
        liked={likedIds.has(item.id)}
        onPress={() => openDetail(item.id)}
        onToggleLike={() => toggleLike(item.id)}
      />
    </View>
  ), [likedIds, openDetail, toggleLike, twoCols]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text
        style={styles.header}
        accessibilityRole="header"
      >
        {favoritesOnly ? 'Catatan Favorit' : 'Buku Harian'}
      </Text>

      <Text style={styles.subtitle}>
        {favoritesOnly
          ? 'Kumpulan catatan yang kamu sukai.'
          : 'Catat cerita dan pengalaman harianmu.'}
      </Text>

      <SearchBar
        ref={searchRef}
        value={query}
        onChange={setQuery}
        onClear={clearSearch}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        accessibilityLabel="Filter suasana hati"
      >
        <Pressable
          onPress={() => setSelectedMood(ALL_MOODS)}
          style={[
            styles.filterChip,
            selectedMood === ALL_MOODS && styles.selectedFilter,
          ]}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedMood === ALL_MOODS }}
        >
          <Text style={[
            styles.filterText,
            selectedMood === ALL_MOODS && styles.selectedFilterText,
          ]}>
            Semua mood
          </Text>
        </Pressable>
        {MOODS.map((mood) => (
          <Pressable
            key={mood.value}
            onPress={() => setSelectedMood(mood.value)}
            style={[
              styles.filterChip,
              selectedMood === mood.value && styles.selectedFilter,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Filter ${mood.label}`}
            accessibilityState={{ selected: selectedMood === mood.value }}
          >
            <Text style={[
              styles.filterText,
              selectedMood === mood.value && styles.selectedFilterText,
            ]}>
              {mood.value} {mood.label}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={resetFilters}
          style={styles.resetButton}
          accessibilityRole="button"
        >
          <Text style={styles.resetText}>Reset filter</Text>
        </Pressable>
      </ScrollView>

      <Text style={styles.resultCount}>
        {resultCount} catatan ditemukan
      </Text>

      <FlatList
        key={twoCols ? 'grid2' : 'list1'}
        data={filteredEntries}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={
          twoCols ? styles.columnWrapper : undefined
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {favoritesOnly && likedIds.size === 0
              ? 'Belum ada catatan favorit. Sukai catatan dari Home atau Detail.'
              : 'Catatan tidak ditemukan.'}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },

  subtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    paddingHorizontal: SPACE.l,
    marginTop: SPACE.xs,
    marginBottom: SPACE.s,
  },

  filters: {
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    gap: SPACE.s,
  },

  filterChip: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },

  selectedFilter: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.text,
    fontSize: TYPO.caption,
  },

  selectedFilterText: {
    color: COLORS.onPrimary,
  },

  resetButton: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
  },

  resetText: {
    color: COLORS.primary,
    fontSize: TYPO.caption,
    fontWeight: '700',
  },

  resultCount: {
    paddingHorizontal: SPACE.l,
    paddingBottom: SPACE.xs,
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  listContent: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.s,
    paddingBottom: SPACE.l,
    gap: SPACE.m,
    flexGrow: 1,
  },

  columnWrapper: {
    gap: SPACE.m,
  },

  itemWrap: {
    flex: 1,
  },

  itemWrap2: {
    flex: 1,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
    fontSize: TYPO.body,
  },
});