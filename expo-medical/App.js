/**
 * EMPIRE MEDICAL - Privacy-First Health Tracker
 * App #3 - Clinical Teal Theme
 * Security: Encrypted local-only storage (SecureStore)
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

// Medical Theme - Clinical Teal (High Contrast)
export const MedicalTheme = {
  dark: true,
  colors: {
    primary: '#008080',      // Clinical Teal
    secondary: '#66BB6A',    // Medical Green
    background: '#0F1912',   // Dark Green-Black
    card: '#1a2920',         // Card background
    text: '#FFFFFF',         // White (High Contrast)
    border: '#2a4030',       // Border
    notification: '#008080',
    error: '#FF3B30',
    warning: '#FFA726',
    success: '#4CAF50',
  },
};

// Context
export const MedicalContext = React.createContext({
  theme: MedicalTheme,
  healthLogs: [],
  addLog: () => {},
  emergencyInfo: null,
  updateEmergencyInfo: () => {},
});

// Screens
import HomeScreen from './screens/HomeScreen';
import DailyLogScreen from './screens/DailyLogScreen';
import HistoryScreen from './screens/HistoryScreen';
import EmergencyScreen from './screens/EmergencyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [healthLogs, setHealthLogs] = useState([]);
  const [emergencyInfo, setEmergencyInfo] = useState(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    loadHealthData();
    loadEmergencyInfo();
  }, []);

  const loadHealthData = async () => {
    try {
      const encrypted = await SecureStore.getItemAsync('health_logs');
      if (encrypted) {
        setHealthLogs(JSON.parse(encrypted));
      }
    } catch (error) {
      console.error('Failed to load health logs:', error);
    }
  };

  const loadEmergencyInfo = async () => {
    try {
      const info = await SecureStore.getItemAsync('emergency_info');
      if (info) {
        setEmergencyInfo(JSON.parse(info));
      }
    } catch (error) {
      console.error('Failed to load emergency info:', error);
    }
  };

  const addLog = async (log) => {
    try {
      const newLogs = [
        {
          id: Date.now().toString(),
          ...log,
          timestamp: new Date().toISOString(),
        },
        ...healthLogs,
      ];
      setHealthLogs(newLogs);
      
      // Encrypt and save to SecureStore
      await SecureStore.setItemAsync('health_logs', JSON.stringify(newLogs));
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  };

  const updateEmergencyInfo = async (info) => {
    try {
      setEmergencyInfo(info);
      await SecureStore.setItemAsync('emergency_info', JSON.stringify(info));
    } catch (error) {
      console.error('Failed to save emergency info:', error);
    }
  };

  return (
    <MedicalContext.Provider value={{ 
      theme: MedicalTheme, 
      healthLogs, 
      addLog, 
      emergencyInfo, 
      updateEmergencyInfo 
    }}>
      <NavigationContainer theme={MedicalTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: MedicalTheme.colors.card,
              borderTopColor: MedicalTheme.colors.border,
              height: 70,
              paddingBottom: 12,
              paddingTop: 8,
            },
            tabBarActiveTintColor: MedicalTheme.colors.primary,
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: MedicalTheme.colors.background,
            },
            headerTintColor: MedicalTheme.colors.text,
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
              tabBarIcon: ({ color }) => '🏥',
              title: 'Empire Medical'
            }}
          />
          <Tab.Screen 
            name="DailyLog" 
            component={DailyLogScreen}
            options={{
              tabBarIcon: ({ color }) => '📝',
              title: 'Daily Log'
            }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
              title: 'History'
            }}
          />
          <Tab.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{
              tabBarIcon: ({ color }) => '🚨',
              title: 'Emergency',
              tabBarActiveTintColor: '#FF3B30',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MedicalContext.Provider>
  );
}
