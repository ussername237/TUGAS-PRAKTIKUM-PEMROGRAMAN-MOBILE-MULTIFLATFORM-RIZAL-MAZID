import React, { useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
} from 'react-native';

const NativeAnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default React.forwardRef(function AnimatedPressable({
  onPressIn,
  onPressOut,
  style,
  ...props
}, ref) {
  const [scale] = useState(() => new Animated.Value(1));
  const useNativeDriver = Platform.OS !== 'web';

  const animateScale = (toValue) => {
    Animated.spring(scale, {
      toValue,
      speed: 32,
      bounciness: 5,
      useNativeDriver,
    }).start();
  };

  return (
    <NativeAnimatedPressable
      {...props}
      ref={ref}
      onPressIn={(event) => {
        animateScale(0.96);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateScale(1);
        onPressOut?.(event);
      }}
      style={[style, { transform: [{ scale }] }]}
    />
  );
});
