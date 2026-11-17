import React, { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { normalizeMood } from '../constants/moods';

const moodColors = {
  happy: { light: '#F6C85F', dark: '#F0B93D' },
  calm: { light: '#75B9C9', dark: '#4CA4B7' },
  energetic: { light: '#A58AE8', dark: '#8E70DA' },
  sad: { light: '#8295C8', dark: '#6E83BB' },
};

export default function MoodEmblem({ mood, size = 48, animated = false }) {
  const { isDark } = useTheme();
  const [scale] = useState(() => new Animated.Value(1));
  const useNativeDriver = Platform.OS !== 'web';
  const normalizedMood = normalizeMood(mood);
  const palette = moodColors[normalizedMood] ?? moodColors.calm;
  const accent = isDark ? palette.dark : palette.light;
  const faceSize = size * 0.68;
  const eyeSize = Math.max(2, size * 0.055);

  useEffect(() => {
    if (!animated) {
      scale.setValue(1);
      return undefined;
    }

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver,
        }),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [animated, scale, useNativeDriver]);

  return (
    <View
      style={[
        styles.orbit,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: `${accent}24`,
        },
      ]}
      accessible={false}
    >
      <Animated.View
        style={[
          styles.face,
          {
            width: faceSize,
            height: faceSize,
            borderRadius: faceSize / 2,
            backgroundColor: accent,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={[styles.eyes, { gap: eyeSize * 2.1, marginTop: faceSize * 0.28 }]}>
          <View style={[styles.eye, { width: eyeSize, height: eyeSize }]} />
          <View style={[styles.eye, { width: eyeSize, height: eyeSize }]} />
        </View>
        <View
          style={[
            styles.mouth,
            normalizedMood === 'sad' && styles.sadMouth,
            normalizedMood === 'calm' && styles.calmMouth,
            normalizedMood === 'energetic' && styles.energeticMouth,
            {
              width: faceSize * 0.27,
              height: faceSize * 0.13,
              marginTop: faceSize * 0.1,
              borderColor: isDark ? '#182235' : '#26334A',
            },
          ]}
        />
      </Animated.View>
      {normalizedMood === 'energetic' && (
        <View style={[styles.sparkle, { backgroundColor: accent }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orbit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    alignItems: 'center',
  },
  eyes: {
    flexDirection: 'row',
  },
  eye: {
    backgroundColor: '#26334A',
    borderRadius: 99,
  },
  mouth: {
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sadMouth: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 7,
  },
  calmMouth: {
    height: 0,
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderRadius: 2,
  },
  energeticMouth: {
    borderBottomWidth: 0,
    borderRadius: 10,
    backgroundColor: '#26334A',
  },
  sparkle: {
    position: 'absolute',
    width: 5,
    height: 5,
    top: 4,
    right: 3,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
});
