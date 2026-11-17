import { createSlice, nanoid } from '@reduxjs/toolkit';
import { MOODS } from '../../constants/moods';

const initialState = {
  entries: [
    {
      id: '1',
      title: 'Jadwal Sepak Bola Pagi Ini',
      date: '2026-11-17',
      preview:
        'Mengecek jadwal pertandingan dan menyiapkan waktu untuk menonton laga pagi.',
      body:
        'Pagi ini saya mengecek jadwal pertandingan sepak bola. Ada laga seru yang ingin saya tonton, jadi saya menyiapkan waktu dan perlengkapan sejak awal.',
      mood: MOODS[0].value,
      liked: false,
    },
    {
      id: '2',
      title: 'Latihan Sepak Bola Sore',
      date: '2026-11-16',
      preview:
        'Berlatih umpan, kontrol bola, dan kerja sama tim di lapangan.',
      body:
        'Sore ini saya berlatih sepak bola bersama teman-teman. Kami fokus pada umpan pendek, kontrol bola, dan komunikasi agar permainan tim semakin kompak.',
      mood: MOODS[2].value,
      liked: false,
    },
    {
      id: '3',
      title: 'Nonton Bareng Pertandingan',
      date: '2026-11-15',
      preview:
        'Menikmati pertandingan sepak bola bersama teman-teman.',
      body:
        'Malam ini kami menonton pertandingan sepak bola bersama. Pertandingannya berlangsung seru dan suasana semakin ramai setiap kali tim favorit menyerang.',
      mood: MOODS[1].value,
      liked: false,
    },
    {
      id: '4',
      title: 'Belajar Taktik Sepak Bola',
      date: '2026-11-14',
      preview:
        'Mengamati formasi pemain dan strategi saat menyerang maupun bertahan.',
      body:
        'Saya mengamati bagaimana perubahan formasi memengaruhi permainan. Kerja sama lini tengah, pergerakan pemain, dan pertahanan yang disiplin ternyata sangat penting.',
      mood: MOODS[2].value,
      liked: false,
    },
    {
      id: '5',
      title: 'Evaluasi Latihan Mingguan',
      date: '2026-11-13',
      preview:
        'Mencatat perkembangan latihan dan menentukan target sepak bola berikutnya.',
      body:
        'Minggu ini saya berlatih lebih rutin dan mulai lebih percaya diri mengontrol bola. Minggu depan saya ingin meningkatkan akurasi umpan dan stamina.',
      mood: MOODS[1].value,
      liked: false,
    },
  ],
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addEntry: {
      reducer(state, action) {
        state.entries.unshift(action.payload);
      },
      prepare(entry) {
        return {
          payload: {
            ...entry,
            id: nanoid(),
            liked: false,
          },
        };
      },
    },
    toggleLike(state, action) {
      const entry = state.entries.find(
        (item) => item.id === String(action.payload)
      );

      if (entry) {
        entry.liked = !entry.liked;
      }
    },
    deleteEntry(state, action) {
      state.entries = state.entries.filter(
        (item) => item.id !== String(action.payload)
      );
    },
    editEntry(state, action) {
      const { id, title, date, preview, body, mood } = action.payload;
      const entry = state.entries.find((item) => item.id === String(id));

      if (entry) {
        Object.assign(entry, { title, date, preview, body, mood });
      }
    },
    clearAllFavorites(state) {
      state.entries.forEach((entry) => {
        entry.liked = false;
      });
    },
  },
});

export const {
  addEntry,
  toggleLike,
  deleteEntry,
  editEntry,
  clearAllFavorites,
} = diarySlice.actions;

export default diarySlice.reducer;
