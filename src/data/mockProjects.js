/**
 * Authentic MoSPI / OCMS / PAIMANA Project Dataset
 * Reflects Central Sector Infrastructure Projects (Rs. 150 Crore and above)
 * monitored across various Central Ministries and Indian States.
 * Includes predictive metrics: cost overrun risk, time overrun risk,
 * AI composite risk score, early warnings, and implementation hurdles.
 */

export const MOCK_PROJECTS = [
  {
    projectCode: "MOR-DFCCIL-2016-01",
    name: "Eastern Dedicated Freight Corridor (EDFC - Ludhiana to Dankuni)",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Uttar Pradesh",
    allStates: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"],
    implementingAgency: "DFCCIL",
    originalCostCr: 30358.0,
    revisedCostCr: 51098.0,
    expenditureCr: 43750.0,
    physicalProgressPercent: 88.5,
    originalCompletionDate: "2018-12-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 48,
    costOverrunPercent: 68.3,
    riskLevel: "High",
    aiRiskScore: 78,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Critical land parcel acquisition pending in Sonnagar-Dankuni stretch (PPP mode)",
      "ROB/RUB construction clearance pending at 4 railway crossings",
      "Steel procurement price volatility impacting balance superstructure contracts"
    ],
    implementationChallenges: [
      "Land acquisition in densely populated peri-urban regions",
      "Right-of-Way (RoW) litigation in High Courts of WB and Bihar",
      "Coordination with state utility boards for electric transmission line shifting"
    ],
    lastMonitoredDate: "2026-08-15"
  },
  {
    projectCode: "MOR-USBRL-2002-09",
    name: "Udhampur-Srinagar-Baramulla Rail Link (USBRL)",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Jammu & Kashmir",
    allStates: ["Jammu & Kashmir"],
    implementingAgency: "Northern Railway / KRCL / IRCON",
    originalCostCr: 2500.0,
    revisedCostCr: 37012.0,
    expenditureCr: 34120.0,
    physicalProgressPercent: 96.2,
    originalCompletionDate: "2007-08-15",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 206,
    costOverrunPercent: 1380.5,
    riskLevel: "Critical",
    aiRiskScore: 84,
    costOverrunRisk: "Critical",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Himalayan thrust zone geological anomalies inside T-1 tunnel stretch",
      "Heavy seepage during monsoon requiring high-capacity grout treatment",
      "Subzero winter conditions restricting high-altitude electrical installation"
    ],
    implementationChallenges: [
      "Young fold Himalayan geology with shearing zones and rockbursts",
      "Inaccessible canyon terrain requiring aerial material transport",
      "Adverse geopolitical and high-security operational environment"
    ],
    lastMonitoredDate: "2026-08-20"
  },
  {
    projectCode: "NHAI-DME-2018-04",
    name: "Delhi - Mumbai Greenfield Expressway (8-Lane)",
    sector: "Road Transport & Highways",
    ministry: "Ministry of Road Transport & Highways",
    state: "Madhya Pradesh",
    allStates: ["Haryana", "Rajasthan", "Madhya Pradesh", "Gujarat", "Maharashtra"],
    implementingAgency: "National Highways Authority of India (NHAI)",
    originalCostCr: 87453.0,
    revisedCostCr: 104250.0,
    expenditureCr: 81300.0,
    physicalProgressPercent: 82.0,
    originalCompletionDate: "2023-03-31",
    anticipatedCompletionDate: "2026-11-30",
    timeDelayMonths: 44,
    costOverrunPercent: 19.2,
    riskLevel: "Medium",
    aiRiskScore: 54,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Package 17 JNPT connector in Maharashtra delayed due to coastal regulation zone (CRZ) clearance",
      "Contractor liquidity strain detected on Gujarat segment packages 8 and 9",
      "Monsoon drainage recalculations required near Chambal river floodplain"
    ],
    implementationChallenges: [
      "Wildlife corridor eco-sensitive clearances in Ranthambore zone",
      "Compensation disputes on private agricultural land acquisition",
      "Aggregate material supply bottlenecks in Vadodara-Virar stretch"
    ],
    lastMonitoredDate: "2026-08-30"
  },
  {
    projectCode: "MOP-SLHEP-2005-02",
    name: "Subansiri Lower Hydroelectric Project (2000 MW)",
    sector: "Power",
    ministry: "Ministry of Power",
    state: "Assam",
    allStates: ["Assam", "Arunachal Pradesh"],
    implementingAgency: "NHPC Limited",
    originalCostCr: 6285.0,
    revisedCostCr: 21247.0,
    expenditureCr: 18900.0,
    physicalProgressPercent: 91.0,
    originalCompletionDate: "2010-09-30",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 195,
    costOverrunPercent: 238.1,
    riskLevel: "High",
    aiRiskScore: 72,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Landslide reactivation on left bank hill cutting upstream of powerhouse",
      "Flash flood siltation monitoring required in diversion tunnels",
      "Tailrace channel structural reinforcing inspection flagged by CWC"
    ],
    implementationChallenges: [
      "Local downstream civil society agitations and protracted legal disputes",
      "Very high seismic hazard (Zone V) geotechnical modifications",
      "Subansiri river high discharge handling during annual North-East monsoons"
    ],
    lastMonitoredDate: "2026-08-10"
  },
  {
    projectCode: "MOHUA-RRTS-2019-01",
    name: "Delhi-Ghaziabad-Meerut Regional Rapid Transit System (RRTS)",
    sector: "Urban Development",
    ministry: "Ministry of Housing & Urban Affairs",
    state: "Delhi",
    allStates: ["Delhi", "Uttar Pradesh"],
    implementingAgency: "NCRTC",
    originalCostCr: 30274.0,
    revisedCostCr: 30274.0,
    expenditureCr: 21950.0,
    physicalProgressPercent: 86.4,
    originalCompletionDate: "2025-06-30",
    anticipatedCompletionDate: "2026-06-30",
    timeDelayMonths: 12,
    costOverrunPercent: 0.0,
    riskLevel: "Low",
    aiRiskScore: 28,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Sarai Kale Khan multimodal hub civil integration nearing final structural tests",
      "Underground tunneling between Anand Vihar and New Ashok Nagar successfully completed",
      "Rolling stock traction testing in dynamic trial phase"
    ],
    implementationChallenges: [
      "Dense urban utility diversion (Delhi Jal Board water trunk lines & 220kV power lines)",
      "Multi-modal interchange alignment with existing DMRC Pink and Blue lines",
      "Traffic regulation during pre-cast girder launching on Delhi-Meerut Expressway"
    ],
    lastMonitoredDate: "2026-08-28"
  },
  {
    projectCode: "MOPNG-JHBDPL-2016-07",
    name: "Jagdishpur - Haldia - Bokaro - Dhamra Gas Pipeline (Pradhan Mantri Urja Ganga)",
    sector: "Petroleum & Natural Gas",
    ministry: "Ministry of Petroleum & Natural Gas",
    state: "Odisha",
    allStates: ["Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal", "Odisha"],
    implementingAgency: "GAIL (India) Limited",
    originalCostCr: 12940.0,
    revisedCostCr: 14350.0,
    expenditureCr: 13100.0,
    physicalProgressPercent: 94.8,
    originalCompletionDate: "2020-12-31",
    anticipatedCompletionDate: "2026-08-31",
    timeDelayMonths: 44,
    costOverrunPercent: 10.9,
    riskLevel: "Low",
    aiRiskScore: 32,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Dhamra LNG spur line terminal tie-in hydrostatic pressure tests underway",
      "City Gas Distribution (CGD) hook-up connectivity pending in 3 municipal wards",
      "River bed horizontal directional drilling (HDD) across Mahanadi completed"
    ],
    implementationChallenges: [
      "Forest clearance approvals in Dalma wildlife sanctuary buffer zone",
      "Monsoon waterlogging in low-lying coastal tracts of Odisha and Bengal",
      "Paddy field crop harvest compensation scheduling with rural panchayats"
    ],
    lastMonitoredDate: "2026-08-18"
  },
  {
    projectCode: "MOCA-NIA-2020-05",
    name: "Noida International Greenfield Airport (Jewar - Phase 1)",
    sector: "Civil Aviation",
    ministry: "Ministry of Civil Aviation",
    state: "Uttar Pradesh",
    allStates: ["Uttar Pradesh"],
    implementingAgency: "YIAPL / NIAL",
    originalCostCr: 4588.0,
    revisedCostCr: 5730.0,
    expenditureCr: 4890.0,
    physicalProgressPercent: 89.2,
    originalCompletionDate: "2024-09-29",
    anticipatedCompletionDate: "2026-09-30",
    timeDelayMonths: 24,
    costOverrunPercent: 24.9,
    riskLevel: "Medium",
    aiRiskScore: 49,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Aerodrome licensing flight trials and DGCA radar calibration scheduled",
      "Baggage handling system (BHS) software integration in final dry-run",
      "Air Traffic Management (ATM) VHF communication tower certification in review"
    ],
    implementationChallenges: [
      "Supply chain delays for specialized imported navigation and security equipment",
      "Last-mile connectivity expansion on Eastern Peripheral Expressway interchange",
      "Groundwater discharge permit adherence for central terminal apron works"
    ],
    lastMonitoredDate: "2026-08-25"
  },
  {
    projectCode: "MOPSW-VISL-2015-03",
    name: "Vizhinjam International Transhipment Deepwater Port",
    sector: "Shipping, Ports & Waterways",
    ministry: "Ministry of Ports, Shipping & Waterways",
    state: "Kerala",
    allStates: ["Kerala"],
    implementingAgency: "VISL / Adani Ports",
    originalCostCr: 5552.0,
    revisedCostCr: 7700.0,
    expenditureCr: 6920.0,
    physicalProgressPercent: 92.4,
    originalCompletionDate: "2019-12-04",
    anticipatedCompletionDate: "2026-10-31",
    timeDelayMonths: 58,
    costOverrunPercent: 38.7,
    riskLevel: "Medium",
    aiRiskScore: 51,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Breakwater arm (3.1 km) armor rock placement completed up to 2.96 km",
      "First container vessel trial berthing accomplished successfully",
      "Underground railway freight corridor linkage to Balaramapuram pending tunneling"
    ],
    implementationChallenges: [
      "Severe sea-wave cyclone disruptions (Cyclone Ockhi & subsequent high swells)",
      "Granite armor rock shortage from quarry restrictions in Tamil Nadu and Kerala",
      "Fishermen community rehabilitation and harbor livelihood packages"
    ],
    lastMonitoredDate: "2026-08-22"
  },
  {
    projectCode: "MOR-MAHSR-2017-02",
    name: "Mumbai - Ahmedabad High Speed Rail Project (Bullet Train)",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Gujarat",
    allStates: ["Maharashtra", "Gujarat", "Dadra and Nagar Haveli"],
    implementingAgency: "NHSRCL",
    originalCostCr: 108000.0,
    revisedCostCr: 165000.0,
    expenditureCr: 68500.0,
    physicalProgressPercent: 47.8,
    originalCompletionDate: "2023-12-31",
    anticipatedCompletionDate: "2028-12-31",
    timeDelayMonths: 60,
    costOverrunPercent: 52.8,
    riskLevel: "High",
    aiRiskScore: 76,
    costOverrunRisk: "High",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Undersea tunnel package between BKC and Shilphata (21 km) tunnel boring ongoing",
      "Rolling stock procurement contracts (E5 Series Shinkansen) negotiation with JICA",
      "Maharashtra civil packages progressing after initial 3-year RoW impasse"
    ],
    implementationChallenges: [
      "Extensive complex land acquisition in Palghar district and Mumbai suburban area",
      "Adoption of Japanese high-precision Shinkansen standards and tech transfer",
      "High environmental sensitivity around Thane Creek flamingo sanctuary"
    ],
    lastMonitoredDate: "2026-08-29"
  },
  {
    projectCode: "MORT-ZOJILA-2020-01",
    name: "Zojila Tunnel Construction (14.15 km All-Weather Tunnel)",
    sector: "Road Transport & Highways",
    ministry: "Ministry of Road Transport & Highways",
    state: "Ladakh",
    allStates: ["Jammu & Kashmir", "Ladakh"],
    implementingAgency: "NHIDCL / MEIL",
    originalCostCr: 6800.0,
    revisedCostCr: 8300.0,
    expenditureCr: 4100.0,
    physicalProgressPercent: 53.0,
    originalCompletionDate: "2026-09-30",
    anticipatedCompletionDate: "2027-11-30",
    timeDelayMonths: 14,
    costOverrunPercent: 22.1,
    riskLevel: "High",
    aiRiskScore: 69,
    costOverrunRisk: "Medium",
    timeOverrunRisk: "High",
    earlyWarningAlerts: [
      "Severe avalanche hazard zones along Baltal approach road requiring snow galleries",
      "Extreme freezing temperatures halting concrete curing for 4 months annually",
      "Fault zone convergence encountered at heading km 6.2 inside main tube"
    ],
    implementationChallenges: [
      "Extreme high-altitude conditions (over 11,500 ft above MSL)",
      "Heavy snow accumulation closing Srinagar-Leh highway access routes",
      "Complex hydrogeological water inrushes in fractured limestone"
    ],
    lastMonitoredDate: "2026-08-12"
  },
  {
    projectCode: "MOC-BHP-2018-08",
    name: "Barmer Refinery & Petrochemical Complex (9 MMTPA)",
    sector: "Petroleum & Natural Gas",
    ministry: "Ministry of Petroleum & Natural Gas",
    state: "Rajasthan",
    allStates: ["Rajasthan"],
    implementingAgency: "HPCL Rajasthan Refinery Ltd (HRRL)",
    originalCostCr: 43129.0,
    revisedCostCr: 72937.0,
    expenditureCr: 54300.0,
    physicalProgressPercent: 77.5,
    originalCompletionDate: "2022-10-31",
    anticipatedCompletionDate: "2026-12-31",
    timeDelayMonths: 50,
    costOverrunPercent: 69.1,
    riskLevel: "High",
    aiRiskScore: 73,
    costOverrunRisk: "High",
    timeOverrunRisk: "Medium",
    earlyWarningAlerts: [
      "Dual Feed Cracker Unit (DFCU) piping erection behind master milestone schedule",
      "Raw water canal pipeline from Indira Gandhi Nahar Pariyojana nearing completion",
      "Over-dimensional cargo (ODC) transport permits across desert highways resolved"
    ],
    implementationChallenges: [
      "Capital cost escalation due to engineering modification and currency fluctuations",
      "Acute scarcity of skilled metallurgical welding workforce in western Thar desert",
      "Extreme summer ambient temperatures (up to 49°C) affecting field labor shifts"
    ],
    lastMonitoredDate: "2026-08-26"
  },
  {
    projectCode: "MOP-TALCHER-2022-03",
    name: "Talcher Thermal Power Project Stage-III (2x660 MW Ultra-Supercritical)",
    sector: "Power",
    ministry: "Ministry of Power",
    state: "Odisha",
    allStates: ["Odisha"],
    implementingAgency: "NTPC Limited",
    originalCostCr: 11844.0,
    revisedCostCr: 11844.0,
    expenditureCr: 4200.0,
    physicalProgressPercent: 41.2,
    originalCompletionDate: "2027-03-31",
    anticipatedCompletionDate: "2027-03-31",
    timeDelayMonths: 0,
    costOverrunPercent: 0.0,
    riskLevel: "Low",
    aiRiskScore: 24,
    costOverrunRisk: "Low",
    timeOverrunRisk: "Low",
    earlyWarningAlerts: [
      "Boiler foundation civil works progressing ahead of critical path",
      "Coal linkage dedicated conveyor corridor clearance received from MCL",
      "Flue Gas Desulfurization (FGD) environmental compliance built into base design"
    ],
    implementationChallenges: [
      "Ash pond construction right-of-use compensation in adjoining rural pockets",
      "Heavy monsoon water management in Brahmani river basin catchment",
      "Coordinating railway siding track connectivity with East Coast Railway"
    ],
    lastMonitoredDate: "2026-08-27"
  }
];

// Helper to extract distinct states and ministries dynamically
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

export const getDistinctMinistries = (projects = MOCK_PROJECTS) => {
  const ministrySet = new Set();
  projects.forEach((p) => {
    if (p.ministry) ministrySet.add(p.ministry);
  });
  return Array.from(ministrySet).sort();
};
