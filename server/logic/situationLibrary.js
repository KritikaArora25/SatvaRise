export const situationLibrary = {
  eating_sweets: [
    {
      id: "immediate_relief",
      situation:
        "Imagine eating the sweet slowly, without guilt. For a few moments, what feels strongest?",
      options: [
        {
          id: "comfort",
          text: "Comfort and relief",
          reflection:
            "Notice — you are not seeking sweetness. You are seeking rest."
        },
        {
          id: "short_joy",
          text: "A short happiness that fades",
          reflection:
            "What fades quickly was never meant to carry weight."
        },
        {
          id: "nothing_special",
          text: "Nothing special, honestly",
          reflection:
            "Then the urge is habit, not hunger."
        }
      ]
    },

    {
      id: "identity",
      situation:
        "Imagine this moment repeating quietly every few days. No one notices. Only you know.",
      options: [
        {
          id: "self_disappointment",
          text: "I would feel disappointed in myself",
          reflection:
            "Disappointment arises when actions drift from values."
        },
        {
          id: "justify",
          text: "I would justify it as normal",
          reflection:
            "Justification is how habits ask permission."
        },
        {
          id: "dont_think",
          text: "I don't think that far",
          reflection:
            "Avoidance keeps cycles alive without effort."
        }
      ]
    },

    {
      id: "pattern",
      situation:
        "Think of a time you resisted an urge like this.",
      options: [
        {
          id: "proud",
          text: "I felt proud later",
          reflection:
            "Pride born of restraint is quiet and lasting."
        },
        {
          id: "hard_but_worth",
          text: "It was hard but worth it",
          reflection:
            "Difficulty is the doorway, not the obstacle."
        },
        {
          id: "dont_remember",
          text: "I don't remember resisting",
          reflection:
            "Forgetting strength does not mean it is absent."
        }
      ]
    }
  ]
};
