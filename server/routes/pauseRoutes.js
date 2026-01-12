import express from "express";
const router = express.Router();

import PauseSession from "../models/PauseSession.js";
import { getCognitiveScenarios } from "../services/ai/cognitiveScenario.service.js";
import { getFinalReflection } from "../logic/finalReflections.js";

const SESSION_DURATION_MS = 30 * 1000; // 30 seconds

// ------------------------------------
// Helpers
// ------------------------------------
function isSessionExpired(session) {
  const now = Date.now();
  const startedAt = new Date(session.startedAt).getTime();
  return now - startedAt > SESSION_DURATION_MS;
}

// ------------------------------------
// START PAUSE
// ------------------------------------
router.post("/start", async (req, res) => {
  try {
    const { userId, urgeText } = req.body;

    if (!userId || !urgeText) {
      return res.status(400).json({
        error: "userId and urgeText are required"
      });
    }

    // 1️⃣ Generate AI-backed cognitive scenarios (once)
    const scenarioSet = await getCognitiveScenarios(urgeText);

    // 2️⃣ Create pause session
    const session = await PauseSession.create({
      userId,
      urgeText,
      state: "ACTIVE",
      startedAt: new Date(),
      scenarios: scenarioSet.scenarios
    });

    // 3️⃣ First scenario
    const firstScenario = session.scenarios[0];

    return res.json({
      pauseSessionId: session._id,
      stepIndex: 0,
      situation: firstScenario.situation,
      options: firstScenario.options,
      expiresIn: SESSION_DURATION_MS
    });
  } catch (error) {
    console.error("Pause start error:", error);
    return res.status(500).json({
      error: "Unable to start pause session"
    });
  }
});

// ------------------------------------
// RESPOND TO A STEP
// ------------------------------------
router.post("/respond", async (req, res) => {
  try {
    const { pauseSessionId, choice, stepIndex } = req.body;

    if (!pauseSessionId || stepIndex === undefined) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const session = await PauseSession.findById(pauseSessionId);
    if (!session) {
      return res.status(404).json({ error: "Pause session not found" });
    }

    if (session.state !== "ACTIVE") {
      return res.status(400).json({ error: "Session already ended" });
    }

    // ⏱️ Expiry check
    if (isSessionExpired(session)) {
      session.state = "EXPIRED";
      session.endedAt = new Date();
      await session.save();

      return res.json({
        status: "EXPIRED",
        message: "The pause has gently passed. You may begin again."
      });
    }

    // 🪞 Reflection from chosen option
    let reflection = null;
    if (choice) {
      const currentScenario = session.scenarios[stepIndex];
      const selectedOption = currentScenario?.options.find(
        opt => opt.id === choice
      );
      reflection = selectedOption?.reflection || null;
    }

    // ➡️ Next scenario
    const nextScenario = session.scenarios[stepIndex + 1];

    // 🏁 If no more scenarios → decision phase
    if (!nextScenario) {
      return res.json({
        status: "DECISION",
        reflection,
        message: "Now decide freely.",
        options: [
          { id: "WON", text: "I won over my senses" },
          { id: "INDULGED", text: "I indulged" }
        ]
      });
    }

    return res.json({
      status: "ACTIVE",
      reflection,
      situation: nextScenario.situation,
      options: nextScenario.options,
      nextStep: stepIndex + 1
    });
  } catch (error) {
    console.error("Pause respond error:", error);
    return res.status(500).json({
      error: "Unable to process response"
    });
  }
});

// ------------------------------------
// FINAL DECISION
// ------------------------------------
router.post("/decide", async (req, res) => {
  try {
    const { pauseSessionId, decision } = req.body;

    if (!pauseSessionId || !decision) {
      return res
        .status(400)
        .json({ error: "pauseSessionId and decision are required" });
    }

    if (!["WON", "INDULGED"].includes(decision)) {
      return res.status(400).json({ error: "Invalid decision value" });
    }

    const session = await PauseSession.findById(pauseSessionId);
    if (!session) {
      return res.status(404).json({ error: "Pause session not found" });
    }

    if (session.state !== "ACTIVE") {
      return res.status(400).json({ error: "Session already closed" });
    }

    // Close session
    session.state = "COMPLETED";
    session.outcome = decision;
    session.endedAt = new Date();
    await session.save();

    const reflection = getFinalReflection(decision);

    return res.json({
      status: "COMPLETED",
      outcome: decision,
      reflection
    });
  } catch (error) {
    console.error("Pause decide error:", error);
    return res.status(500).json({
      error: "Unable to complete pause session"
    });
  }
});

export default router;
