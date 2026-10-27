const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5050",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests or CLI/curl requests with no origin
    if (!origin) return callback(null, true);

    const allowed = [...defaultAllowedOrigins, ...envAllowedOrigins];
    if (allowed.includes(origin) || allowed.includes("*") || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ── Root Health Check (for Docker & AWS ECS / Target Groups) ────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "infrawatch-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ─────────────────────────────────────────────────────────────────
const projectRoutes = require("./routes/projectRoutes");

// Mount on /projects (Nginx strips /api prefix via proxy_pass trailing slash)
app.use("/projects", projectRoutes);
// Also mount on /api/projects for direct access and local Vite dev proxy
app.use("/api/projects", projectRoutes);

// Health check endpoint (for backwards compatibility)
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "InfraWatch API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ── Start Server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, HOST, () => {
      console.log(`\n🚀 InfraWatch Backend API running on http://${HOST}:${PORT}`);
      console.log(`📡 API Base: http://${HOST}:${PORT}/api`);
      console.log(`❤️  Root Health: http://${HOST}:${PORT}/health`);
      console.log(`❤️  API Health: http://${HOST}:${PORT}/api/health`);
      console.log(`📦 Projects: http://${HOST}:${PORT}/api/projects\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
