/**
 * Project Search & Query Service
 * 
 * This service fetches data from the InfraWatch Express Backend API.
 * Falls back to local static data (mockProjects) if the backend is unreachable.
 * 
 * Modular architecture: Seamless swap between local static data and live API.
 */

import { MOCK_PROJECTS, getDistinctStates, getDistinctMinistries } from "../data/mockProjects";
import { searchProjects as apiSearch, fetchProjectByCode, fetchFilterOptions } from "./api";

export class ProjectSearchService {
  /**
   * Search projects based on any combination of parameters.
   * Tries the backend API first, falls back to local static search.
   * @param {Object} params
   * @param {string} [params.projectCode]
   * @param {string} [params.state]
   * @param {string} [params.ministry]
   * @returns {Promise<{ results: Array, total: number, activeFilters: Object, queryTimeMs: number }>}
   */
  static async searchProjects({ projectCode = "", state = "", ministry = "" } = {}) {
    try {
      // Try backend API first
      const apiResult = await apiSearch({ projectCode, state, ministry });
      return apiResult;
    } catch (error) {
      console.warn("⚠️ Backend API unreachable, falling back to static data");
      // Fallback to local static search
      return ProjectSearchService._localSearch({ projectCode, state, ministry });
    }
  }

  /**
   * Local static search fallback (original logic)
   */
  static _localSearch({ projectCode = "", state = "", ministry = "" } = {}) {
    const startTime = performance.now();
    const cleanCode = projectCode.trim().toLowerCase();
    const cleanState = state.trim().toLowerCase();
    const cleanMinistry = ministry.trim().toLowerCase();

    const hasCode = cleanCode.length > 0;
    const hasState = cleanState.length > 0;
    const hasMinistry = cleanMinistry.length > 0;

    if (!hasCode && !hasState && !hasMinistry) {
      return {
        results: [],
        total: 0,
        emptyQuery: true,
        activeFilters: { projectCode, state, ministry },
        queryTimeMs: Math.round(performance.now() - startTime)
      };
    }

    const filtered = MOCK_PROJECTS.filter((project) => {
      let matchesCode = true;
      let matchesState = true;
      let matchesMinistry = true;

      if (hasCode) {
        const codeMatch = project.projectCode.toLowerCase().includes(cleanCode);
        const nameMatch = project.name.toLowerCase().includes(cleanCode);
        matchesCode = codeMatch || nameMatch;
      }

      if (hasState) {
        const primaryStateMatch = project.state.toLowerCase() === cleanState;
        const allStatesMatch =
          project.allStates &&
          project.allStates.some((s) => s.toLowerCase() === cleanState);
        matchesState = primaryStateMatch || allStatesMatch;
      }

      if (hasMinistry) {
        matchesMinistry = project.ministry.toLowerCase() === cleanMinistry;
      }

      return matchesCode && matchesState && matchesMinistry;
    });

    const endTime = performance.now();

    return {
      results: filtered,
      total: filtered.length,
      emptyQuery: false,
      activeFilters: {
        projectCode: cleanCode,
        state: cleanState,
        ministry: cleanMinistry
      },
      queryTimeMs: Math.max(12, Math.round(endTime - startTime))
    };
  }

  /**
   * Direct lookup by exact or primary project code.
   * Tries backend API first, falls back to local data.
   * @param {string} code
   */
  static async getProjectByCode(code) {
    if (!code) return null;

    try {
      const project = await fetchProjectByCode(code);
      if (project) return project;
    } catch {
      // Fall through to local search
    }

    // Fallback to local static data
    const clean = code.trim().toLowerCase();
    return (
      MOCK_PROJECTS.find(
        (p) =>
          p.projectCode.toLowerCase() === clean ||
          p.projectCode.toLowerCase().includes(clean)
      ) || null
    );
  }

  /**
   * Get default/instant filter options from local static dataset.
   * Guarantees synchronous return of { states: [...], ministries: [...] }
   */
  static getFilterOptions() {
    return {
      states: getDistinctStates(),
      ministries: getDistinctMinistries()
    };
  }

  /**
   * Fetch live distinct filter options from backend API if available,
   * falling back to local static values.
   */
  static async fetchFilterOptionsAsync() {
    try {
      const options = await fetchFilterOptions();
      if (options && options.states && options.states.length > 0) {
        return {
          states: options.states,
          ministries: options.ministries
        };
      }
    } catch {
      // Fallback
    }
    return ProjectSearchService.getFilterOptions();
  }

  /**
   * Sample suggestion codes for user convenience
   */
  static getSampleCodes() {
    return [
      { code: "612786", label: "Kadapa Airport Terminal (AAI)" },
      { code: "701107", label: "Vijayawada Airport Integrated Terminal (AAI)" },
      { code: "701126", label: "Dholera Greenfield Airport (DIACL)" },
      { code: "400424", label: "Gevra OC Expansion 70 MTY (SECL)" },
      { code: "602182", label: "Dibang Multipurpose Hydroelectric (NHPC)" },
      { code: "400416", label: "Shivpur-Kathautia Rail Line (ECR)" },
      { code: "810601", label: "Mumbai Metro Line 3 Aqua Line (MMRCL)" },
      { code: "910702", label: "Polavaram Irrigation Dam (PPA)" }
    ];
  }
}
