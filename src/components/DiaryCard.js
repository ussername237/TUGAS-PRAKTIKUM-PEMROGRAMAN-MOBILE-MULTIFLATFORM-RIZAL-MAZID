import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import AnimatedPressable from './AnimatedPressable';
import MoodEmblem from './MoodEmblem';
import { getMoodLabel } from '../constants/moods';
import { FONT_FAMILIES } from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  variant = 'list',
  liked = false,
  onPress,
  onToggleLike,
  fontFamily = FONT_FAMILIES.modern,
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors, fontFamily);

  return (
    <View
      style={[
        styles.card,
        variant === 'grid' && styles.gridCard,
      ]}
    >
      <AnimatedPressable
        onPress={onPress}
        style={styles.mainContent}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri ${title}, suasana ${getMoodLabel(mood)}`}
        accessibilityHint="Membuka detail catatan."
      >
        <View style={styles.mood}>
          <MoodEmblem mood={mood} size={48} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>

          <Text style={styles.preview} numberOfLines={3}>
            {preview}
          </Text>
        </View>
      </AnimatedPressable>

      <AnimatedPressable
        onPress={onToggleLike}
        style={[
          styles.likeButton,
          liked && styles.likedButton,
        ]}
        accessibilityRole="button"
        accessibilityLabel={
          liked ? 'Hapus dari favorit' : 'Tambahkan ke favorit'
        }
        accessibilityState={{ selected: liked }}
      >
        <Text style={[styles.like, liked && styles.likedText]}>
          ♥
        </Text>
      </AnimatedPressable>
    </View>
  );
}

const createStyles = (colors, fontFamily) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },

  gridCard: {
    alignItems: 'flex-start',
  },

  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  mood: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily,
  },

  date: {
    fontSize: 12,
    color: colors.muted,
    marginVertical: 4,
    fontFamily,
  },

  preview: {
    fontSize: 13,
    color: colors.text,
    fontFamily,
  },

  likeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },

  likedButton: {
    backgroundColor: colors.primarySoft,
  },

  like: {
    fontSize: 22,
    color: colors.muted,
  },

  likedText: {
    color: colors.danger,
  },
});