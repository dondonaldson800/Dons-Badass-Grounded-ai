/**
 * RECIPE HUB - Main App Component
 * Discover recipes and plan weekly meals
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '#2A9D8F',
    secondary: '#1B7A6E',
    background: '#0F1A18',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '#2A9D8F',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const RecipeHubContext = React.createContext({
  theme: AppTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import RecipesScreen from './screens/RecipesScreen';
import Meal PlanScreen from './screens/Meal PlanScreen';
import GroceryScreen from './screens/GroceryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RecipeHubContext.Provider value={{ theme: AppTheme }}>
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
              title: 'Recipe Hub'
            }}
          />
          <Tab.Screen 
            name="Recipes" 
            component={RecipesScreen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="Meal Plan" 
            component={Meal PlanScreen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="Grocery" 
            component={GroceryScreen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecipeHubContext.Provider>
  );
}
