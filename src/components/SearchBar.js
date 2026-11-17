import React from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { SPACE, RADIUS, MIN_TOUCH } from '../styles/tokens';
import AnimatedPressable from './AnimatedPressable';

const SearchBar = React.forwardRef(function SearchBar({
  value = '',
  placeholder = 'Cari entri diary...',
  onChange,
  onClear,
}, ref) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Cari catatan diary"
        returnKeyType="search"
      />
      {value.length > 0 && onClear && (
        <AnimatedPressable
          onPress={onClear}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <Text style={styles.clearText}>×</Text>
        </AnimatedPressable>
      )}
    </View>
  );
});

export default SearchBar;

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.s,
  },

  input: {
    minHeight: MIN_TOUCH,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACE.m,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },

  clearButton: {
    position: 'absolute',
    right: SPACE.l + SPACE.s,
    minWidth: MIN_TOUCH,
    minHeight: MIN_TOUCH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    color: colors.muted,
    fontSize: 24,
  },
});