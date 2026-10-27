/**
 * API Service — Communicates with the InfraWatch Express Backend
 * 
 * Replaces the static import from mockProjects.js with live MongoDB data.
 * Falls back to the static MOCK_PROJECTS if the backend is unreachable.
 */
const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = rawApiUrl
  ? (rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, "")}/api`)
  : "/api";

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      console.warn(`⏱️ API timeout for ${endpoint}`);
    } else {
      console.warn(`⚠️ API Error for ${endpoint}:`, error.message);
    }
    throw error;
  }
}

// ============================================================================
// Project Data Fetchers
// ============================================================================

/**
 * Fetch all projects from the backend
 * @param {Object} filters - Optional filter params
 * @returns {Promise<Array>} Array of project objects
 */
export async function fetchAllProjects(filters = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const queryString = params.toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ""}`;
    const response = await apiFetch(endpoint);
    return response.data || [];
  } catch {
    return [];
  }
}

/**
 * Fetch a single project by its projectCode
 * @param {string} code - Project code
 * @returns {Promise<Object|null>} Project object or null
 */
export async function fetchProjectByCode(code) {
  if (!code) return null;
  try {
    const response = await apiFetch(`/projects/${code.trim()}`);
    return response.data || null;
  } catch {
    return null;
  }
}

/**
 * Search projects with multi-parameter filtering
 * (mirrors the old ProjectSearchService.searchProjects interface)
 * @param {Object} params
 * @returns {Promise<Object>} Search results with metadata
 */
export async function searchProjects({ projectCode = "", state = "", ministry = "" } = {}) {
  const params = new URLSearchParams();
  if (projectCode.trim()) params.append("projectCode", projectCode.trim());
  if (state.trim()) params.append("state", state.trim());
  if (ministry.trim()) params.append("ministry", ministry.trim());

  const queryString = params.toString();
  if (!queryString) {
    return {
      results: [],
      total: 0,
      emptyQuery: true,
      activeFilters: { projectCode, state, ministry },
      queryTimeMs: 0,
    };
  }

  const response = await apiFetch(`/projects/search?${queryString}`);
  return response;
}

/**
 * Fetch risk KPI statistics
 * @returns {Promise<Object>} { totalActive, highRisk, mediumRisk, lowRisk }
 */
export async function fetchRiskKpiStats() {
  try {
    const response = await apiFetch("/projects/stats");
    return response.data || { totalActive: 0, highRisk: 0, mediumRisk: 0, lowRisk: 0 };
  } catch {
    return { totalActive: 0, highRisk: 0, mediumRisk: 0, lowRisk: 0 };
  }
}

/**
 * Fetch top N projects for a given risk category
 * @param {string} category - "High" | "Medium" | "Low"
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} Array of project objects sorted by aiRiskScore
 */
export async function fetchTopProjectsByRisk(category = "High", limit = 5) {
  try {
    const response = await apiFetch(`/projects/top-risk?category=${category}&limit=${limit}`);
    return response.data || [];
  } catch {
    return [];
  }
}

/**
 * Fetch distinct filter options (states, ministries, sectors)
 * @returns {Promise<Object>} { states: [], ministries: [], sectors: [] }
 */
export async function fetchFilterOptions() {
  try {
    const response = await apiFetch("/projects/filters");
    return response.data || { states: [], ministries: [], sectors: [] };
  } catch {
    return { states: [], ministries: [], sectors: [] };
  }
}

/**
 * Health check for the backend API
 * @returns {Promise<boolean>} true if API is reachable
 */
export async function checkApiHealth() {
  try {
    await apiFetch("/health");
    return true;
  } catch {
    return false;
  }
}
