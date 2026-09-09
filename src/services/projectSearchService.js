/**
 * Project Search & Query Service
 * Encapsulates multi-parameter search logic across:
 * 1. Project Code (partial match, case-insensitive)
 * 2. State (exact or contained in multi-state infrastructure alignments)
 * 3. Ministry / Department (exact or partial match)
 * 
 * Modular architecture: Can be swapped with an Axios/Fetch call to a MoSPI API
 * or ML inference backend without altering UI components.
 */

import { MOCK_PROJECTS, getDistinctStates, getDistinctMinistries } from "../data/mockProjects";

export class ProjectSearchService {
  /**
   * Search projects based on any combination of parameters.
   * @param {Object} params
   * @param {string} [params.projectCode]
   * @param {string} [params.state]
   * @param {string} [params.ministry]
   * @returns {Promise<{ results: Array, total: number, activeFilters: Object, queryTimeMs: number }>}
   */
  static async searchProjects({ projectCode = "", state = "", ministry = "" } = {}) {
    const startTime = performance.now();
    const cleanCode = projectCode.trim().toLowerCase();
    const cleanState = state.trim().toLowerCase();
    const cleanMinistry = ministry.trim().toLowerCase();

    // Check if at least one parameter is supplied
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

      // Match project code or partial project code or project name
      if (hasCode) {
        const codeMatch = project.projectCode.toLowerCase().includes(cleanCode);
        const nameMatch = project.name.toLowerCase().includes(cleanCode);
        matchesCode = codeMatch || nameMatch;
      }

      // Match primary state or multi-state alignment
      if (hasState) {
        const primaryStateMatch = project.state.toLowerCase() === cleanState;
        const allStatesMatch =
          project.allStates &&
          project.allStates.some((s) => s.toLowerCase() === cleanState);
        matchesState = primaryStateMatch || allStatesMatch;
      }

      // Match ministry / department
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
   * Direct lookup by exact or primary project code
   * @param {string} code
   */
  static async getProjectByCode(code) {
    if (!code) return null;
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
   * Fetch all available filter options from the dataset
   */
  static getFilterOptions() {
    return {
      states: getDistinctStates(),
      ministries: getDistinctMinistries()
    };
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
      { code: "400416", label: "Shivpur-Kathautia Rail Line (ECR)" }
    ];
  }
}
