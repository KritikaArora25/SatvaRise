import express from "express";

const router = express.Router();

router.post("/start", (req, res) => {
  res.json({
    question: "Dummy question for now",
    options: ["Option A", "Option B", "Option C"]
  });
});

router.post("/respond", (req, res) => {
  res.json({
    reply: "Dummy reflection for now"
  });
});

export default router;
