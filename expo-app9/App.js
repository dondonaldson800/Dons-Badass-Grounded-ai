/**
 * TRAVEL GUIDE - Main App Component
 * Plan trips and explore destinations
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#F77F00',
    secondary: '#DC2F02',
    background: '#1A150F',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#F77F00',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const TravelGuideContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import DestinationsScreen from './screens/DestinationsScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import TipsScreen from './screens/TipsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TravelGuideContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Travel Guide'
            }}
          />
          <Tab.Screen 
            name="Destinations" 
            component={DestinationsScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Itinerary" 
            component={ItineraryScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Tips" 
            component={TipsScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TravelGuideContext.Provider>
  );
}
