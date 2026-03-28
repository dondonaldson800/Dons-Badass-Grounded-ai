/**
 * DON'S EMPIRE: The 20-App Color Registry
 * Master Architect Theme System
 */

export const EmpireThemes = {
  // App 1: General AI (Truth/Intelligence)
  GENERAL_AI: {
    name: "General AI",
    primary: "#2E5BFF",      // Electric Cobalt (User specified)
    secondary: "#5B8FFF",    // Light Cobalt
    background: "#0F1419",   // Deep Navy
    text: "#FFFFFF",
    surface: "#1a2332",      // Card background
    description: "General Purpose AI Assistant"
  },

  // App 2: Law AI (Justice)
  LAW_AI: {
    name: "Law AI",
    primary: "#C5A572",      // Justice Gold
    secondary: "#D4B896",    // Light Gold
    background: "#1A1612",   // Dark Brown
    text: "#F5F5DC",         // Parchment
    surface: "#2a2419",      // Card background
    description: "Legal Guidance & Advice"
  },

  // App 3: Health AI (Wellness)
  HEALTH_AI: {
    name: "Health AI",
    primary: "#4CAF50",      // Medical Green
    secondary: "#66BB6A",    // Light Green
    background: "#0F1912",   // Dark Green-Black
    text: "#FFFFFF",
    surface: "#1a2920",      // Card background
    description: "Health & Medical Guidance"
  },
  
  // App 4: The Non-Profit (Human Connection)
  GROUNDED_GIVING: {
    name: "Grounded Giving",
    primary: "#8A9A5B",      // Sage Green (Trust/Growth)
    secondary: "#E2725B",    // Terracotta (Humanity)
    background: "#1A1A1A",   // Warm Off-Black
    text: "#F5F5DC",         // Parchment White
    surface: "#252525",      // Card background
    border: "#3A4A2B",       // Darker sage for borders
    description: "Non-Profit & Human Connection"
  },

  // App 5: Empire Flow (Logistics)
  EMPIRE_FLOW: {
    name: "Empire Flow",
    primary: "#FF8C00",      // Industrial Orange
    secondary: "#FFB347",    // Light Orange
    background: "#111111",
    text: "#EEEEEE",
    description: "Logistics & Flow Management"
  },

  // Placeholder for remaining 17 apps
  DEFAULT: {
    name: "Empire App",
    primary: "#2E5BFF",
    secondary: "#C0C0C0",
    background: "#121212",
    text: "#FFFFFF"
  }
};

/**
 * Apply Empire Theme Dynamically
 * @param {string} appName - Key from EmpireThemes
 */
export function applyEmpireTheme(appName) {
  const theme = EmpireThemes[appName] || EmpireThemes.DEFAULT;
  
  if (!EmpireThemes[appName]) {
    console.warn(`Theme ${appName} not found, using DEFAULT`);
  }

  // Apply to main body
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;

  // Apply to all buttons with class 'empire-btn'
  const buttons = document.querySelectorAll('.empire-btn');
  buttons.forEach(btn => {
    btn.style.backgroundColor = theme.primary;
    btn.style.color = "#FFFFFF";
    btn.style.border = `1px solid ${theme.secondary || theme.primary}`;
  });

  console.log(`✅ Master Builder: ${theme.name} theme applied.`);
  return theme;
}

/**
 * Get Theme for Component Use
 * @param {string} appName - Key from EmpireThemes
 * @returns {Object} Theme object
 */
export function getEmpireTheme(appName) {
  return EmpireThemes[appName] || EmpireThemes.DEFAULT;
}

export default EmpireThemes;
