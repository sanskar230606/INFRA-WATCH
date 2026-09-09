import React from "react";
import { APP_CONFIG } from "../../config/branding";
import { Activity, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Framework & Analytical Mode Tag */}
      <div className="hero-pill-badge" role="status">
        <Activity size={13} style={{ display: "inline" }} aria-hidden="true" />
        <span>{APP_CONFIG.frameworkBadge}</span>
      </div>

      {/* Hero Primary Heading */}
      <h1 className="hero-heading">
        {APP_CONFIG.heroHeading}
      </h1>

      {/* Concise One-Line Project Description */}
      <p className="hero-description">
        {APP_CONFIG.heroDescription}
      </p>
    </div>
  );
};
