/**
 * GROUNDED EMPIRE - GENERAL FRAMEWORK (App #1)
 * "The Steel Frame" - Master Template for Legal, Medical, Nonprofit
 * 
 * Architecture: Modular state management, dark mode default
 * Standard: Grounded Truth aesthetic
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme Configuration - "Grounded Truth" Dark Mode
export const GroundedTheme = {
  dark: true,
  colors: {
    primary: '#2E5BFF',      // Electric Cobalt
    background: '#0f1419',   // Deep Navy
    card: '#1a2332',         // Surface
    text: '#FFFFFF',         // Primary Text
    border: '#2a3544',       // Borders
    notification: '#2E5BFF', // Accent
    error: '#FF3B30',        // Error State
    success: '#4CAF50',      // Success State
    warning: '#FFA726',      // Warning State
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 14, fontWeight: 'normal' },
    small: { fontSize: 12, fontWeight: 'normal' },
  }
};

// Global State Management (Shared across all 4 apps)
export const EmpireContext = React.createContext({
  theme: GroundedTheme,
  user: null,
  settings: {},
  updateSettings: () => {},
});

// Screens
import HomeScreen from './screens/HomeScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import ToolsScreen from './screens/ToolsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main App Component
export default function App() {
  const [settings, setSettings] = useState({
    adMobEnabled: true,
    darkMode: true,
    notifications: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('@empire_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await AsyncStorage.setItem('@empire_settings', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <EmpireContext.Provider value={{ theme: GroundedTheme, settings, updateSettings }}>
      <NavigationContainer theme={GroundedTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: GroundedTheme.colors.card,
              borderTopColor: GroundedTheme.colors.border,
              height: 60,
              paddingBottom: 8,
            },
            tabBarActiveTintColor: GroundedTheme.colors.primary,
            tabBarInactiveTintColor: '#666',
            headerStyle: {
              backgroundColor: GroundedTheme.colors.background,
            },
            headerTintColor: GroundedTheme.colors.text,
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => '🏰',
              title: 'Empire General'
            }}
          />
          <Tab.Screen 
            name="AI" 
            component={AIAssistantScreen}
            options={{
              tabBarIcon: ({ color }) => '💬',
              title: 'AI Assistant'
            }}
          />
          <Tab.Screen 
            name="Tools" 
            component={ToolsScreen}
            options={{
              tabBarIcon: ({ color }) => '🛠️',
              title: 'Utilities'
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
              title: 'Settings'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </EmpireContext.Provider>
  );
}
