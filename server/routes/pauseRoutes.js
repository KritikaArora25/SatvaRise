import express from "express";

const router = express.Router();
import PauseSession from "../models/PauseSession.js";
import { getSituation, getReflection } from "../logic/situationEngine.js";
import { getFinalReflection } from "../logic/finalReflections.js";


const SESSION_DURATION_MS = 30 * 1000; // 30 seconds

function isSessionExpired(session) {
  const now = Date.now();
  const startedAt = new Date(session.startedAt).getTime();
  return now - startedAt > SESSION_EXPIRY_MS;
}


router.post("/start", async (req, res) => {
  const { userId, urgeType } = req.body;

  if (!userId || !urgeType) {
    return res.status(400).json({
      error: "userId and urgeType are required"
    });
  }

  // create session
  const session = await PauseSession.create({
    userId,
    urgeText: urgeType // we are using urgeType as key for now
  });

  // fetch FIRST situation (stepIndex = 0)
  const firstSituation = getSituation({
    urgeType,
    stepIndex: 0
  });

  return res.json({
    pauseSessionId: session._id,
    stepIndex: 0,
    situation: firstSituation.situation,
    options: firstSituation.options,
    expiresIn: 30000
  });
});




router.post("/respond", async (req, res) => {
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

  // ⏱️ expiry check
  const expired =
    Date.now() - new Date(session.startedAt).getTime() > 30 * 1000;

  if (expired) {
    session.state = "EXPIRED";
    session.endedAt = new Date();
    await session.save();

    return res.json({
      status: "EXPIRED",
      message: "The pause has gently passed. You may begin again."
    });
  }

  // 🪞 reflection for previous choice
  let reflection = null;
  if (choice) {
    reflection = getReflection({
      urgeType: session.urgeText, // or mapped urgeType
      stepIndex,
      optionId: choice
    });
  }

  // ➡️ next situation
  const nextSituation = getSituation({
    urgeType: session.urgeText,
    stepIndex: stepIndex + 1
  });

  if (!nextSituation) {
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
    situation: nextSituation.situation,
    options: nextSituation.options,
    nextStep: stepIndex + 1
  });
});


router.post("/decide", async (req, res) => {
  const { pauseSessionId, decision } = req.body;

  if (!pauseSessionId || !decision) {
    return res.status(400).json({ error: "pauseSessionId and decision are required" });
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

  // close session
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
});



export default router;
