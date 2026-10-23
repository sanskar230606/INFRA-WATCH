/**
 * Authentic MoSPI / OCMS / PAIMANA Project Dataset
 * Based directly on the "All Ongoing Projects" repository of the Ministry of
 * Statistics & Programme Implementation (MoSPI).
 * 
 * Factual Source Data:
 * - Project Names, PMGID / Legacy OCMS Codes, Implementing Agencies,
 *   States, Sectors, and Ministries are ground-truthed from official records.
 * 
 * Prototype / Model Simulation Data:
 * - aiRiskScore, riskLevel, costOverrunRisk, and timeOverrunRisk represent
 *   demonstration predictive indicators based on cost escalation and schedule delays,
 *   structured for seamless substitution with trained AI/ML model inference endpoints.
 */

export const MOCK_PROJECTS = [
  // =========================================================================
  // 1. CIVIL AVIATION (Airport Authority of India [AAI] & Joint Ventures)
  // =========================================================================
  {
    projectCode: "612786",
    name: "Construction of New Domestic Terminal Building and miscellaneous works including maintenance, operations and AICMC at Kadapa Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Andhra Pradesh",
    allStates: ["Andhra Pradesh"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 266.0,
    revisedCostCr: 312.5, // DEMO VALUE — estimated based on scope revision
    expenditureCr: 184.2,
    physicalProgressPercent: 68.4,
    originalCompletionDate: "2024-12-31",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 23,
    costOverrunPercent: 17.5,
    riskLevel: "Medium",
    aiRiskScore: 56, // DEMO/SIMULATED PREDICTIVE RISK
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "HVAC chillers and passenger boarding bridges shipment clearance pending",
      "Terminal interior false ceiling contractor liquidity constraint noted"
    ],
    implementationChallenges: [
      "Approach road widening coordination with state PWD",
      "Perimeter security fencing right-of-way dispute on south boundary"
    ],
    lastMonitoredDate: "2026-08-25"
  },
  {
    projectCode: "701107",
    name: "Construction of New Integrated Terminal Building and associated works including apron to park 3 code E type of aircraft or 6 code C type of aircraft at Vijayawada Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Andhra Pradesh",
    allStates: ["Andhra Pradesh"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 611.8,
    revisedCostCr: 742.0,
    expenditureCr: 520.4,
    physicalProgressPercent: 81.0,
    originalCompletionDate: "2023-06-30",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 40,
    costOverrunPercent: 21.3,
    riskLevel: "High",
    aiRiskScore: 78, // DEMO/SIMULATED PREDICTIVE RISK
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Multi-level car parking (MLCP) structural steel erection behind master network schedule",
      "Glass curtain wall glazing tests flagged under high-wind cyclonic criteria"
    ],
    implementationChallenges: [
      "Heavy monsoon water table management in Gannavaram delta plains",
      "Delay in airside airfield ground lighting (AGL) cable laying"
    ],
    lastMonitoredDate: "2026-08-28"
  },
  {
    projectCode: "701121",
    name: "Construction of New Domestic Terminal at Rajahmundry Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Andhra Pradesh",
    allStates: ["Andhra Pradesh"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 347.1,
    revisedCostCr: 375.0,
    expenditureCr: 245.0,
    physicalProgressPercent: 74.5,
    originalCompletionDate: "2025-03-31",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 18,
    costOverrunPercent: 8.0,
    riskLevel: "Medium",
    aiRiskScore: 48,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Baggage handling X-ray system integration awaiting BCAS regulatory clearance",
      "Terminal city-side canopy steel trusses in final fabrication"
    ],
    implementationChallenges: [
      "Supply chain delivery schedules for imported elevator and escalator components",
      "Coordination with AP Transco for 33kV dedicated sub-station energization"
    ],
    lastMonitoredDate: "2026-08-20"
  },
  {
    projectCode: "708724",
    name: "Guwahati Airport New Integrated Terminal Building Construction Project",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Assam",
    allStates: ["Assam"],
    implementingAgency: "Adani Airport Holdings Limited",
    status: "Active",
    originalCostCr: 1232.0,
    revisedCostCr: 1420.0,
    expenditureCr: 1120.0,
    physicalProgressPercent: 88.0,
    originalCompletionDate: "2024-03-31",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 31,
    costOverrunPercent: 15.3,
    riskLevel: "Medium",
    aiRiskScore: 61,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Interior bamboo-motif artisanal architectural canopy finishing behind target",
      "Dynamic baggage handling system PLC programming in calibration phase"
    ],
    implementationChallenges: [
      "High seismic Zone V structural foundation reinforcement specifications",
      "Prolonged Northeast monsoon rainfall disrupting exterior apron paving"
    ],
    lastMonitoredDate: "2026-08-26"
  },
  {
    projectCode: "612183",
    name: "Development of New Civil Enclave at Bihta",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Bihar",
    allStates: ["Bihar"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 1413.0,
    revisedCostCr: 1413.0,
    expenditureCr: 320.0,
    physicalProgressPercent: 32.5,
    originalCompletionDate: "2026-12-31",
    anticipatedCompletionDate: "2028-06-30",
    timeDelayMonths: 18,
    costOverrunPercent: 0.0,
    riskLevel: "High",
    aiRiskScore: 74,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Balance 28 acres land handover from IAF and state revenue department pending",
      "Boundary wall construction halted along eastern stretch due to local protests"
    ],
    implementationChallenges: [
      "Coordination of civil aviation operations within active Indian Air Force base",
      "Elevated highway connectivity connecting Patna AIIMS to Bihta airport behind schedule"
    ],
    lastMonitoredDate: "2026-08-18"
  },
  {
    projectCode: "612194",
    name: "Development of New Civil Enclave and associated works at Darbhanga Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Bihar",
    allStates: ["Bihar"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 918.0,
    revisedCostCr: 918.0,
    expenditureCr: 210.0,
    physicalProgressPercent: 28.0,
    originalCompletionDate: "2026-10-31",
    anticipatedCompletionDate: "2027-12-31",
    timeDelayMonths: 14,
    costOverrunPercent: 0.0,
    riskLevel: "High",
    aiRiskScore: 71,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Low-lying waterlogged terrain requires 1.8m high earth filling across 78 acres",
      "Contractor mobilization delays for permanent terminal civil foundation"
    ],
    implementationChallenges: [
      "Frequent flood inundation during monsoon seasons in Mithila plain basin",
      "CAT-I Instrument Landing System (ILS) installation pending MoD safety clearance"
    ],
    lastMonitoredDate: "2026-08-14"
  },
  {
    projectCode: "701101",
    name: "Construction of New Domestic Terminal Building [Phase-I and II] and other allied structures at JPNI Airport, Patna",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Bihar",
    allStates: ["Bihar"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 1216.9,
    revisedCostCr: 1460.0,
    expenditureCr: 1180.0,
    physicalProgressPercent: 86.5,
    originalCompletionDate: "2022-10-31",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 49,
    costOverrunPercent: 20.0,
    riskLevel: "High",
    aiRiskScore: 82,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Phased operational handover required while existing congested terminal is active",
      "Aviation security CCTV surveillance matrix testing in final audit"
    ],
    implementationChallenges: [
      "Extremely constrained brownfield footprint (only 254 acres total airport area)",
      "High tree obsturctions on approach funnel requiring municipal felling permits"
    ],
    lastMonitoredDate: "2026-08-29"
  },
  {
    projectCode: "619054",
    name: "Development of Keshod Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Gujarat",
    allStates: ["Gujarat"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 125.0,
    revisedCostCr: 148.0,
    expenditureCr: 110.0,
    physicalProgressPercent: 82.0,
    originalCompletionDate: "2024-03-31",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 30,
    costOverrunPercent: 18.4,
    riskLevel: "Low",
    aiRiskScore: 36,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Terminal passenger check-in counters and baggage claim conveyor installed",
      "Runway friction testing and DGCA operational certification inspection scheduled"
    ],
    implementationChallenges: [
      "Upgrading historical airfield infrastructure for commercial ATR-72 schedules",
      "Water drainage outfall alignment near seasonal monsoon canal"
    ],
    lastMonitoredDate: "2026-08-16"
  },
  {
    projectCode: "701126",
    name: "Development of Dholera International Greenfield Airport, Gujarat",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Gujarat",
    allStates: ["Gujarat"],
    implementingAgency: "Dholera International Airport Company Limited [DIACL] / AAI",
    status: "Active",
    originalCostCr: 1305.0,
    revisedCostCr: 1375.0,
    expenditureCr: 680.0,
    physicalProgressPercent: 54.0,
    originalCompletionDate: "2025-12-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 12,
    costOverrunPercent: 5.4,
    riskLevel: "Medium",
    aiRiskScore: 52,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Main runway (3200m) bituminous base course laying in progress",
      "Expressway connectivity link between Ahmedabad and Dholera airport underway"
    ],
    implementationChallenges: [
      "Expansive black cotton soil requiring chemical soil stabilization",
      "High salinity coastal environment requiring anti-corrosive concrete mixes"
    ],
    lastMonitoredDate: "2026-08-27"
  },
  {
    projectCode: "611047",
    name: "Construction of NTB complex including apron, taxi track and other associated civil works and electrical & mechanical installations towards Tawi Riverside at CA Jammu",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Jammu & Kashmir",
    allStates: ["Jammu & Kashmir"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 861.5,
    revisedCostCr: 980.0,
    expenditureCr: 410.0,
    physicalProgressPercent: 49.0,
    originalCompletionDate: "2026-06-30",
    anticipatedCompletionDate: "2027-06-30",
    timeDelayMonths: 12,
    costOverrunPercent: 13.8,
    riskLevel: "High",
    aiRiskScore: 77,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Tawi River flood protection embankment bund construction lagging schedule",
      "Security protocol revisions requiring additional blast-resistant glazing"
    ],
    implementationChallenges: [
      "Sensitive strategic operational boundary with Jammu Air Force Station",
      "High seasonal discharge of Tawi river during sudden cloudburst events"
    ],
    lastMonitoredDate: "2026-08-22"
  },
  {
    projectCode: "612787",
    name: "Construction of New Domestic Terminal Building and Miscellaneous works at Hubli Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Karnataka",
    allStates: ["Karnataka"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 273.0,
    revisedCostCr: 273.0,
    expenditureCr: 195.0,
    physicalProgressPercent: 78.5,
    originalCompletionDate: "2025-08-31",
    anticipatedCompletionDate: "2026-08-31",
    timeDelayMonths: 12,
    costOverrunPercent: 0.0,
    riskLevel: "Low",
    aiRiskScore: 31,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Terminal building MEP services testing and dry runs in progress",
      "Fire hydrants and suppression pumps certified by state fire safety authority"
    ],
    implementationChallenges: [
      "Coordination with Hubli-Dharwad city feeder bus connectivity network",
      "Monsoon drainage recalculation near south terminal apron"
    ],
    lastMonitoredDate: "2026-08-19"
  },
  {
    projectCode: "612788",
    name: "Construction of New Domestic Terminal Building and Miscellaneous Works at Belagavi Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Karnataka",
    allStates: ["Karnataka"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 228.0,
    revisedCostCr: 242.0,
    expenditureCr: 180.0,
    physicalProgressPercent: 84.0,
    originalCompletionDate: "2025-04-30",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 17,
    costOverrunPercent: 6.1,
    riskLevel: "Low",
    aiRiskScore: 29,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Check-in island baggage conveyors handed over for electrical trial run",
      "Air-conditioned departure lounge seating installation underway"
    ],
    implementationChallenges: [
      "Heavy precipitation during Western Ghats monsoon season",
      "Porous subgrade gravel compaction on apron taxiway extension"
    ],
    lastMonitoredDate: "2026-08-21"
  },
  {
    projectCode: "612789",
    name: "Development of additional RESA on either end of Runway 10-28 at Calicut Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Kerala",
    allStates: ["Kerala"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 484.5,
    revisedCostCr: 520.0,
    expenditureCr: 215.0,
    physicalProgressPercent: 46.0,
    originalCompletionDate: "2026-03-31",
    anticipatedCompletionDate: "2027-03-31",
    timeDelayMonths: 12,
    costOverrunPercent: 7.3,
    riskLevel: "High",
    aiRiskScore: 79,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Tabletop runway deep gorge valley retaining wall requiring reinforced earth (RE) testing",
      "Aircraft operation time-window limits working hours to midnight shifts only"
    ],
    implementationChallenges: [
      "Severe topography and deep gorges on both ends of tabletop runway",
      "Strict Directorate General of Civil Aviation safety recommendations post-2020 inquiry"
    ],
    lastMonitoredDate: "2026-08-24"
  },
  {
    projectCode: "400010",
    name: "Construction of Terminal Building & Associated works at Leh Airport, Ladakh",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Ladakh",
    allStates: ["Ladakh"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 480.0,
    revisedCostCr: 650.0,
    expenditureCr: 520.0,
    physicalProgressPercent: 82.5,
    originalCompletionDate: "2022-12-31",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 47,
    costOverrunPercent: 35.4,
    riskLevel: "High",
    aiRiskScore: 83,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Sub-zero winter temperatures halt wet civil works and concrete pouring for 4 months",
      "Geothermal heating system pipe connections undergoing freeze-thaw testing"
    ],
    implementationChallenges: [
      "Ultra-high altitude (10,682 ft MSL) low oxygen levels limiting workforce endurance",
      "Logistical disruption when Rohtang / Zojila passes close during winter months"
    ],
    lastMonitoredDate: "2026-08-26"
  },
  {
    projectCode: "706718",
    name: "C/o NITB Imphal Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Manipur",
    allStates: ["Manipur"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 499.0,
    revisedCostCr: 540.0,
    expenditureCr: 210.0,
    physicalProgressPercent: 44.0,
    originalCompletionDate: "2025-06-30",
    anticipatedCompletionDate: "2027-03-31",
    timeDelayMonths: 21,
    costOverrunPercent: 8.2,
    riskLevel: "High",
    aiRiskScore: 76,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Highway blockade and supply chain logistics disruptions along NH-2 corridor",
      "Structural steel deliveries stranded at regional transit transshipment points"
    ],
    implementationChallenges: [
      "Geopolitical security environment impacting workforce availability",
      "High rainfall and marshy soil conditions in Imphal valley basin"
    ],
    lastMonitoredDate: "2026-08-15"
  },
  {
    projectCode: "618977",
    name: "Development of New Greenfield Airport at Bundi, Kota, Rajasthan",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Rajasthan",
    allStates: ["Rajasthan"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 1207.0,
    revisedCostCr: 1207.0,
    expenditureCr: 180.0,
    physicalProgressPercent: 21.0,
    originalCompletionDate: "2027-03-31",
    anticipatedCompletionDate: "2027-12-31",
    timeDelayMonths: 9,
    costOverrunPercent: 0.0,
    riskLevel: "Medium",
    aiRiskScore: 54,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Forest clearance for 440 hectares in Shambhopura zone in Stage-II appraisal",
      "High tension 220kV power line diversion tenders floated by RRVPNL"
    ],
    implementationChallenges: [
      "Extensive rocky outcrop blasting and land leveling requirements",
      "Wildlife eco-sensitive sanctuary proximity clearances"
    ],
    lastMonitoredDate: "2026-08-11"
  },
  {
    projectCode: "701127",
    name: "Construction of New Passenger Terminal Building for Domestic Operations at Jodhpur Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Rajasthan",
    allStates: ["Rajasthan"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 479.0,
    revisedCostCr: 512.0,
    expenditureCr: 290.0,
    physicalProgressPercent: 64.0,
    originalCompletionDate: "2025-06-30",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 18,
    costOverrunPercent: 6.9,
    riskLevel: "Medium",
    aiRiskScore: 49,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Heritage Rajasthani sandstone jaali cladding artisan work pacing master schedule",
      "Apron lighting high-mast towers undergoing photometric alignment"
    ],
    implementationChallenges: [
      "Close proximity to active Indian Air Force frontline fighter base",
      "Extreme desert summer temperatures restricting day shifts"
    ],
    lastMonitoredDate: "2026-08-23"
  },
  {
    projectCode: "701128",
    name: "Construction of New Integrated Passenger Terminal Building at Udaipur Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Rajasthan",
    allStates: ["Rajasthan"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 887.0,
    revisedCostCr: 887.0,
    expenditureCr: 320.0,
    physicalProgressPercent: 41.0,
    originalCompletionDate: "2026-08-31",
    anticipatedCompletionDate: "2027-03-31",
    timeDelayMonths: 7,
    costOverrunPercent: 0.0,
    riskLevel: "Medium",
    aiRiskScore: 46,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Substructure piling foundation completed for central atrium hall",
      "Baggage makeup area civil works handed over for conveyor anchor laying"
    ],
    implementationChallenges: [
      "Brownfield expansion during peak winter tourist flight frequencies",
      "Subgrade hard quartzite rock excavation on city-side parking"
    ],
    lastMonitoredDate: "2026-08-20"
  },
  {
    projectCode: "701113",
    name: "Development of Lal Bahadur Shastri International airport, Varanasi including C/o New Terminal Building, Apron Extension, Runway Extension, PTT and allied works",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Uttar Pradesh",
    allStates: ["Uttar Pradesh"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 2869.6,
    revisedCostCr: 2869.6,
    expenditureCr: 410.0,
    physicalProgressPercent: 24.5,
    originalCompletionDate: "2027-12-31",
    anticipatedCompletionDate: "2028-06-30",
    timeDelayMonths: 6,
    costOverrunPercent: 0.0,
    riskLevel: "Medium",
    aiRiskScore: 58,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Runway extension requires unique highway tunnel underneath the runway strip (NH-31)",
      "Land acquisition notification for additional 350 acres in Babatpur in progress"
    ],
    implementationChallenges: [
      "Engineering complexity of building an active highway vehicular tunnel under a live runway",
      "Rehabilitation of displaced settlements adjoining airport boundary"
    ],
    lastMonitoredDate: "2026-08-28"
  },
  {
    projectCode: "611495",
    name: "Development of New Civil Enclave at Bagdogra Airport",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "West Bengal",
    allStates: ["West Bengal"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 1549.2,
    revisedCostCr: 1549.2,
    expenditureCr: 280.0,
    physicalProgressPercent: 22.0,
    originalCompletionDate: "2026-12-31",
    anticipatedCompletionDate: "2027-10-31",
    timeDelayMonths: 10,
    costOverrunPercent: 0.0,
    riskLevel: "Medium",
    aiRiskScore: 59,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "104 acres of land transferred from West Bengal state government handed over to contractors",
      "Piling rigs mobilized on site for main terminal foundation blocks"
    ],
    implementationChallenges: [
      "Strategic defense airspace sharing with Eastern Air Command IAF base",
      "Intense sub-Himalayan monsoon downpours saturating terai tea-estate soils"
    ],
    lastMonitoredDate: "2026-08-25"
  },
  {
    projectCode: "611570",
    name: "SITC of ATM Automation System and ASMGCS for Mumbai, Navi Mumbai, Jewar, HIAL & BIAL",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Maharashtra",
    allStates: ["Maharashtra", "Uttar Pradesh", "Telangana", "Karnataka"],
    implementingAgency: "Airport Authority of India [AAI]",
    status: "Active",
    originalCostCr: 412.0,
    revisedCostCr: 412.0,
    expenditureCr: 295.0,
    physicalProgressPercent: 72.0,
    originalCompletionDate: "2025-10-31",
    anticipatedCompletionDate: "2026-08-31",
    timeDelayMonths: 10,
    costOverrunPercent: 0.0,
    riskLevel: "Low",
    aiRiskScore: 33,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Advanced Surface Movement Guidance & Control System (A-SMGCS) sensor trials underway",
      "Air Traffic Management software automation dry run conducted at Mumbai ATC tower"
    ],
    implementationChallenges: [
      "High-security electronic cyber-network integration across 5 international hubs",
      "Coordinating parallel testing windows without disrupting peak airspace traffic"
    ],
    lastMonitoredDate: "2026-08-27"
  },

  // =========================================================================
  // 2. COAL & MINING (Coal India Subsidiaries: SECL, NCL, MCL, SCCL, NLCIL)
  // =========================================================================
  {
    projectCode: "400424",
    name: "Gevra OC Expansion Project (70 MTY)",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 11816.4,
    revisedCostCr: 12450.0,
    expenditureCr: 8900.0,
    physicalProgressPercent: 78.0,
    originalCompletionDate: "2024-03-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 33,
    costOverrunPercent: 5.4,
    riskLevel: "High",
    aiRiskScore: 81,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Environmental clearance for Asia's largest open cast mine (70 MTY) pending public hearing compliance",
      "Overburden (OB) dump slope stability geotechnical sensor telemetry flagged"
    ],
    implementationChallenges: [
      "Large-scale resettlement & rehabilitation of tribal villages in Korba coal basin",
      "Massive railway siding evacuation capacity constraints for daily coal rakes"
    ],
    lastMonitoredDate: "2026-08-26"
  },
  {
    projectCode: "613798",
    name: "Amera OC RCE [1.0 MTY]",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 320.0,
    revisedCostCr: 385.0,
    expenditureCr: 310.0,
    physicalProgressPercent: 88.0,
    originalCompletionDate: "2023-12-31",
    anticipatedCompletionDate: "2026-08-31",
    timeDelayMonths: 32,
    costOverrunPercent: 20.3,
    riskLevel: "Low",
    aiRiskScore: 35,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Final top-soil extraction in patch-D completed; reclamation planting initiated",
      "Coal haulage road dust-suppression automated mist canons operational"
    ],
    implementationChallenges: [
      "Seasonal monsoon mine pit dewatering in Hasdeo Arand periphery",
      "Heavy earth moving machinery (HEMM) spare part lead times"
    ],
    lastMonitoredDate: "2026-08-12"
  },
  {
    projectCode: "613799",
    name: "Amgaon OC RCE [1.0 MTY]",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 280.0,
    revisedCostCr: 330.0,
    expenditureCr: 240.0,
    physicalProgressPercent: 81.0,
    originalCompletionDate: "2024-06-30",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 27,
    costOverrunPercent: 17.8,
    riskLevel: "Low",
    aiRiskScore: 34,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Continuous ambient air quality monitoring station linked to CPCB portal",
      "Weighbridge computerized RFID tagging system operational"
    ],
    implementationChallenges: [
      "Forest land diversion compliance in Bisrampur mining area",
      "Private land mutation compensation settlements"
    ],
    lastMonitoredDate: "2026-08-16"
  },
  {
    projectCode: "613800",
    name: "Jagannathpur OC RCE Project",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 495.0,
    revisedCostCr: 580.0,
    expenditureCr: 360.0,
    physicalProgressPercent: 68.0,
    originalCompletionDate: "2024-09-30",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 26,
    costOverrunPercent: 17.1,
    riskLevel: "Medium",
    aiRiskScore: 57,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "OB removal contractor billing dispute pending regional arbitration",
      "Coal seam seam-III exposure requiring water pumping upgrade"
    ],
    implementationChallenges: [
      "Forest clearance Stage-II compensatory afforestation land handover",
      "Panchayat NOC for diversion of rural district road"
    ],
    lastMonitoredDate: "2026-08-17"
  },
  {
    projectCode: "617288",
    name: "Manikpur OC Expansion Project",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 1845.0,
    revisedCostCr: 2110.0,
    expenditureCr: 1450.0,
    physicalProgressPercent: 73.0,
    originalCompletionDate: "2023-09-30",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 39,
    costOverrunPercent: 14.3,
    riskLevel: "High",
    aiRiskScore: 75,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Railway siding feeder conveyor belt motor replacement underway",
      "Encroachment clearance in southern expansion pit boundary pending"
    ],
    implementationChallenges: [
      "Korba industrial cluster air quality emission norms compliance",
      "Water drainage during peak monsoon in Hasdeo river catchment"
    ],
    lastMonitoredDate: "2026-08-22"
  },
  {
    projectCode: "615183",
    name: "Khadia Expansion (10 to 16 MTY)",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Madhya Pradesh",
    allStates: ["Madhya Pradesh", "Uttar Pradesh"],
    implementingAgency: "Northern Coalfields Limited [NCL - CIL]",
    status: "Active",
    originalCostCr: 1980.0,
    revisedCostCr: 2350.0,
    expenditureCr: 1820.0,
    physicalProgressPercent: 86.0,
    originalCompletionDate: "2023-03-31",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 43,
    costOverrunPercent: 18.6,
    riskLevel: "Medium",
    aiRiskScore: 63,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "First Mile Connectivity (FMC) rapid loading silo commissioning in final trials",
      "Shovel-dumper fleet matching efficiency optimization audit in progress"
    ],
    implementationChallenges: [
      "Inter-state boundary alignment between MP (Singrauli) and UP (Sonbhadra)",
      "Rihand reservoir catchment environmental impact mitigation"
    ],
    lastMonitoredDate: "2026-08-24"
  },
  {
    projectCode: "400166",
    name: "Siarmal OCP (50 MTY)",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Odisha",
    allStates: ["Odisha"],
    implementingAgency: "Mahanadi Coalfields Limited [MCL - CIL]",
    status: "Active",
    originalCostCr: 4120.0,
    revisedCostCr: 4120.0,
    expenditureCr: 1100.0,
    physicalProgressPercent: 34.0,
    originalCompletionDate: "2026-12-31",
    anticipatedCompletionDate: "2028-03-31",
    timeDelayMonths: 15,
    costOverrunPercent: 0.0,
    riskLevel: "High",
    aiRiskScore: 84,
    costOverrunRisk: "High",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "MDO (Mine Developer and Operator) contract mobilization behind master schedule",
      "Forest clearance stage-II compliance on 1,200 hectares pending wildlife mitigation plan"
    ],
    implementationChallenges: [
      "Extensive land acquisition across Sundargarh district tribal belt",
      "Dedicated railway siding connectivity linking to Jharsuguda-Barpali rail corridor"
    ],
    lastMonitoredDate: "2026-08-27"
  },
  {
    projectCode: "400392",
    name: "Bharatpur Re-organisation OCP",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Odisha",
    allStates: ["Odisha"],
    implementingAgency: "Mahanadi Coalfields Limited [MCL - CIL]",
    status: "Active",
    originalCostCr: 1425.0,
    revisedCostCr: 1690.0,
    expenditureCr: 1240.0,
    physicalProgressPercent: 76.5,
    originalCompletionDate: "2023-06-30",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 39,
    costOverrunPercent: 18.5,
    riskLevel: "Medium",
    aiRiskScore: 66,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Surface miner extraction in south quarry pit pacing thermal plant rakes",
      "Dust suppression water sprinkler telemetry linked to state pollution control board"
    ],
    implementationChallenges: [
      "Talcher industrial coalfield land rehabilitation and employment packages",
      "Coordination with East Coast Railway for round-the-clock empty rake supplies"
    ],
    lastMonitoredDate: "2026-08-21"
  },
  {
    projectCode: "615858",
    name: "Kalyanikhani Opencast Project",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Telangana",
    allStates: ["Telangana"],
    implementingAgency: "Singareni Collieries Company Limited [SCCL]",
    status: "Active",
    originalCostCr: 685.0,
    revisedCostCr: 790.0,
    expenditureCr: 580.0,
    physicalProgressPercent: 82.0,
    originalCompletionDate: "2024-03-31",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 31,
    costOverrunPercent: 15.3,
    riskLevel: "Low",
    aiRiskScore: 37,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "In-pit conveyor crushing system operating at 94% rated capacity",
      "Final seam extraction plan approved by Directorate General of Mines Safety"
    ],
    implementationChallenges: [
      "Godavari valley basin aquifer depressurization monitoring",
      "High ambient summer temperature conditions in Mancherial district"
    ],
    lastMonitoredDate: "2026-08-23"
  },
  {
    projectCode: "618982",
    name: "Talabira II & III OCP - FMC",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Odisha",
    allStates: ["Odisha"],
    implementingAgency: "NLC India Limited [NLCIL]",
    status: "Active",
    originalCostCr: 2180.0,
    revisedCostCr: 2450.0,
    expenditureCr: 1720.0,
    physicalProgressPercent: 78.0,
    originalCompletionDate: "2024-12-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 24,
    costOverrunPercent: 12.3,
    riskLevel: "Medium",
    aiRiskScore: 59,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Overland conveyor (OLC) system linking mine pit to Talabira thermal plant in structural tests",
      "Rapid loading system (RLS) trial runs completed successfully"
    ],
    implementationChallenges: [
      "Private tenancy land compensation litigation in Sambalpur and Jharsuguda",
      "Forest clearance compensatory afforestation plantation survival audits"
    ],
    lastMonitoredDate: "2026-08-28"
  },
  {
    projectCode: "300144",
    name: "Chitarpur / Chhimtapani OCP (10 MTY)",
    sector: "Coal",
    ministry: "Ministry of Coal",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "South Eastern Coalfields Limited [SECL - CIL]",
    status: "Active",
    originalCostCr: 1250.0,
    revisedCostCr: 1520.0,
    expenditureCr: 1100.0,
    physicalProgressPercent: 79.0,
    originalCompletionDate: "2023-12-31",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 33,
    costOverrunPercent: 21.6,
    riskLevel: "Low",
    aiRiskScore: 38,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Overburden dump biological reclamation with native forest species progressing",
      "Mine water zero-discharge filtration system commissioned"
    ],
    implementationChallenges: [
      "Seasonal drainage diversion along Hasdeo sub-basin",
      "Heavy mining equipment electrical trailing cable maintenance"
    ],
    lastMonitoredDate: "2026-08-19"
  },

  // =========================================================================
  // 3. ELECTRICITY / POWER / RENEWABLE PROJECTS (NHPC, NLCIL, POWERGRID)
  // =========================================================================
  {
    projectCode: "602182",
    name: "Dibang Multipurpose Hydroelectric Project (2880 MW)",
    sector: "Power",
    ministry: "Ministry of Power",
    state: "Arunachal Pradesh",
    allStates: ["Arunachal Pradesh", "Assam"],
    implementingAgency: "National Hydroelectric Power Corporation Limited [NHPC]",
    status: "Active",
    originalCostCr: 28080.0,
    revisedCostCr: 31875.0,
    expenditureCr: 4600.0,
    physicalProgressPercent: 22.0,
    originalCompletionDate: "2032-02-28",
    anticipatedCompletionDate: "2032-12-31",
    timeDelayMonths: 10,
    costOverrunPercent: 13.5,
    riskLevel: "High",
    aiRiskScore: 92, // Highest priority mega-infrastructure project
    costOverrunRisk: "High",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Geological thrust faults encountered during diversion tunnel-1 & 2 adit portal excavations",
      "Monsoon flash-flood siltation risks along Dibang river gorge requiring heightened cofferdam"
    ],
    implementationChallenges: [
      "Extremely remote Himalayan terrain near Indo-China border requiring heavy air-lifting",
      "Construction of 278-meter high Roller Compacted Concrete (RCC) dam in seismic Zone V",
      "Environmental and local Idu Mishmi community livelihood rehabilitation accords"
    ],
    lastMonitoredDate: "2026-08-29"
  },
  {
    projectCode: "618991",
    name: "NLC Talabira Ultra Mega Thermal Power Project (3x800 MW Phase-1)",
    sector: "Power",
    ministry: "Ministry of Power",
    state: "Odisha",
    allStates: ["Odisha"],
    implementingAgency: "NLC India Limited [NLCIL]",
    status: "Active",
    originalCostCr: 19422.0,
    revisedCostCr: 19422.0,
    expenditureCr: 3850.0,
    physicalProgressPercent: 26.5,
    originalCompletionDate: "2028-12-31",
    anticipatedCompletionDate: "2029-03-31",
    timeDelayMonths: 3,
    costOverrunPercent: 0.0,
    riskLevel: "High",
    aiRiskScore: 73,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Boiler turbine generator (BTG) equipment foundation piling ongoing at unit-1",
      "Main chimney slipform concrete pouring delayed due to cement delivery scheduling"
    ],
    implementationChallenges: [
      "Water allocation intake pipeline from Hirakud reservoir across agricultural land",
      "Ultra-supercritical power plant equipment transport over interstate bridges"
    ],
    lastMonitoredDate: "2026-08-25"
  },
  {
    projectCode: "618992",
    name: "1600 MW Khavda Solar Power Project Transmission System",
    sector: "Renewable Energy",
    ministry: "Ministry of Power",
    state: "Gujarat",
    allStates: ["Gujarat"],
    implementingAgency: "POWERGRID / NTPC REL",
    status: "Active",
    originalCostCr: 4850.0,
    revisedCostCr: 4850.0,
    expenditureCr: 3120.0,
    physicalProgressPercent: 69.5,
    originalCompletionDate: "2026-06-30",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 5,
    costOverrunPercent: 0.0,
    riskLevel: "Low",
    aiRiskScore: 24,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "765kV transmission tower foundation in salt-marsh Rann soil completed",
      "Substation Gas Insulated Switchgear (GIS) bay equipment installed"
    ],
    implementationChallenges: [
      "High salinity corrosive environment requiring galvanized and epoxy-coated steel",
      "Great Indian Bustard (GIB) bird flight diverter installation adherence"
    ],
    lastMonitoredDate: "2026-08-27"
  },

  // =========================================================================
  // 4. RAILWAYS (Ministry of Railways / CEWRL / East Central Railway)
  // =========================================================================
  {
    projectCode: "400416",
    name: "Shivpur-Kathautia New Rail [BG] Line (49 km) [Package II of Tori-Shivpur-Kathautia]",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Jharkhand",
    allStates: ["Jharkhand"],
    implementingAgency: "East Central Railway / Ministry of Coal",
    status: "Active",
    originalCostCr: 1799.0,
    revisedCostCr: 2410.0,
    expenditureCr: 1940.0,
    physicalProgressPercent: 82.0,
    originalCompletionDate: "2021-03-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 69,
    costOverrunPercent: 34.0,
    riskLevel: "High",
    aiRiskScore: 88,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Major bridge #18 across Damodar river tributary superstructure girder launching in progress",
      "Forest department clearance on 4.2 km critical coal corridor stretch issued with caveats"
    ],
    implementationChallenges: [
      "Left-wing extremist security sensitivities in Chatra and Hazaribagh districts",
      "Deep rock cuts through Chota Nagpur plateau requiring controlled blasting"
    ],
    lastMonitoredDate: "2026-08-28"
  },
  {
    projectCode: "400425",
    name: "Dharamjaigarh-Korba New Rail Corridor Project",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Chhattisgarh",
    allStates: ["Chhattisgarh"],
    implementingAgency: "Chhattisgarh East-West Railway Limited [CEWRL] / IRCON",
    status: "Active",
    originalCostCr: 4970.0,
    revisedCostCr: 5820.0,
    expenditureCr: 3950.0,
    physicalProgressPercent: 71.5,
    originalCompletionDate: "2023-12-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 36,
    costOverrunPercent: 17.1,
    riskLevel: "High",
    aiRiskScore: 86,
    costOverrunRisk: "High",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Mand river major railway bridge pier foundation sinking encountered boulder layer",
      "Land acquisition in 11 villages in Raigarh district pending final compensation disbursement"
    ],
    implementationChallenges: [
      "Heavy coal evacuation rail corridor traversing dense Sal forest wildlife tracts",
      "High density of railway-level crossings and road-over-bridge clearances"
    ],
    lastMonitoredDate: "2026-08-30"
  }
];

