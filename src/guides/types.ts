import type { TabId } from "../navigation/tabRegistry";

export type MainGuideFamily = "morning" | "afternoon" | "evening";
export type GuideFamily =
  | MainGuideFamily
  | "missed-morning"
  | "smart-check-in"
  | "weekly";
export type GuidePeriod = MainGuideFamily;
export type ForecastWindow =
  | "after-midnight"
  | "early-morning"
  | "late-morning"
  | "early-afternoon"
  | "mid-afternoon"
  | "late-afternoon"
  | "early-evening"
  | "mid-evening"
  | "late-evening";

export type GuideCondition =
  | { kind: "always" }
  | { kind: "missing"; evidence: string }
  | { kind: "saturday" }
  | { kind: "private-follow-up" };

export interface GuideStepDefinition {
  id: string;
  guideFamily: GuideFamily | "main";
  sourcePeriod: GuidePeriod | "weekly";
  tab: TabId;
  targetId: string;
  title: string;
  note: string;
  condition: GuideCondition;
  sideEffect?: "target-tonight" | "hold-private-follow-up";
  completionRule: "explicit-evidence" | "acknowledge";
  optionality: "required" | "optional" | "conditional";
  priority: number;
}

export interface EvidenceSnapshot {
  satisfied: Record<string, boolean>;
  loggedAt?: Record<string, string>;
  privateFollowUp?: PrivateFollowUp;
}

export interface PrivateFollowUp {
  eventId: string;
  dueAt: string;
  lateAt: string;
  staleAt: string;
  startedAt?: string;
  completedAt?: string;
}

export type FollowUpStatus = "not-due" | "due" | "late" | "held" | "stale" | "complete";

export interface GuideCompletion {
  key: string;
  completedAt: string;
}

export interface GuideSession {
  id: string;
  family: GuideFamily;
  effectiveKey: string;
  sourcePeriod: GuidePeriod | "weekly";
  stepIds: string[];
  stepIndex: number;
  startedAt: string;
  updatedAt: string;
  manualOverride: boolean;
  activeTab: TabId;
  targetId: string;
  completedEvidence: Record<string, string>;
  skippedStepIds: string[];
  heldFollowUpId?: string;
}

export interface QuickModeState {
  active: boolean;
  startedAt?: string;
}

export interface GuideState {
  [key: string]: unknown;
  version: 1;
  active: GuideSession | null;
  completions: Partial<Record<GuideFamily, GuideCompletion>>;
  quickMode: QuickModeState;
  usedKeys: Partial<Record<GuideFamily, string>>;
  rangeLoggedAt: Partial<Record<GuidePeriod, string>>;
}

export interface GuideClockContext {
  now: Date;
  timeZone: string;
  rolloverMode: string;
}

export interface GuideBuildContext extends GuideClockContext {
  evidence: EvidenceSnapshot;
}

export interface EligibilityResult {
  eligible: boolean;
  reason: string;
  key: string;
}

export interface GuideRouteCommand {
  tab: TabId;
  targetId: string;
  sideEffect?: GuideStepDefinition["sideEffect"];
}

export type GuideTransition =
  | { ok: true; state: GuideState; completion?: GuideCompletion }
  | { ok: false; state: GuideState; reason: string };

export function createBlankGuideState(): GuideState {
  return {
    version: 1,
    active: null,
    completions: {},
    quickMode: { active: false },
    usedKeys: {},
    rangeLoggedAt: {}
  };
}
