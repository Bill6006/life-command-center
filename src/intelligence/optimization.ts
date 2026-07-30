import type {
  ForecastContext,
  ForecastSignalId,
  MoveOutcomeRecord,
  OutcomeMetrics,
  QualifiedSignal
} from "./types";

const POSITIVE_METRICS = new Set<keyof OutcomeMetrics>(["energy", "mood", "focus", "drive"]);
const ADVERSE_METRICS = new Set<keyof OutcomeMetrics>(["stress", "overwhelm", "irritability"]);

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function sourceWeight(signal: QualifiedSignal) {
  return signal.source === "inferred" || signal.source === "auto-observed" ? 0.62 : 1;
}

export function recencyWeight(ageDays: number) {
  if (ageDays <= 14) return 1;
  if (ageDays <= 45) return 0.94;
  if (ageDays <= 120) return 0.86;
  return 0.78;
}

export function comparableSimilarity(
  context: ForecastContext,
  record: MoveOutcomeRecord,
  now = new Date(context.nowIso)
): number | null {
  const current: Partial<Record<ForecastSignalId, QualifiedSignal>> = context.signals;
  const pairs = Object.entries(record.contextFeatures ?? {}).filter(([id, previous]) => {
    const next = current[id as ForecastSignalId];
    return Boolean(previous?.known && next?.known);
  }) as [ForecastSignalId, QualifiedSignal][];
  if (pairs.length < 3) return null;
  const distance = pairs.reduce((total, [id, previous]) => {
    const next = current[id]!;
    const span = id === "sleepHours" ? 12 : 10;
    return (
      total +
      (Math.abs((previous.value ?? 0) - (next.value ?? 0)) / span) *
        sourceWeight(next) *
        sourceWeight(previous)
    );
  }, 0);
  const ageDays = Math.max(
    0,
    (now.getTime() - Date.parse(record.occurredAt)) / (24 * 60 * 60 * 1000)
  );
  return Number((clamp(1 - distance / pairs.length, 0, 1) * recencyWeight(ageDays)).toFixed(4));
}

export function selectComparableRecords(
  context: ForecastContext,
  records: readonly MoveOutcomeRecord[]
) {
  return records
    .map((record) => ({ record, similarity: comparableSimilarity(context, record) }))
    .filter(
      (entry): entry is { record: MoveOutcomeRecord; similarity: number } =>
        entry.similarity !== null
    )
    .sort(
      (left, right) =>
        right.similarity - left.similarity ||
        right.record.occurredAt.localeCompare(left.record.occurredAt) ||
        left.record.candidateId.localeCompare(right.record.candidateId)
    )
    .slice(0, 8);
}

export function observedOutcomeLift(record: MoveOutcomeRecord): number | null {
  if (!record.started || !record.before || !record.after) return null;
  const deltas = (Object.keys(record.before) as (keyof OutcomeMetrics)[])
    .filter(
      (key) =>
        typeof record.before?.[key] === "number" &&
        typeof record.after?.[key] === "number" &&
        (POSITIVE_METRICS.has(key) || ADVERSE_METRICS.has(key))
    )
    .map((key) => {
      const raw = (record.after?.[key] ?? 0) - (record.before?.[key] ?? 0);
      return ADVERSE_METRICS.has(key) ? -raw : raw;
    });
  if (deltas.length < 2) return null;
  const primary = deltas[0];
  const supporting = deltas.slice(1).reduce((sum, item) => sum + item, 0) / (deltas.length - 1);
  return Number(clamp(primary * 0.65 + supporting * 0.35, -20, 20).toFixed(2));
}

export function completionProbability(
  records: readonly MoveOutcomeRecord[],
  effort: number,
  durationMinutes: number
) {
  const started = records.filter((record) => record.started).length;
  const done = records.filter((record) => record.completed).length;
  const rejected = records.filter((record) => record.rejectedForFeasibility).length;
  const smoothed = (done + 2.6) / (started + rejected * 0.85 + 4);
  const effortAdjustment = Math.max(0, effort - 2) * 0.035;
  const timeAdjustment = Math.max(0, durationMinutes - 10) * 0.004;
  return Number(clamp(smoothed - effortAdjustment - timeAdjustment, 0.2, 0.92).toFixed(3));
}

export function learnedLiftForCandidate(
  context: ForecastContext,
  candidateId: string,
  records: readonly MoveOutcomeRecord[]
) {
  const comparable = selectComparableRecords(
    context,
    records.filter((record) => record.candidateId === candidateId)
  );
  const qualified = comparable
    .map(({ record, similarity }) => ({ lift: observedOutcomeLift(record), similarity }))
    .filter((entry): entry is { lift: number; similarity: number } => entry.lift !== null);
  if (!qualified.length) return null;
  const weight = qualified.reduce((sum, entry) => sum + entry.similarity, 0);
  return Number(
    (
      qualified.reduce((sum, entry) => sum + entry.lift * entry.similarity, 0) /
      Math.max(weight, 0.0001)
    ).toFixed(2)
  );
}
