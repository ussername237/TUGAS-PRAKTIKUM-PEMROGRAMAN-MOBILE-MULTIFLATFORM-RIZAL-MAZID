import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntryForm from '../../components/EntryForm';
import { editEntry } from '../../features/diary/diarySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTheme } from '../../context/ThemeContext';
import { FONT_FAMILIES, SPACE, TYPO } from '../../styles/tokens';
import AnimatedPressable from '../../components/AnimatedPressable';

export default function EditDiaryRoute() {
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
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <Stack.Screen options={{ title: 'Edit Diary' }} />
        <Text style={styles.notFound}>Entri tidak ditemukan.</Text>
        <AnimatedPressable
          onPress={() => router.replace('/')}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>Kembali ke Home</Text>
        </AnimatedPressable>
      </SafeAreaView>
    );
  }

  const saveChanges = (changes) => {
    dispatch(editEntry({ id: entry.id, ...changes }));
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Diary' }} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title} accessibilityRole="header">
            Edit Entri
          </Text>
          <Text style={styles.subtitle}>
            Perbarui judul, tanggal, cerita, atau suasana hatimu.
          </Text>
          <EntryForm
            key={entry.id}
            initialEntry={entry}
            onSubmit={saveChanges}
            submitLabel="Simpan Perubahan"
          />
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
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: colors.text,
    fontFamily: FONT_FAMILIES.editorial,
  },
  subtitle: {
    fontSize: TYPO.body,
    color: colors.muted,
    fontFamily: FONT_FAMILIES.editorial,
  },
  notFound: {
    padding: SPACE.l,
    color: colors.text,
    fontSize: TYPO.body,
    textAlign: 'center',
  },
  backButton: {
    minHeight: 44,
    marginHorizontal: SPACE.l,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
});
