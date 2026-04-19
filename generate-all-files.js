#!/usr/bin/env node

/**
 * GROUNDED EMPIRE - Apps 5-20 File Generator
 * Generates all necessary files for 16 React Native/Expo apps
 */

const fs = require('fs');
const path = require('path');

// App configurations
const apps = [
  {
    num: 5,
    name: 'Fit Empire',
    slug: 'fit-empire',
    bundleId: 'com.empire.fitness',
    theme: '#E63946',
    secondary: '#A4161A',
    bgColor: '#1A0F0F',
    screens: ['Home', 'Workouts', 'Progress', 'Profile'],
    description: 'Track workouts, calories, and fitness goals'
  },
  {
    num: 6,
    name: 'Recipe Hub',
    slug: 'recipe-hub',
    bundleId: 'com.empire.recipes',
    theme: '#2A9D8F',
    secondary: '#1B7A6E',
    bgColor: '#0F1A18',
    screens: ['Home', 'Recipes', 'Meal Plan', 'Grocery'],
    description: 'Discover recipes and plan weekly meals'
  },
  {
    num: 7,
    name: 'Budget Master',
    slug: 'budget-master',
    bundleId: 'com.empire.finance',
    theme: '#7209B7',
    secondary: '#560BAD',
    bgColor: '#1A0F1A',
    screens: ['Home', 'Expenses', 'Budget', 'Reports'],
    description: 'Manage finances and track spending'
  },
  {
    num: 8,
    name: 'Real Estate Pro',
    slug: 'realestate-pro',
    bundleId: 'com.empire.realestate',
    theme: '#0096C7',
    secondary: '#0077B6',
    bgColor: '#0F1619',
    screens: ['Home', 'Listings', 'Favorites', 'Calculator'],
    description: 'Browse properties and calculate mortgages'
  },
  {
    num: 9,
    name: 'Travel Guide',
    slug: 'travel-guide',
    bundleId: 'com.empire.travel',
    theme: '#F77F00',
    secondary: '#DC2F02',
    bgColor: '#1A150F',
    screens: ['Home', 'Destinations', 'Itinerary', 'Tips'],
    description: 'Plan trips and explore destinations'
  },
  {
    num: 10,
    name: 'Pet Care',
    slug: 'pet-care',
    bundleId: 'com.empire.petcare',
    theme: '#F72585',
    secondary: '#B5179E',
    bgColor: '#1A0F17',
    screens: ['Home', 'Pets', 'Health', 'Reminders'],
    description: 'Track pet health and appointments'
  },
  {
    num: 11,
    name: 'Learn Hub',
    slug: 'learn-hub',
    bundleId: 'com.empire.education',
    theme: '#023E8A',
    secondary: '#03045E',
    bgColor: '#0F1419',
    screens: ['Home', 'Courses', 'Progress', 'Resources'],
    description: 'Online learning and skill development'
  },
  {
    num: 12,
    name: 'Career Path',
    slug: 'career-path',
    bundleId: 'com.empire.career',
    theme: '#495057',
    secondary: '#343A40',
    bgColor: '#121314',
    screens: ['Home', 'Jobs', 'Applications', 'Resume'],
    description: 'Job search and career development'
  },
  {
    num: 13,
    name: 'Home Garden',
    slug: 'home-garden',
    bundleId: 'com.empire.homegarden',
    theme: '#6A4C93',
    secondary: '#563D7C',
    bgColor: '#15111A',
    screens: ['Home', 'Plants', 'Calendar', 'Tips'],
    description: 'Garden planning and plant care'
  },
  {
    num: 14,
    name: 'Photo Studio',
    slug: 'photo-studio',
    bundleId: 'com.empire.photography',
    theme: '#0D1B2A',
    secondary: '#1B263B',
    bgColor: '#0A0F14',
    screens: ['Home', 'Gallery', 'Edit', 'Share'],
    description: 'Photography portfolio and editing'
  },
  {
    num: 15,
    name: 'Music Player',
    slug: 'music-player',
    bundleId: 'com.empire.music',
    theme: '#D90429',
    secondary: '#9D0208',
    bgColor: '#1A0F11',
    screens: ['Home', 'Library', 'Playlists', 'Player'],
    description: 'Music streaming and playlist management'
  },
  {
    num: 16,
    name: 'Sports News',
    slug: 'sports-news',
    bundleId: 'com.empire.sports',
    theme: '#06A77D',
    secondary: '#048B64',
    bgColor: '#0F1A17',
    screens: ['Home', 'News', 'Scores', 'Favorites'],
    description: 'Live scores and sports updates'
  },
  {
    num: 17,
    name: 'Book Tracker',
    slug: 'book-tracker',
    bundleId: 'com.empire.books',
    theme: '#6A040F',
    secondary: '#370617',
    bgColor: '#14090C',
    screens: ['Home', 'Library', 'Reading', 'Stats'],
    description: 'Track reading progress and reviews'
  },
  {
    num: 18,
    name: 'Style Guide',
    slug: 'style-guide',
    bundleId: 'com.empire.fashion',
    theme: '#CB997E',
    secondary: '#B07D62',
    bgColor: '#1A1612',
    screens: ['Home', 'Outfits', 'Wardrobe', 'Trends'],
    description: 'Fashion inspiration and wardrobe management'
  },
  {
    num: 19,
    name: 'Auto Care',
    slug: 'auto-care',
    bundleId: 'com.empire.automotive',
    theme: '#1D3557',
    secondary: '#14213D',
    bgColor: '#0F1215',
    screens: ['Home', 'Vehicles', 'Maintenance', 'Logs'],
    description: 'Vehicle maintenance tracking and reminders'
  },
  {
    num: 20,
    name: 'Zen Wellness',
    slug: 'zen-wellness',
    bundleId: 'com.empire.wellness',
    theme: '#9D4EDD',
    secondary: '#7B2CBF',
    bgColor: '#17111A',
    screens: ['Home', 'Meditate', 'Journal', 'Progress'],
    description: 'Meditation, mindfulness, and wellness tracking'
  }
];

