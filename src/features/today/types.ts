import { cloneState, isUnknownRecord } from "../../state/model";

export const TODAY_CATEGORIES = [
  "energy",
  "career",
  "money",
  "fatherhood",
  "health",
  "social",
  "home",
  "emotional"
] as const;

export type TodayCategory = (typeof TODAY_CATEGORIES)[number];
export type EvidenceState =
  | "unknown"
  | "explicit-false"
  | "logged"
  | "auto-observed"
  | "inferred"
  | "trusted";
export type CurrentContext = "home" | "work" | "driving" | "public" | "outside";
export type MoveLane = "protect" | "future" | "connection";
export type MoveStatus = "started" | "paused" | "completed" | "dismissed";
export type ConstraintReason =
  | "not-enough-time"
  | "wrong-place"
  | "need-privacy"
  | "need-food-water"
  | "driving"
  | "depleted"
  | "other";
export type MinimumWinStatus = "open" | "manual-done" | "covered" | "pivoted";

export interface TodayEvidence {
  value: 0 | 1 | 2 | null;
  state: EvidenceState;
  updatedAt?: string;
}

export interface MoveCandidate {
  id: string;
  libraryVersion: string;
  title: string;
  instruction: string;
  family: string;
  dedupeGroup: string;
  lane: MoveLane;
  contexts: CurrentContext[];
  durationMinutes: number;
  expectedEffect: string;
  checkWindowMinutes: number;
  why: string;
  isMovementReadiness?: boolean;
}

export interface TodayCommand {
  candidateId: string;
  title: string;
  instruction: string;
  readinessBand: "low" | "steady" | "strong" | "unknown";
  confidence: "low" | "medium" | "high";
  mainLimiter: string;
  bestNextFix: string;
  expectedEffect: string;
  checkWindowMinutes: number;
  lane: MoveLane;
  reasons: string[];
  safetyNote?: string;
}

export interface SessionConstraint {
  id: string;
  candidateId: string;
  family: string;
  reason: ConstraintReason;
  note?: string;
  context: CurrentContext;
  createdAt: string;
  expiresAt: string;
  undoneAt?: string;
}

export interface EffectFollowUp {
  moveId: string;
  dueAt: string;
  status: "pending" | "complete";
  before?: Record<string, number>;
  after?: Record<string, number>;
  observedChange?: number;
  completedAt?: string;
}

export interface MoveRecord {
  id: string;
  candidateId: string;
  family: string;
  lane: MoveLane;
  title: string;
  context: CurrentContext;
  status: MoveStatus;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  pausedAt?: string;
  dismissedAt?: string;
  dismissalReason?: ConstraintReason | "try-another";
  displayLockPeriod?: string;
  followUp?: EffectFollowUp;
}

export interface MinimumWin {
  id: string;
  libraryVersion: string;
  title: string;
  detail: string;
  family: string;
  lane: MoveLane;
  tier: "floor" | "standard" | "needle" | "elite";
  status: MinimumWinStatus;
  proofSource?: string;
  completedAt?: string;
  coveredByMoveId?: string;
  previousId?: string;
}

export interface MinimumWinPlan {
  id: string;
  dateKey: string;
  libraryVersion: string;
  generatedAt: string;
  wins: [MinimumWin, MinimumWin, MinimumWin];
}

export interface TodayState {
  version: 1;
  context: CurrentContext;
  evidence: Record<TodayCategory, TodayEvidence>;
  minimumWinPlans: MinimumWinPlan[];
  activeMove: MoveRecord | null;
  moveHistory: MoveRecord[];
  constraints: SessionConstraint[];
  dismissedCandidateIds: string[];
}

function blankEvidence(): Record<TodayCategory, TodayEvidence> {
  return Object.fromEntries(
    TODAY_CATEGORIES.map((category) => [category, { value: null, state: "unknown" }])
  ) as Record<TodayCategory, TodayEvidence>;
}

export function createBlankTodayState(): TodayState {
  return {
    version: 1,
    context: "home",
    evidence: blankEvidence(),
    minimumWinPlans: [],
    activeMove: null,
    moveHistory: [],
    constraints: [],
    dismissedCandidateIds: []
  };
}

export function parseTodayState(value: unknown): TodayState {
  const blank = createBlankTodayState();
  if (!isUnknownRecord(value)) return blank;
  const candidate = value as Partial<TodayState>;
  const evidence = blankEvidence();
  if (isUnknownRecord(candidate.evidence)) {
    for (const category of TODAY_CATEGORIES) {
      const entry = candidate.evidence[category];
      if (!isUnknownRecord(entry)) continue;
      const rawValue = entry.value;
      const value = rawValue === 0 || rawValue === 1 || rawValue === 2 ? rawValue : null;
      const state =
        typeof entry.state === "string" &&
        ["unknown", "explicit-false", "logged", "auto-observed", "inferred", "trusted"].includes(
          entry.state
        )
          ? (entry.state as EvidenceState)
          : "unknown";
      evidence[category] = { value, state, updatedAt: String(entry.updatedAt ?? "") || undefined };
    }
  }
  return {
    version: 1,
    context: ["home", "work", "driving", "public", "outside"].includes(
      String(candidate.context)
    )
      ? (candidate.context as CurrentContext)
      : "home",
    evidence,
    minimumWinPlans: Array.isArray(candidate.minimumWinPlans)
      ? cloneState(candidate.minimumWinPlans)
      : [],
    activeMove: isUnknownRecord(candidate.activeMove)
      ? (cloneState(candidate.activeMove) as unknown as MoveRecord)
      : null,
    moveHistory: Array.isArray(candidate.moveHistory) ? cloneState(candidate.moveHistory) : [],
    constraints: Array.isArray(candidate.constraints) ? cloneState(candidate.constraints) : [],
    dismissedCandidateIds: Array.isArray(candidate.dismissedCandidateIds)
      ? candidate.dismissedCandidateIds.filter((id): id is string => typeof id === "string")
      : []
  };
}
