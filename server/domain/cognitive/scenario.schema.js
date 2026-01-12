/**
 * Cognitive Scenario Schema
 *
 * This file defines NON-NEGOTIABLE rules for AI-generated scenarios.
 * Any output that violates these rules is rejected.
 */

export const SCENARIO_RULES = {
  // We always generate exactly 3 situations
  SCENARIO_COUNT: 3,

  // Each situation must have exactly 3 options
  OPTION_COUNT: 3,

  // Text safety limits (prevents prompt drift & UI breakage)
  MAX_SITUATION_LENGTH: 300,
MAX_OPTION_TEXT_LENGTH: 120,
MAX_REFLECTION_LENGTH: 220
};
