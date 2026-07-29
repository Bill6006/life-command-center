import { effectiveDateKey, guidePeriodAt, minutesSince, weekKey, weeklyWindow } from "./time";
import type {
  EligibilityResult,
  FollowUpStatus,
  GuideClockContext,
  GuideFamily,
  GuideState,
  MainGuideFamily,
  PrivateFollowUp
} from "./types";

function completionMatches(state: GuideState, family: GuideFamily, key: string): boolean {
  return state.completions[family]?.key === key;
}

export function mainGuideEligibility(
  family: MainGuideFamily,
  state: GuideState,
  context: GuideClockContext
): EligibilityResult {
  const key = effectiveDateKey(context);
  if (guidePeriodAt(context.now, context.timeZone) !== family) {
    return { eligible: false, reason: "Outside this guide period.", key };
  }
  if (completionMatches(state, family, key)) {
    return { eligible: false, reason: "This period guide is complete.", key };
  }
  if (state.active?.family === family && state.active.effectiveKey === key) {
    return { eligible: false, reason: "This guide is already active.", key };
  }
  return { eligible: true, reason: "Current period guide is due.", key };
}

export function missedMorningEligibility(
  state: GuideState,
  context: GuideClockContext
): EligibilityResult {
  const key = effectiveDateKey(context);
  if (guidePeriodAt(context.now, context.timeZone) === "morning") {
    return { eligible: false, reason: "Morning has not passed.", key };
  }
  if (state.active?.sourcePeriod === "morning") {
    return { eligible: false, reason: "A morning guide is active.", key };
  }
  if (
    completionMatches(state, "morning", key) ||
    completionMatches(state, "missed-morning", key) ||
    state.usedKeys.morning === key ||
    state.usedKeys["missed-morning"] === key
  ) {
    return { eligible: false, reason: "Morning guide was already used.", key };
  }
  return { eligible: true, reason: "Morning was missed and catch-up is available.", key };
}

export function weeklyGuideEligibility(
  state: GuideState,
  context: GuideClockContext
): EligibilityResult {
  const key = weekKey(context.now, context.timeZone);
  if (!weeklyWindow(context.now, context.timeZone)) {
    return { eligible: false, reason: "Outside the weekly guide window.", key };
  }
  if (completionMatches(state, "weekly", key)) {
    return { eligible: false, reason: "This week is complete.", key };
  }
  return { eligible: true, reason: "Weekly guide is due.", key };
}

export function smartCheckInEligibility(
  state: GuideState,
  context: GuideClockContext
): EligibilityResult {
  const period = guidePeriodAt(context.now, context.timeZone);
  const key = effectiveDateKey(context);
  const completion = state.completions[period];
  if (completion?.key !== key) {
    return { eligible: false, reason: "Complete this period's full guide first.", key };
  }
  if (minutesSince(completion.completedAt, context.now) < 60) {
    return { eligible: false, reason: "Smart Check-In unlocks 60 minutes after completion.", key };
  }
  if (minutesSince(state.rangeLoggedAt[period], context.now) < 60) {
    return { eligible: false, reason: "The current range was refreshed less than 60 minutes ago.", key };
  }
  return { eligible: true, reason: "A focused refresh is available.", key };
}

export function followUpStatus(followUp: PrivateFollowUp | undefined, now: Date): FollowUpStatus {
  if (!followUp) return "complete";
  if (followUp.completedAt) return "complete";
  const current = now.getTime();
  if (current >= Date.parse(followUp.staleAt)) return "stale";
  if (followUp.startedAt) return "held";
  if (current >= Date.parse(followUp.lateAt)) return "late";
  if (current >= Date.parse(followUp.dueAt)) return "due";
  return "not-due";
}

export function suggestedGuide(
  state: GuideState,
  context: GuideClockContext
): MainGuideFamily | "missed-morning" {
  const period = guidePeriodAt(context.now, context.timeZone);
  if (mainGuideEligibility(period, state, context).eligible) return period;
  if (missedMorningEligibility(state, context).eligible) return "missed-morning";
  return period;
}
