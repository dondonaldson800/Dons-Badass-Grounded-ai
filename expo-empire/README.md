# 🏰 GROUNDED EMPIRE - GENERAL FRAMEWORK

## The Steel Frame (App #1)

This is the master template for the Big Four:
1. **General** (This app)
2. **Legal**
3. **Medical**
4. **Nonprofit**

## Architecture

- **Theme**: Grounded Truth (Dark Mode)
- **State**: Centralized via EmpireContext
- **Navigation**: Bottom tabs + Stack
- **Monetization**: AdMob ready
- **Build**: EAS (Expo Application Services)

## Setup

```bash
cd expo-empire
npm install
expo start
```

## Build APK/AAB

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build Android APK
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

## Next Steps

1. Connect AI backend API
2. Add AdMob configuration
3. Build Legal, Medical, Nonprofit variants
