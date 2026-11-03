import React from 'react';

import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { COLORS, SPACE, RADIUS, MIN_TOUCH } from '../styles/tokens';

const SearchBar = React.forwardRef(function SearchBar({
  value = '',
  placeholder = 'Cari entri diary...',
  onChange,
  onClear,
}, ref) {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Cari catatan diary"
        returnKeyType="search"
      />
      {value.length > 0 && onClear && (
        <Pressable
          onPress={onClear}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}
    </View>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.s,
  },

  input: {
    minHeight: MIN_TOUCH,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACE.m,
    fontSize: 16,
    color: COLORS.text,
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
    color: COLORS.muted,
    fontSize: 24,
  },
});