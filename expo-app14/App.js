/**
 * PHOTO STUDIO - Main App Component
 * Photography portfolio and editing
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#0D1B2A',
    secondary: '#1B263B',
    background: '#0A0F14',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#0D1B2A',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const PhotoStudioContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import EditScreen from './screens/EditScreen';
import ShareScreen from './screens/ShareScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PhotoStudioContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Photo Studio'
            }}
          />
          <Tab.Screen 
            name="Gallery" 
            component={GalleryScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Edit" 
            component={EditScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Share" 
            component={ShareScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PhotoStudioContext.Provider>
  );
}
