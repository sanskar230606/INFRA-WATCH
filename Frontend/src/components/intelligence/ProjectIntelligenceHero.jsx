import React from "react";
import { APP_CONFIG } from "../../config/branding";
import { Sparkles, Compass } from "lucide-react";

export const ProjectIntelligenceHero = () => {
  return (
    <div className="intelligence-hero-wrap">
      <div className="intelligence-tag-pill">
        <Compass size={13} aria-hidden="true" />
        <span>PREDICTIVE DECISION-SUPPORT INTELLIGENCE</span>
      </div>

      <h2 className="intelligence-heading">
        {APP_CONFIG.section3Heading}
      </h2>

      <p className="intelligence-subheading">
        {APP_CONFIG.section3Subheading}
      </p>

      <div className="intelligence-desc-block">
        <p className="intelligence-text">
          {APP_CONFIG.section3Description1}
        </p>
        <p className="intelligence-text highlight">
          {APP_CONFIG.section3Description2}
        </p>
      </div>
    </div>
  );
};
