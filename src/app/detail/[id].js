import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEntries } from '../../context/EntriesContext';
import { COLORS, MIN_TOUCH, RADIUS, SPACE, TYPO } from '../../styles/tokens';

export default function DiaryDetailRoute() {
  const { id } = useLocalSearchParams();
  const { getById, likedIds, toggleLike } = useEntries();
  const entry = getById(Array.isArray(id) ? id[0] : id);

  if (!entry) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: 'Detail Diary' }} />
        <Text style={styles.notFoundText}>Entri tidak ditemukan.</Text>
        <Pressable
          onPress={() => router.replace('/')}
          style={styles.homeButton}
          accessibilityRole="button"
        >
          <Text style={styles.homeButtonText}>Kembali ke Home</Text>
        </Pressable>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View
            style={styles.mood}
            accessibilityLabel={`Suasana hati: ${entry.mood || 'belum ditentukan'}`}
          >
            <Text style={styles.moodEmoji}>{entry.mood || '📔'}</Text>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            {entry.title}
          </Text>
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.body}>{entry.body}</Text>

          <Pressable
            onPress={() => toggleLike(entry.id)}
            style={({ pressed }) => [
              styles.likeButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={liked ? 'Batalkan suka' : 'Sukai catatan'}
            accessibilityState={{ selected: liked }}
          >
            <Text style={styles.likeText}>
              {liked ? '♥ Disukai' : '♡ Suka'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace('/')}
            style={({ pressed }) => [
              styles.homeButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.homeButtonText}>Kembali ke Home</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  mood: {
    width: '100%',
    minHeight: 140,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  body: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 24,
  },
  likeButton: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  likeText: {
    color: COLORS.primary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  homeButton: {
    minHeight: MIN_TOUCH,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: COLORS.onPrimary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    padding: SPACE.l,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.m,
    backgroundColor: COLORS.surface,
  },
  notFoundText: {
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  pressed: {
    opacity: 0.8,
  },
});
