export const finalReflections = {
  WON: [
    "This strength was already within you.",
    "Nothing was forced — clarity was enough.",
    "You did not suppress the urge; you understood it."
  ],
  INDULGED: [
    "Awareness itself is progress.",
    "This moment does not define you.",
    "The pause mattered, even if the choice was hard."
  ]
};

export function getFinalReflection(outcome) {
  const pool = finalReflections[outcome];
  return pool[Math.floor(Math.random() * pool.length)];
}
