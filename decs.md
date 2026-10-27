# InfraWatch (INFRA-WATCH) — Comprehensive System Architecture & Project Description

> **Purpose of this Document:**  
> This file (`desc.md` / `decs.md`) provides an exhaustive, authoritative reference on the **InfraWatch** project for report writing, academic presentations, hackathon documentation (Smart India Hackathon - SIH), and technical evaluations.

---

## 1. Executive Summary

- **Project Title:** InfraWatch (AI-Powered Infrastructure Project Monitoring & Early-Warning Dashboard)
- **Problem Statement Category:** Smart India Hackathon (SIH) — AI & Central Sector Project Monitoring
- **Institutional Context:** Inspired by the Ministry of Statistics and Programme Implementation (**MoSPI**), Infrastructure and Project Monitoring Division (**IPMD**), and the **PAIMANA / OCMS** (Online Computerized Monitoring System) ecosystem of the Government of India.
- **Core Value Proposition:** Transitioning traditional infrastructure oversight from **retrospective / descriptive reporting** (discovering delays and cost overruns after they happen) to **predictive & prescriptive decision intelligence** (forecasting escalation risks, S-curve variance, and delivering automated remediation protocols).
- **Core Workflow Loop:**  
  $$\text{Search} \longrightarrow \text{Analyse} \longrightarrow \text{Predict} \longrightarrow \text{Prioritise} \longrightarrow \text{Act}$$

---

## 2. Background & Problem Definition

### 2.1 The Infrastructure Challenge in India
The Government of India manages thousands of mega (₹1,000+ Cr) and major (₹150+ Cr) central sector infrastructure projects across critical sectors:
- Roads, Transport & Highways (NHAI / MoRTH)
- Railways (Indian Railways / RVNL / IRCON / DFCCIL)
- Civil Aviation (Airports Authority of India - AAI)
- Petroleum & Natural Gas (ONGC, IOCL, GAIL)
- Power, Renewable Energy & Transmission (NTPC, PGCIL, NHPC)
- Coal, Mines, and Heavy Industry

### 2.2 Critical Flaws in Conventional Monitoring Systems
1. **Lagging Indicators:** Traditional dashboards only compile historical status reports. By the time a project is flagged as "Delayed", contracts have breached milestones by 12–36 months.
2. **Disconnected Financial vs. Physical Tracking:** Spend vs. physical milestones are often reported in silos, masking contractor liquidity issues or front-loaded expenditure without matching physical progress.
3. **Information Overload Without Prioritization:** Decision-makers receive hundreds of dense PDF spreadsheets without risk stratification or automated priority triage.
4. **Lack of Prescriptive Guidance:** Systems state *what* is wrong, but offer no actionable, policy-compliant remediation recommendations.

---

## 3. InfraWatch Solution & Core Innovation

InfraWatch solves these bottlenecks through an integrated full-stack intelligence platform:

1. **AI-Driven Risk Scoring (0–100):** Consolidates time delay, cost escalation, milestone completion rate, and semantic challenge flags into a unified risk score categorizing projects into **Critical, High, Medium, and Low** risk tiers.
2. **Mathematical S-Curve Budget-Time Analytics:** Native SVG rendering of cumulative expenditure trajectories against theoretical cubic polynomial S-curves ($y = 3x^2 - 2x^3$) to detect over-budget and under-spend anomalies in real time.
3. **Automated Prescriptive Action Engine:** Dynamic contextual logic that prescribes concrete administrative remedies (e.g., TPQI quality audits, scope freeze, RoW fast-tracking, milestone-linked EPC disbursements) based on each project's unique profile.
4. **Zero-Dependency High-Performance Visualizations:** Handcrafted SVG charts and 2D Canvas physics particle field ensuring fast load times without bloated external chart libraries.
5. **Universal Accessibility & Field-Ready Portability:** Comprehensive accessibility controls (contrast modes, font-scaling, reduced motion) plus one-click PDF dossier export and instant executive sharing (WhatsApp/Email/Clipboard).

---

## 4. Full Technical Stack

