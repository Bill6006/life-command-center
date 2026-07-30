import type { BottleneckId, ForecastContext, RankedBottleneck } from "./types";

const LABELS: Record<BottleneckId, string> = {
  "body-battery": "Body battery",
  "nervous-system": "Nervous system",
  "mission-drift": "Mission drift",
  "recovery-risk": "Recovery risk",
  "environment-friction": "Environment friction",
  "connection-need": "Connection need",
  "presence-identity": "Presence / identity",
  "faith-meaning": "Faith / meaning",
  "data-confidence": "Data confidence"
};

const FAMILIES: Record<BottleneckId, string[]> = {
  "body-battery": ["body-support", "food-support", "movement-readiness"],
  "nervous-system": ["nervous-system", "quiet-reset"],
  "mission-drift": ["future-focus", "career-focus"],
  "recovery-risk": ["recovery", "sleep-protection"],
  "environment-friction": ["environment"],
  "connection-need": ["connection"],
  "presence-identity": ["presence"],
  "faith-meaning": ["faith"],
  "data-confidence": ["check-in"]
};

function lowSignal(value: number | null, known: boolean) {
  return known && value !== null ? Math.max(0, 8 - value) * 10 : 0;
}

export function rankBottlenecks(context: ForecastContext): RankedBottleneck[] {
  const knownState = [
    context.signals.energy,
    context.signals.mood,
    context.signals.focus,
    context.signals.drive,
    context.signals.irritability,
    context.signals.overwhelm
  ].filter((signal) => signal.known).length;
  const scores: Record<BottleneckId, number> = {
    "body-battery":
      lowSignal(context.signals.energy.value, context.signals.energy.known) +
      (context.needFood === true ? 35 : 0),
    "nervous-system":
      (context.signals.overwhelm.known ? Math.max(0, (context.signals.overwhelm.value ?? 0) - 4) * 10 : 0) +
      (context.signals.irritability.known ? Math.max(0, (context.signals.irritability.value ?? 0) - 5) * 8 : 0),
    "mission-drift":
      lowSignal(context.signals.focus.value, context.signals.focus.known) +
      lowSignal(context.signals.drive.value, context.signals.drive.known) * 0.5,
    "recovery-risk": context.recoveryRisk.known ? context.recoveryRisk.value ?? 0 : 0,
    "environment-friction": context.place === "home" ? 24 : context.place === "work" ? 16 : 4,
    "connection-need": context.riskCount > context.protectiveCount ? 22 : 8,
    "presence-identity": context.place === "public" ? 16 : 7,
    "faith-meaning": context.weeklyFocus === "faith-meaning" ? 18 : 6,
    "data-confidence": Math.max(0, 4 - knownState) * 26
  };
  return (Object.keys(scores) as BottleneckId[])
    .map((id) => ({
      id,
      label: LABELS[id],
      score: Math.round(scores[id]),
      urgent:
        (id === "recovery-risk" && scores[id] >= 65) ||
        (id === "body-battery" && scores[id] >= 55) ||
        (id === "nervous-system" && scores[id] >= 55),
      actionFamilies: FAMILIES[id],
      reasons: [
        scores[id] > 0
          ? `${LABELS[id]} has ${Math.round(scores[id])} points of qualified pressure.`
          : `No qualified ${LABELS[id].toLowerCase()} pressure is present.`,
        id === "data-confidence" && knownState < 3
          ? "Unknown state is a data-confidence need, not a low score."
          : "Unknown signals did not receive invented averages."
      ]
    }))
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
}
