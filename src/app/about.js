import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { FONT_FAMILIES, SPACE, TYPO } from '../styles/tokens';

export default function AboutRoute() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          Tentang Diary App
        </Text>
        <Text style={styles.body}>
          Diary App membantu mencatat cerita dan pengalaman harian, mencari
          catatan, serta menyimpan catatan favorit.
        </Text>
        <Text style={styles.sectionTitle}>Navigasi</Text>
        <Text style={styles.body}>
          Home, Tambah, Favorit, dan Pengaturan tersedia melalui tab bawah.
          Setiap catatan memiliki halaman detail dengan rute dinamis dan tombol
          kembali ke Home.
        </Text>
        <Text style={styles.body}>
          Catatan dan status favorit dikelola sebagai global state menggunakan
          Redux Toolkit dan React-Redux. Input formulir tetap menggunakan local
          state. Data disimpan sementara di memori dan akan kembali ke data awal
          saat aplikasi dimulai ulang.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.m,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  title: {
    color: colors.text,
    fontSize: TYPO.h1,
    fontWeight: '700',
    fontFamily: FONT_FAMILIES.editorial,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: TYPO.h2,
    fontWeight: '700',
    marginTop: SPACE.s,
    fontFamily: FONT_FAMILIES.editorial,
  },
  body: {
    color: colors.text,
    fontSize: TYPO.body,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.editorial,
  },
});
