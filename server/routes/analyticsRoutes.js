import express from "express";
import PauseSession from "../models/PauseSession.js";
import { generateNightlyInsight } from "../services/ai/nightlyInsight.ai.js";

const router = express.Router();

/**
 * GET /api/analytics/daily
 * Optional query: ?date=YYYY-MM-DD
 */
router.get("/daily", async (req, res) => {
  try {
    const { userId } = req.query;
    const dateParam = req.query.date;

    if (!userId) {
      return res.status(400).json({
        error: "userId is required"
      });
    }

    // 📅 Determine date range (local day)
    const targetDate = dateParam ? new Date(dateParam) : new Date();

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // 🧠 Fetch sessions for the day
    const sessions = await PauseSession.find({
      userId,
      startedAt: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      state: "COMPLETED"
    });

    // 🧮 Aggregate
    let won = 0;
    let indulged = 0;
    const byHour = {};

    sessions.forEach(session => {
      if (session.outcome === "WON") won++;
      if (session.outcome === "INDULGED") indulged++;

      const hour = new Date(session.startedAt).getHours();
      byHour[hour] = (byHour[hour] || 0) + 1;
    });

    return res.json({
      date: startOfDay.toISOString().slice(0, 10),
      totalPauses: sessions.length,
      won,
      indulged,
      byHour
    });

  } catch (error) {
    console.error("Daily analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/daily/insight", async (req, res) => {
  try {
    const { userId, date } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "userId is required"
      });
    }

    // 📅 Determine date range
    const targetDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // 🧠 Fetch sessions
    const sessions = await PauseSession.find({
      userId,
      startedAt: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      state: "COMPLETED"
    });

    // 🧮 Aggregate (reuse logic, no duplication later)
    let won = 0;
    let indulged = 0;
    const byHour = {};

    sessions.forEach(session => {
      if (session.outcome === "WON") won++;
      if (session.outcome === "INDULGED") indulged++;

      const hour = new Date(session.startedAt).getHours();
      byHour[hour] = (byHour[hour] || 0) + 1;
    });

    // 🪞 Build summary object for AI
    const summary = {
      total: sessions.length,
      won,
      indulged,
      peakHour:
        Object.keys(byHour).length > 0
          ? Object.entries(byHour).sort((a, b) => b[1] - a[1])[0][0]
          : null
    };

    // 🤖 Generate insight (AI with fallback)
    const insight = await generateNightlyInsight(summary);

    return res.json({
      date: startOfDay.toISOString().slice(0, 10),
      insight
    });

  } catch (error) {
    console.error("Nightly insight error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