// Helper function to create package.json
function createPackageJson(app) {
  return JSON.stringify({
    "name": app.slug,
    "version": "1.0.0",
    "main": "node_modules/expo/AppEntry.js",
    "scripts": {
      "start": "expo start",
      "android": "expo start --android",
      "ios": "expo start --ios",
      "build:android": "eas build --platform android --profile preview"
    },
    "dependencies": {
      "expo": "~51.0.0",
      "expo-status-bar": "~1.12.1",
      "react": "18.2.0",
      "react-native": "0.74.0",
      "@react-navigation/native": "^6.1.9",
      "@react-navigation/bottom-tabs": "^6.5.11",
      "@react-native-async-storage/async-storage": "1.23.1"
    },
    "devDependencies": {
      "@babel/core": "^7.24.0"
    }
  }, null, 2);
}

// Helper function to create app.json
function createAppJson(app) {
  return JSON.stringify({
    "expo": {
      "name": app.name,
      "slug": app.slug,
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "userInterfaceStyle": "dark",
      "scheme": app.slug,
      "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": app.bgColor
      },
      "assetBundlePatterns": ["**/*"],
      "ios": {
        "supportsTablet": true,
        "bundleIdentifier": app.bundleId,
        "buildNumber": "1"
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./assets/adaptive-icon.png",
          "backgroundColor": app.bgColor
        },
        "package": app.bundleId,
        "versionCode": 1,
        "permissions": ["INTERNET"]
      },
      "extra": {
        "eas": {
          "projectId": `${app.slug}-project`
        }
      }
    }
  }, null, 2);
}

// Helper function to create eas.json
function createEasJson() {
  return JSON.stringify({
    "cli": {
      "version": ">= 5.0.0"
    },
    "build": {
      "development": {
        "developmentClient": true,
        "distribution": "internal"
      },
      "preview": {
        "distribution": "internal",
        "android": {
          "buildType": "apk"
        }
      },
      "production": {
        "android": {
          "buildType": "app-bundle"
        }
      }
    },
    "submit": {
      "production": {}
    }
  }, null, 2);
}

