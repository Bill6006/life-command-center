import { readinessBand } from "./score";
import type {
  CurrentContext,
  MoveCandidate,
  SessionConstraint,
  TodayCommand,
  TodayState
} from "./types";

export const MOVE_LIBRARY_VERSION = "today-moves-v1";

export const MOVE_LIBRARY: readonly MoveCandidate[] = [
  {
    id: "safe-driving-reset",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Protect the drive",
    instruction: "Keep the phone down. At the next safe stop, name only the next destination.",
    family: "driving-safety",
    dedupeGroup: "driving-safety",
    lane: "protect",
    contexts: ["driving"],
    durationMinutes: 1,
    expectedEffect: "Reduce decision load without adding distraction.",
    checkWindowMinutes: 15,
    why: "Driving context makes every interactive command ineligible."
  },
  {
    id: "one-future-block",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Move one future task",
    instruction: "Choose one concrete work item and give it a focused ten-minute start.",
    family: "future-focus",
    dedupeGroup: "future-focus",
    lane: "future",
    contexts: ["home", "work", "public"],
    durationMinutes: 10,
    expectedEffect: "Lower mission drift and create visible forward motion.",
    checkWindowMinutes: 30,
    why: "A bounded start fits without turning the day into a checklist."
  },
  {
    id: "environment-reset",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Clear one friction point",
    instruction: "Reset one visible surface that is making the next action harder.",
    family: "environment",
    dedupeGroup: "environment",
    lane: "protect",
    contexts: ["home", "work"],
    durationMinutes: 5,
    expectedEffect: "Reduce environmental friction.",
    checkWindowMinutes: 20,
    why: "One physical reset can make the next command easier to start."
  },
  {
    id: "presence-touchpoint",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Make one human touchpoint",
    instruction: "Offer one present, low-pressure check-in to someone who matters.",
    family: "connection",
    dedupeGroup: "connection",
    lane: "connection",
    contexts: ["home", "work", "public", "outside"],
    durationMinutes: 5,
    expectedEffect: "Protect connection without creating social pressure.",
    checkWindowMinutes: 60,
    why: "Connection is a distinct lane, not a productivity reward."
  },
  {
    id: "readiness-ladder",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Use the readiness ladder",
    instruction: "Choose recovery, micro, starter, or planned movement. Fitbod owns exact programming.",
    family: "movement-readiness",
    dedupeGroup: "movement-readiness",
    lane: "protect",
    contexts: ["home", "work", "public", "outside"],
    durationMinutes: 10,
    expectedEffect: "Match movement level to current readiness.",
    checkWindowMinutes: 45,
    why: "The app owns readiness and level; it does not duplicate exercise prescription.",
    isMovementReadiness: true
  },
  {
    id: "outside-reset",
    libraryVersion: MOVE_LIBRARY_VERSION,
    title: "Take a quiet outside reset",
    instruction: "Pause, notice three physical details, and choose the next safe direction.",
    family: "nervous-system",
    dedupeGroup: "nervous-system",
    lane: "protect",
    contexts: ["outside", "public"],
    durationMinutes: 3,
    expectedEffect: "Lower immediate nervous-system load.",
    checkWindowMinutes: 20,
    why: "The current setting supports a short non-screen reset."
  }
];

function activeConstraint(
  candidate: MoveCandidate,
  context: CurrentContext,
  constraints: readonly SessionConstraint[],
  now: Date
) {
  return constraints.some(
    (constraint) =>
      !constraint.undoneAt &&
      Date.parse(constraint.expiresAt) > now.getTime() &&
      (constraint.candidateId === candidate.id || constraint.family === candidate.family) &&
      constraint.context === context
  );
}

export function rankMoveCandidates(today: TodayState, now = new Date()): MoveCandidate[] {
  const band = readinessBand(today);
  return MOVE_LIBRARY.filter(
    (candidate) =>
      candidate.contexts.includes(today.context) &&
      !today.dismissedCandidateIds.includes(candidate.id) &&
      !activeConstraint(candidate, today.context, today.constraints, now)
  ).sort((left, right) => {
    const score = (candidate: MoveCandidate) => {
      if (today.context === "driving") return candidate.id === "safe-driving-reset" ? 100 : 0;
      let value = candidate.lane === "protect" && band === "low" ? 30 : 0;
      if (candidate.lane === "future" && band !== "low") value += 22;
      if (candidate.id === "environment-reset" && today.context === "home") value += 18;
      if (candidate.id === "one-future-block" && today.context === "work") value += 20;
      if (candidate.id === "outside-reset" && today.context === "outside") value += 20;
      if (candidate.lane === "connection") value += 8;
      value -= candidate.durationMinutes / 10;
      return value;
    };
    return score(right) - score(left) || left.id.localeCompare(right.id);
  });
}

export function buildTodayCommand(today: TodayState, now = new Date()): TodayCommand {
  const candidates = rankMoveCandidates(today, now);
  const candidate = candidates[0] ?? MOVE_LIBRARY.find((move) => move.id === "presence-touchpoint")!;
  const band = readinessBand(today);
  const scoreKnown = today.evidence.energy.value !== null || today.evidence.emotional.value !== null;
  const limiter =
    today.context === "driving"
      ? "Safe attention"
      : band === "low"
        ? "Current capacity"
        : today.context === "home"
          ? "Environmental friction"
          : "Mission drift";
  return {
    candidateId: candidate.id,
    title: candidate.title,
    instruction: candidate.instruction,
    readinessBand: ["low", "steady", "strong", "unknown"].includes(band)
      ? (band as TodayCommand["readinessBand"])
      : "unknown",
    confidence: scoreKnown ? "medium" : "low",
    mainLimiter: limiter,
    bestNextFix: candidate.title,
    expectedEffect: candidate.expectedEffect,
    checkWindowMinutes: candidate.checkWindowMinutes,
    lane: candidate.lane,
    reasons: [
      candidate.why,
      scoreKnown
        ? `Readiness evidence currently maps to ${band}.`
        : "Readiness evidence is incomplete, so the command stays conservative.",
      `Current context is ${today.context}.`
    ],
    safetyNote:
      today.context === "driving"
        ? "Do not interact with this screen while the vehicle is moving."
        : undefined
  };
}
