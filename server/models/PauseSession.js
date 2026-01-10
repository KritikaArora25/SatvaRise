import mongoose from "mongoose";

const pauseSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  // What the user typed (urge)
  urgeText: {
    type: String,
    required: true
  },

  // Lifecycle of the pause
  state: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "EXPIRED"],
    default: "ACTIVE"
  },

  // Final decision by user
  outcome: {
    type: String,
    enum: ["WON", "INDULGED", null],
    default: null
  },

  // Timestamps
  startedAt: {
    type: Date,
    default: Date.now
  },

  endedAt: {
    type: Date,
    default: null
  }
});

const PauseSession = mongoose.model("PauseSession", pauseSessionSchema);

export default PauseSession;