// Helper function to create App.js
function createAppJs(app) {
  const contextName = app.name.replace(/\s/g, '');
  return `/**
 * ${app.name.toUpperCase()} - Main App Component
 * ${app.description}
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Theme
export const AppTheme = {
  dark: true,
  colors: {
    primary: '${app.theme}',
    secondary: '${app.secondary}',
    background: '${app.bgColor}',
    card: '#252525',
    text: '#F5F5F5',
    border: '#3A3A3A',
    notification: '${app.theme}',
    error: '#FF3B30',
    success: '#4CAF50',
  },
};

// Context
export const ${contextName}Context = React.createContext({
  theme: AppTheme,
});

// Screens
import ${app.screens[0]}Screen from './screens/${app.screens[0]}Screen';
import ${app.screens[1]}Screen from './screens/${app.screens[1]}Screen';
import ${app.screens[2]}Screen from './screens/${app.screens[2]}Screen';
import ${app.screens[3]}Screen from './screens/${app.screens[3]}Screen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <${contextName}Context.Provider value={{ theme: AppTheme }}>
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
            name="${app.screens[0]}" 
            component={${app.screens[0]}Screen}
            options={{
              tabBarIcon: ({ color }) => '🏠',
              title: '${app.name}'
            }}
          />
          <Tab.Screen 
            name="${app.screens[1]}" 
            component={${app.screens[1]}Screen}
            options={{
              tabBarIcon: ({ color }) => '📋',
            }}
          />
          <Tab.Screen 
            name="${app.screens[2]}" 
            component={${app.screens[2]}Screen}
            options={{
              tabBarIcon: ({ color }) => '📊',
            }}
          />
          <Tab.Screen 
            name="${app.screens[3]}" 
            component={${app.screens[3]}Screen}
            options={{
              tabBarIcon: ({ color }) => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </${contextName}Context.Provider>
  );
}
`;
}

// Helper to create a basic screen
function createScreen(app, screenName, screenIndex) {
  const contextName = app.name.replace(/\s/g, '');
  const emojis = ['🏠', '📋', '📊', '⚙️'];
  
  return `/**
 * ${screenName.toUpperCase()} SCREEN - ${app.name}
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ${contextName}Context } from '../App';

const ${screenName}Screen = ({ navigation }) => {
  const { theme } = useContext(${contextName}Context);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hero}>${emojis[screenIndex]}</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          ${screenName}
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          ${app.description}
        </Text>

        {/* Feature Cards */}
        <View style={styles.grid}>
          ${[1, 2, 3, 4].map(i => `<View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Feature ${i}
            </Text>
            <Text style={[styles.cardText, { color: '#CCC' }]}>
              ${app.name} feature description
            </Text>
          </View>`).join('\n          ')}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Take Action</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  hero: { fontSize: 64, textAlign: 'center', marginVertical: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 32, textAlign: 'center', fontWeight: '600' },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardText: { fontSize: 14, lineHeight: 20 },
  
  button: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ${screenName}Screen;
`;
}

// Main generation function
console.log('🏗️ Generating files for Apps 5-20...\n');

let totalFiles = 0;

apps.forEach(app => {
  const dir = `/app/expo-app${app.num}`;
  
  console.log(`📱 App #${app.num}: ${app.name}`);
  
  // Create package.json
  fs.writeFileSync(`${dir}/package.json`, createPackageJson(app));
  totalFiles++;
  
  // Create app.json
  fs.writeFileSync(`${dir}/app.json`, createAppJson(app));
  totalFiles++;
  
  // Create eas.json
  fs.writeFileSync(`${dir}/eas.json`, createEasJson());
  totalFiles++;
  
  // Create App.js
  fs.writeFileSync(`${dir}/App.js`, createAppJs(app));
  totalFiles++;
  
  // Create all screens
  app.screens.forEach((screenName, index) => {
    fs.writeFileSync(
      `${dir}/screens/${screenName}Screen.js`,
      createScreen(app, screenName, index)
    );
    totalFiles++;
  });
  
  // Create .gitignore
  const gitignore = `node_modules/
.expo/
.expo-shared/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.env
`;
  fs.writeFileSync(`${dir}/.gitignore`, gitignore);
  totalFiles++;
  
  // Create README.md
  const readme = `# ${app.name}

${app.description}

## Bundle ID
- Android: \`${app.bundleId}\`
- iOS: \`${app.bundleId}\`

## Theme
- Primary: ${app.theme}
- Secondary: ${app.secondary}

## Screens
${app.screens.map((s, i) => `${i + 1}. ${s}Screen`).join('\n')}

## Setup

\`\`\`bash
yarn install
expo start
\`\`\`

## Build

\`\`\`bash
eas build --platform android --profile production
\`\`\`
`;
  fs.writeFileSync(`${dir}/README.md`, readme);
  totalFiles++;
  
  console.log(`  ✓ Generated ${7 + app.screens.length} files`);
});

console.log(`\n✅ Complete! Generated ${totalFiles} files across 16 apps.`);
console.log('\n📦 Ready to create zip archives...\n');
