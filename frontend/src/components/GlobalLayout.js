/**
 * GLOBAL LAYOUT WRAPPER - Master Navigation Shell
 * Persistent Bottom Navigation Bar for Don's Empire
 * Always visible across all screens
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEmpireTheme } from '../themes/ThemeContext';

const GlobalLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, currentApp, switchTheme } = useEmpireTheme();

  const navItems = [
    {
      id: 'home',
      path: '/',
      icon: '🏰',
      label: 'Home',
      theme: 'DEFAULT',
      color: '#FFD700' // Empire Gold
    },
    {
      id: 'verification',
      path: '/chat',
      icon: '🤖',
      label: 'Verification',
      theme: 'GROUNDED_AI',
      color: '#2E5BFF' // Electric Cobalt
    },
    {
      id: 'heart',
      path: '/giving',
      icon: '❤️',
      label: 'Grounded Giving',
      theme: 'GROUNDED_GIVING',
      color: '#E2725B', // Terracotta
      pulse: true // Special heart pulse animation
    },
    {
      id: 'settings',
      path: '/settings',
      icon: '⚙️',
      label: 'Settings',
      theme: 'DEFAULT',
      color: '#C0C0C0' // Silver
    }
  ];

  const handleNavClick = (item) => {
    // Switch theme first
    switchTheme(item.theme);
    
    // Then navigate
    navigate(item.path);
    
    console.log(`🚀 Switched to: ${item.label}`);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* PERSISTENT BOTTOM NAVIGATION BAR */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t"
        style={{
          backgroundColor: `${theme.background}e6`, // Semi-transparent
          borderColor: theme.border || `${theme.primary}33`
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-20">
            {navItems.map(item => {
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-xl transition-all ${
                    item.pulse && active ? 'animate-pulse-heart' : ''
                  }`}
                  style={{
                    color: active ? item.color : theme.text,
                    opacity: active ? 1 : 0.6,
                    transform: active ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {/* Icon */}
                  <span 
                    className={`text-3xl ${item.pulse && active ? 'heart-pulse' : ''}`}
                    style={{
                      filter: active ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                    }}
                  >
                    {item.icon}
                  </span>
                  
                  {/* Label */}
                  <span 
                    className="text-xs font-medium"
                    style={{
                      color: active ? item.color : theme.text
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {active && (
                    <div 
                      className="w-1 h-1 rounded-full mt-1"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Inline Styles for Animations */}
      <style>{`
        .heart-pulse {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.15); }
          20%, 40% { transform: scale(1.05); }
        }
        
        .animate-pulse-heart {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; box-shadow: 0 0 20px currentColor; }
        }
        
        /* Smooth transitions */
        nav button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        nav button:hover {
          transform: scale(1.15) !important;
        }
        
        nav button:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </div>
  );
};

export default GlobalLayout;
