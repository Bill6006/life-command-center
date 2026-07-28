# Intelligence Contract

The intelligence layer is deterministic, explainable, evidence-aware, and
local. It proposes the smallest realistic next action without converting
missing data, low capacity, or non-completion into moral judgment.

## Forecast context

`buildForecastContext` consumes:

- effective date, period and precise clock window;
- current logged energy, mood, focus, drive, irritability and overwhelm;
- last-night and tonight sleep/food assignments;
- caffeine, food, hydration, recovery and active load;
- completed, active and dismissed daily actions;
- domain profiles and drift;
- 3/7/30-day trends and effective evidence days;
- mood and energy timelines;
- reading/private variables only when available and permitted;
- weekly focus and capacity;
- place, available time, privacy, food need and schedule inference; and
- active feedback constraints and contraindications.

Every feature carries source/known metadata. Unknown values are excluded from
similarity and risk inference instead of being replaced with averages.

## Current-state thresholds

Low state includes logged energy or mood at most 4, irritability at least 7,
focus or drive at most 4, or overwhelm at least 7. Very low thresholds are at
most 2 for positive metrics or at least 9 for adverse metrics. “Good” positive
state begins at 7.

Low sleep is below 6.5 hours; very low sleep is below 5.5 hours.

## Forecast score and band

The legacy score boundary is:

```text
raw = 64 + protectiveCount × 4.8 - riskCount × 4.2
```

Clamp raw score, then apply confidence/state constraints:

- a current logged state has a normal floor of 24 and severe floor of 16;
- no current state has a floor of 22, plus 3 when protection exists;
- current energy or mood at most 3 caps at 48;
- another low-state trigger caps at 58;
- no current state caps at 62 outside morning or 68 during morning;
- fewer than 5 effective evidence days caps at 72;
- fewer than 10 caps at 84;
- fewer than 20 caps at 92.

Bands: Green at least 75, Yellow at least 50, otherwise Red.

The projection includes score, band, operating mode, primary bottleneck, best
lever, “Do Now,” Minimum Win progress, confidence/effective-days, expected
effect, check window, and concise reasons.

## Bottlenecks and levers

Rank, explain and deduplicate:

- body battery;
- nervous system;
- mission drift;
- recovery risk;
- environment friction;
- connection need;
- presence/identity;
- faith/meaning; and
- data confidence.

When current state is unknown, data confidence is eligible to become the main
bottleneck. Each bottleneck maps to bounded action families and a reason trace.

## Candidate move library

Each candidate defines:

- stable ID and library version;
- display text and family/dedupe group;
- lane and optional weekly-focus domains;
- valid periods and precise `notBefore`/`notAfter` windows;
- required context and contraindications;
- expected cost, effort, duration and effect metrics;
- capacity and safety rules; and
- action/effect-check instructions.

Time rules include:

- dinner-oriented actions do not appear before 15:30;
- tonight-oriented actions do not appear before 16:00;
- bedtime/night reset actions do not appear before 17:00; and
- the final time-aware marker corresponds to the Phase 70J boundary.

Selection excludes invalid context, overlapping active dose/family, completed or
retired duplicate candidates, and explicit constraint blocks. It applies
near-duplicate, repetition, dose, guardrail, context-fit and capacity
penalties. Tie-breaking is stable.

## Feedback constraints

“Can’t now” captures a structured reason, optional expiration/context, blocked
family, creation timestamp and management/undo state. A blocked candidate
family is excluded while the constraint applies.

Rejection for feasibility:

- is not a negative effectiveness outcome;
- must not lower learned lift;
- can be undone;
- is visible/manageable; and
- expires when its scope says it should.

Current-context constraints may include place, time available, privacy,
need-food state, answer expiration and schedule inference. Final behavior has
no equipment-inventory question or “no equipment” reason.

## Personal optimization

Comparable history:

