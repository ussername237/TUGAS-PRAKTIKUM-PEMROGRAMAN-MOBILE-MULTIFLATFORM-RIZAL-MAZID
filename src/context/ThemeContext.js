import React, { createContext, useContext, useMemo, useState } from 'react';
import { COLORS, DARK_COLORS } from '../styles/tokens';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? DARK_COLORS : COLORS;
  const value = useMemo(
    () => ({
      isDark,
      colors,
      toggleTheme: () => setIsDark((current) => !current),
    }),
    [isDark, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme harus digunakan di dalam ThemeProvider.');
  }

  return value;
}
