export const ALL_MOODS = 'all';

export const MOODS = [
  { value: 'happy', label: 'Bahagia' },
  { value: 'calm', label: 'Tenang' },
  { value: 'energetic', label: 'Semangat' },
  { value: 'sad', label: 'Sedih' },
];

const LEGACY_MOOD_VALUES = {
  '😊': 'happy',
  '😌': 'calm',
  '🤩': 'energetic',
  '😔': 'sad',
};

export const normalizeMood = (value) => LEGACY_MOOD_VALUES[value] ?? value;

export const getMoodLabel = (value) =>
  MOODS.find((mood) => mood.value === normalizeMood(value))?.label
  ?? 'Belum dipilih';
