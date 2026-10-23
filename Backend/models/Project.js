const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
      index: true,
    },
    ministry: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
      index: true,
    },
    allStates: {
      type: [String],
      default: [],
    },
    implementingAgency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Stalled", "Shelved"],
      default: "Active",
      index: true,
    },

    // --- Financial Data (in Crores INR) ---
    originalCostCr: {
      type: Number,
      required: true,
    },
    revisedCostCr: {
      type: Number,
      default: null,
    },
    expenditureCr: {
      type: Number,
      default: 0,
    },

    // --- Progress & Timeline ---
    physicalProgressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    originalCompletionDate: {
      type: String,
    },
    anticipatedCompletionDate: {
      type: String,
    },
    timeDelayMonths: {
      type: Number,
      default: 0,
    },
    costOverrunPercent: {
      type: Number,
      default: 0,
    },

    // --- AI Risk Assessment (DEMO/SIMULATED) ---
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
      index: true,
    },
    aiRiskScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    costOverrunRisk: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    timeOverrunRisk: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    // --- Alerts & Challenges ---
    earlyWarningAlerts: {
      type: [String],
      default: [],
    },
    implementationChallenges: {
      type: [String],
      default: [],
    },

    // --- Monitoring ---
    lastMonitoredDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search functionality
projectSchema.index({
  name: "text",
  projectCode: "text",
  sector: "text",
  state: "text",
  ministry: "text",
  implementingAgency: "text",
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
