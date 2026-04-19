/**
 * REAL ESTATE PRO - Main App Component
 * Browse properties and calculate mortgages
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#0096C7',
    secondary: '#0077B6',
    background: '#0F1619',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#0096C7',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const RealEstateProContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import ListingsScreen from './screens/ListingsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CalculatorScreen from './screens/CalculatorScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RealEstateProContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Real Estate Pro'
            }}
          />
          <Tab.Screen 
            name="Listings" 
            component={ListingsScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Favorites" 
            component={FavoritesScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Calculator" 
            component={CalculatorScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RealEstateProContext.Provider>
  );
}
