export const mockStartPause = async () => {
  return {
    pauseSessionId: "mock-session-1",
    stepIndex: 0,
    situation: "Stay present. The pause has begun.",
    options: [
      { id: "BREATHE", text: "Take 3 deep breaths" },
      { id: "WAIT", text: "Wait for 30 seconds" }
    ],
    expiresIn: 30000
  };
};

export const mockRespondPause = async (choice) => {
  if (choice === "WAIT") {
    return {
      status: "DECISION",
      message: "Now decide freely.",
      options: [
        { id: "WON", text: "I won over my senses" },
        { id: "INDULGED", text: "I indulged" }
      ]
    };
  }

  return {
    status: "ACTIVE",
    situation: "Notice the urge without judgment.",
    options: [
      { id: "OBSERVE", text: "Observe the urge" },
      { id: "DISTRACT", text: "Shift attention" }
    ],
    nextStep: 1
  };
};

export const mockDecidePause = async () => {
  return {
    status: "COMPLETED",
    outcome: "WON",
    reflection: "You stayed mindful and chose clarity."
  };
};
