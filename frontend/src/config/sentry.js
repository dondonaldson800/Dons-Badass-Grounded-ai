/**
 * SENTRY CONFIGURATION - Don's Empire
 * Security guard for all 20 apps in the container
 * Tracks errors, performance, and user experience
 */

import * as Sentry from "@sentry/react";

// Initialize Sentry with production-ready config
export const initSentry = () => {
  // Only initialize if DSN is provided
  const sentryDsn = process.env.REACT_APP_SENTRY_DSN;
  
  if (!sentryDsn) {
    console.warn('⚠️ Sentry DSN not configured - running without error tracking');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    
    // Integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: 0.05, // 5% - Free plan friendly
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of error sessions
    
    // Environment
    environment: process.env.NODE_ENV || "production",
    
    // Release tracking
    release: `dons-empire@${process.env.REACT_APP_VERSION || '1.0.0'}`,
    
    // Custom tags for the 20-app container
    initialScope: {
      tags: {
        project: "dons-empire",
        type: "super-app-container",
        admob_publisher: "pub-8715031019966551"
      }
    },
    
    // Before send hook - enrich error context
    beforeSend(event, hint) {
      // Add which app in the empire threw the error
      if (event.tags) {
        const currentPath = window.location.pathname;
        event.tags.empire_app = getAppFromPath(currentPath);
      }
      return event;
    },
  });

  console.log('✅ Sentry initialized - Empire security guard active');
};

// Helper to identify which app threw the error
function getAppFromPath(path) {
  if (path === '/') return 'Dashboard';
  if (path === '/giving') return 'Grounded Giving (Heart)';
  if (path === '/chat') return 'Verification (AI)';
  if (path === '/settings') return 'Settings';
  if (path === '/qa') return 'Q&A';
  if (path === '/studio') return 'Creative Studio';
  if (path === '/revenue') return 'Revenue Analytics';
  return 'Unknown App';
}

// Export Sentry for manual error tracking
export { Sentry };

export default initSentry;