| Tier / Component | Technology / Library | Architectural Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Reactive component hierarchy, state management, hooks |
| **Frontend Build Tool** | **Vite** | Fast HMR, production bundling, tree-shaking |
| **Styling & Design System** | **Vanilla CSS3** | Custom design tokens, glassmorphism, responsive grids, dark/light themes |
| **Vector Visualizations** | **Native SVG** | S-Curve charts, milestone markers, coordinate grids, circular progress rings |
| **Interactive Background** | **HTML5 Canvas (2D)** | 60 FPS interactive particle field, 3D parallax, mouse attraction, auto-pause via IntersectionObserver |
| **Iconography** | **Lucide React** | Clean, accessible vector icons across UI cards and actions |
| **Typography** | **Google Fonts** | `Inter` (UI/body), `Space Grotesk` (headings/branding), `JetBrains Mono` (metrics/codes) |
| **Backend Runtime** | **Node.js** | Server-side JavaScript execution |
| **API Framework** | **Express 5** | RESTful routing, CORS configuration, centralized error handling |
| **Database & ODM** | **MongoDB & Mongoose 9** | Schema modeling, full-text indexes, aggregation queries |
| **Reverse Proxy & Web Server** | **Nginx (Alpine)** | Reverse proxy (`/api/` $\to$ backend), static asset delivery, SPA routing fallback |
| **Containerization** | **Docker & Docker Compose** | Multi-container isolation, shared bridge network, reproducible production builds |
| **Hosting Target** | **AWS EC2 / Linux VPS** | Containerized cloud deployment |

---

## 5. System Architecture & Request Flow

```
+-------------------------------------------------------------------------------+
|                                  CLIENT BROWSER                               |
|   React 19 SPA (Inter, Space Grotesk, JetBrains Mono, Canvas 2D Particles)    |
+-------------------------------------------------------------------------------+
         |                                                       |
         | (Static Assets: HTML, JS, CSS)                        | (API Requests: /api/projects/*)
         v                                                       v
+-------------------------------------------------------------------------------+
|                       NGINX REVERSE PROXY (Port 80)                           |
|   - try_files $uri $uri/ /index.html (SPA Fallback)                           |
|   - proxy_pass http://infrawatch-backend:5050/ (Strips /api prefix)          |
+-------------------------------------------------------------------------------+
                                                                 |
                                                                 v
+-------------------------------------------------------------------------------+
|                   EXPRESS 5 BACKEND API (Port 5050)                           |
|   - Server: Node.js + Express 5                                               |
|   - Routes: /projects, /api/projects                                          |
|   - Endpoints: /stats, /filters, /top-risk, /search, /:code                   |
+-------------------------------------------------------------------------------+
                                                                 |
                                                                 v
+-------------------------------------------------------------------------------+
|                           MONGODB ATLAS / CLUSTER                             |
|   - Database: infrawatch                                                      |
|   - Collection: projects                                                      |
|   - Indexes: projectCode (unique), state, ministry, sector, text index        |
+-------------------------------------------------------------------------------+
```

---

## 6. Database Schema & Data Modeling

