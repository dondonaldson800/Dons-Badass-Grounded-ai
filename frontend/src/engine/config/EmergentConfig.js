/**
 * EMERGENT CONFIGURATION
 * Badass Grounded AI - Central Configuration
 * Owner: Don (Master Builder)
 */

export const EmergentConfig = {
  // AdMob Revenue Configuration
  admob: {
    appId: "6268835652",
    publisherId: "pub-8715031019966551",
    framework: "Vibe Code Apps",
    mode: "Production"
  },

  // AI Engine Configuration
  ai: {
    provider: "Emergent LLM",
    models: {
      text: "gemini-2.5-pro",
      image: "gemini-3-pro-image-preview",
      chat: "gemini-2.5-pro"
    },
    maxTokens: 2048,
    temperature: 0.7
  },

  // Empire Settings
  empire: {
    totalApps: 20,
    categories: [
      "Business",
      "Health",
      "Legal",
      "Finance",
      "Education",
      "Entertainment"
    ]
  },

  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_BACKEND_URL || '',
    endpoints: {
      qa: '/api/qa/ask',
      chat: '/api/ai/chat',
      image: '/api/generate-image',
      apps: '/api/apps',
      stats: '/api/stats'
    }
  },

  // Feature Flags
  features: {
    enableAdMob: true,
    enableFileUpload: true,
    enableRevenueTracking: true,
    enableAnalytics: true
  }
};

export default EmergentConfig;
