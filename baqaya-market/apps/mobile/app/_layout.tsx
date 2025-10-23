import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // Default to LTR; can toggle to RTL for Arabic later
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(false);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="offer/[id]" options={{ title: 'Offer' }} />
    </Stack>
  );
}
