import { rankBottlenecks } from "./bottlenecks";
import { calculateCapacityBudget } from "./capacity";
import { rankIntelligenceCandidates } from "./candidates";
import { buildForecastContext } from "./evidence";
import { calculateForecast } from "./forecast";
import type {
  ForecastContextInput,
  IntelligenceProjection,
  MoveOutcomeRecord
} from "./types";

export function buildIntelligenceProjection(
  input: ForecastContextInput,
  outcomes: readonly MoveOutcomeRecord[] = []
): IntelligenceProjection {
  const context = buildForecastContext(input);
  const forecast = calculateForecast(context);
  const capacity = calculateCapacityBudget(context);
  const bottlenecks = rankBottlenecks(context);
  const candidates = rankIntelligenceCandidates(context, capacity, bottlenecks, outcomes);
  const selected =
    candidates.find((candidate) => candidate.eligible) ??
    candidates.find((candidate) => candidate.id === "qualified-check-in") ??
    candidates[0];
  const timeCap =
    context.availableMinutes === null
      ? 12
      : Math.max(0, Math.min(18, Math.round(context.availableMinutes / 3)));
  const capacityCap = capacity.band === "low" ? 6 : capacity.band === "normal" ? 12 : 18;
  return {
    context,
    forecast,
    capacity,
    bottlenecks,
    candidates,
    selected,
    reachablePeak: Math.min(100, forecast.score + Math.min(timeCap, capacityCap)),
    northStar: 100
  };
}
