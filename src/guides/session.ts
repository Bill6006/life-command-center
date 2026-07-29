import { cloneState, isUnknownRecord } from "../state/model";
import { effectiveDateKey, weekKey } from "./time";
import type {
  GuideClockContext,
  GuideCompletion,
  GuideFamily,
  GuideSession,
  GuideState,
  GuideStepDefinition,
  GuideTransition
} from "./types";
import { createBlankGuideState } from "./types";

function sessionKey(family: GuideFamily, context: GuideClockContext): string {
  return family === "weekly"
    ? weekKey(context.now, context.timeZone)
    : effectiveDateKey(context);
}

function copy(state: GuideState): GuideState {
  return cloneState(state);
}

function routeFields(step: GuideStepDefinition) {
  return { activeTab: step.tab, targetId: step.targetId };
}

export function startGuide(
  state: GuideState,
  family: GuideFamily,
  steps: readonly GuideStepDefinition[],
  context: GuideClockContext,
  manualOverride = false
): GuideTransition {
  if (state.quickMode.active) {
    return {
      ok: false,
      state,
      reason: "Stop Quick Mode before starting a guide."
    };
  }
  if (state.active) {
    return { ok: false, state, reason: "Stop the active guide before starting another." };
  }
  if (steps.length === 0) return { ok: false, state, reason: "No guide steps are available." };
  const next = copy(state);
  const now = context.now.toISOString();
  const key = sessionKey(family, context);
  next.active = {
    id: `${family}:${key}:${context.now.getTime()}`,
    family,
    effectiveKey: key,
    sourcePeriod: steps[0].sourcePeriod,
    stepIds: steps.map((step) => step.id),
    stepIndex: 0,
    startedAt: now,
    updatedAt: now,
    manualOverride,
    ...routeFields(steps[0]),
    completedEvidence: {},
    skippedStepIds: []
  };
  next.usedKeys[family] = key;
  if (family === "missed-morning") next.usedKeys.morning = key;
  return { ok: true, state: next };
}

export function startQuickMode(state: GuideState, now: Date): GuideTransition {
  if (state.active) {
    return {
      ok: false,
      state,
      reason: "A guide is active. Stop it before starting Quick Mode."
    };
  }
  const next = copy(state);
  next.quickMode = { active: true, startedAt: now.toISOString() };
  return { ok: true, state: next };
}

export function stopQuickMode(state: GuideState): GuideTransition {
  const next = copy(state);
  next.quickMode = { active: false };
  return { ok: true, state: next };
}

export function stopGuide(state: GuideState): GuideTransition {
  const next = copy(state);
  next.active = null;
  return { ok: true, state: next };
}

function advance(
  state: GuideState,
  steps: ReadonlyMap<string, GuideStepDefinition>,
  now: Date,
  evidenceId?: string,
  skipped = false
): GuideTransition {
  if (!state.active) return { ok: false, state, reason: "No guide is active." };
  const next = copy(state);
  const active = next.active!;
  const currentId = active.stepIds[active.stepIndex];
  if (evidenceId) active.completedEvidence[currentId] = evidenceId;
  if (skipped) active.skippedStepIds.push(currentId);
  active.updatedAt = now.toISOString();
  if (active.stepIndex >= active.stepIds.length - 1) {
    const completion: GuideCompletion = {
      key: active.effectiveKey,
      completedAt: now.toISOString()
    };
    next.completions[active.family] = completion;
    if (active.family === "missed-morning") next.completions.morning = completion;
    next.active = null;
    return { ok: true, state: next, completion };
  }
  active.stepIndex += 1;
  const step = steps.get(active.stepIds[active.stepIndex]);
  if (!step) return { ok: false, state, reason: "The next guide target is unavailable." };
  Object.assign(active, routeFields(step));
  return { ok: true, state: next };
}

export function completeCurrentStep(
  state: GuideState,
  steps: ReadonlyMap<string, GuideStepDefinition>,
  now: Date,
  evidenceId = "explicit"
): GuideTransition {
  return advance(state, steps, now, evidenceId);
}

export function skipCurrentStep(
  state: GuideState,
  steps: ReadonlyMap<string, GuideStepDefinition>,
  now: Date
): GuideTransition {
  return advance(state, steps, now, undefined, true);
}

export function reconcileRecoveredGuideState(
  state: GuideState,
  context: GuideClockContext
): GuideState {
  const next = copy(state);
  const active = next.active;
  if (!active) return next;
  const currentKey = active.family === "weekly" ? weekKey(context.now, context.timeZone) : effectiveDateKey(context);
  const completion = next.completions[active.family];
  if (
    (completion?.key === active.effectiveKey &&
      Date.parse(completion.completedAt) >= Date.parse(active.startedAt)) ||
    (!active.manualOverride && active.effectiveKey !== currentKey)
  ) {
    next.active = null;
  }
  return next;
}

export function clearStaleTimeframe(
  state: GuideState,
  period: GuideSession["sourcePeriod"]
): GuideState {
  if (!state.active || state.active.manualOverride || state.active.sourcePeriod === period) {
    return state;
  }
  const next = copy(state);
  next.active = null;
  return next;
}

export function parseGuideState(value: unknown): GuideState {
  const blank = createBlankGuideState();
  if (!isUnknownRecord(value)) return blank;
  const candidate = value as Partial<GuideState>;
  return {
    version: 1,
    active:
      candidate.active &&
      isUnknownRecord(candidate.active) &&
      typeof candidate.active.id === "string" &&
      Array.isArray(candidate.active.stepIds)
        ? (cloneState(candidate.active) as GuideSession)
        : null,
    completions: isUnknownRecord(candidate.completions)
      ? cloneState(candidate.completions as GuideState["completions"])
      : {},
    quickMode:
      isUnknownRecord(candidate.quickMode) && typeof candidate.quickMode.active === "boolean"
        ? cloneState(candidate.quickMode as GuideState["quickMode"])
        : { active: false },
    usedKeys: isUnknownRecord(candidate.usedKeys)
      ? cloneState(candidate.usedKeys as GuideState["usedKeys"])
      : {},
    rangeLoggedAt: isUnknownRecord(candidate.rangeLoggedAt)
      ? cloneState(candidate.rangeLoggedAt as GuideState["rangeLoggedAt"])
      : {}
  };
}
