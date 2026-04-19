/**
 * GROUNDED GIVING - Nonprofit Community Portal
 * App #4 - Energetic Orange Theme
 * Features: Impact tracking, donations, volunteer coordination
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Nonprofit Theme - Energetic Orange (Action & Community)
export const NonprofitTheme = {
  dark: true,
  colors: {
    primary: '#FF8C00',      // Energetic Orange
    secondary: '#E2725B',    // Terracotta (Humanity)
    background: '#1A1A1A',   // Warm Off-Black
    card: '#252525',         // Card background
    text: '#F5F5DC',         // Parchment White
    border: '#3A3A3A',       // Border
    notification: '#FF8C00',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const NonprofitContext = React.createContext({
  theme: NonprofitTheme,
  impact: {},
  volunteers: [],
  events: [],
  signUpForEvent: () => {},
});

// Screens
import HomeScreen from './screens/HomeScreen';
import DonateScreen from './screens/DonateScreen';
import VolunteerScreen from './screens/VolunteerScreen';
import ImpactScreen from './screens/ImpactScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [impact, setImpact] = useState({
    goalsMet: 12,
    totalGoals: 20,
    activeVolunteers: 47,
    totalDonations: 15420,
    livesImpacted: 312,
  });

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Community Food Drive',
      date: '2025-01-05',
      location: 'Central Park',
      volunteers: 12,
      spotsLeft: 8,
    },
    {
      id: '2',
      title: 'Youth Mentorship Program',
      date: '2025-01-12',
      location: 'Community Center',
      volunteers: 8,
      spotsLeft: 12,
    },
    {
      id: '3',
      title: 'Environmental Cleanup',
      date: '2025-01-19',
      location: 'Riverside Trail',
      volunteers: 15,
      spotsLeft: 5,
    },
  ]);

  const [volunteers, setVolunteers] = useState([]);

  const signUpForEvent = async (eventId) => {
    const updatedEvents = events.map(event =>
      event.id === eventId
        ? { ...event, volunteers: event.volunteers + 1, spotsLeft: event.spotsLeft - 1 }
        : event
    );
    setEvents(updatedEvents);
    
    // Save to local storage
    await AsyncStorage.setItem('volunteer_events', JSON.stringify(updatedEvents));
  };

  return (
    <NonprofitContext.Provider value={{ theme: NonprofitTheme, impact, volunteers, events, signUpForEvent }}>
      <NavigationContainer theme={NonprofitTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: NonprofitTheme.colors.card,
              borderTopColor: NonprofitTheme.colors.border,
              height: 70,
              paddingBottom: 12,
              paddingTop: 8,
            },
            tabBarActiveTintColor: NonprofitTheme.colors.primary,
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: NonprofitTheme.colors.background,
            },
            headerTintColor: NonprofitTheme.colors.text,
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
              tabBarIcon: ({ color }) => '❤️',
              title: 'Grounded Giving'
            }}
          />
          <Tab.Screen 
            name="Impact" 
            component={ImpactScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
              title: 'Impact'
            }}
          />
          <Tab.Screen 
            name="Donate" 
            component={DonateScreen}
            options={{
              tabBarIcon: ({ color }) => '💰',
              title: 'Donate'
            }}
          />
          <Tab.Screen 
            name="Volunteer" 
            component={VolunteerScreen}
            options={{
              tabBarIcon: ({ color }) => '🤝',
              title: 'Volunteer'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NonprofitContext.Provider>
  );
}
