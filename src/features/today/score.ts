import { TODAY_CATEGORIES, type EvidenceState, type TodayState } from "./types";

const SOURCE_WEIGHT: Record<EvidenceState, number> = {
  unknown: 0,
  "explicit-false": 1,
  logged: 1,
  "auto-observed": 0.75,
  inferred: 0.62,
  trusted: 1
};

export interface TodayScore {
  display: boolean;
  score: number;
  maxScore: 16;
  knownCategories: number;
  evidenceWeight: number;
  completeness: number;
  qualification: "insufficient" | "limited" | "partial" | "qualified";
  direction: string;
}

export function calculateTodayScore(today: TodayState): TodayScore {
  let score = 0;
  let knownCategories = 0;
  let evidenceWeight = 0;
  for (const category of TODAY_CATEGORIES) {
    const entry = today.evidence[category];
    if (entry.state === "unknown" || entry.value === null) continue;
    score += entry.value;
    knownCategories += 1;
    evidenceWeight += SOURCE_WEIGHT[entry.state];
  }
  const completeness = evidenceWeight / TODAY_CATEGORIES.length;
  const qualification =
    completeness >= 0.8
      ? "qualified"
      : completeness >= 0.5
        ? "partial"
        : completeness > 0
          ? "limited"
          : "insufficient";
  const direction =
    knownCategories === 0
      ? "Log one signal to reveal direction."
      : score <= 4
        ? "Protect capacity. A low signal is direction, not a verdict."
        : score <= 10
          ? "Keep the next move small and realistic."
          : "Capacity looks steadier; protect what is working.";
  return {
    display: knownCategories > 0,
    score,
    maxScore: 16,
    knownCategories,
    evidenceWeight,
    completeness,
    qualification,
    direction
  };
}

export function readinessBand(today: TodayState): TodayScore["qualification"] | "low" | "steady" | "strong" | "unknown" {
  const energy = today.evidence.energy;
  const emotional = today.evidence.emotional;
  if (energy.value === null || energy.state === "unknown") return "unknown";
  if (energy.value === 0 || emotional.value === 0) return "low";
  if (energy.value === 2 && (emotional.value === null || emotional.value >= 1)) return "strong";
  return "steady";
}
