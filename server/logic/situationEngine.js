import { situationLibrary } from "./situationLibrary.js";

export function getSituation({ urgeType, stepIndex }) {
  const situations = situationLibrary[urgeType];

  if (!situations) {
    throw new Error("Unknown urge type");
  }

  if (stepIndex < 0 || stepIndex >= situations.length) {
    return null; // no more situations
  }

  const situation = situations[stepIndex];

  return {
    id: situation.id,
    situation: situation.situation,
    options: situation.options.map(opt => ({
      id: opt.id,
      text: opt.text
    }))
  };
}

export function getReflection({ urgeType, stepIndex, optionId }) {
  const situations = situationLibrary[urgeType];
  if (!situations) return null;

  const situation = situations[stepIndex];
  if (!situation) return null;

  const option = situation.options.find(o => o.id === optionId);
  return option ? option.reflection : null;
}
