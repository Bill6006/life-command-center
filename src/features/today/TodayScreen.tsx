import { useCallback, useEffect, useMemo, useState } from "react";
import { useDialogFocus } from "../../accessibility/useDialogFocus";
import { GuideTarget } from "../../guides/GuideExperience";
import type { useGuideRuntime } from "../../guides/useGuideRuntime";
import type { DayRecord } from "../../state/model";
import { EnvironmentPanel } from "../domains";
import { buildTodayCommand } from "./command";
import {
  coverMinimumWinsFromMove,
  ensureMinimumWinPlan,
  removeMoveCoverage,
  updateMinimumWin
} from "./minimumWins";
import {
  cantNow,
  completeMove,
  pauseMove,
  recordEffectFollowUp,
  resumeMove,
  startMove,
  tryAnother,
  undoCompletedMove
} from "./moveLifecycle";
import { calculateTodayScore } from "./score";
import {
  parseTodayState,
  TODAY_CATEGORIES,
  type ConstraintReason,
  type CurrentContext,
  type MinimumWinPlan,
  type TodayCategory,
  type TodayState
} from "./types";

type Runtime = ReturnType<typeof useGuideRuntime>;

const CATEGORY_LABELS: Record<TodayCategory, string> = {
  energy: "Energy",
  career: "Career",
  money: "Money",
  fatherhood: "Fatherhood",
  health: "Health",
  social: "Social / love",
  home: "Home reset",
  emotional: "Emotional control"
};

const CONTEXT_LABELS: Record<CurrentContext, string> = {
  home: "At home",
  work: "At work",
  driving: "Driving",
  public: "In public",
  outside: "Outside"
};

const REASON_LABELS: Record<ConstraintReason, string> = {
  "not-enough-time": "Not enough time right now",
  "wrong-place": "This is the wrong place",
  "need-privacy": "I need privacy",
  "need-food-water": "I need food or water first",
  driving: "I am driving",
  depleted: "My capacity is too low",
  other: "Something else"
};

function dayToday(runtime: Runtime): TodayState {
  return parseTodayState(runtime.rootState.days[runtime.effectiveDate]?.today);
}

function currentPlan(today: TodayState, dateKey: string): MinimumWinPlan {
  return ensureMinimumWinPlan(today, dateKey);
}