- requires at least three known comparable features;
- excludes unknown features;
- uses explicit logged current features at full weight;
- uses inferred/derived sources at `0.62`;
- considers at most eight comparable records;
- weights recency `1.00` through 14 days, `0.94` through 45 days, `0.86`
  through 120 days, and `0.78` thereafter.

Observed lift:

- requires a started action, a later effect check, and at least two comparable
  before/after metrics;
- treats energy, mood, focus and drive increases as positive;
- reverses stress, overwhelm and irritability;
- blends applicable score deltas at 65/35 and clamps to -20 through 20; and
- remains separate from the predicted range.

Completion probability is smoothed:

```text
(done + 2.6) / (started + rejected × 0.85 + 4)
```

Then apply effort/time adjustments and clamp to `0.20–0.92`.
Feasibility rejection does not enter observed outcome lift.

Candidate ranking combines prior effect, personal horizons, realistic
completion, context fit, uncertainty, cost and weekly alignment. Dose penalties
cover overlapping families, hydration, food support and caffeine repetition.
Realistic net value is based on net effect minus cost and low-state cost,
multiplied by completion and fit, plus alignment. Reachable peak is capped by
time and capacity, not a fixed staircase. Score-gaming candidates are rejected.

## Weekly focus and capacity

Focus domains are career, body/training, money, home, presence/social,
faith/meaning, and recovery. Week keys start Monday.

- The user choice is authoritative and carries forward.
- Automatic ranking uses seven-day rates, domain drift and recovery.
- The suggestion remains visible without silently replacing user choice.
- Weekly focus narrows Future candidates only.

Raw capacity:

```text
energy × 9 + drive × 5 + focus × 6 - recoveryRisk × 0.25
```

Clamp to 0–100.

Evidence confidence is Higher with four known inputs, Medium with three, and Low
otherwise. Fewer than three makes the result provisional.

- **Low:** provisional, recovery risk at least 70, very-low state, energy at
  most 3, or focus at most 3.
- **High:** raw at least 75, risk below 50, energy at least 7, focus at least 6,
  and drive at least 6.
- **Normal:** otherwise.

Lane allowances:

| Band | Protect | Future | Connection |
| --- | ---: | ---: | ---: |
| Low | 1 | 0 | 1 |
| Normal | 1 | 1 | 1 |
| High | 1 | 1 | 1, plus an optional stretch |

Lane use is deduplicated across forecast actions, Minimum Wins and direct
evidence. Protect is urgent at risk at least 65, very-low state, energy/focus
at most 3, food need, or very-low sleep. Urgent Protect outranks weekly focus.
Saturday blocks deep/high Future work.

## Minimum Wins

Exactly three whole-day wins are selected from the versioned library using the
previous night, 7/30-day trends, main limiter, recovery, current state and
domain drift.

The normal family shape is body/recovery, future, and relationship. Support may
replace a lane when needed. Exclude duplicate micro-actions, administrative
closeout/setup, and score-gaming selections.

Tier target (floor, standard, needle, or elite) depends on need and capacity.
Selection is deterministic and repetition-aware. Manual `Done` is distinct
from automatic `Covered`; exact or same-family completed Peak actions can
provide coverage, and undo removes it. Pivot/recovery/abstention is allowed.

## Movement boundary

Protected readiness keys are exactly:

- recovery;
- two-minute;
- ten-minute; and
- can-lift.

The application’s movement ladder is recovery, micro, starter, and planned.
The legacy snack alias may migrate. Exact exercises, sets, reps, and equipment
prescriptions are external to this app and belong to Fitbod. Retired duplicate
move IDs cannot re-enter candidate selection. Old equipment fields remain
passthrough only.

## Determinism and explainability

All selectors accept injected state and clock and return serializable output.
No selector reads or mutates the DOM. Every ranked result exposes:

- eligibility/rejection reasons;
- contributing evidence and its source quality;
- score components and caps;
- constraint/capacity decisions;
- uncertainty/confidence; and
- deterministic tie-break inputs.

Required tests use synthetic fixtures, frozen clocks, and fixed library
versions. The same input must produce byte-equivalent normalized output.
