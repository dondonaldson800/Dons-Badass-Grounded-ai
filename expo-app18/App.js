/**
 * STYLE GUIDE - Main App Component
 * Fashion inspiration and wardrobe management
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#CB997E',
    secondary: '#B07D62',
    background: '#1A1612',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#CB997E',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const StyleGuideContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import OutfitsScreen from './screens/OutfitsScreen';
import WardrobeScreen from './screens/WardrobeScreen';
import TrendsScreen from './screens/TrendsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StyleGuideContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Style Guide'
            }}
          />
          <Tab.Screen 
            name="Outfits" 
            component={OutfitsScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Wardrobe" 
            component={WardrobeScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Trends" 
            component={TrendsScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StyleGuideContext.Provider>
  );
}
