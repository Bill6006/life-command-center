import type {
  WeeklyFocusDomain,
  WeeklyFocusRecord,
  WeeklyFocusResolution
} from "./types";

export const WEEKLY_FOCUS_DOMAINS: readonly WeeklyFocusDomain[] = [
  "career",
  "body-training",
  "money",
  "home",
  "presence-social",
  "faith-meaning",
  "recovery"
];

export const WEEKLY_FOCUS_LABELS: Record<WeeklyFocusDomain, string> = {
  career: "Career",
  "body-training": "Body / training",
  money: "Money",
  home: "Home",
  "presence-social": "Presence / social",
  "faith-meaning": "Faith / meaning",
  recovery: "Recovery"
};

export interface FocusSuggestionInput {
  rates?: Partial<Record<WeeklyFocusDomain, number>>;
  drift?: Partial<Record<WeeklyFocusDomain, number>>;
  recoveryRisk?: number | null;
}

export function weekKeyForDate(date: Date) {
  const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
  const day = copy.getUTCDay();
  copy.setUTCDate(copy.getUTCDate() - ((day + 6) % 7));
  return copy.toISOString().slice(0, 10);
}

export function suggestWeeklyFocus(input: FocusSuggestionInput = {}) {
  const scores = Object.fromEntries(
    WEEKLY_FOCUS_DOMAINS.map((domain) => {
      const rateGap = 100 - Math.max(0, Math.min(100, input.rates?.[domain] ?? 50));
      const drift = Math.max(0, input.drift?.[domain] ?? 0);
      const recovery = domain === "recovery" ? Math.max(0, input.recoveryRisk ?? 0) * 0.8 : 0;
      return [domain, rateGap * 0.45 + drift * 0.55 + recovery];
    })
  ) as Record<WeeklyFocusDomain, number>;
  const domain = [...WEEKLY_FOCUS_DOMAINS].sort(
    (left, right) => scores[right] - scores[left] || left.localeCompare(right)
  )[0];
  return {
    domain,
    reasons: [
      `Automatic suggestion score: ${Math.round(scores[domain])}.`,
      "The suggestion uses seven-day rates, domain drift, and recovery only.",
      "It cannot replace a confirmed user choice."
    ]
  };
}

export function resolveWeeklyFocus(
  records: readonly WeeklyFocusRecord[],
  weekKey: string,
  suggestionInput: FocusSuggestionInput = {}
): WeeklyFocusResolution {
  const suggestion = suggestWeeklyFocus(suggestionInput);
  const current = records.find((record) => record.weekKey === weekKey);
  if (current) {
    return {
      weekKey,
      selected: current.selected,
      source: "current-user-choice",
      suggestion: suggestion.domain,
      suggestionReasons: suggestion.reasons
    };
  }
  const carried = [...records]
    .filter((record) => record.weekKey < weekKey)
    .sort(
      (left, right) =>
        right.weekKey.localeCompare(left.weekKey) ||
        right.confirmedAt.localeCompare(left.confirmedAt)
    )[0];
  return {
    weekKey,
    selected: carried?.selected ?? null,
    source: carried ? "carried-user-choice" : "none",
    suggestion: suggestion.domain,
    suggestionReasons: suggestion.reasons
  };
}

export function confirmWeeklyFocus(
  records: readonly WeeklyFocusRecord[],
  weekKey: string,
  selected: WeeklyFocusDomain,
  now: Date
) {
  const next = records.filter((record) => record.weekKey !== weekKey);
  next.push({ weekKey, selected, confirmedAt: now.toISOString() });
  return next.sort((left, right) => left.weekKey.localeCompare(right.weekKey));
}
