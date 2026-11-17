import { Platform } from 'react-native';

export const COLORS = {
  surface: '#F8FAFC',
  card: '#FFFFFF',
  secondary: '#F1F5F9',
  text: '#0F172A',      // kontras tinggi di atas putih
  muted: '#475569',     // kontras ±7:1 di atas putih
  primary: '#4F46E5',
  primarySoft: '#EEF2FF',
  onPrimary: '#FFFFFF',
  border: '#E2E8F0',
  danger: '#B91C1C',
  overlay: 'rgba(15, 23, 42, 0.55)',
};

export const DARK_COLORS = {
  surface: '#0B1220',
  card: '#111C2E',
  secondary: '#1E293B',
  text: '#F1F5F9',
  muted: '#A8B5C7',
  primary: '#A5B4FC',
  primarySoft: '#293253',
  onPrimary: '#10162A',
  border: '#334155',
  danger: '#F87171',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };

export const TYPO = { h1: 28, h2: 20, body: 16, caption: 13 };

export const RADIUS = { m: 12, l: 16 };

export const BREAKPOINTS = { tablet: 600 };

export const FONT_FAMILIES = {
  editorial: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    web: 'Georgia',
    default: 'serif',
  }),
  modern: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif',
    web: 'Arial',
    default: 'sans-serif',
  }),
  modernMedium: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif-medium',
    web: 'Arial',
    default: 'sans-serif',
  }),
};

export const MIN_TOUCH = 44; // target sentuh minimum (px)