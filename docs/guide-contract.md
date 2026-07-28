# Guide and Automation Contract

Guides are deterministic, time-aware capture workflows. They route the user to
existing controls; they do not invent evidence or mark a step complete merely
because a screen was opened.

## Time periods

All boundaries use the configured application time zone.

| Period | Inclusive local window |
| --- | --- |
| Morning | 05:00–11:59 |
| Afternoon | 12:00–16:59 |
| Evening | 17:00–04:59 |

Forecast clock windows are more precise:

| Window | Time |
| --- | --- |
| `after_midnight` | 00:00–03:59 |
| `early_morning` | 04:00–07:59 |
| `late_morning` | 08:00–11:59 |
| `early_afternoon` | 12:00–13:59 |
| `mid_afternoon` | 14:00–15:59 |
| `late_afternoon` | 16:00–16:59 |
| `early_evening` | 17:00–18:59 |
| `mid_evening` | 19:00–20:59 |
| `late_evening` | 21:00–23:59 |

## Guide types and eligibility

| Guide | Eligibility |
| --- | --- |
| Morning | Current period is morning and today’s morning completion is absent |
| Afternoon | Current period is afternoon and today’s afternoon completion is absent |
| Evening | Current period is evening and today’s evening completion is absent |
| Missed morning | Morning has passed, no morning guide is active, and today’s morning guide was neither used nor completed |
| Weekly | Sunday at/after 17:00 or Monday before 12:00, unless the current week is complete |
| Smart check-in | Same-period full guide completed at least 60 minutes ago; refreshed logged ranges are also at least 60 minutes old |

Manual launch can override the automatic current-period suggestion, but the
manual override is stored explicitly. A timeframe change clears a stale
non-manual guide.

## Ordered step catalog

Steps are included only when their target evidence is due or missing.

### Morning

1. core state;
2. due private follow-up;
3. current effects;
4. morning start;
5. body/readiness;
6. environment;
7. mission;
8. Saturday context when applicable;
9. faith;
10. last-night sleep and food;
11. caffeine;
12. therapy/emotional state;
13. energy and mood shifts;
14. fatherhood;
15. forecast.

### Afternoon

1. core state;
2. due private follow-up;
3. current effects;
4. Saturday context;
5. faith;
6. therapy;
7. energy and mood shifts;
8. day food;
9. caffeine;
10. body/readiness;
11. environment;
12. mission;
13. fatherhood;
14. presence/social;
15. forecast.

### Evening

1. core state;
2. due private follow-up;
3. current effects;
4. Saturday context;
5. faith;
6. therapy;
7. energy and mood shifts;
8. day food;
9. caffeine;
10. tonight sleep intention;
11. night food;
12. stressors;
13. journal;
14. body/readiness;
15. environment;
16. recovery;
17. fatherhood;
18. presence/social;
19. night closeout;
20. review;
21. forecast.

If all conditional targets are already satisfied, provide a Today check-in
fallback rather than an empty or instantly completed guide.

### Weekly

The weekly flow covers:

1. child-growth review;
2. fatherhood coaching;
3. tiny lesson;
4. observation;
5. weekly review;
6. Weekly Growth Focus; and
7. Weekly Rhythm.

New code uses neutral child-profile terminology while migration recognizes the
legacy namespace.

## Step state machine

Guide session state contains:

- guide type and effective date/week key;
- ordered step IDs;
- current step index;
- started/updated timestamps;
- manual-override flag;
- active tab and target selector;
- completed step evidence;
- held/private-follow-up state; and
- completion timestamp.

Transitions:

`idle → active → step routed → evidence committed → next step → completed`

An active session may also be `held`, `stopped`, or invalidated by a
non-manual timeframe change. Stop clears active navigation state but does not
mark completion.

`goGuideStep` behavior becomes a typed routing command:

- activate the owning tab;
- render/focus/scroll to a stable target;
- apply only documented routing effects, such as setting the tonight target;
- never synthesize a user answer; and
- expose a recovery message if the target is unavailable.

## Completion durability

On final step:

1. commit focused and pending input;
2. write the guide completion date/week key and timestamp;
3. clear active-guide state in the same canonical mutation;
4. persist immediately; and
5. re-render the correct screen.

Recovery/merge must compare guide-specific timestamps. An older snapshot cannot
remove a newer completion or reactivate a stale session.

## Private follow-up

A private follow-up appears only when a previously logged event has a real
2–3-hour follow-up window and is due, late, or already started. It may hold a
guide during that active window. It cannot be created from a guess. Stale
follow-ups are closed without manufacturing outcome evidence.

Private details remain subject to export settings and sanitized by default.

## Smart check-in

- Requires completion of the same period’s full guide.
- Unlocks 60 minutes after completion.
- A logged period range can be refreshed only after 60 minutes.
- Includes at most three highest-value missing/refresh steps.
- May add the forecast step only if capacity remains.
- Never bypasses the guide prerequisite or overwrites explicit values.

## Quick Mode

Quick Mode is a separate reduced interaction. Starting any guide disables it.
Starting Quick Mode while a guide is active is rejected with a clear option to
stop the guide first. Quick Mode evidence follows the same logged/unknown and
save semantics as full screens.

## Automation rules

- Eligibility functions are pure over state and an injected clock.
- Timer callbacks re-check eligibility before mutation.
- One automation owner exists per concern; rerenders do not duplicate timers.
- Visibility and timezone/date changes trigger recomputation.
- No automation performs reset, import, destructive overwrite, or inferred
  completion.
- Tests use a fake clock and explicit application timezone.

## Required Phase 4 tests

- every inclusive/exclusive period boundary;
- effective date around midnight and rollover mode;
- missed-morning eligibility and suppression;
- Sunday/Monday weekly window and week completion;
- conditional step inclusion/order for all guide types;
- empty-guide fallback;
- target routing and unavailable target error;
- stop does not complete;
- atomic completion persistence;
- stale recovery cannot reopen a completed guide;
- private follow-up due, late, held, and stale behavior;
- Smart check-in 60-minute gates and three-step cap;
- Quick Mode mutual exclusion; and
- timer cleanup across rerenders and visibility changes.
