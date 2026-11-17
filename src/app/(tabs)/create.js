import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EntryForm from '../../components/EntryForm';
import { useAppDispatch } from '../../store/hooks';
import { addEntry } from '../../features/diary/diarySlice';
import { useTheme } from '../../context/ThemeContext';
import { FONT_FAMILIES, SPACE, TYPO } from '../../styles/tokens';

export default function CreateRoute() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();

  const saveEntry = (entry) => {
    dispatch(addEntry(entry));
    router.replace('/');
    Alert.alert('Berhasil', 'Catatan berhasil ditambahkan.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title} accessibilityRole="header">
            Tambah Entri
          </Text>
          <Text style={styles.subtitle}>
            Simpan cerita dan pengalaman harianmu.
          </Text>
          <EntryForm onSubmit={saveEntry} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.s,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: colors.text,
    fontFamily: FONT_FAMILIES.modernMedium,
  },
  subtitle: {
    fontSize: TYPO.body,
    color: colors.muted,
    fontFamily: FONT_FAMILIES.modern,
  },
});
