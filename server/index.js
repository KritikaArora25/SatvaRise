import express from "express";
import cors from "cors";
import pauseRoutes from "./routes/pause.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SatvaRise backend is running 🌱");
});

app.use("/api/pause", pauseRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
