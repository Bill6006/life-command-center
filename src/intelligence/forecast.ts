import type { ForecastContext, ForecastProjection } from "./types";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function lowPositive(context: ForecastContext) {
  return ["energy", "mood", "focus", "drive"].some((id) => {
    const signal = context.signals[id as "energy" | "mood" | "focus" | "drive"];
    return signal.known && (signal.value ?? 10) <= 4;
  });
}

function severeState(context: ForecastContext) {
  return (
    ["energy", "mood", "focus", "drive"].some((id) => {
      const signal = context.signals[id as "energy" | "mood" | "focus" | "drive"];
      return signal.known && (signal.value ?? 10) <= 2;
    }) ||
    ["irritability", "overwhelm"].some((id) => {
      const signal = context.signals[id as "irritability" | "overwhelm"];
      return signal.known && (signal.value ?? 0) >= 9;
    })
  );
}

export function calculateForecast(context: ForecastContext): ForecastProjection {
  const currentSignals = [
    context.signals.energy,
    context.signals.mood,
    context.signals.focus,
    context.signals.drive,
    context.signals.irritability,
    context.signals.overwhelm
  ];
  const hasCurrentState = currentSignals.some((signal) => signal.known);
  const raw = 64 + context.protectiveCount * 4.8 - context.riskCount * 4.2;
  const floors: number[] = [];
  const caps: number[] = [];
  floors.push(hasCurrentState ? (severeState(context) ? 16 : 24) : 22 + (context.protectiveCount ? 3 : 0));
  if (
    (context.signals.energy.known && (context.signals.energy.value ?? 10) <= 3) ||
    (context.signals.mood.known && (context.signals.mood.value ?? 10) <= 3)
  ) {
    caps.push(48);
  } else if (
    lowPositive(context) ||
    (context.signals.irritability.known && (context.signals.irritability.value ?? 0) >= 7) ||
    (context.signals.overwhelm.known && (context.signals.overwhelm.value ?? 0) >= 7)
  ) {
    caps.push(58);
  }
  if (!hasCurrentState) caps.push(context.period === "morning" ? 68 : 62);
  if (context.effectiveEvidenceDays < 5) caps.push(72);
  else if (context.effectiveEvidenceDays < 10) caps.push(84);
  else if (context.effectiveEvidenceDays < 20) caps.push(92);
  let score = clamp(raw, 0, 100);
  score = Math.max(score, Math.max(...floors));
  if (caps.length) score = Math.min(score, Math.min(...caps));
  score = Math.round(score);
  const band = score >= 75 ? "green" : score >= 50 ? "yellow" : "red";
  const knownCount = currentSignals.filter((signal) => signal.known).length;
  const confidence = knownCount >= 4 ? "higher" : knownCount === 3 ? "medium" : "low";
  return {
    score,
    band,
    mode: band === "red" ? "protect" : band === "yellow" ? "stabilize" : score >= 88 ? "expand" : "build",
    confidence,
    effectiveEvidenceDays: context.effectiveEvidenceDays,
    protectiveCount: context.protectiveCount,
    riskCount: context.riskCount,
    floors,
    caps,
    reasons: [
      `Legacy boundary: 64 + ${context.protectiveCount} × 4.8 − ${context.riskCount} × 4.2.`,
      hasCurrentState
        ? `${knownCount} current-state signals are known.`
        : "Current state is unknown; the confidence cap applies.",
      caps.length ? `Applied caps: ${caps.join(", ")}.` : "No forecast cap was needed.",
      `Predicted forecast remains separate from later observed outcomes.`
    ]
  };
}
