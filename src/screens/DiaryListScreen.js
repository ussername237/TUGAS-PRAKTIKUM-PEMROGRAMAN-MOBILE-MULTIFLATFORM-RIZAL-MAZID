import React, { useCallback, useRef, useState } from 'react';

import {
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useTheme } from '../context/ThemeContext';
import DiaryCard from '../components/DiaryCard';
import SearchBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearAllFavorites, toggleLike } from '../features/diary/diarySlice';
import { ALL_MOODS, MOODS } from '../constants/moods';
import { useDiarySearch } from '../hooks/useDiarySearch';
import { useLikedEntries } from '../hooks/useLikedEntries';
import AnimatedPressable from '../components/AnimatedPressable';
import {
  RADIUS,
  SPACE,
  TYPO,
  BREAKPOINTS,
  FONT_FAMILIES,
} from '../styles/tokens';

export default function DiaryListScreen({ favoritesOnly = false }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const styles = createStyles(colors, favoritesOnly);
  const twoCols = width >= BREAKPOINTS.tablet;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.diary.entries);
  const [selectedMood, setSelectedMood] = useState(ALL_MOODS);
  const searchRef = useRef(null);
  const likedEntries = useLikedEntries(entries);
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

  const confirmClearFavorites = useCallback(() => {
    Alert.alert(
      'Hapus semua favorit',
      'Semua catatan akan dihapus dari daftar favorit.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        mood={item.mood}
        variant={twoCols ? 'grid' : 'list'}
        fontFamily={favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern}
        liked={item.liked}
        onPress={() => openDetail(item.id)}
        onToggleLike={() => dispatch(toggleLike(item.id))}
      />
    </View>
  ), [dispatch, favoritesOnly, openDetail, styles, twoCols]);

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

      {favoritesOnly ? (
        <View style={styles.favoriteActions}>
          <Text style={styles.resultCount}>
            {likedEntries.length} catatan favorit
          </Text>
          {likedEntries.length > 0 && (
            <AnimatedPressable
              onPress={confirmClearFavorites}
              style={styles.clearFavoritesButton}
              accessibilityRole="button"
            >
              <Text style={styles.clearFavoritesText}>Hapus semua</Text>
            </AnimatedPressable>
          )}
        </View>
      ) : (
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{entries.length}</Text>
            <Text style={styles.statLabel}>Total Diary</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{likedEntries.length}</Text>
            <Text style={styles.statLabel}>Total Favorit</Text>
          </View>
        </View>
      )}

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
        <AnimatedPressable
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
        </AnimatedPressable>
        {MOODS.map((mood) => (
          <AnimatedPressable
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
              {mood.label}
            </Text>
          </AnimatedPressable>
        ))}
        <AnimatedPressable
          onPress={resetFilters}
          style={styles.resetButton}
          accessibilityRole="button"
        >
          <Text style={styles.resetText}>Reset filter</Text>
        </AnimatedPressable>
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
          <View style={styles.emptyState}>
            <Text style={styles.empty}>
              {favoritesOnly && likedEntries.length === 0
                ? 'Belum ada catatan favorit. Tambahkan catatan ke favorit dari Home atau Detail.'
                : !favoritesOnly && entries.length === 0
                  ? 'Belum ada diary. Tambahkan cerita pertamamu.'
                  : 'Catatan tidak ditemukan.'}
            </Text>
            {!favoritesOnly && entries.length === 0 && (
              <AnimatedPressable
                onPress={() => router.push('/create')}
                style={styles.emptyAction}
                accessibilityRole="button"
              >
                <Text style={styles.emptyActionText}>Tambah Diary</Text>
              </AnimatedPressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const createStyles = (colors, favoritesOnly) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    fontFamily: favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: colors.text,
  },

  subtitle: {
    fontSize: TYPO.body,
    fontFamily: favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern,
    color: colors.muted,
    paddingHorizontal: SPACE.l,
    marginTop: SPACE.xs,
    marginBottom: SPACE.s,
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: SPACE.l,
    marginBottom: SPACE.s,
    gap: SPACE.s,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m,
    padding: SPACE.m,
  },
  statValue: {
    color: colors.primary,
    fontSize: TYPO.h2,
    fontWeight: '700',
    fontFamily: FONT_FAMILIES.modern,
  },
  statLabel: {
    color: colors.muted,
    fontSize: TYPO.caption,
    fontFamily: FONT_FAMILIES.modern,
  },
  favoriteActions: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.l,
  },
  clearFavoritesButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: SPACE.s,
  },
  clearFavoritesText: {
    color: colors.primary,
    fontSize: TYPO.caption,
    fontWeight: '700',
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
    borderColor: colors.border,
    backgroundColor: colors.card,
  },

  selectedFilter: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  filterText: {
    color: colors.text,
    fontSize: TYPO.caption,
    fontFamily: favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern,
  },

  selectedFilterText: {
    color: colors.onPrimary,
  },

  resetButton: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
  },

  resetText: {
    color: colors.primary,
    fontSize: TYPO.caption,
    fontWeight: '700',
    fontFamily: favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern,
  },

  resultCount: {
    paddingHorizontal: SPACE.l,
    paddingBottom: SPACE.xs,
    color: colors.muted,
    fontSize: TYPO.caption,
  },

  listContent: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.s,
    paddingBottom: SPACE.l,
    gap: SPACE.m,
    flexGrow: 1,
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
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
    color: colors.muted,
    marginTop: SPACE.xl,
    fontSize: TYPO.body,
  },
  emptyState: {
    alignItems: 'center',
    gap: SPACE.m,
  },
  emptyAction: {
    minHeight: 44,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  emptyActionText: {
    color: colors.onPrimary,
    fontSize: TYPO.body,
    fontWeight: '700',
    fontFamily: favoritesOnly ? FONT_FAMILIES.editorial : FONT_FAMILIES.modern,
  },
});