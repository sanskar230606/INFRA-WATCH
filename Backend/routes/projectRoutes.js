const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// ============================================================================
// GET /api/projects — Fetch all projects (with optional query filters)
// Query params: ?state=&ministry=&sector=&riskLevel=&status=&search=
// ============================================================================
router.get("/", async (req, res) => {
  try {
    const { state, ministry, sector, riskLevel, status, search, page, limit } =
      req.query;

    const filter = {};

    if (state) {
      filter.$or = [
        { state: { $regex: state, $options: "i" } },
        { allStates: { $regex: state, $options: "i" } },
      ];
    }

    if (ministry) {
      filter.ministry = { $regex: ministry, $options: "i" };
    }

    if (sector) {
      filter.sector = { $regex: sector, $options: "i" };
    }

    if (riskLevel) {
      filter.riskLevel = riskLevel;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      // Search across projectCode and name
      const searchFilter = {
        $or: [
          { projectCode: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ],
      };
      // Merge with existing filter
      if (filter.$or) {
        // Already have $or from state filter — wrap in $and
        const existingOr = filter.$or;
        delete filter.$or;
        filter.$and = [{ $or: existingOr }, searchFilter];
      } else {
        filter.$or = searchFilter.$or;
      }
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 0; // 0 = no limit (return all)
    const skip = (pageNum - 1) * (limitNum || 0);

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ aiRiskScore: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/projects/stats — Risk KPI statistics
// ============================================================================
router.get("/stats", async (req, res) => {
  try {
    const [totalActive, highRisk, mediumRisk, lowRisk] = await Promise.all([
      Project.countDocuments({ status: "Active" }),
      Project.countDocuments({ status: "Active", riskLevel: "High" }),
      Project.countDocuments({ status: "Active", riskLevel: "Medium" }),
      Project.countDocuments({ status: "Active", riskLevel: "Low" }),
    ]);

    res.json({
      success: true,
      data: {
        totalActive,
        highRisk,
        mediumRisk,
        lowRisk,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/projects/top-risk — Top N projects by risk category
// Query params: ?category=High&limit=5
// ============================================================================
router.get("/top-risk", async (req, res) => {
  try {
    const { category = "High", limit = 5 } = req.query;

    const projects = await Project.find({
      status: "Active",
      riskLevel: category,
    })
      .sort({ aiRiskScore: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      total: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching top risk projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top risk projects",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/projects/filters — Get distinct filter values (states, ministries, sectors)
// ============================================================================
router.get("/filters", async (req, res) => {
  try {
    const [states, ministries, sectors] = await Promise.all([
      Project.distinct("state"),
      Project.distinct("ministry"),
      Project.distinct("sector"),
    ]);

    // Also collect allStates for multi-state projects
    const allStatesArrays = await Project.find(
      { allStates: { $exists: true, $ne: [] } },
      { allStates: 1, _id: 0 }
    ).lean();

    const stateSet = new Set(states);
    allStatesArrays.forEach((doc) => {
      if (doc.allStates) {
        doc.allStates.forEach((s) => stateSet.add(s));
      }
    });

    res.json({
      success: true,
      data: {
        states: Array.from(stateSet).sort(),
        ministries: ministries.sort(),
        sectors: sectors.sort(),
      },
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter options",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/projects/search — Multi-parameter search (replaces ProjectSearchService)
// Query params: ?projectCode=&state=&ministry=
// ============================================================================
router.get("/search", async (req, res) => {
  try {
    const startTime = Date.now();
    const { projectCode, state, ministry } = req.query;

    const cleanCode = (projectCode || "").trim().toLowerCase();
    const cleanState = (state || "").trim().toLowerCase();
    const cleanMinistry = (ministry || "").trim().toLowerCase();

    const hasCode = cleanCode.length > 0;
    const hasState = cleanState.length > 0;
    const hasMinistry = cleanMinistry.length > 0;

    if (!hasCode && !hasState && !hasMinistry) {
      return res.json({
        success: true,
        results: [],
        total: 0,
        emptyQuery: true,
        activeFilters: { projectCode, state, ministry },
        queryTimeMs: 0,
      });
    }

    const filter = {};
    const conditions = [];

    if (hasCode) {
      conditions.push({
        $or: [
          { projectCode: { $regex: cleanCode, $options: "i" } },
          { name: { $regex: cleanCode, $options: "i" } },
        ],
      });
    }

    if (hasState) {
      conditions.push({
        $or: [
          { state: { $regex: `^${cleanState}$`, $options: "i" } },
          { allStates: { $regex: `^${cleanState}$`, $options: "i" } },
        ],
      });
    }

    if (hasMinistry) {
      conditions.push({
        ministry: { $regex: `^${cleanMinistry}$`, $options: "i" },
      });
    }

    if (conditions.length > 0) {
      filter.$and = conditions;
    }

    const results = await Project.find(filter).lean();
    const queryTimeMs = Date.now() - startTime;

    res.json({
      success: true,
      results,
      total: results.length,
      emptyQuery: false,
      activeFilters: {
        projectCode: cleanCode,
        state: cleanState,
        ministry: cleanMinistry,
      },
      queryTimeMs: Math.max(1, queryTimeMs),
    });
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/projects/:code — Fetch single project by projectCode
// ============================================================================
router.get("/:code", async (req, res) => {
  try {
    const project = await Project.findOne({
      projectCode: req.params.code,
    }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with code '${req.params.code}' not found`,
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
});

module.exports = router;
