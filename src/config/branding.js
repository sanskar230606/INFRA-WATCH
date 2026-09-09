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
  copyrightYear: 2026,
  
  // MoSPI / PAIMANA / OCMS contextual alignment
  domainSubtitle: "Ministry of Statistics & Programme Implementation (MoSPI) Ecosystem",
  frameworkBadge: "MoSPI PAIMANA / OCMS PREDICTIVE INTELLIGENCE GATEWAY",
  systemStatus: "OPERATIONAL • NATIONAL INFRASTRUCTURE REPOSITORY",

  // Core Section 1 Hero Messaging
  heroHeading: "Predicting Infrastructure Risks Before They Become Delays",
  heroDescription:
    "An AI-powered infrastructure monitoring platform that analyses project data to predict cost overruns, schedule delays and implementation risks, enabling timely and evidence-based intervention.",

  // Section 2 Messaging
  section2Title: "Infrastructure Risk Overview",
  section2Subtitle: "Prioritising projects based on predicted implementation risk",
  section2Tag: "MoSPI PAIMANA / OCMS • RISK TAXONOMY",

  // Section 3 Hero Messaging
  section3Heading: "From Monitoring Projects to Predicting Risks",
  section3Subheading: "Turning Infrastructure Data into Early Warnings",
  section3Description1:
    "Our platform transforms historical and continuously updated infrastructure project data into predictive intelligence. By analysing project cost, expenditure, timelines, physical progress, milestones and other available indicators, the system estimates the likelihood of cost overruns, time overruns and implementation risks before they become critical.",
  section3Description2:
    "The resulting risk scores and early-warning signals help monitoring agencies identify priority projects, understand emerging risks and take timely, evidence-based corrective action.",

  // 3-Stage Paradigm Shift
  paradigmShift: [
    {
      stage: "Traditional Monitoring",
      question: "What happened?",
      description: "Retrospective descriptive reports focused on historical expenses and past schedule slippages after delays have occurred."
    },
    {
      stage: "Predictive Monitoring",
      question: "What is likely to happen?",
      description: "Machine learning risk estimation projecting cost escalation trajectories, probability of delay, and critical path vulnerabilities."
    },
    {
      stage: "Prescriptive Decision Support",
      question: "What should be addressed first?",
      description: "Ranked risk scoring and early warning alerts that empower monitoring officers to direct administrative attention where impact is highest."
    }
  ],

  // Core 4-Stage Workflow
  workflowStages: [
    {
      step: "01",
      name: "MONITOR",
      tagline: "Analyse project-level information",
      detail: "Ingest continuous milestone updates, physical progress logs, and financial drawdowns from MoSPI OCMS / PAIMANA repositories."
    },
    {
      step: "02",
      name: "PREDICT",
      tagline: "Estimate cost, schedule & risk",
      detail: "Apply predictive modeling to forecast potential expenditure escalations and timeline deviation months in advance."
    },
    {
      step: "03",
      name: "PRIORITISE",
      tagline: "Identify projects requiring attention",
      detail: "Calculate composite AI risk scores (0–100) to rank monitored projects into high, medium, and low intervention bands."
    },
    {
      step: "04",
      name: "ACT",
      tagline: "Support timely intervention",
      detail: "Deliver actionable early warnings to empowered project directors and central ministries for targeted remediation."
    }
  ],

  // Government Benefits
  governmentBenefits: [
    {
      title: "Early Intervention",
      description: "Identify projects showing signs of potential cost escalation or schedule delays before risks become critical."
    },
    {
      title: "Better Prioritisation",
      description: "Use project-level risk scores to help monitoring agencies focus attention and resources on high-priority projects."
    },
    {
      title: "Evidence-Based Decisions",
      description: "Use historical and current project information to support data-driven monitoring and intervention."
    },
    {
      title: "Portfolio-Level Visibility",
      description: "Provide a unified view of infrastructure project performance across ministries, departments, sectors and locations."
    }
  ],

  // Public Benefits
  publicBenefits: [
    {
      title: "Timely Infrastructure",
      description: "Better identification of delays can contribute to more timely completion of public infrastructure."
    },
    {
      title: "Better Use of Public Funds",
      description: "Early identification of potential cost escalation can support more effective monitoring of public expenditure."
    },
    {
      title: "Improved Accountability",
      description: "Clear project-level information and risk indicators can strengthen transparency and accountability."
    },
    {
      title: "Better Public Assets",
      description: "More effective project execution can contribute to the timely availability of infrastructure and public services."
    }
  ],

  // AI Decision Support Statement
  aiPositioningStatement:
    "INFRAWATCH operates strictly as a Decision-Support System. AI/ML algorithms analyze multidimensional project data to calculate probabilities and early warnings; authorized monitoring officials and government executives remain entirely responsible for decisions, governance, and physical interventions.",

  // Search Panel Guidance
  searchPlaceholderCode: "Enter Project Code (e.g. MOR-DFCCIL-2016-01)",
  searchPlaceholderState: "Select State",
  searchPlaceholderMinistry: "Select Ministry / Department",

  // Navigation Links (Home | Search | Stats | About | Contact Us)
  navLinks: [
    { label: "Home", targetId: "home-section-1" },
    { label: "Search", targetId: "home-section-1" },
    { label: "Stats", targetId: "project-risk-overview" },
    { label: "About", targetId: "project-intelligence" },
    { label: "Contact Us", targetId: "contact-footer" }
  ],

  // Footer Links Configuration
  footerLinks: {
    platform: [
      { label: "Home", targetId: "home-section-1" },
      { label: "Search Projects", targetId: "home-section-1" },
      { label: "Statistics", targetId: "project-risk-overview" },
      { label: "About the Project", targetId: "project-intelligence" }
    ],
    information: [
      { label: "About Us", href: "#project-intelligence" },
      { label: "How It Works", href: "#workflow" },
      { label: "Methodology", href: "#methodology" },
      { label: "Documentation", href: "#docs" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Use", href: "#terms" }
    ],
    connect: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "X / Twitter", href: "https://x.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Email", href: "mailto:contact@mospi.gov.in" },
      { label: "MoSPI Portal", href: "https://www.mospi.gov.in" }
    ]
  },

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