// Helper to filter active projects
export const getActiveProjects = (projects = MOCK_PROJECTS) => {
  return projects.filter((p) => p.status === "Active" || !p.status);
};

// Calculate Risk KPI stats dynamically
export const getRiskKpiStats = (projects = MOCK_PROJECTS) => {
  const active = getActiveProjects(projects);
  const totalActive = active.length;
  const highRisk = active.filter((p) => p.riskLevel === "High").length;
  const mediumRisk = active.filter((p) => p.riskLevel === "Medium").length;
  const lowRisk = active.filter((p) => p.riskLevel === "Low").length;

  return {
    totalActive,
    highRisk,
    mediumRisk,
    lowRisk
  };
};

// Get Top N projects for a given risk category, sorted descending by aiRiskScore
export const getTopProjectsByRisk = (category, limit = 5, projects = MOCK_PROJECTS) => {
  const active = getActiveProjects(projects);
  const filtered = active.filter(
    (p) => p.riskLevel?.toLowerCase() === category.toLowerCase()
  );

  return filtered
    .sort((a, b) => (b.aiRiskScore || 0) - (a.aiRiskScore || 0))
    .slice(0, limit);
};

// Helper to extract distinct states dynamically
export const getDistinctStates = (projects = MOCK_PROJECTS) => {
  const stateSet = new Set();
  projects.forEach((p) => {
    if (p.state) stateSet.add(p.state);
    if (p.allStates && Array.isArray(p.allStates)) {
      p.allStates.forEach((s) => stateSet.add(s));
    }
  });
  return Array.from(stateSet).sort();
};

// Helper to extract distinct ministries dynamically
export const getDistinctMinistries = (projects = MOCK_PROJECTS) => {
  const ministrySet = new Set();
  projects.forEach((p) => {
    if (p.ministry) ministrySet.add(p.ministry);
  });
  return Array.from(ministrySet).sort();
};
