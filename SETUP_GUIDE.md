# Setup Guide for AI Studio App

## Prerequisites
- Node.js 16+
- npm or yarn
- EAS CLI (for mobile builds)
- Gemini API key
- Stripe API key (optional, for payments)

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

**Create `.env.local` from `.env.example`:**
```bash
cp .env.example .env.local
```

**Edit `.env.local` and add your credentials:**
```
GEMINI_API_KEY=your-actual-gemini-api-key
STRIPE_API_KEY=your-stripe-key
```

### 3. Run Locally
```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Building for Mobile

### Setup EAS
```bash
npm install -g eas-cli
eas login
eas init
```

### Build APK (Android Preview)
```bash
eas build --platform android --profile preview
```

### Build for Production
```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

## GitHub Actions CI/CD

This repository is configured with automated builds:

1. **Trigger**: Automatic on push to `main` branch
2. **Build Profile**: Preview (APK for Android)
3. **Requirements**: Set `EAS_PROJECT_ID` in GitHub Secrets

### Setup GitHub Actions

1. Get your EAS Project ID:
   ```bash
   eas project info
   ```

2. Add to GitHub Secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add `EAS_PROJECT_ID`

## Features

- **Chat**: AI-powered conversations (Gemini)
- **Voice**: Real-time voice interaction
- **Image Generation**: AI image creation
- **Image Editing**: AI-powered image manipulation
- **Video Generation**: Create videos with AI
- **Analysis**: Data and content analysis
- **Text-to-Speech**: Audio generation

## Subscription Tiers

- **FREE**: Basic access to Chat feature
- **EMPIRE_PRO**: All features unlocked (requires payment)

## Troubleshooting

### APK Build Fails
- Ensure `eas.json` is properly configured
- Check EAS project is initialized: `eas project info`
- Verify Node.js version compatibility

### Gemini API Errors
- Verify `GEMINI_API_KEY` is correctly set
- Check API key has appropriate permissions
- Ensure rate limits aren't exceeded

### Dependencies Installation Issues
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Reinstall: `npm install`

## Support

View your app in AI Studio: https://ai.studio/apps/drive/16xx6e-qj4NhOlChKW8BxYb2JVFT6_ZgC
