import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import pauseRoutes from "./routes/pauseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SatvaRise backend is running 🌱");
});
console.log("HF TOKEN AT BOOT:", process.env.HF_API_TOKEN ? "LOADED" : "MISSING");

app.use("/api/pause", pauseRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
