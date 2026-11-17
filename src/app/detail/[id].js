import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteEntry, toggleLike } from '../../features/diary/diarySlice';
import { useTheme } from '../../context/ThemeContext';
import {
  FONT_FAMILIES,
  MIN_TOUCH,
  RADIUS,
  SPACE,
  TYPO,
} from '../../styles/tokens';
import AnimatedPressable from '../../components/AnimatedPressable';
import MoodEmblem from '../../components/MoodEmblem';
import { getMoodLabel } from '../../constants/moods';

export default function DiaryDetailRoute() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { id } = useLocalSearchParams();
  const entryId = Array.isArray(id) ? id[0] : id;
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === String(entryId))
  );

  if (!entry) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: 'Detail Diary' }} />
        <Text style={styles.notFoundText}>Entri tidak ditemukan.</Text>
        <AnimatedPressable
          onPress={() => router.replace('/')}
          style={styles.homeButton}
          accessibilityRole="button"
        >
          <Text style={styles.homeButtonText}>Kembali ke Home</Text>
        </AnimatedPressable>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert(
      'Hapus diary',
      'Catatan ini akan dihapus dari aplikasi.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteEntry(entry.id));
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View
            style={styles.mood}
            accessibilityLabel={`Suasana hati: ${getMoodLabel(entry.mood)}`}
          >
            <MoodEmblem mood={entry.mood} size={88} animated />
            <Text style={styles.moodLabel}>{getMoodLabel(entry.mood)}</Text>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            {entry.title}
          </Text>
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.body}>{entry.body}</Text>

          <AnimatedPressable
            onPress={() => dispatch(toggleLike(entry.id))}
            style={styles.likeButton}
            accessibilityRole="button"
            accessibilityLabel={
              entry.liked ? 'Hapus dari favorit' : 'Tambahkan ke favorit'
            }
            accessibilityState={{ selected: entry.liked }}
          >
            <Text style={styles.likeText}>
              {entry.liked ? '♥ Hapus dari Favorit' : '♥ Tambah ke Favorit'}
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPress={() =>
              router.push({
                pathname: '/edit/[id]',
                params: { id: entry.id },
              })
            }
            style={styles.editButton}
            accessibilityRole="button"
          >
            <Text style={styles.editButtonText}>Edit Diary</Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPress={confirmDelete}
            style={styles.deleteButton}
            accessibilityRole="button"
          >
            <Text style={styles.deleteButtonText}>Hapus Diary</Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPress={() => router.replace('/')}
            style={styles.homeButton}
            accessibilityRole="button"
          >
            <Text style={styles.homeButtonText}>Kembali ke Home</Text>
          </AnimatedPressable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.m,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  mood: {
    width: '100%',
    minHeight: 140,
    borderRadius: RADIUS.m,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodLabel: {
    marginTop: SPACE.s,
    color: colors.muted,
    fontSize: TYPO.caption,
    fontFamily: FONT_FAMILIES.editorial,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: colors.text,
    fontFamily: FONT_FAMILIES.editorial,
  },
  date: {
    fontSize: TYPO.caption,
    color: colors.muted,
  },
  body: {
    fontSize: TYPO.body,
    color: colors.text,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.editorial,
  },
  likeButton: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  likeText: {
    color: colors.primary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  editButton: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  editButtonText: {
    color: colors.primary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  deleteButton: {
    minHeight: MIN_TOUCH,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
  },
  deleteButtonText: {
    color: colors.onPrimary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  homeButton: {
    minHeight: MIN_TOUCH,
    backgroundColor: colors.primary,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: colors.onPrimary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    padding: SPACE.l,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.m,
    backgroundColor: colors.surface,
  },
  notFoundText: {
    color: colors.text,
    fontSize: TYPO.body,
  },
});
