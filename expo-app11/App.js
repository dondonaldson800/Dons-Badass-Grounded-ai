/**
 * LEARN HUB - Main App Component
 * Online learning and skill development
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#023E8A',
    secondary: '#03045E',
    background: '#0F1419',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#023E8A',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const LearnHubContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProgressScreen from './screens/ProgressScreen';
import ResourcesScreen from './screens/ResourcesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <LearnHubContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Learn Hub'
            }}
          />
          <Tab.Screen 
            name="Courses" 
            component={CoursesScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Resources" 
            component={ResourcesScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LearnHubContext.Provider>
  );
}
