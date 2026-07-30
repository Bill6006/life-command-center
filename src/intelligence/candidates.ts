import type {
  CapacityBudget,
  ForecastContext,
  IntelligenceCandidate,
  MoveOutcomeRecord,
  RankedBottleneck,
  RankedCandidate
} from "./types";
import {
  completionProbability,
  learnedLiftForCandidate
} from "./optimization";

export const INTELLIGENCE_LIBRARY_VERSION = "peak-moves-v1";

export const INTELLIGENCE_CANDIDATES: readonly IntelligenceCandidate[] = [
  {
    id: "safe-driving-protect",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Protect the drive",
    instruction: "Keep the phone down. Revisit the forecast only after a safe stop.",
    family: "driving-safety",
    dedupeGroup: "driving-safety",
    lane: "protect",
    focusDomains: [],
    contexts: ["driving"],
    durationMinutes: 1,
    effort: 1,
    expectedEffect: [0, 4],
    checkWindowMinutes: 15
  },
  {
    id: "qualified-check-in",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Log three true signals",
    instruction: "Name only what is known: energy, focus, and one emotional signal.",
    family: "check-in",
    dedupeGroup: "check-in",
    lane: "protect",
    focusDomains: [],
    contexts: ["home", "work", "public", "outside"],
    durationMinutes: 2,
    effort: 1,
    expectedEffect: [0, 3],
    checkWindowMinutes: 5
  },
  {
    id: "recovery-floor",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Protect the recovery floor",
    instruction: "Reduce the next demand and choose one quiet recovery action.",
    family: "recovery",
    dedupeGroup: "recovery",
    lane: "protect",
    focusDomains: ["recovery", "body-training"],
    contexts: ["home", "work", "public", "outside"],
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [3, 8],
    checkWindowMinutes: 30
  },
  {
    id: "future-ten",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Give the future ten minutes",
    instruction: "Start one concrete future-facing item and stop when the ten-minute block ends.",
    family: "future-focus",
    dedupeGroup: "future-focus",
    lane: "future",
    focusDomains: ["career", "money", "home"],
    contexts: ["home", "work", "public"],
    durationMinutes: 10,
    effort: 2,
    expectedEffect: [4, 10],
    checkWindowMinutes: 30
  },
  {
    id: "deep-future-block",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Use one deep future block",
    instruction: "Protect a single 30-minute block for the confirmed weekly direction.",
    family: "future-focus",
    dedupeGroup: "future-focus",
    lane: "future",
    focusDomains: ["career", "money", "home"],
    contexts: ["home", "work"],
    durationMinutes: 30,
    effort: 4,
    expectedEffect: [8, 15],
    checkWindowMinutes: 60,
    deepFuture: true
  },
  {
    id: "connection-touchpoint",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Make one low-pressure touchpoint",
    instruction: "Offer one present check-in without requiring a long exchange.",
    family: "connection",
    dedupeGroup: "connection",
    lane: "connection",
    focusDomains: ["presence-social"],
    contexts: ["home", "work", "public", "outside"],
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [2, 7],
    checkWindowMinutes: 60
  },
  {
    id: "quiet-faith-reset",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Take a private meaning pause",
    instruction: "Use one brief private practice that reconnects action to meaning.",
    family: "faith",
    dedupeGroup: "faith",
    lane: "connection",
    focusDomains: ["faith-meaning"],
    contexts: ["home", "work", "outside"],
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [2, 6],
    checkWindowMinutes: 30,
    requiresPrivacy: true
  },
  {
    id: "dinner-support",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Protect dinner support",
    instruction: "Choose the simplest available dinner-support action.",
    family: "food-support",
    dedupeGroup: "food-support",
    lane: "protect",
    focusDomains: ["recovery", "body-training"],
    contexts: ["home", "work", "public"],
    notBefore: 15 * 60 + 30,
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [3, 7],
    checkWindowMinutes: 45,
    requiresFoodNeed: true
  },
  {
    id: "tonight-plan",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Make tonight easier",
    instruction: "Remove one obstacle from the evening landing.",
    family: "recovery",
    dedupeGroup: "tonight",
    lane: "protect",
    focusDomains: ["recovery", "home"],
    contexts: ["home", "work"],
    notBefore: 16 * 60,
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [3, 8],
    checkWindowMinutes: 60
  },
  {
    id: "bedtime-protection",
    libraryVersion: INTELLIGENCE_LIBRARY_VERSION,
    title: "Protect the bedtime edge",
    instruction: "Choose the smallest action that makes sleep easier to begin.",
    family: "sleep-protection",
    dedupeGroup: "bedtime",
    lane: "protect",
    focusDomains: ["recovery"],
    contexts: ["home"],
    notBefore: 17 * 60,
    durationMinutes: 5,
    effort: 1,
    expectedEffect: [4, 9],
    checkWindowMinutes: 90
  }
];

function activeConstraint(context: ForecastContext, candidate: IntelligenceCandidate) {
  const now = Date.parse(context.nowIso);
  return context.constraints.some(
    (constraint) =>
      !constraint.undoneAt &&
      Date.parse(constraint.expiresAt) > now &&
      constraint.context === context.place &&
      (constraint.candidateId === candidate.id || constraint.family === candidate.family)
  );
}

