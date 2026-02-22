import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import CreativeStudio from './pages/CreativeStudio';
import RevenueAnalytics from './pages/RevenueAnalytics';
import Settings from './pages/Settings';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🏰 Dashboard', icon: '📊' },
    { path: '/chat', label: '🤖 Empire AI', icon: '💬' },
    { path: '/studio', label: '🎨 Studio', icon: '✨' },
    { path: '/revenue', label: '💰 Revenue', icon: '📈' },
    { path: '/settings', label: '⚙️ Settings', icon: '🔧' }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👑</span>
              </div>
              <span className="text-xl font-bold text-white">Empire</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
              ⭐ PREMIUM
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="App bg-gray-950 min-h-screen text-white">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/studio" element={<CreativeStudio />} />
          <Route path="/revenue" element={<RevenueAnalytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;