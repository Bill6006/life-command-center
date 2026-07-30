import type { CapacityBudget, ForecastContext, QualifiedSignal } from "./types";

function value(signal: QualifiedSignal): number | null {
  return signal.known ? signal.value : null;
}

function clamp(valueToClamp: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, valueToClamp));
}

export function calculateCapacityBudget(context: ForecastContext): CapacityBudget {
  const energy = value(context.signals.energy);
  const drive = value(context.signals.drive);
  const focus = value(context.signals.focus);
  const recoveryRisk = value(context.recoveryRisk);
  const values = [energy, drive, focus, recoveryRisk];
  const knownInputs = values.filter((item) => item !== null).length;
  const raw = Math.round(
    clamp(
      (energy ?? 0) * 9 +
        (drive ?? 0) * 5 +
        (focus ?? 0) * 6 -
        (recoveryRisk ?? 0) * 0.25,
      0,
      100
    )
  );
  const veryLowState =
    [energy, drive, focus].some((item) => item !== null && item <= 2) ||
    (context.signals.mood.known && (context.signals.mood.value ?? 10) <= 2) ||
    (context.signals.overwhelm.known && (context.signals.overwhelm.value ?? 0) >= 9) ||
    (context.signals.irritability.known && (context.signals.irritability.value ?? 0) >= 9);
  const provisional = knownInputs < 3;
  const urgentProtect =
    (recoveryRisk !== null && recoveryRisk >= 65) ||
    veryLowState ||
    (energy !== null && energy <= 3) ||
    (focus !== null && focus <= 3) ||
    context.needFood === true ||
    (context.signals.sleepHours.known && (context.signals.sleepHours.value ?? 24) < 5.5);
  const band =
    provisional ||
    (recoveryRisk !== null && recoveryRisk >= 70) ||
    veryLowState ||
    (energy !== null && energy <= 3) ||
    (focus !== null && focus <= 3)
      ? "low"
      : raw >= 75 &&
          (recoveryRisk ?? 100) < 50 &&
          (energy ?? 0) >= 7 &&
          (focus ?? 0) >= 6 &&
          (drive ?? 0) >= 6
        ? "high"
        : "normal";
  const confidence = knownInputs === 4 ? "higher" : knownInputs === 3 ? "medium" : "low";
  return {
    raw,
    band,
    confidence,
    provisional,
    knownInputs,
    allowances: {
      protect: 1,
      future: band === "low" ? 0 : 1,
      connection: 1
    },
    optionalStretch: band === "high",
    urgentProtect,
    protectedNextLane: urgentProtect ? "protect" : band === "low" ? "connection" : "future",
    reasons: [
      provisional
        ? "Capacity is provisional because fewer than three inputs are known."
        : `Capacity uses ${knownInputs} source-qualified inputs.`,
      urgentProtect
        ? "An urgent protection signal reserves the next lane."
        : "No urgent protection override is active.",
      band === "high"
        ? "One optional stretch is available; it is never required."
        : `The ${band} band does not add a required stretch.`
    ]
  };
}
