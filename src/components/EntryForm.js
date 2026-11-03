import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOODS } from '../constants/moods';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday);
  const [body, setBody] = useState('');
  const [mood, setMood] = useState(MOODS[0].value);

  const canSubmit =
    title.trim().length > 0 &&
    date.trim().length > 0 &&
    body.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      Alert.alert(
        'Data belum lengkap',
        'Judul, tanggal, dan isi catatan harus diisi.'
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

    const newEntry = {
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 100),
      body: body.trim(),
      mood,
    };

    onSubmit(newEntry);

    setTitle('');
    setDate(getToday());
    setBody('');
    setMood(MOODS[0].value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Tambah Diary Baru
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        style={styles.input}
        accessibilityLabel="Judul diary"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
        accessibilityLabel="Tanggal diary"
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan kegiatanmu..."
        style={[styles.input, styles.multiline]}
        multiline
        textAlignVertical="top"
        accessibilityLabel="Isi catatan diary"
      />

      <Text style={styles.moodLabel}>Bagaimana suasana hatimu?</Text>
      <View style={styles.moodOptions}>
        {MOODS.map((option) => (
          <Pressable
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
            <Text style={styles.moodEmoji}>{option.value}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={[
          styles.button,
          !canSubmit && styles.disabledButton,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          Simpan Diary
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    gap: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1F2937',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
  },

  multiline: {
    minHeight: 80,
  },

  moodLabel: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '600',
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
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  selectedMood: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  moodEmoji: {
    fontSize: 24,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});