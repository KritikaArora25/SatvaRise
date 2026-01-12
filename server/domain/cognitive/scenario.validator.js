import { SCENARIO_RULES } from "./scenario.schema.js";

/**
 * Utility: checks for non-empty string
 */
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Utility: snake_case enforcement
 * Keeps IDs predictable and safe
 */
function isSnakeCase(value) {
  return typeof value === "string" && /^[a-z]+(_[a-z]+)*$/.test(value);
}

/**
 * Validates a single option object
 */
function validateOption(option) {
  if (!option || typeof option !== "object") return false;

  const { id, text, reflection } = option;

  return (
    isSnakeCase(id) &&
    isNonEmptyString(text) &&
    isNonEmptyString(reflection) &&
    text.length <= SCENARIO_RULES.MAX_OPTION_TEXT_LENGTH &&
    reflection.length <= SCENARIO_RULES.MAX_REFLECTION_LENGTH
  );
}

/**
 * Validates a single scenario
 */
function validateScenario(scenario) {
  if (!scenario || typeof scenario !== "object") return false;

  const { id, situation, options } = scenario;

  if (
    !isSnakeCase(id) ||
    !isNonEmptyString(situation) ||
    situation.length > SCENARIO_RULES.MAX_SITUATION_LENGTH
  ) {
    return false;
  }

  if (
    !Array.isArray(options) ||
    options.length !== SCENARIO_RULES.OPTION_COUNT
  ) {
    return false;
  }

  return options.every(validateOption);
}

/**
 * ✅ MAIN EXPORT
 * Validates the entire scenario set
 */
export function validateScenarioSet(data) {
  if (!data || typeof data !== "object") return false;

  const { scenarios } = data;

  if (
    !Array.isArray(scenarios) ||
    scenarios.length !== SCENARIO_RULES.SCENARIO_COUNT
  ) {
    return false;
  }

  return scenarios.every(validateScenario);
}
