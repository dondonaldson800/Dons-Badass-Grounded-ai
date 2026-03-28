import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import CreativeStudio from './pages/CreativeStudio';
import RevenueAnalytics from './pages/RevenueAnalytics';
import Settings from './pages/Settings';
import QAPage from './pages/QAPage';
import GroundedGiving from './pages/GroundedGiving';
import { ThemeProvider } from './themes/ThemeContext';
import GlobalLayout from './components/GlobalLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <GlobalLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/giving" element={<GroundedGiving />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/studio" element={<CreativeStudio />} />
              <Route path="/revenue" element={<RevenueAnalytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </GlobalLayout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;