export function TodayScreen({ runtime }: { runtime: Runtime }) {
  const today = dayToday(runtime);
  const score = calculateTodayScore(today);
  const command = buildTodayCommand(today);
  const plan = currentPlan(today, runtime.effectiveDate);
  const [reasonSheetOpen, setReasonSheetOpen] = useState(false);
  const [reason, setReason] = useState<ConstraintReason>("not-enough-time");
  const [reasonNote, setReasonNote] = useState("");
  const closeReasonSheet = useCallback(() => setReasonSheetOpen(false), []);
  const reasonDialogRef = useDialogFocus<HTMLElement>(
    reasonSheetOpen,
    closeReasonSheet
  );

  const writeToday = (mutation: (draft: TodayState) => TodayState | void) => {
    runtime.mutateRoot((state) => {
      const existingDay = state.days[runtime.effectiveDate] ?? {};
      const draft = parseTodayState(existingDay.today);
      const result = mutation(draft) ?? draft;
      const timestamp = new Date().toISOString();
      const nextDay: DayRecord = {
        ...existingDay,
        today: result,
        _inputUpdatedAt: timestamp,
        _updatedAt: timestamp
      };
      state.days[runtime.effectiveDate] = nextDay;
    });
  };

  useEffect(() => {
    if (today.minimumWinPlans.some((item) => item.dateKey === runtime.effectiveDate)) return;
    writeToday((draft) => {
      if (!draft.minimumWinPlans.some((item) => item.dateKey === runtime.effectiveDate)) {
        draft.minimumWinPlans.push(ensureMinimumWinPlan(draft, runtime.effectiveDate));
      }
    });
  }, [runtime.effectiveDate]);

  const evidenceSummary = useMemo(
    () =>
      TODAY_CATEGORIES.map((category) => today.evidence[category])
        .filter((entry) => entry.value !== null)
        .map((entry) => entry.value),
    [today.evidence]
  );

  const setEvidence = (category: TodayCategory, value: 0 | 1 | 2 | null) => {
    writeToday((draft) => {
      draft.evidence[category] = {
        value,
        state: value === null ? "unknown" : "logged",
        updatedAt: new Date().toISOString()
      };
    });
  };

  const setContext = (context: CurrentContext) => {
    writeToday((draft) => {
      draft.context = context;
      draft.dismissedCandidateIds = [];
    });
  };

  const tryThis = () => {
    writeToday((draft) => startMove(draft, command.candidateId, new Date()));
  };

  const saveCantNow = () => {
    writeToday((draft) => {
      const started = draft.activeMove
        ? draft
        : startMove(draft, command.candidateId, new Date());
      return cantNow(started, reason, reasonNote, new Date());
    });
    setReasonSheetOpen(false);
    setReasonNote("");
  };

  const setPlan = (draft: TodayState, nextPlan: MinimumWinPlan) => {
    const index = draft.minimumWinPlans.findIndex((item) => item.id === nextPlan.id);
    if (index >= 0) draft.minimumWinPlans[index] = nextPlan;
    else draft.minimumWinPlans.push(nextPlan);
  };

  const active = today.activeMove;
  const followUpDue =
    active?.followUp?.status === "pending" &&
    Date.parse(active.followUp.dueAt) <= Date.now();

  return (
    <section className="today-command-screen" aria-labelledby="today-command-title">
      <div className="today-hero">
        <div
          className="today-score"
          data-qualified={score.qualification}
          role="status"
          aria-label="Today Score"
        >
          <span>Today Score</span>
          <strong>{score.display ? score.score : "—"}</strong>
          <small>{score.display ? "of 16" : "One signal needed"}</small>
        </div>
        <div className="today-command-copy">
          <span className="eyebrow">Today Command · {command.readinessBand} readiness</span>
          <h1 id="today-command-title">{command.title}</h1>
          <p>{command.instruction}</p>
          <div className="command-metadata">
            <span>
              <small>Main limiter</small>
              <strong>{command.mainLimiter}</strong>
            </span>
            <span>
              <small>Expected effect</small>
              <strong>{command.expectedEffect}</strong>
            </span>
            <span>
              <small>Check window</small>
              <strong>{command.checkWindowMinutes} min</strong>
            </span>
          </div>
          {command.safetyNote && <div className="driving-safety">{command.safetyNote}</div>}
          <div className="today-command-actions">
            {!active && (
              <button
                className="button button-primary"
                type="button"
                disabled={today.context === "driving"}
                onClick={tryThis}
              >
                {today.context === "driving" ? "Park to update" : "Try this"}
              </button>
            )}
            <button className="button button-secondary" type="button" onClick={() => setReasonSheetOpen(true)}>
              Can&apos;t now
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => writeToday((draft) => tryAnother(draft, new Date()))}
            >
              Try another
            </button>
          </div>
          <details className="why-command">
            <summary>Why this command</summary>
            <ul>
              {command.reasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {active && (
        <article className="active-move-card" data-status={active.status}>
          <div>
            <span className="eyebrow">Active move · {active.status}</span>
            <h2>{active.title}</h2>
            <p>
              Started in {CONTEXT_LABELS[active.context].toLowerCase()}. Feasibility feedback stays
              separate from effectiveness.
            </p>
          </div>
          <div className="active-move-actions">
            {active.status === "started" && (
              <>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() =>
                    writeToday((draft) => {
                      const completed = completeMove(
                        draft,
                        new Date(),
                        runtime.rootState.settings.timeZone
                      );
                      if (completed.activeMove?.status === "completed") {
                        const existing = currentPlan(completed, runtime.effectiveDate);
                        setPlan(
                          completed,
                          coverMinimumWinsFromMove(existing, completed.activeMove)
                        );
                      }
                      return completed;
                    })
                  }
                >
                  Done
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => writeToday((draft) => pauseMove(draft, new Date()))}
                >
                  Pause here
                </button>
              </>
            )}
            {active.status === "paused" && (
              <button
                className="button button-primary"
                type="button"
                onClick={() => writeToday((draft) => resumeMove(draft, new Date()))}
              >
                Resume
              </button>
            )}
            {active.status === "completed" && (
              <>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    writeToday((draft) => {
                      const moveId = draft.activeMove?.id;
                      const undone = undoCompletedMove(draft, new Date());
                      if (moveId) {
                        const existing = currentPlan(undone, runtime.effectiveDate);
                        setPlan(undone, removeMoveCoverage(existing, moveId));
                      }
                      return undone;
                    });
                  }}
                >
                  Undo
                </button>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => writeToday((draft) => tryAnother(draft, new Date()))}
                >
                  Another after completion
                </button>
              </>
            )}
          </div>
          {active.followUp && (
            <div className="effect-follow-up">
              <strong>What changed after the move?</strong>
              {followUpDue ? (
                <div>
                  {[
                    ["Harder", -1],
                    ["Same", 0],
                    ["Better", 1]
                  ].map(([label, value]) => (
                    <button
                      type="button"
                      className="text-button"
                      key={label}
                      onClick={() =>
                        writeToday((draft) =>
                          recordEffectFollowUp(draft, { overall: Number(value) }, new Date())
                        )
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : (
                <span>Effect check opens after the {command.checkWindowMinutes}-minute window.</span>
              )}
            </div>
          )}
        </article>
      )}

      <div className="today-grid">
        <article className="life-checks-card" id="guide-target-core-state" tabIndex={-1}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">Life Checks</span>
              <h2>Log what is known. Leave the rest unknown.</h2>
            </div>
            <span>{evidenceSummary.length} / 8 logged</span>
          </div>
          <div className="evidence-grid">
            {TODAY_CATEGORIES.map((category) => (
              <fieldset key={category}>
                <legend>{CATEGORY_LABELS[category]}</legend>
                <div>
                  {[
                    ["Needs support", 0],
                    ["Mixed", 1],
                    ["Steady", 2]
                  ].map(([label, value]) => (
                    <button
                      type="button"
                      data-selected={today.evidence[category].value === value}
                      aria-pressed={today.evidence[category].value === value}
                      onClick={() => setEvidence(category, value as 0 | 1 | 2)}
                      key={label}
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="clear-evidence"
                    disabled={today.evidence[category].value === null}
                    onClick={() => setEvidence(category, null)}
                  >
                    Clear
                  </button>
                </div>
              </fieldset>
            ))}
          </div>
          <p className="score-direction">{score.direction}</p>
        </article>

        <aside className="context-card">
          <span className="eyebrow">Current context</span>
          <h2>What fits changes with where you are.</h2>
          <div className="context-options">
            {(Object.keys(CONTEXT_LABELS) as CurrentContext[]).map((context) => (
              <button
                type="button"
                data-selected={today.context === context}
                aria-pressed={today.context === context}
                onClick={() => setContext(context)}
                key={context}
              >
                {CONTEXT_LABELS[context]}
              </button>
            ))}
          </div>
          <dl>
            <div>
              <dt>Command confidence</dt>
              <dd>{command.confidence}</dd>
            </div>
            <div>
              <dt>Protected lane</dt>
              <dd>{command.lane}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{score.qualification}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="minimum-wins-section" aria-labelledby="minimum-wins-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Whole-day anchors</span>
            <h2 id="minimum-wins-title">Today Minimum Wins</h2>
          </div>
          <span>Exactly three · versioned</span>
        </div>
        <div className="minimum-win-grid">
          {plan.wins.map((win) => (
            <article key={win.id} data-status={win.status}>
              <div className="win-lane">{win.lane}</div>
              <h3>{win.title}</h3>
              <p>{win.detail}</p>
              <details>
                <summary>Why this win</summary>
                <p>
                  Tier: {win.tier}. Family: {win.family}.{" "}
                  {win.proofSource ? `Proof: ${win.proofSource}.` : "No proof is claimed yet."}
                </p>
              </details>
              <button
                className="button button-secondary"
                type="button"
                onClick={() =>
                  writeToday((draft) => {
                    const existing = currentPlan(draft, runtime.effectiveDate);
                    setPlan(
                      draft,
                      updateMinimumWin(
                        existing,
                        win.id,
                        win.status === "manual-done" ? "open" : "manual-done",
                        new Date()
                      )
                    );
                  })
                }
              >
                {win.status === "manual-done" ? "Undo win" : win.status === "covered" ? "Covered" : "Mark done"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="today-support-lanes" aria-label="Today support lanes">
        {["Daily Checks", "Morning Start", "Sleep / Recovery"].map((label) => (
          <span key={label}>{label}</span>
        ))}
        <button
          type="button"
          onClick={() =>
            document.getElementById("environment-panel")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Environment
        </button>
        <span>Night review</span>
      </section>

      <EnvironmentPanel runtime={runtime} />

      {runtime.currentStep?.targetId !== "guide-target-core-state" && (
        <GuideTarget step={runtime.currentStep} activeTab="today" />
      )}

      {reasonSheetOpen && (
        <div className="sheet-backdrop">
          <section
            className="cant-now-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cant-now-title"
            ref={reasonDialogRef}
            tabIndex={-1}
          >
            <div className="sheet-heading">
              <div>
                <span className="eyebrow">Temporary constraint</span>
                <h2 id="cant-now-title">What makes this a “can&apos;t now”?</h2>
              </div>
              <button type="button" aria-label="Close Can't now" onClick={closeReasonSheet}>
                ×
              </button>
            </div>
            <p>
              This changes the current option without rating the move as ineffective or permanently
              disliked.
            </p>
            <fieldset>
              <legend>Choose the reason that is true right now</legend>
              {(Object.keys(REASON_LABELS) as ConstraintReason[]).map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="cant-now-reason"
                    value={item}
                    checked={reason === item}
                    onChange={() => setReason(item)}
                  />
                  <span>{REASON_LABELS[item]}</span>
                </label>
              ))}
            </fieldset>
            <label className="reason-note">
              Optional note
              <textarea
                value={reasonNote}
                maxLength={240}
                onChange={(event) => setReasonNote(event.target.value)}
                placeholder="Keep it brief and factual."
              />
            </label>
            <div className="sheet-actions">
              <button className="button button-secondary" type="button" onClick={closeReasonSheet}>
                Cancel
              </button>
              <button className="button button-primary" type="button" onClick={saveCantNow}>
                Save constraint
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
