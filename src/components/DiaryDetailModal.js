import React from 'react';
import { Modal, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACE, TYPO, RADIUS, MIN_TOUCH } from '../styles/tokens';
import AnimatedPressable from './AnimatedPressable';

export default function DiaryDetailModal({ visible, entry, onClose }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}   // tombol Back di Android
    >
      <View style={styles.overlay}>
        <View style={styles.sheet} accessibilityViewIsModal>
          {entry && (
            <ScrollView contentContainerStyle={styles.content}>
              <Image
                source={{ uri: entry.heroUri }}
                style={styles.hero}
                accessibilityLabel={`Gambar utama untuk ${entry.title}`}
              />
              <Text style={styles.title} accessibilityRole="header">{entry.title}</Text>
              <Text style={styles.date}>{entry.date}</Text>
              <Text style={styles.body}>{entry.body}</Text>
            </ScrollView>
          )}

          <AnimatedPressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Tutup detail catatan"
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>Tutup</Text>
          </AnimatedPressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: RADIUS.l,
    borderTopRightRadius: RADIUS.l,
    maxHeight: '90%',
    padding: SPACE.l,
    gap: SPACE.m,
  },
  content: { gap: SPACE.m },
  hero: { width: '100%', aspectRatio: 16 / 9, borderRadius: RADIUS.m },
  title: { fontSize: TYPO.h1, fontWeight: '700', color: colors.text },
  date: { fontSize: TYPO.caption, color: colors.muted },
  body: { fontSize: TYPO.body, color: colors.text, lineHeight: 24 },
  closeBtn: {
    minHeight: MIN_TOUCH,
    backgroundColor: colors.primary,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { color: colors.onPrimary, fontSize: TYPO.body, fontWeight: '700' },
});