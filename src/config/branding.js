/**
 * Centralized Application Branding & Configuration
 * Ensures the temporary project name ("INFRAWATCH") and supporting labels
 * are maintained in a single source of truth and can be easily updated.
 */
export const APP_CONFIG = {
  // Primary placeholder branding
  brandName: "INFRAWATCH",
  brandAcronym: "IW-AI",
  brandTagline: "AI-Powered Infrastructure Project Monitoring",
  
  // MoSPI / PAIMANA / OCMS contextual alignment
  domainSubtitle: "Ministry of Statistics & Programme Implementation (MoSPI) Ecosystem",
  frameworkBadge: "MoSPI PAIMANA / OCMS PREDICTIVE INTELLIGENCE GATEWAY",
  systemStatus: "OPERATIONAL • NATIONAL INFRASTRUCTURE REPOSITORY",

  // Core Section 1 Hero Messaging
  heroHeading: "Predicting Infrastructure Risks Before They Become Delays",
  heroDescription:
    "An AI-powered infrastructure monitoring platform that analyses project data to predict cost overruns, schedule delays and implementation risks, enabling timely and evidence-based intervention.",

  // Search Panel Guidance
  searchPlaceholderCode: "Enter Project Code (e.g. MOR-DFCCIL-2016-01)",
  searchPlaceholderState: "Select State",
  searchPlaceholderMinistry: "Select Ministry / Department",

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#home", active: true },
    { label: "About", href: "#about", active: false },
    { label: "Contact Us", href: "#contact", active: false },
  ],

  // Platform capabilities highlight
  decisionSupportPillars: [
    "Cost Overrun Prediction",
    "Time Overrun Prediction",
    "Project Risk Scoring",
    "Early Warning Alerts",
    "Implementation-Risk Identification",
    "Benchmarking & Comparative Analytics"
  ]
};
