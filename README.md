# Diary App (Pertemuan 5 - Navigasi)

**Nama:** Rizal Mazid
**NIM:** 2430511031
**Mata Kuliah:** Pemrograman Mobile Multiplatform
**Universitas:** Universitas Muhammadiyah Sukabumi

Aplikasi diary React Native dan Expo untuk mencatat kegiatan atau cerita sehari-hari. Navigasi menggunakan Expo Router.

## Fitur
- Home dengan daftar dan pencarian catatan
- Menambahkan catatan melalui tab Tambah
- Detail catatan dengan dynamic route dan route parameter
- Like tersinkron antara Home, Favorit, dan Detail
- Daftar catatan Favorit
- Filter catatan berdasarkan suasana hati
- Pencarian dengan debounce dan tombol reset filter
- Tab Pengaturan dan halaman Tentang Aplikasi
- Tombol kembali ke Home dari Detail
- Shared state dengan React Context

## Teknologi
- React Native
- Expo SDK 58
- Expo Router (Stack dan Bottom Tabs)
- React Context
- JavaScript

## Cara Menjalankan
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npx expo start
   ```
3. Buka dengan Expo Go atau Android Emulator. Tekan `w` untuk menjalankan versi web jika dependensi web tersedia.

## Struktur Navigasi
- `src/app/_layout.js`: Root Stack dan provider shared state
- `src/app/(tabs)/index.js`: Home
- `src/app/(tabs)/create.js`: Tambah catatan
- `src/app/(tabs)/favorites.js`: Catatan Favorit
- `src/app/(tabs)/settings.js`: Pengaturan
- `src/app/detail/[id].js`: Detail dengan parameter `id`
- `src/app/about.js`: Tentang Aplikasi

Catatan dan status suka disimpan di Context selama aplikasi berjalan. Data belum disimpan secara persisten setelah aplikasi ditutup.

## Hooks pada Praktikum Pertemuan 6

- `useState` menyimpan entri dan favorit di Context, serta input form dan filter mood pada layar.
- `useContext` mengakses entri, aksi tambah, serta status suka bersama dari `EntriesProvider`.
- `useEffect` mengatur debounce pencarian 350 ms dan membersihkan timer saat kata kunci berubah atau komponen dilepas.
- `useMemo` menghitung hasil pencarian/filter dan daftar favorit dari data yang menjadi dependensinya.
- `useCallback` menstabilkan aksi navigasi, reset, dan suka yang diberikan ke komponen anak.
- `useRef` menyimpan referensi input pencarian agar fokus bisa dikembalikan tanpa render ulang.
- `useDiarySearch` dan `useLikedEntries` memisahkan logika pencarian dan pemilihan favorit agar dapat digunakan ulang.