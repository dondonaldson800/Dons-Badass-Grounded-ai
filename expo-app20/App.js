/**
 * ZEN WELLNESS - Main App Component
 * Meditation, mindfulness, and wellness tracking
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#9D4EDD',
    secondary: '#7B2CBF',
    background: '#17111A',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#9D4EDD',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const ZenWellnessContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import MeditateScreen from './screens/MeditateScreen';
import JournalScreen from './screens/JournalScreen';
import ProgressScreen from './screens/ProgressScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ZenWellnessContext.Provider value={{ theme: AppTheme }}>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: AppTheme.colors.card,
              borderTopColor: AppTheme.colors.border,
              height: 70,
              paddingBottom: 12,
              paddingTop: 8,
            },
            tabBarActiveTintColor: AppTheme.colors.primary,
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: AppTheme.colors.background,
            },
            headerTintColor: AppTheme.colors.text,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => '🏠',
              title: 'Zen Wellness'
            }}
          />
          <Tab.Screen 
            name="Meditate" 
            component={MeditateScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Journal" 
            component={JournalScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ZenWellnessContext.Provider>
  );
}
