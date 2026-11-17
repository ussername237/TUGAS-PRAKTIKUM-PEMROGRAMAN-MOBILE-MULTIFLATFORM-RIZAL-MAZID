import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOODS } from '../constants/moods';
import { useTheme } from '../context/ThemeContext';
import { SPACE, RADIUS, FONT_FAMILIES } from '../styles/tokens';
import AnimatedPressable from './AnimatedPressable';
import MoodEmblem from './MoodEmblem';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function EntryForm({
  onSubmit,
  initialEntry,
  submitLabel = 'Simpan Diary',
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors, Boolean(initialEntry));
  const [title, setTitle] = useState(initialEntry?.title ?? '');
  const [date, setDate] = useState(initialEntry?.date ?? getToday);
  const [body, setBody] = useState(initialEntry?.body ?? '');
  const [mood, setMood] = useState(initialEntry?.mood ?? MOODS[0].value);

  const canSubmit =
    title.trim().length >= 3 &&
    date.trim().length > 0 &&
    body.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      Alert.alert(
        'Data belum lengkap',
        'Judul minimal 3 karakter, tanggal, dan isi catatan harus diisi.'
      );
      return;
    }

    if (typeof onSubmit !== 'function') {
      Alert.alert(
        'Terjadi kesalahan',
        'Fungsi penyimpanan catatan belum terhubung.'
      );
      return;
    }

    const updatedEntry = {
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 100),
      body: body.trim(),
      mood,
    };

    onSubmit(updatedEntry);

    if (!initialEntry) {
      setTitle('');
      setDate(getToday());
      setBody('');
      setMood(MOODS[0].value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {initialEntry ? 'Edit Diary' : 'Tambah Diary Baru'}
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        placeholderTextColor={colors.muted}
        selectionColor={colors.primary}
        style={styles.input}
        accessibilityLabel="Judul diary"
        maxLength={100}
      />
      {title.trim().length > 0 && title.trim().length < 3 && (
        <Text style={styles.validationText}>
          Judul harus terdiri dari minimal 3 karakter.
        </Text>
      )}

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.muted}
        selectionColor={colors.primary}
        style={styles.input}
        accessibilityLabel="Tanggal diary"
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan kegiatanmu..."
        placeholderTextColor={colors.muted}
        selectionColor={colors.primary}
        style={[styles.input, styles.multiline]}
        multiline
        textAlignVertical="top"
        accessibilityLabel="Isi catatan diary"
      />

      <Text style={styles.moodLabel}>Bagaimana suasana hatimu?</Text>
      <View style={styles.moodOptions}>
        {MOODS.map((option) => (
          <AnimatedPressable
            key={option.value}
            onPress={() => setMood(option.value)}
            style={[
              styles.moodOption,
              mood === option.value && styles.selectedMood,
            ]}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: mood === option.value }}
          >
            <MoodEmblem
              mood={option.value}
              size={32}
              animated={mood === option.value}
            />
          </AnimatedPressable>
        ))}
      </View>

      <AnimatedPressable
        onPress={submit}
        disabled={!canSubmit}
        style={[
          styles.button,
          !canSubmit && styles.disabledButton,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          {submitLabel}
        </Text>
      </AnimatedPressable>
    </View>
  );
}

const createStyles = (colors, isEditing) => StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: SPACE.l,
    backgroundColor: colors.secondary,
    borderRadius: RADIUS.m,
    gap: SPACE.s + 2,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.text,
    fontFamily: isEditing ? FONT_FAMILIES.editorial : FONT_FAMILIES.modernMedium,
  },
  validationText: {
    color: colors.danger,
    fontSize: 12,
  },

  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m - 2,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    fontFamily: FONT_FAMILIES.modern,
  },

  multiline: {
    minHeight: 80,
  },

  moodLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILIES.modern,
  },

  moodOptions: {
    flexDirection: 'row',
    gap: 10,
  },

  moodOption: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
  },

  selectedMood: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: colors.onPrimary,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILIES.modernMedium,
  },
});