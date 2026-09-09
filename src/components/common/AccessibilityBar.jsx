import React from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { 
  Sun, 
  Moon, 
  Eye, 
  SlidersHorizontal, 
  RotateCcw, 
  Type, 
  Wind,
  Layers
} from "lucide-react";
import { APP_CONFIG } from "../../config/branding";

export const AccessibilityBar = () => {
  const {
    theme,
    setTheme,
    toggleTheme,
    fontScale,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    fontFamily,
    setFontFamily,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    appearanceAccent,
    setAppearanceAccent,
    resetAppearance,
    resetAll
  } = useAccessibility();

  return (
    <aside className="a11y-bar" aria-label="Accessibility and Personalization Controls">
      {/* Left indicator: National System Metadata */}
      <div className="a11y-left-meta">
        <span className="a11y-gov-badge">
          <span className="a11y-gov-dot" aria-hidden="true"></span>
          <span>MoSPI • PAIMANA / OCMS</span>
        </span>
        <span style={{ opacity: 0.4 }} aria-hidden="true">|</span>
        <span style={{ fontSize: "0.9em", letterSpacing: "0.02em" }}>
          Decision Support Gateway
        </span>
      </div>

      {/* Right Controls Groups */}
      <div className="a11y-groups">
        {/* Typography Controls */}
        <div className="a11y-control-group" title="Typography and Text Scaling">
          <span className="a11y-group-label">
            <Type size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} />
            Text
          </span>
          <select
            className="a11y-select"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            aria-label="Select Font Family"
          >
            <option value="Inter">Inter</option>
            <option value="System">System UI</option>
            <option value="Grotesk">Grotesk</option>
            <option value="Monospace">Mono</option>
          </select>

          <button
            type="button"
            className="a11y-btn"
            onClick={decreaseFontSize}
            title="Decrease font size"
            aria-label="Decrease base font size"
          >
            A-
          </button>
          <button
            type="button"
            className="a11y-btn"
            onClick={resetFontSize}
            title="Reset font size to default"
            aria-label="Reset font size"
          >
            A
          </button>
          <button
            type="button"
            className="a11y-btn"
            onClick={increaseFontSize}
            title="Increase font size"
            aria-label="Increase base font size"
          >
            A+
          </button>
        </div>

        {/* Theme (Light / Dark) */}
        <div className="a11y-control-group" title="Theme Mode">
          <span className="a11y-group-label">Theme</span>
          <button
            type="button"
            className={`a11y-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
            aria-label="Activate Light Theme"
            title="Light Theme"
          >
            <Sun size={12} style={{ marginRight: 4 }} />
            Light
          </button>
          <button
            type="button"
            className={`a11y-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
            aria-label="Activate Dark Theme"
            title="Dark Theme"
          >
            <Moon size={12} style={{ marginRight: 4 }} />
            Dark
          </button>
        </div>

        {/* Colour / Appearance Customization */}
        <div className="a11y-control-group" title="Monochrome Appearance Style">
          <span className="a11y-group-label">
            <Layers size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} />
            Tone
          </span>
          <select
            className="a11y-select"
            value={appearanceAccent}
            onChange={(e) => setAppearanceAccent(e.target.value)}
            aria-label="Appearance Tone"
          >
            <option value="monochrome">Default Mono</option>
            <option value="zinc">Zinc</option>
            <option value="steel">Steel</option>
          </select>
        </div>

        {/* Accessibility Toggles (High Contrast & Reduced Motion) */}
        <div className="a11y-control-group" title="Accessibility Standards">
          <span className="a11y-group-label">A11y</span>
          <button
            type="button"
            className={`a11y-btn ${highContrast ? "active" : ""}`}
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            title="Toggle High Contrast Mode"
          >
            <Eye size={12} style={{ marginRight: 4 }} />
            Contrast
          </button>
          <button
            type="button"
            className={`a11y-btn ${reducedMotion ? "active" : ""}`}
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            title="Toggle Reduced Motion"
          >
            <Wind size={12} style={{ marginRight: 4 }} />
            Motion
          </button>
        </div>

        {/* Reset All Appearance Button */}
        <button
          type="button"
          className="a11y-btn"
          onClick={resetAll}
          title="Reset All Appearance and Accessibility Preferences"
          style={{ opacity: 0.75 }}
        >
          <RotateCcw size={11} style={{ marginRight: 3 }} />
          Reset
        </button>
      </div>
    </aside>
  );
};
