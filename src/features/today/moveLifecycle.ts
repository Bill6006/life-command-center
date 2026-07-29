import { cloneState } from "../../state/model";
import { guidePeriodAt } from "../../guides/time";
import { MOVE_LIBRARY, rankMoveCandidates } from "./command";
import type {
  ConstraintReason,
  CurrentContext,
  MoveCandidate,
  MoveRecord,
  SessionConstraint,
  TodayState
} from "./types";

function candidateById(candidateId: string): MoveCandidate {
  const candidate = MOVE_LIBRARY.find((item) => item.id === candidateId);
  if (!candidate) throw new Error(`Unknown move candidate: ${candidateId}`);
  return candidate;
}

export function startMove(
  today: TodayState,
  candidateId: string,
  now = new Date()
): TodayState {
  if (today.activeMove && ["started", "paused"].includes(today.activeMove.status)) {
    throw new Error("Only one move may be active.");
  }
  const candidate = candidateById(candidateId);
  if (!candidate.contexts.includes(today.context)) {
    throw new Error("This move does not fit the current context.");
  }
  const next = cloneState(today);
  next.activeMove = {
    id: `${candidate.id}:${now.getTime()}`,
    candidateId: candidate.id,
    family: candidate.family,
    lane: candidate.lane,
    title: candidate.title,
    context: today.context,
    status: "started",
    startedAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  return next;
}

export function pauseMove(today: TodayState, now = new Date()): TodayState {
  if (!today.activeMove || today.activeMove.status !== "started") return today;
  const next = cloneState(today);
  next.activeMove!.status = "paused";
  next.activeMove!.pausedAt = now.toISOString();
  next.activeMove!.updatedAt = now.toISOString();
  return next;
}

export function resumeMove(today: TodayState, now = new Date()): TodayState {
  if (!today.activeMove || today.activeMove.status !== "paused") return today;
  const next = cloneState(today);
  next.activeMove!.status = "started";
  next.activeMove!.pausedAt = undefined;
  next.activeMove!.updatedAt = now.toISOString();
  return next;
}

export function completeMove(
  today: TodayState,
  now: Date,
  timeZone: string
): TodayState {
  if (!today.activeMove || !["started", "paused"].includes(today.activeMove.status)) return today;
  const next = cloneState(today);
  const active = next.activeMove!;
  active.status = "completed";
  active.completedAt = now.toISOString();
  active.updatedAt = now.toISOString();
  active.displayLockPeriod = guidePeriodAt(now, timeZone);
  active.followUp = {
    moveId: active.id,
    dueAt: new Date(now.getTime() + 60 * 60_000).toISOString(),
    status: "pending"
  };
  return next;
}

export function undoCompletedMove(today: TodayState, now = new Date()): TodayState {
  if (!today.activeMove || today.activeMove.status !== "completed") return today;
  const next = cloneState(today);
  const active = next.activeMove!;
  active.status = "started";
  active.completedAt = undefined;
  active.displayLockPeriod = undefined;
  active.followUp = undefined;
  active.updatedAt = now.toISOString();
  return next;
}

export function cantNow(
  today: TodayState,
  reason: ConstraintReason,
  note: string,
  now = new Date(),
  durationMinutes = 120
): TodayState {
  if (!today.activeMove) return today;
  const next = cloneState(today);
  const active = next.activeMove!;
  active.status = "dismissed";
  active.dismissedAt = now.toISOString();
  active.dismissalReason = reason;
  active.updatedAt = now.toISOString();
  next.moveHistory.push(active);
  next.dismissedCandidateIds.push(active.candidateId);
  const constraint: SessionConstraint = {
    id: `constraint:${active.candidateId}:${now.getTime()}`,
    candidateId: active.candidateId,
    family: active.family,
    reason,
    note: note.trim() || undefined,
    context: today.context,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + durationMinutes * 60_000).toISOString()
  };
  next.constraints.push(constraint);
  next.activeMove = null;
  return next;
}

export function tryAnother(today: TodayState, now = new Date()): TodayState {
  const next = cloneState(today);
  if (next.activeMove) {
    const active = next.activeMove;
    active.status = "dismissed";
    active.dismissedAt = now.toISOString();
    active.dismissalReason = "try-another";
    active.updatedAt = now.toISOString();
    next.moveHistory.push(active);
    next.dismissedCandidateIds.push(active.candidateId);
    next.activeMove = null;
  }
  const candidate = rankMoveCandidates(next, now)[0];
  return candidate ? startMove(next, candidate.id, now) : next;
}

export function undoConstraint(
  today: TodayState,
  constraintId: string,
  now = new Date()
): TodayState {
  const next = cloneState(today);
  const constraint = next.constraints.find((item) => item.id === constraintId);
  if (constraint) constraint.undoneAt = now.toISOString();
  if (constraint) {
    next.dismissedCandidateIds = next.dismissedCandidateIds.filter(
      (candidateId) => candidateId !== constraint.candidateId
    );
  }
  return next;
}

export function releaseCompletedMoveForPeriod(
  today: TodayState,
  now: Date,
  timeZone: string
): TodayState {
  const active = today.activeMove;
  if (
    !active ||
    active.status !== "completed" ||
    active.displayLockPeriod === guidePeriodAt(now, timeZone)
  ) {
    return today;
  }
  const next = cloneState(today);
  next.moveHistory.push(next.activeMove!);
  next.activeMove = null;
  return next;
}

export function recordEffectFollowUp(
  today: TodayState,
  after: Record<string, number>,
  now = new Date()
): TodayState {
  const followUp = today.activeMove?.followUp;
  if (!followUp || followUp.status !== "pending" || now < new Date(followUp.dueAt)) return today;
  const next = cloneState(today);
  const target = next.activeMove!.followUp!;
  target.after = after;
  const values = Object.values(after).filter(Number.isFinite);
  target.observedChange =
    values.length > 0 ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  target.status = "complete";
  target.completedAt = now.toISOString();
  return next;
}