The MongoDB `Project` model ([`Backend/models/Project.js`](file:///Users/sanskargajananchavare/Downloads/SIH-project/Backend/models/Project.js)) encapsulates complete administrative, financial, physical, and predictive indicators:

```javascript
{
  // Identification & Classification
  projectCode: { type: String, required: true, unique: true, index: true }, // e.g. "612786"
  name: { type: String, required: true },
  sector: { type: String, required: true, index: true },                    // Civil Aviation, Road Transport, etc.
  ministry: { type: String, required: true, index: true },                  // Ministry of Civil Aviation, etc.
  state: { type: String, required: true, index: true },                     // Primary state
  allStates: { type: [String], default: [] },                               // Multi-state alignments
  implementingAgency: { type: String, required: true },                     // NHAI, AAI, RVNL, etc.
  status: { type: String, enum: ["Active", "Completed", "Stalled", "Shelved"], default: "Active" },

  // Financial Metrics (in Crores INR - ₹ Cr)
  originalCostCr: { type: Number, required: true },                         // Initial sanctioned budget
  revisedCostCr: { type: Number, default: null },                           // Current revised estimate
  expenditureCr: { type: Number, default: 0 },                              // Cumulative financial spend to date

  // Physical & Timeline Progress
  physicalProgressPercent: { type: Number, min: 0, max: 100, default: 0 },  // Actual ground progress %
  originalCompletionDate: { type: String },                                 // YYYY-MM-DD
  anticipatedCompletionDate: { type: String },                              // YYYY-MM-DD
  timeDelayMonths: { type: Number, default: 0 },                            // Calculated delay in months
  costOverrunPercent: { type: Number, default: 0 },                         // Percentage cost overrun

  // AI & Risk Evaluation
  riskLevel: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium", index: true },
  aiRiskScore: { type: Number, min: 0, max: 100, default: 50 },             // Composite risk score
  costOverrunRisk: { type: String, enum: ["Low", "Medium", "High", "Critical"] },
  timeOverrunRisk: { type: String, enum: ["Low", "Medium", "High", "Critical"] },

  // Alerts & Domain Intelligence
  earlyWarningAlerts: [{ type: String }],                                   // Specific red flags
  implementationChallenges: [{ type: String }],                             // Ground challenges (RoW, forest clearances)

  // Audit
  lastMonitoredDate: { type: String },
  timestamps: true
}
```

### Full-Text Compound Index:
Enables instantaneous multi-keyword search across project title, code, sector, state, ministry, and executing agency:
```javascript
projectSchema.index({
  name: "text",
  projectCode: "text",
  sector: "text",
  state: "text",
  ministry: "text",
  implementingAgency: "text"
});
```

---

## 7. Backend API Specification

All endpoints are hosted by Express and accessible via `/api/...` in production (proxied by Nginx):

| Endpoint | Method | Description | Query Parameters | Sample Response Summary |
| :--- | :---: | :--- | :--- | :--- |
| `/api/projects` | `GET` | Fetches filtered/paginated list of projects | `state`, `ministry`, `sector`, `riskLevel`, `status`, `search`, `page`, `limit` | `{ success: true, total: 45, data: [...] }` |
| `/api/projects/stats` | `GET` | Risk KPI statistics for executive summary | None | `{ success: true, data: { totalActive: 42, highRisk: 12, mediumRisk: 18, lowRisk: 12 } }` |
| `/api/projects/top-risk` | `GET` | Top $N$ projects sorted by risk score | `category` (High\|Medium\|Low), `limit` (default 5) | `{ success: true, total: 5, data: [...] }` |
| `/api/projects/filters` | `GET` | Distinct dropdown values for search selectors | None | `{ success: true, data: { states: [...], ministries: [...], sectors: [...] } }` |
| `/api/projects/search` | `GET` | Multi-parameter search with execution benchmarking | `projectCode`, `state`, `ministry` | `{ success: true, results: [...], total: 3, queryTimeMs: 4 }` |
| `/api/projects/:code` | `GET` | Detailed single project dossier | URL param `:code` (e.g. `612786`) | `{ success: true, data: { ...project } }` |
| `/health` & `/api/health` | `GET` | Health check for Docker/ECS/load balancers | None | `{ status: "ok", uptime: 1245.2, service: "infrawatch-backend" }` |

---

## 8. Deep-Dive: Core Modules & Analytical Engines

### 8.1 Multi-Parametric Search & Filter Engine
- **Component:** `ProjectSearchPanel.jsx` & `projectSearchService.js` / `api.js`
- **Capabilities:**
  - Search by 6-digit Project Code (regex and prefix matching).
  - Search by State / Union Territory (handles both single-state projects and multi-state corridors like DFC or Bharatmala).
  - Search by Central Ministry.
  - Returns execution time in milliseconds (`queryTimeMs`) demonstrating high query efficiency.
  - Quick-preview modal (`ProjectPreviewModal.jsx`) allowing instant triage without leaving the main dashboard.

### 8.2 Risk Analytics & KPI Command Center
- **Components:** `RiskKpiCard.jsx`, `RiskSummaryPanel.jsx`, `RiskProjectTable.jsx`
- **Capabilities:**
  - Aggregates active projects into High, Medium, and Low risk buckets.
  - Interactive tabbed priority tables displaying top 5 high-risk, medium-risk, and low-risk projects.
  - Displays risk badges, financial overrun % pill, physical progress bars, and direct link to full project details.

### 8.3 The Mathematical S-Curve Budget-Time Engine
- **Component:** `BudgetTimeChart.jsx`
- **Mathematical Formulation:**
  Infrastructure project expenditures typically follow an **S-Curve (Sigmoid) distribution** rather than a linear trajectory: low initial mobilization spend, steep mid-lifecycle construction expenditure, and tapering close-out expenditure.
  The engine computes the normalized ideal planned spending ratio using a smooth cubic polynomial:
  $$S(t) = 3t^2 - 2t^3 \quad \text{where } t \in [0, 1] \text{ is the normalized elapsed project duration}$$
  - **Planned Expenditure to Date:**
    $$\text{Budget}_{\text{planned}}(t) = \text{RevisedCost} \times S(t)$$
  - **Financial Variance Detection:**
    $$\Delta = \text{ActualExpenditure} - \text{Budget}_{\text{planned}}(t)$$
    - If $\Delta > 0$: The project is flagged as **Over-Budget** (expenditure pacing exceeds physical S-curve expectation).
    - If $\Delta < 0$: The project is flagged as **Under-Spend / Slow Burn** (potential contractor mobilization delay or stalled procurement).
- **Visualization:**
  - Rendered entirely in **Native SVG** with coordinate mapping.
  - Displays the Planned S-Curve path (dashed cyan line), Actual Spend milestone point, Current Time vertical marker, and dynamic interactive hover tooltips with exact figures.

### 8.4 Automated Prescriptive Recommendation Engine
- **Component:** Located in `ProjectDetailsPage.jsx` (`generateRecommendations`)
- **Intelligence Model:**
  Unlike passive dashboards, InfraWatch evaluates project-specific parameters and generates concrete administrative actions:
  - **Cost Escalation > 15%:** Mandates immediate scope freeze, non-statutory variation halts, and commissioning an independent Third-Party Quality Inspection (TPQI).
  - **Moderate Overrun (1–15%):** Recommends milestone-linked contractor disbursements and quarterly escalation audits.
  - **Time Delay > 12 Months:** Triggers critical path compression, liquidated damages review, and automated fast-track inter-ministerial reviews (PM GatiShakti NMP alignment).
  - **Land Acquisition / RoW Challenges:** Prescribes establishing joint district revenue taskforces and utilizing specialized land-compensation escrow mechanisms.
  - **Clearance / Environmental Delays:** Prescribes escalation via the Project Monitoring Group (PMG) portal under the Cabinet Secretariat.

### 8.5 Export & Executive Sharing
- **Component:** `ProjectShareExport.jsx`
- **Features:**
  - **Download PDF Dossier:** Uses browser printing CSS media queries (`@media print`) with custom styling to produce a clean, executive-ready 2-page briefing dossier without screen artifacts.
  - **Copy Link:** Uses Clipboard API to copy direct permalinks.
  - **Executive Social Sharing:** Native deep-links for WhatsApp and Email populated with formatted project summary metrics.

### 8.6 Accessibility & Inclusive UI
- **Components:** `AccessibilityBar.jsx`, `AccessibilityContext.jsx`
- **Features:**
  - Font scaling: Small, Default, Large, Extra Large.
  - Color contrast modes: Default, High-Contrast Light, High-Contrast Dark.
  - Motion reduction: Disables Canvas particle animation and CSS transitions for users with vestibular sensitivities or low-spec devices.

---

## 9. Containerization, DevOps & Production Deployment

### 9.1 Docker Architecture
The application runs as two coordinated containers managed by `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./Backend
      dockerfile: dockerfile
    container_name: infrawatch-backend
    restart: always
    environment:
      - PORT=5050
      - MONGO_URI=${MONGO_URI}
      - MONGO_URL=${MONGO_URL}
      - NODE_ENV=production
      - ALLOWED_ORIGINS=*
    ports:
      - "5050:5050"
    networks:
      - app-network

  frontend:
    build:
      context: ./Frontend
      dockerfile: dockerfile
    container_name: infrawatch-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 9.2 Nginx Reverse Proxy Configuration
Defined in [`Frontend/nginx.conf`](file:///Users/sanskargajananchavare/Downloads/SIH-project/Frontend/nginx.conf):
- Listens on Port 80.
- Serves static compiled Vite React bundle from `/usr/share/nginx/html`.
- Implements SPA routing fallback: `try_files $uri $uri/ /index.html;`.
- Reverse-proxies all `/api/*` calls to `http://infrawatch-backend:5050/`, stripping the `/api/` prefix to match backend endpoints seamlessly.

### 9.3 Deployment on AWS EC2
To deploy on an Ubuntu EC2 instance:
```bash
# 1. Clone repository
git clone <repo-url>
cd SIH-project

# 2. Configure environment variables in root .env
cat <<EOF > .env
PORT=5050
NODE_ENV=production
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/infrawatch?retryWrites=true&w=majority
EOF

# 3. Build and launch containers
docker compose up -d --build

# 4. Seed database (first time run)
docker compose exec backend node seeds/seedProjects.js
```

---

## 10. Guidance for Claude: How to Structure Reports

When writing formal reports, research papers, or hackathon dossiers using this file:

1. **Project Title to use:** `InfraWatch: AI-Powered Infrastructure Monitoring and Prescriptive Decision Support System`
2. **Key SIH Alignment Points:**
   - Demonstrates alignment with **PM GatiShakti**, **PRAGATI**, and **MoSPI IPMD** frameworks.
   - Solves real-world public governance problems (mitigating capital loss due to delays).
3. **Key Technical Innovations to Emphasize:**
   - **Zero-chart-library architecture:** Performance optimization via handcrafted SVG S-Curves and Canvas 2D physics.
   - **Predictive & Prescriptive:** Moving beyond simple data display to automated recommendation protocols.
   - **Production-grade DevOps:** Multi-stage Dockerized deployment with Nginx reverse proxy.
4. **Suggested Report Outline:**
   - *Abstract* (150 words)
   - *Introduction & Problem Statement* (The ₹2+ Lakh Crore national infrastructure overrun problem)
   - *Objectives & Scope*
   - *System Architecture & Technology Stack*
   - *Data Modeling & S-Curve Mathematical Formulation*
   - *Core Modules & Algorithmic Prescriptions*
   - *DevOps & Cloud Deployment Strategy*
   - *Results, Usability & Accessibility Testing*
   - *Future Enhancements* (LLM natural language querying, satellite Earth Observation integration via ISRO Bhuvan / Sentinel APIs, automated contractor penalty scoring)
   - *Conclusion*
