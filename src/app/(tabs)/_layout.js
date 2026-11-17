import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const tabIcons = {
  index: '⌂',
  create: '+',
  favorites: '♥',
  settings: '⚙',
};

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 21 }}>{tabIcons.index}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 21 }}>{tabIcons.create}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorit',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 21 }}>{tabIcons.favorites}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Pengaturan',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 21 }}>{tabIcons.settings}</Text>
          ),
        }}
      />
    </Tabs>
  );
}
