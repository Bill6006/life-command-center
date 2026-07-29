import type {
  MinimumWin,
  MinimumWinPlan,
  MoveRecord,
  TodayState
} from "./types";

export const MINIMUM_WIN_LIBRARY_VERSION = "minimum-wins-v1";

function win(
  id: string,
  title: string,
  detail: string,
  family: string,
  lane: MinimumWin["lane"],
  tier: MinimumWin["tier"]
): MinimumWin {
  return {
    id,
    libraryVersion: MINIMUM_WIN_LIBRARY_VERSION,
    title,
    detail,
    family,
    lane,
    tier,
    status: "open"
  };
}

export function buildMinimumWinPlan(
  today: TodayState,
  dateKey: string,
  now = new Date()
): MinimumWinPlan {
  const lowBody =
    today.evidence.energy.value === 0 ||
    today.evidence.health.value === 0 ||
    today.evidence.emotional.value === 0;
  const body = lowBody
    ? win(
        "recovery-floor",
        "Protect the body floor",
        "Choose one recovery-supporting action; exact exercise programming remains in Fitbod.",
        "recovery",
        "protect",
        "floor"
      )
    : win(
        "readiness-baseline",
        "Honor the readiness baseline",
        "Use the recovery, micro, starter, or planned movement ladder once.",
        "movement-readiness",
        "protect",
        "standard"
      );
  const future =
    today.evidence.emotional.value === 0
      ? win(
          "support-stability",
          "Stabilize one support point",
          "Remove one avoidable source of friction before asking for more output.",
          "support",
          "future",
          "floor"
        )
      : win(
          "future-proof",
          "Create one future proof point",
          "Advance one concrete career, learning, or money artifact.",
          "future-proof",
          "future",
          "needle"
        );
  const relationship = win(
    "relationship-presence",
    "Make one present connection",
    "Complete one deliberate, low-pressure relationship touchpoint.",
    "connection",
    "connection",
    "standard"
  );
  return {
    id: `${dateKey}:${MINIMUM_WIN_LIBRARY_VERSION}`,
    dateKey,
    libraryVersion: MINIMUM_WIN_LIBRARY_VERSION,
    generatedAt: now.toISOString(),
    wins: [body, future, relationship]
  };
}

export function ensureMinimumWinPlan(
  today: TodayState,
  dateKey: string,
  now = new Date()
): MinimumWinPlan {
  return (
    [...today.minimumWinPlans].reverse().find((plan) => plan.dateKey === dateKey) ??
    buildMinimumWinPlan(today, dateKey, now)
  );
}

export function updateMinimumWin(
  plan: MinimumWinPlan,
  winId: string,
  status: "manual-done" | "open",
  now = new Date()
): MinimumWinPlan {
  return {
    ...plan,
    wins: plan.wins.map((item) =>
      item.id === winId
        ? {
            ...item,
            status,
            completedAt: status === "manual-done" ? now.toISOString() : undefined,
            proofSource: status === "manual-done" ? "manual confirmation" : undefined,
            coveredByMoveId: undefined
          }
        : item
    ) as MinimumWinPlan["wins"]
  };
}

export function coverMinimumWinsFromMove(
  plan: MinimumWinPlan,
  move: MoveRecord
): MinimumWinPlan {
  if (move.status !== "completed") return plan;
  return {
    ...plan,
    wins: plan.wins.map((item) =>
      item.status === "open" && item.family === move.family
        ? {
            ...item,
            status: "covered",
            coveredByMoveId: move.id,
            proofSource: `completed command: ${move.title}`,
            completedAt: move.completedAt
          }
        : item
    ) as MinimumWinPlan["wins"]
  };
}

export function removeMoveCoverage(plan: MinimumWinPlan, moveId: string): MinimumWinPlan {
  return {
    ...plan,
    wins: plan.wins.map((item) =>
      item.status === "covered" && item.coveredByMoveId === moveId
        ? {
            ...item,
            status: "open",
            coveredByMoveId: undefined,
            proofSource: undefined,
            completedAt: undefined
          }
        : item
    ) as MinimumWinPlan["wins"]
  };
}

export function pivotMinimumWin(
  plan: MinimumWinPlan,
  winId: string,
  replacement: MinimumWin
): MinimumWinPlan {
  return {
    ...plan,
    wins: plan.wins.map((item) =>
      item.id === winId ? { ...replacement, status: "pivoted", previousId: item.id } : item
    ) as MinimumWinPlan["wins"]
  };
}
