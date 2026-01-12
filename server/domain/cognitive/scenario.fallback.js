/**
 * Fallback cognitive scenario set
 *
 * Used ONLY when AI output is invalid or unavailable.
 * Must ALWAYS satisfy the scenario schema.
 */

export const FALLBACK_SCENARIO_SET = {
  scenarios: [
    {
      id: "pause_awareness",
      situation: "Notice the urge as it is, without acting on it immediately.",
      options: [
        {
          id: "observe",
          text: "Observe the urge quietly",
          reflection: "Awareness itself is a form of choice."
        },
        {
          id: "delay",
          text: "Delay action for a moment",
          reflection: "Urgency often softens when time is allowed."
        },
        {
          id: "act",
          text: "Act on the urge",
          reflection: "Acting is a choice, not a failure."
        }
      ]
    },
    {
      id: "short_term_view",
      situation: "Consider how acting on this urge might feel shortly afterward.",
      options: [
        {
          id: "temporary_relief",
          text: "It would bring brief relief",
          reflection: "Relief that fades often signals a deeper need."
        },
        {
          id: "neutral_effect",
          text: "It might not change much",
          reflection: "Not every urge carries meaning."
        },
        {
          id: "regret",
          text: "I might regret it",
          reflection: "Regret appears when actions and values diverge."
        }
      ]
    },
    {
      id: "inner_strength",
      situation: "Recall a moment when you chose awareness over impulse.",
      options: [
        {
          id: "quiet_pride",
          text: "I felt quietly proud",
          reflection: "Pride born of restraint is often lasting."
        },
        {
          id: "difficulty",
          text: "It was difficult but passed",
          reflection: "Most urges weaken when observed patiently."
        },
        {
          id: "no_memory",
          text: "I don’t remember such a moment",
          reflection: "Forgetting strength does not erase it."
        }
      ]
    }
  ]
};
