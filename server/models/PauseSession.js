import mongoose from "mongoose";

const pauseSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  urgeText: {
    type: String,
    required: true
  },

  scenarios: {
    type: Array,
    required: true
  },

  state: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "EXPIRED"],
    default: "ACTIVE"
  },

  outcome: {
    type: String,
    enum: ["WON", "INDULGED", null],
    default: null
  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  endedAt: {
    type: Date,
    default: null
  }
});

/**
 * 🔒 Compound index for performance
 * Enables fast retrieval of recent sessions per user
 */
pauseSessionSchema.index({ userId: 1, startedAt: -1 });

const PauseSession = mongoose.model("PauseSession", pauseSessionSchema);

export default PauseSession;
