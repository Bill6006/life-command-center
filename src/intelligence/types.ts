import type {
  CurrentContext,
  EvidenceState,
  MoveLane,
  SessionConstraint
} from "../features/today/types";

export const FORECAST_SIGNAL_IDS = [
  "energy",
  "mood",
  "focus",
  "drive",
  "irritability",
  "overwhelm",
  "sleepHours"
] as const;

export type ForecastSignalId = (typeof FORECAST_SIGNAL_IDS)[number];
export type ForecastPeriod = "morning" | "afternoon" | "evening";
export type ForecastBand = "red" | "yellow" | "green";
export type CapacityBand = "low" | "normal" | "high";
export type EvidenceConfidence = "low" | "medium" | "higher";
export type WeeklyFocusDomain =
  | "career"
  | "body-training"
  | "money"
  | "home"
  | "presence-social"
  | "faith-meaning"
  | "recovery";

export interface QualifiedSignal {
  value: number | null;
  source: EvidenceState;
  known: boolean;
}

export type ForecastSignals = Record<ForecastSignalId, QualifiedSignal>;

export interface ForecastContext {
  version: "forecast-context-v1";
  dateKey: string;
  nowIso: string;
  minuteOfDay: number;
  period: ForecastPeriod;
  place: CurrentContext;
  availableMinutes: number | null;
  privacyAvailable: boolean | null;
  needFood: boolean | null;
  recoveryRisk: QualifiedSignal;
  signals: ForecastSignals;
  protectiveCount: number;
  riskCount: number;
  effectiveEvidenceDays: number;
  completedCandidateIds: string[];
  completedFamilies: string[];
  activeFamilies: string[];
  dismissedCandidateIds: string[];
  constraints: SessionConstraint[];
  weeklyFocus: WeeklyFocusDomain | null;
}

export interface ForecastContextInput {
  dateKey: string;
  now: Date;
  place: CurrentContext;
  signals?: Partial<Record<ForecastSignalId, Partial<QualifiedSignal> | number | null>>;
  recoveryRisk?: Partial<QualifiedSignal> | number | null;
  availableMinutes?: number | null;
  privacyAvailable?: boolean | null;
  needFood?: boolean | null;
  protectiveCount?: number;
  riskCount?: number;
  effectiveEvidenceDays?: number;
  completedCandidateIds?: string[];
  completedFamilies?: string[];
  activeFamilies?: string[];
  dismissedCandidateIds?: string[];
  constraints?: SessionConstraint[];
  weeklyFocus?: WeeklyFocusDomain | null;
}

export interface CapacityBudget {
  raw: number;
  band: CapacityBand;
  confidence: EvidenceConfidence;
  provisional: boolean;
  knownInputs: number;
  allowances: Record<MoveLane, number>;
  optionalStretch: boolean;
  urgentProtect: boolean;
  protectedNextLane: MoveLane;
  reasons: string[];
}

export type BottleneckId =
  | "body-battery"
  | "nervous-system"
  | "mission-drift"
  | "recovery-risk"
  | "environment-friction"
  | "connection-need"
  | "presence-identity"
  | "faith-meaning"
  | "data-confidence";

export interface RankedBottleneck {
  id: BottleneckId;
  label: string;
  score: number;
  urgent: boolean;
  actionFamilies: string[];
  reasons: string[];
}

export interface IntelligenceCandidate {
  id: string;
  libraryVersion: "peak-moves-v1";
  title: string;
  instruction: string;
  family: string;
  dedupeGroup: string;
  lane: MoveLane;
  focusDomains: WeeklyFocusDomain[];
  contexts: CurrentContext[];
  notBefore?: number;
  notAfter?: number;
  durationMinutes: number;
  effort: 1 | 2 | 3 | 4 | 5;
  expectedEffect: [number, number];
  checkWindowMinutes: number;
  requiresPrivacy?: boolean;
  requiresFoodNeed?: boolean;
  deepFuture?: boolean;
}

export interface RankedCandidate extends IntelligenceCandidate {
  eligible: boolean;
  score: number;
  completionProbability: number;
  predictedEffect: [number, number];
  observedLift: number | null;
  reasons: string[];
  rejections: string[];
  tieBreak: string;
}

export interface ForecastProjection {
  score: number;
  band: ForecastBand;
  mode: "protect" | "stabilize" | "build" | "expand";
  confidence: EvidenceConfidence;
  effectiveEvidenceDays: number;
  protectiveCount: number;
  riskCount: number;
  floors: number[];
  caps: number[];
  reasons: string[];
}

export interface IntelligenceProjection {
  context: ForecastContext;
  forecast: ForecastProjection;
  capacity: CapacityBudget;
  bottlenecks: RankedBottleneck[];
  candidates: RankedCandidate[];
  selected: RankedCandidate;
  reachablePeak: number;
  northStar: 100;
}

export interface WeeklyFocusRecord {
  weekKey: string;
  selected: WeeklyFocusDomain;
  confirmedAt: string;
}

export interface WeeklyFocusResolution {
  weekKey: string;
  selected: WeeklyFocusDomain | null;
  source: "current-user-choice" | "carried-user-choice" | "none";
  suggestion: WeeklyFocusDomain;
  suggestionReasons: string[];
}

export interface OutcomeMetrics {
  energy?: number;
  mood?: number;
  focus?: number;
  drive?: number;
  stress?: number;
  overwhelm?: number;
  irritability?: number;
}

export interface MoveOutcomeRecord {
  candidateId: string;
  family: string;
  occurredAt: string;
  started: boolean;
  completed: boolean;
  rejectedForFeasibility?: boolean;
  before?: OutcomeMetrics;
  after?: OutcomeMetrics;
  contextFeatures?: Partial<Record<ForecastSignalId, QualifiedSignal>>;
}
