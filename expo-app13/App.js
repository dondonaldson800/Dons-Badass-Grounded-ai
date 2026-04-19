/**
 * HOME GARDEN - Main App Component
 * Garden planning and plant care
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#6A4C93',
    secondary: '#563D7C',
    background: '#15111A',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#6A4C93',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const HomeGardenContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import PlantsScreen from './screens/PlantsScreen';
import CalendarScreen from './screens/CalendarScreen';
import TipsScreen from './screens/TipsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <HomeGardenContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Home Garden'
            }}
          />
          <Tab.Screen 
            name="Plants" 
            component={PlantsScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Calendar" 
            component={CalendarScreen}
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
    </HomeGardenContext.Provider>
  );
}
