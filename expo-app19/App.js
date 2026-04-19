/**
 * AUTO CARE - Main App Component
 * Vehicle maintenance tracking and reminders
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#1D3557',
    secondary: '#14213D',
    background: '#0F1215',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#1D3557',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const AutoCareContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import LogsScreen from './screens/LogsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AutoCareContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Auto Care'
            }}
          />
          <Tab.Screen 
            name="Vehicles" 
            component={VehiclesScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Maintenance" 
            component={MaintenanceScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Logs" 
            component={LogsScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AutoCareContext.Provider>
  );
}
