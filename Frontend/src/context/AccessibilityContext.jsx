import React, { createContext, useContext, useState, useEffect } from "react";

const AccessibilityContext = createContext(null);

const STORAGE_KEY = "infrawatch_a11y_settings_v1";

const DEFAULT_SETTINGS = {
  theme: "dark", // Defaulting to sleek dark government analytics mode
  fontScale: 1.0, // 0.85, 1.0, 1.15, 1.30
  fontFamily: "Inter", // Inter, Outfit, JetBrains Mono, System
  highContrast: false,
  reducedMotion: false,
  appearanceAccent: "monochrome" // monochrome, zinc, steel
};

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not read accessibility settings from localStorage", e);
    }
    return DEFAULT_SETTINGS;
  });

  // Apply settings to document element
  useEffect(() => {
    try {
      const root = document.documentElement;
      
      // Theme
      root.setAttribute("data-theme", settings.theme);
      
      // High contrast
      root.setAttribute("data-contrast", settings.highContrast ? "high" : "normal");
      
      // Reduced motion
      root.setAttribute("data-reduced-motion", settings.reducedMotion ? "true" : "false");
      
      // Appearance accent
      root.setAttribute("data-accent", settings.appearanceAccent);
      
      // Font scaling
      root.style.setProperty("--font-scale", settings.fontScale.toString());
      
      // Font family
      let fontFamilyVal = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      if (settings.fontFamily === "Monospace") {
        fontFamilyVal = "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace";
      } else if (settings.fontFamily === "Grotesk") {
        fontFamilyVal = "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif";
      } else if (settings.fontFamily === "System") {
        fontFamilyVal = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      }
      root.style.setProperty("--app-font-family", fontFamilyVal);

      // Persist
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn("Could not apply accessibility settings", e);
    }
  }, [settings]);

  // Actions
  const setTheme = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark"
    }));
  };

  const increaseFontSize = () => {
    setSettings((prev) => {
      const nextScale = Math.min(1.30, +(prev.fontScale + 0.1).toFixed(2));
      return { ...prev, fontScale: nextScale };
    });
  };

  const decreaseFontSize = () => {
    setSettings((prev) => {
      const nextScale = Math.max(0.85, +(prev.fontScale - 0.1).toFixed(2));
      return { ...prev, fontScale: nextScale };
    });
  };

  const resetFontSize = () => {
    setSettings((prev) => ({ ...prev, fontScale: DEFAULT_SETTINGS.fontScale }));
  };

  const setFontFamily = (fontFamily) => {
    setSettings((prev) => ({ ...prev, fontFamily }));
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const setAppearanceAccent = (appearanceAccent) => {
    setSettings((prev) => ({ ...prev, appearanceAccent }));
  };

  const resetAppearance = () => {
    setSettings((prev) => ({
      ...prev,
      theme: DEFAULT_SETTINGS.theme,
      appearanceAccent: DEFAULT_SETTINGS.appearanceAccent,
      highContrast: DEFAULT_SETTINGS.highContrast,
      reducedMotion: DEFAULT_SETTINGS.reducedMotion
    }));
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setTheme,
        toggleTheme,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        setFontFamily,
        toggleHighContrast,
        toggleReducedMotion,
        setAppearanceAccent,
        resetAppearance,
        resetAll
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
