import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MOODS } from '../constants/moods';

const INITIAL_ENTRIES = [
  {
    id: '1',
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Bangun lebih awal, menikmati kopi hangat sambil membaca buku favorit.',
    body:
      'Hari ini dimulai dengan tenang. Saya bangun pukul 05.30 dan menikmati udara pagi. Secangkir kopi hangat menemani saya membaca beberapa halaman buku favorit.',
    mood: MOODS[0].value,
  },
  {
    id: '2',
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan tugas praktikum dengan membagi pekerjaan menjadi target kecil.',
    body:
      'Tugas praktikum hari ini selesai lebih cepat. Saya membagi pekerjaan menjadi beberapa target kecil dan menyelesaikannya satu per satu tanpa menunda.',
    mood: MOODS[2].value,
  },
  {
    id: '3',
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Berjalan santai di taman kampus sambil menikmati suasana senja.',
    body:
      'Sore ini saya berjalan santai di taman kampus. Langit berubah menjadi jingga. Momen sederhana seperti ini membuat pikiran kembali segar.',
    mood: MOODS[1].value,
  },
  {
    id: '4',
    title: 'Belajar Flexbox',
    date: '2025-10-03',
    preview:
      'Memahami flexDirection, gap, dan flex untuk membuat layout React Native.',
    body:
      'Malam ini saya belajar Flexbox. Saya mencoba flexDirection untuk mengatur posisi komponen dan flex untuk mengatur ruang yang tersedia.',
    mood: MOODS[2].value,
  },
  {
    id: '5',
    title: 'Evaluasi Mingguan',
    date: '2025-10-02',
    preview:
      'Mengevaluasi target mingguan dan merencanakan langkah berikutnya.',
    body:
      'Saya mengevaluasi target mingguan dan mempelajari pentingnya membagi target besar menjadi langkah kecil.',
    mood: MOODS[1].value,
  },
];

const EntriesContext = createContext(null);

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [likedIds, setLikedIds] = useState(() => new Set());
  const nextEntryId = useRef(0);

  const addEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: `${Date.now()}-${nextEntryId.current++}`,
    };

    setEntries((previous) => [newEntry, ...previous]);
    return newEntry;
  }, []);

  const getById = useCallback(
    (id) => entries.find((entry) => entry.id === String(id)),
    [entries]
  );

  const toggleLike = useCallback((id) => {
    const entryId = String(id);

    setLikedIds((previous) => {
      const next = new Set(previous);

      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ entries, addEntry, getById, likedIds, toggleLike }),
    [entries, addEntry, getById, likedIds, toggleLike]
  );

  return (
    <EntriesContext.Provider value={value}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const value = useContext(EntriesContext);

  if (!value) {
    throw new Error('useEntries harus digunakan di dalam EntriesProvider.');
  }

  return value;
}
