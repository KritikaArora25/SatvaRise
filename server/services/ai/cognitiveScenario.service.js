import { validateScenarioSet } from "../../domain/cognitive/scenario.validator.js";
import { FALLBACK_SCENARIO_SET } from "../../domain/cognitive/scenario.fallback.js";
// generateScenariosFromAI will come in Step 2
import { generateScenariosFromAI } from "./scenarioGenerator.ai.js";

/**
 * Main service function
 * Orchestrates AI generation + validation + fallback
 */
export async function getCognitiveScenarios(urge) {
  try {
    const aiResult = await generateScenariosFromAI(urge);

    if (!validateScenarioSet(aiResult)) {
      console.warn("AI scenario validation failed. Using fallback.");
      return FALLBACK_SCENARIO_SET;
    }

    return aiResult;
  } catch (error) {
    console.error("AI scenario generation error:", error.message);
    return FALLBACK_SCENARIO_SET;
  }
}