function eligibility(
  candidate: IntelligenceCandidate,
  context: ForecastContext,
  capacity: CapacityBudget
) {
  const rejections: string[] = [];
  if (!candidate.contexts.includes(context.place)) rejections.push(`Invalid in ${context.place} context.`);
  if (context.place === "driving" && candidate.id !== "safe-driving-protect") {
    rejections.push("Interactive moves are blocked while driving.");
  }
  if (candidate.notBefore !== undefined && context.minuteOfDay < candidate.notBefore) {
    rejections.push(`Not eligible before ${String(Math.trunc(candidate.notBefore / 60)).padStart(2, "0")}:${String(candidate.notBefore % 60).padStart(2, "0")}.`);
  }
  if (candidate.notAfter !== undefined && context.minuteOfDay > candidate.notAfter) {
    rejections.push("The candidate's time window has passed.");
  }
  if (context.availableMinutes !== null && context.availableMinutes < candidate.durationMinutes) {
    rejections.push("The known available time is too short.");
  }
  if (candidate.requiresPrivacy && context.privacyAvailable === false) rejections.push("Privacy is unavailable.");
  if (candidate.requiresFoodNeed && context.needFood !== true) rejections.push("No qualified food need is present.");
  if (capacity.allowances[candidate.lane] === 0) rejections.push(`The ${candidate.lane} lane has no remaining allowance.`);
  if (context.activeFamilies.includes(candidate.family)) rejections.push("An overlapping family is already active.");
  if (context.completedFamilies.includes(candidate.family)) rejections.push("This action family is already covered.");
  if (context.completedCandidateIds.includes(candidate.id)) rejections.push("This exact move is already complete.");
  if (context.dismissedCandidateIds.includes(candidate.id)) rejections.push("This move was dismissed for the current session.");
  if (activeConstraint(context, candidate)) rejections.push("A current structured constraint blocks this move.");
  if (candidate.deepFuture && new Date(context.nowIso).getDay() === 6) {
    rejections.push("Saturday protects against deep/high Future work.");
  }
  return rejections;
}

export function rankIntelligenceCandidates(
  context: ForecastContext,
  capacity: CapacityBudget,
  bottlenecks: readonly RankedBottleneck[],
  outcomes: readonly MoveOutcomeRecord[] = []
): RankedCandidate[] {
  const primary = bottlenecks[0];
  const urgentProtect = capacity.urgentProtect || Boolean(primary?.urgent);
  return INTELLIGENCE_CANDIDATES.map((candidate) => {
    const rejections = eligibility(candidate, context, capacity);
    const familyFit = primary?.actionFamilies.includes(candidate.family) ? 18 : 0;
    const weeklyAlignment =
      candidate.lane === "future" &&
      context.weeklyFocus &&
      candidate.focusDomains.includes(context.weeklyFocus)
        ? 10
        : 0;
    const urgency = urgentProtect
      ? candidate.lane === "protect"
        ? 35
        : -45
      : 0;
    const candidateOutcomes = outcomes.filter((record) => record.candidateId === candidate.id);
    const completion = completionProbability(
      candidateOutcomes,
      candidate.effort,
      candidate.durationMinutes
    );
    const observedLift = learnedLiftForCandidate(context, candidate.id, candidateOutcomes);
    const priorMidpoint = (candidate.expectedEffect[0] + candidate.expectedEffect[1]) / 2;
    const learnedComponent = observedLift === null ? 0 : observedLift * 0.35;
    const cost = candidate.effort * 2 + candidate.durationMinutes * 0.12;
    const contextFit = candidate.contexts.includes(context.place) ? 8 : 0;
    const realisticNet =
      (priorMidpoint + learnedComponent - cost) * completion + contextFit + weeklyAlignment + urgency + familyFit;
    return {
      ...candidate,
      eligible: rejections.length === 0,
      score: Number((rejections.length ? -1000 - rejections.length : realisticNet).toFixed(3)),
      completionProbability: completion,
      predictedEffect: candidate.expectedEffect,
      observedLift,
      reasons: [
        familyFit ? `Matches the primary ${primary.label.toLowerCase()} bottleneck.` : "No primary-bottleneck bonus.",
        weeklyAlignment
          ? "Matches the user-confirmed Weekly Focus in the Future lane."
          : "Weekly Focus did not alter this lane.",
        urgentProtect
          ? candidate.lane === "protect"
            ? "Urgent protection receives priority."
            : "Urgent protection outranks Future alignment."
          : "No urgent protection override was needed.",
        `Realistic completion estimate: ${Math.round(completion * 100)}%.`,
        observedLift === null
          ? "No qualified observed outcome is claimed."
          : `Qualified observed lift: ${observedLift}.`
      ],
      rejections,
      tieBreak: candidate.id
    };
  }).sort(
    (left, right) =>
      Number(right.eligible) - Number(left.eligible) ||
      right.score - left.score ||
      left.tieBreak.localeCompare(right.tieBreak)
  );
}
