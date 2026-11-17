# Diary App (Pertemuan ke 8)

**Nama:** Rizal Mazid  
**NIM:** 2430511031  
**Mata Kuliah:** Pemrograman Mobile Multiplatform  
**Universitas:** Universitas Muhammadiyah Sukabumi  
**Studi Kasus:** Diary App dengan Global State Management

## Tentang Aplikasi

Diary App adalah aplikasi mobile untuk **menulis**, **mencari**, dan **mengelola catatan harian**. 

- Aplikasi dibuat dengan Expo, React Native, Expo Router, dan Redux
Toolkit.

## Fitur

- Menambah, mengedit, dan menghapus catatan diary.
- Mencari catatan berdasarkan judul, tanggal, atau isi.
- Memfilter catatan berdasarkan suasana hati.
- Menandai catatan sebagai favorit dan menghapus semua status favorit.
- Melihat jumlah diary dan favorit di halaman Beranda.
- Mengubah tema terang atau gelap melalui halaman Pengaturan.
- Memilih emblem suasana hati dengan animasi lembut.
- Mendapatkan animasi saat menekan tombol.
- Menggunakan tata letak satu kolom di ponsel dan dua kolom di layar lebar.
- Melihat halaman detail untuk setiap catatan.

## Teknologi dan Pengelolaan Data

- **Expo** dan **React Native** untuk aplikasi lintas platform.
- **Expo Router** untuk navigasi tab dan halaman detail.
- **Redux Toolkit** dan **React-Redux** untuk mengelola catatan dan favorit
    sebagai global state.
- **Local state** untuk nilai formulir dan filter yang sedang digunakan.

Data catatan saat ini hanya disimpan di memori selama aplikasi berjalan. Belum
ada database atau penyimpanan persisten, sehingga perubahan akan hilang saat
aplikasi dimulai ulang. Pilihan tema juga kembali ke mode terang setelah
aplikasi dimulai ulang.

## Menjalankan Aplikasi

Pastikan Node.js dan npm sudah terpasang, lalu jalankan dari folder proyek:

```bash
npm install
npx expo start
```

Pindai QR code dengan Expo Go untuk membuka aplikasi di perangkat. Jika
menggunakan emulator Android, tekan `a`. Simulator iOS memerlukan macOS dan
Xcode; jika tersedia, tekan `i`.

**Untuk menjalankan versi web:**

```bash
npx expo start --web
```

## Perintah Lain

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Struktur Proyek

- `src/app/` - halaman dan layout navigasi Expo Router.
- `src/components/` - komponen antarmuka yang digunakan ulang.
- `src/constants/` - pilihan suasana hati.
- `src/features/diary/` - Redux slice untuk data diary.
- `src/store/` - konfigurasi Redux store dan hooks.
- `src/styles/` - warna, ukuran, dan keluarga font.
