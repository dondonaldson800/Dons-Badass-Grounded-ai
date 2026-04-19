/**
 * CAREER PATH - Main App Component
 * Job search and career development
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#495057',
    secondary: '#343A40',
    background: '#121314',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#495057',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const CareerPathContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import ApplicationsScreen from './screens/ApplicationsScreen';
import ResumeScreen from './screens/ResumeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CareerPathContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Career Path'
            }}
          />
          <Tab.Screen 
            name="Jobs" 
            component={JobsScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Applications" 
            component={ApplicationsScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Resume" 
            component={ResumeScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CareerPathContext.Provider>
  );
}
