import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import pauseRoutes from "./routes/pauseRoutes.js";


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

app.use("/api/pause", pauseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// mongodb+srv://satvarise_user:Y4Z5TIoLT3shvKFG@cluster0.hsfdyui.mongodb.net/?appName=Cluster0
// mongodb+srv://<db_username>:<db_password>@cluster0.hsfdyui.mongodb.net/?appName=Cluster0