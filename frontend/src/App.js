import { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import CreativeStudio from './pages/CreativeStudio';
import RevenueAnalytics from './pages/RevenueAnalytics';
import Settings from './pages/Settings';
import QAPage from './pages/QAPage';
import GroundedGiving from './pages/GroundedGiving';
import GeneralAI from './pages/GeneralAI';
import LawAI from './pages/LawAI';
import HealthAI from './pages/HealthAI';
import Pricing from './pages/Pricing';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import { ThemeProvider } from './themes/ThemeContext';
import GlobalLayout from './components/GlobalLayout';
import initSentry from './config/sentry';

// Initialize Sentry on app load
initSentry();

function App() {
  useEffect(() => {
    console.log('🏰 Don\'s Empire - Super App Container Loaded');
    console.log('📊 Sentry Security Guard Active');
    console.log('💰 AdMob Publisher: pub-8715031019966551');
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <GlobalLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/general" element={<GeneralAI />} />
              <Route path="/law" element={<LawAI />} />
              <Route path="/health" element={<HealthAI />} />
              <Route path="/giving" element={<GroundedGiving />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/studio" element={<CreativeStudio />} />
              <Route path="/revenue" element={<RevenueAnalytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
            </Routes>
          </GlobalLayout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;