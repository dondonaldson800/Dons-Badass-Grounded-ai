/**
 * THEME CONTEXT PROVIDER
 * State-based theme switching for Don's Empire
 * Switches entire color scheme based on active app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmpireThemes } from './EmpireThemes';

const ThemeContext = createContext();

export const useEmpireTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useEmpireTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentApp, setCurrentApp] = useState('DEFAULT');
  const [theme, setTheme] = useState(EmpireThemes.DEFAULT);

  useEffect(() => {
    // Apply theme to document body
    const activeTheme = EmpireThemes[currentApp] || EmpireThemes.DEFAULT;
    setTheme(activeTheme);
    
    document.body.style.backgroundColor = activeTheme.background;
    document.body.style.color = activeTheme.text;
    
    console.log(`🎨 Theme switched to: ${activeTheme.name}`);
  }, [currentApp]);

  const switchTheme = (appName) => {
    setCurrentApp(appName);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentApp, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
