export const TAB_IDS = [
  "today",
  "azure",
  "money",
  "father",
  "faith",
  "health",
  "pattern",
  "social",
  "therapy",
  "week",
  "vision",
  "data"
] as const;

export type TabId = (typeof TAB_IDS)[number];

export interface TabDefinition {
  id: TabId;
  label: string;
  monogram: string;
  eyebrow: string;
  title: string;
  description: string;
  phase: string;
}

export const TAB_REGISTRY: readonly TabDefinition[] = [
  {
    id: "today",
    label: "Today",
    monogram: "TD",
    eyebrow: "Current command",
    title: "Make today smaller and clearer.",
    description: "Current state, Minimum Wins, and the next realistic move will live here.",
    phase: "Phases 5–6"
  },
  {
    id: "azure",
    label: "Azure",
    monogram: "AZ",
    eyebrow: "Career proof",
    title: "Turn real technical work into defensible growth.",
    description: "Skills, proof stages, Work Wins, and review prompts stay local and editable.",
    phase: "Phase 7"
  },
  {
    id: "money",
    label: "Money",
    monogram: "MO",
    eyebrow: "Financial direction",
    title: "See the next useful money decision.",
    description: "Goals, balances, daily discipline, and weekly rhythm will share one calm view.",
    phase: "Phase 7"
  },
  {
    id: "father",
    label: "Father",
    monogram: "FA",
    eyebrow: "Present fatherhood",
    title: "Notice, connect, teach, and repair.",
    description: "Daily connection, coaching, tiny lessons, and weekly reflection remain distinct.",
    phase: "Phase 7"
  },
  {
    id: "faith",
    label: "Faith",
    monogram: "FI",
    eyebrow: "Meaning and practice",
    title: "Keep the next faithful action visible.",
    description: "Daily practice, learning progress, and weekly service evidence will live here.",
    phase: "Phase 7"
  },
  {
    id: "health",
    label: "Health",
    monogram: "HE",
    eyebrow: "Readiness",
    title: "Match movement to the body you have today.",
    description: "The app will own readiness and movement level; Fitbod owns exact programming.",
    phase: "Phase 7"
  },
  {
    id: "pattern",
    label: "Pattern",
    monogram: "PA",
    eyebrow: "Pattern lab",
    title: "Find signals without inventing certainty.",
    description: "Sleep, food, caffeine, timelines, and private variables stay evidence-aware.",
    phase: "Phase 7"
  },
  {
    id: "social",
    label: "Love/Social",
    monogram: "SO",
    eyebrow: "Connection",
    title: "Choose presence over vague pressure.",
    description: "Connection, outreach, and relationship signals will stay practical and neutral.",
    phase: "Phase 7"
  },
  {
    id: "therapy",
    label: "Therapy",
    monogram: "TH",
    eyebrow: "Emotional truth",
    title: "Name the state. Keep the response humane.",
    description: "Stress, loneliness, confidence, overwhelm, and reflection remain private by default.",
    phase: "Phase 7"
  },
  {
    id: "week",
    label: "Week",
    monogram: "WK",
    eyebrow: "Weekly direction",
    title: "Protect the week from daily noise.",
    description: "User-chosen focus, capacity lanes, anchors, and trends will meet here.",
    phase: "Phases 6–7"
  },
  {
    id: "vision",
    label: "Vision",
    monogram: "VI",
    eyebrow: "Long horizon",
    title: "Keep direction visible without forcing urgency.",
    description: "Identity, principles, and longer goals will provide context—not judgment.",
    phase: "Phase 7"
  },
  {
    id: "data",
    label: "Data",
    monogram: "DA",
    eyebrow: "Local data",
    title: "Your state stays yours.",
    description: "Backup, verified restore, exports, diagnostics, and recovery will live here.",
    phase: "Phases 3 and 8"
  }
] as const;

export function isTabId(value: string): value is TabId {
  return TAB_IDS.includes(value as TabId);
}

export function getTabDefinition(id: TabId): TabDefinition {
  return TAB_REGISTRY.find((tab) => tab.id === id) ?? TAB_REGISTRY[0];
}
