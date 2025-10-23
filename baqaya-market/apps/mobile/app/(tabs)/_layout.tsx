import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Ionicons name="map" size={18} color={color} /> }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: ({ color }) => <Ionicons name="list" size={18} color={color} /> }} />
      <Tabs.Screen name="vendor" options={{ title: 'Vendor', tabBarIcon: ({ color }) => <Ionicons name="storefront" size={18} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons name="settings" size={18} color={color} /> }} />
    </Tabs>
  );
}
