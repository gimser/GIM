import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export function Card({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
});
