import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'outline';

export function Button({
  title,
  onPress,
  variant = 'primary',
  style,
}: {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.base, variant === 'primary' ? styles.primary : styles.outline, style]}>
      <Text style={variant === 'primary' ? styles.primaryText : styles.outlineText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: '#10b981' },
  primaryText: { color: 'white', fontWeight: '600' },
  outline: { borderWidth: 1, borderColor: '#d1d5db' },
  outlineText: { color: '#111827', fontWeight: '600' },
});
