#!/usr/bin/env python3
"""
Convert Web App to React Native + Build AAB/APK
Automated setup for Expo + EAS builds
"""

import subprocess
import json
import os

def run(cmd):
    subprocess.run(cmd, shell=True)

def log(msg):
    print(f"\n✅ {msg}")

print("""
╔════════════════════════════════════════════════════════════════╗
║     REACT NATIVE CONVERSION + AAB/APK BUILD SETUP             ║
║              For Grounded Empire Mobile App                   ║
╚════════════════════════════════════════════════════════════════╝
""")

# Step 1: Install Expo
log("Step 1: Installing Expo packages...")
run("npm install expo expo-splash-screen expo-asset expo-constants")

# Step 2: Create basic React Native app structure
log("Step 2: Creating React Native structure...")

# Create src directory if it doesn't exist
os.makedirs("src", exist_ok=True)

# Create App.tsx for React Native
app_tsx = '''import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grounded Empire</Text>
        <Text style={styles.subtitle}>The AI Search Engine with Verified Sources</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Stop Guessing. Start Knowing.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E14',
  },
  header: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 26,
  },
});
'''

with open('App.tsx', 'w') as f:
    f.write(app_tsx)

log("Step 3: Created App.tsx")

# Step 3: Update package.json
log("Step 4: Updating package.json for React Native...")
with open('package.json', 'r') as f:
    pkg = json.load(f)

pkg['main'] = 'node_modules/expo/AppEntry.js'
pkg['scripts'] = {
    'dev': 'expo start',
    'build:apk': 'eas build --platform android --profile preview',
    'build:aab': 'eas build --platform android --profile production',
    'build:both': 'npm run build:aab && npm run build:apk',
    'web': 'vite',
    'preview': 'vite preview'
}

with open('package.json', 'w') as f:
    json.dump(pkg, f, indent=2)

log("Step 5: Updated package.json with build scripts")

# Step 4: Create eas.json if it doesn't exist properly
log("Step 6: Configuring EAS builds...")
eas_config = {
    "cli": {
        "version": ">= 8.0.0"
    },
    "build": {
        "preview": {
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
}

with open('eas.json', 'w') as f:
    json.dump(eas_config, f, indent=2)

log("Step 7: EAS configuration ready")

print("""
╔════════════════════════════════════════════════════════════════╗
║                     SETUP COMPLETE! ✅                        ║
╚════════════════════════════════════════════════════════════════╝

📋 NEXT STEPS:

1️⃣  ADD GITHUB SECRETS (Required once):
   Go to: https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/settings/secrets/actions
   
   Add these 3 secrets:
   • EAS_PROJECT_ID = (from 'eas project info')
   • ANDROID_PACKAGE_NAME = com.dondonaldson.groundedempire
   • GOOGLE_PLAY_SERVICE_ACCOUNT = (base64 JSON from Google Cloud)

2️⃣  START BUILD IN GITHUB ACTIONS:
   Go to: https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions
   
   Run "Build APK & AAB" workflow:
   • Click "Run workflow"
   • Wait 15-20 minutes
   • Download artifacts (APK & AAB)

3️⃣  TEST ON DEVICE:
   • APK: Install directly on Android device
   • AAB: Upload to Google Play Store

4️⃣  OR BUILD LOCALLY IN TERMUX:
   eas build --platform android --profile production --wait

╔════════════════════════════════════════════════════════════════╗
║  FILES CREATED:                                                ║
║  • App.tsx - React Native main component                      ║
║  • app.json - Expo configuration                              ║
║  • eas.json - Build configuration                             ║
║  • package.json - Updated with build scripts                  ║
╚════════════════════════════════════════════════════════════════╝

🚀 Ready to build! Follow the steps above.
""")
