import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  variant = 'list',
  liked = false,
  onPress,
  onToggleLike,
}) {
  return (
    <View
      style={[
        styles.card,
        variant === 'grid' && styles.gridCard,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={styles.mainContent}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri ${title}`}
        accessibilityHint="Membuka detail catatan."
      >
        <View style={styles.mood}>
          <Text style={styles.moodText}>{mood || '📔'}</Text>
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
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={styles.likeButton}
        accessibilityRole="button"
        accessibilityLabel={
          liked ? 'Batalkan suka' : 'Sukai catatan'
        }
        accessibilityState={{ selected: liked }}
      >
        <Text style={styles.like}>
          {liked ? '❤️' : '🤍'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  moodText: {
    fontSize: 32,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  date: {
    fontSize: 12,
    color: '#6B7280',
    marginVertical: 4,
  },

  preview: {
    fontSize: 13,
    color: '#4B5563',
  },

  likeButton: {
    padding: 5,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  like: {
    fontSize: 22,
  },
});