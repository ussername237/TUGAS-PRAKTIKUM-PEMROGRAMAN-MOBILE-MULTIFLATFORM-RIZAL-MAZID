import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import {
  FONT_FAMILIES,
  RADIUS,
  SPACE,
  TYPO,
  MIN_TOUCH,
} from '../../styles/tokens';
import AnimatedPressable from '../../components/AnimatedPressable';

export default function SettingsRoute() {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title} accessibilityRole="header">
        Pengaturan
      </Text>
      <Text style={styles.description}>
        Kelola informasi aplikasi Diary App.
      </Text>

      <View style={styles.themeRow}>
        <View style={styles.linkCopy}>
          <Text style={styles.linkTitle}>Mode Gelap</Text>
          <Text style={styles.linkDescription}>
            {isDark ? 'Tema gelap aktif' : 'Tema terang aktif'}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.card}
          accessibilityLabel="Mode gelap"
          accessibilityRole="switch"
        />
      </View>

      <Link href="/about" asChild>
        <AnimatedPressable
          accessibilityRole="button"
          style={styles.link}
        >
          <View style={styles.linkCopy}>
            <Text style={styles.linkTitle}>Tentang Aplikasi</Text>
            <Text style={styles.linkDescription}>
              Informasi fitur dan navigasi Diary App
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </AnimatedPressable>
      </Link>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: colors.surface,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: colors.text,
    fontFamily: FONT_FAMILIES.modernMedium,
  },
  description: {
    color: colors.muted,
    fontSize: TYPO.body,
    fontFamily: FONT_FAMILIES.modern,
    marginTop: SPACE.xs,
    marginBottom: SPACE.l,
  },
  link: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m,
    padding: SPACE.m,
  },
  linkCopy: {
    flex: 1,
    gap: SPACE.xs,
  },
  linkTitle: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: colors.text,
    fontFamily: FONT_FAMILIES.modernMedium,
  },
  linkDescription: {
    fontSize: TYPO.caption,
    color: colors.muted,
    fontFamily: FONT_FAMILIES.modern,
  },
  arrow: {
    color: colors.primary,
    fontSize: 28,
    marginLeft: SPACE.m,
  },
  themeRow: {
    minHeight: MIN_TOUCH + SPACE.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACE.m,
    paddingHorizontal: SPACE.m,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m,
  },
});
