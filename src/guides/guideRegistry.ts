import { isSaturday, minutesSince } from "./time";
import type {
  EvidenceSnapshot,
  GuideBuildContext,
  GuideFamily,
  GuidePeriod,
  GuideSession,
  GuideStepDefinition,
  MainGuideFamily
} from "./types";

type StepSeed = [
  id: string,
  tab: GuideStepDefinition["tab"],
  title: string,
  evidence: string,
  priority?: number
];

const common: StepSeed[] = [
  ["core-state", "today", "Life Checks", "core-state", 100],
  ["current-effects", "today", "Current effects", "current-effects", 94],
  ["saturday-boundary", "today", "Saturday boundary", "saturday-boundary", 72],
  ["faith", "faith", "Faith", "faith", 65],
  ["therapy", "therapy", "Emotional dashboard", "therapy", 70],
  ["energy-mood", "pattern", "Energy and mood shifts", "energy-mood", 88],
  ["caffeine", "pattern", "Caffeine", "caffeine", 74],
  ["body-readiness", "health", "Body readiness", "body-readiness", 86],
  ["environment", "today", "Home and environment", "environment", 68],
  ["mission", "azure", "Mission and Azure", "mission", 82],
  ["fatherhood", "father", "Fatherhood", "fatherhood", 62],
  ["forecast", "today", "Today Command forecast", "forecast", 78]
];

const seedById = new Map(common.map((seed) => [seed[0], seed]));

const morningOrder = [
  "core-state",
  "private-follow-up",
  "current-effects",
  "morning-start",
  "body-readiness",
  "environment",
  "mission",
  "saturday-boundary",
  "faith",
  "last-night",
  "caffeine",
  "therapy",
  "energy-mood",
  "fatherhood",
  "forecast"
] as const;

const afternoonOrder = [
  "core-state",
  "private-follow-up",
  "current-effects",
  "saturday-boundary",
  "faith",
  "therapy",
  "energy-mood",
  "day-food",
  "caffeine",
  "body-readiness",
  "environment",
  "mission",
  "fatherhood",
  "presence",
  "forecast"
] as const;

const eveningOrder = [
  "core-state",
  "private-follow-up",
  "current-effects",
  "saturday-boundary",
  "faith",
  "therapy",
  "energy-mood",
  "day-food",
  "caffeine",
  "tonight-sleep",
  "night-food",
  "stressors",
  "journal",
  "body-readiness",
  "environment",
  "recovery",
  "fatherhood",
  "presence",
  "night-closeout",
  "review",
  "forecast"
] as const;

const uniqueSeeds: StepSeed[] = [
  ["private-follow-up", "pattern", "Private follow-up", "private-follow-up", 99],
  ["morning-start", "today", "Morning Start", "morning-start", 92],
  ["last-night", "pattern", "Last-night sleep and food", "last-night", 90],
  ["day-food", "pattern", "Food so far", "day-food", 76],
  ["presence", "social", "Presence and connection", "presence", 64],
  ["tonight-sleep", "pattern", "Tonight sleep intention", "tonight-sleep", 83],
  ["night-food", "pattern", "Night food", "night-food", 77],
  ["stressors", "therapy", "Stressors", "stressors", 80],
  ["journal", "therapy", "Journal", "journal", 58],
  ["recovery", "health", "Recovery", "recovery", 84],
  ["night-closeout", "today", "Night closeout", "night-closeout", 91],
  ["review", "today", "Daily review", "review", 73]
];

for (const seed of uniqueSeeds) seedById.set(seed[0], seed);

const weeklySeeds: StepSeed[] = [
  ["child-growth-review", "father", "Child growth review", "child-growth-review", 90],
  ["fatherhood-coaching", "father", "Fatherhood coaching", "fatherhood-coaching", 88],
  ["tiny-lesson", "father", "Tiny lesson", "tiny-lesson", 80],
  ["observation", "father", "Weekly observation", "weekly-observation", 76],
  ["weekly-review", "week", "Weekly review", "weekly-review", 94],
  ["weekly-growth-focus", "week", "Weekly Growth Focus", "weekly-growth-focus", 100],
  ["weekly-rhythm", "week", "Weekly Rhythm", "weekly-rhythm", 98]
];

function definition(seed: StepSeed, family: GuideFamily, sourcePeriod: GuidePeriod | "weekly") {
  const [id, tab, title, evidence, priority = 50] = seed;
  const privateFollowUp = id === "private-follow-up";
  const saturday = id === "saturday-boundary";
  return {
    id: `${family}:${id}`,
    guideFamily: family,
    sourcePeriod,
    tab,
    targetId: `guide-target-${id}`,
    title,
    note: `Review and explicitly commit ${title.toLowerCase()} evidence.`,
    condition: privateFollowUp
      ? ({ kind: "private-follow-up" } as const)
      : saturday
        ? ({ kind: "saturday" } as const)
        : ({ kind: "missing", evidence } as const),
    sideEffect: privateFollowUp
      ? ("hold-private-follow-up" as const)
      : id === "tonight-sleep" || id === "night-food"
        ? ("target-tonight" as const)
        : undefined,
    completionRule: "explicit-evidence" as const,
    optionality: privateFollowUp || saturday ? ("conditional" as const) : ("required" as const),
    priority
  } satisfies GuideStepDefinition;
}

function familyOrder(family: MainGuideFamily | "missed-morning") {
  if (family === "morning" || family === "missed-morning") return morningOrder;
  if (family === "afternoon") return afternoonOrder;
  return eveningOrder;
}

function conditionMet(
  step: GuideStepDefinition,
  context: GuideBuildContext
): boolean {
  if (step.condition.kind === "always") return true;
  if (step.condition.kind === "saturday") return isSaturday(context.now, context.timeZone);
  if (step.condition.kind === "private-follow-up") {
    const followUp = context.evidence.privateFollowUp;
    if (!followUp || followUp.completedAt) return false;
    const now = context.now.getTime();
    return now >= Date.parse(followUp.dueAt) && now < Date.parse(followUp.staleAt);
  }
  return context.evidence.satisfied[step.condition.evidence] !== true;
}

export function buildGuideSteps(
  family: Exclude<GuideFamily, "smart-check-in">,
  context: GuideBuildContext
): GuideStepDefinition[] {
  const sourcePeriod: GuidePeriod | "weekly" =
    family === "weekly" ? "weekly" : family === "missed-morning" ? "morning" : family;
  const steps =
    family === "weekly"
      ? weeklySeeds.map((seed) => definition(seed, family, sourcePeriod))
      : familyOrder(family).map((id) => definition(seedById.get(id)!, family, sourcePeriod));
  const included = steps.filter((step) => conditionMet(step, context));
  if (included.length > 0) return included;
  return [
    {
      id: `${family}:today-check-in`,
      guideFamily: family,
      sourcePeriod,
      tab: "today",
      targetId: "guide-target-today-check-in",
      title: "Today check-in",
      note: "Everything due is covered. Confirm the current state without inventing evidence.",
      condition: { kind: "always" },
      completionRule: "acknowledge",
      optionality: "required",
      priority: 100
    }
  ];
}

export function buildSmartCheckInSteps(
  period: GuidePeriod,
  context: GuideBuildContext
): GuideStepDefinition[] {
  const familySteps: GuideStepDefinition[] = buildGuideSteps(period, context)
    .filter((step) => {
      if (step.id.endsWith(":forecast")) return false;
      if (step.condition.kind !== "missing") return true;
      const loggedAt = context.evidence.loggedAt?.[step.condition.evidence];
      return (
        context.evidence.satisfied[step.condition.evidence] !== true ||
        minutesSince(loggedAt, context.now) >= 60
      );
    })
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 3)
    .map((step) => ({
      ...step,
      id: step.id.replace(`${period}:`, "smart-check-in:"),
      guideFamily: "smart-check-in" as const
    }));
  if (familySteps.length < 3 && context.evidence.satisfied.forecast !== true) {
    const forecast = definition(seedById.get("forecast")!, "smart-check-in", period);
    familySteps.push(forecast);
  }
  return familySteps.slice(0, 3);
}

export const GUIDE_REGISTRY = {
  morning: morningOrder,
  afternoon: afternoonOrder,
  evening: eveningOrder,
  weekly: weeklySeeds.map(([id]) => id)
} as const;

export function stepMap(steps: readonly GuideStepDefinition[]) {
  return new Map(steps.map((step) => [step.id, step]));
}

export function resolveSessionSteps(session: GuideSession): GuideStepDefinition[] {
  const resolved: GuideStepDefinition[] = [];
  for (const id of session.stepIds) {
    const seedId = id.slice(id.indexOf(":") + 1);
    if (seedId === "today-check-in") {
      resolved.push({
          id,
          guideFamily: session.family,
          sourcePeriod: session.sourcePeriod,
          tab: "today",
          targetId: "guide-target-today-check-in",
          title: "Today check-in",
          note: "Confirm the current state without inventing evidence.",
          condition: { kind: "always" },
          completionRule: "acknowledge",
          optionality: "required",
          priority: 100
        });
      continue;
    }
    const seed = seedById.get(seedId) ?? weeklySeeds.find(([weeklyId]) => weeklyId === seedId);
    if (seed) resolved.push(definition(seed, session.family, session.sourcePeriod));
  }
  return resolved;
}

export function evidenceForStep(
  step: GuideStepDefinition,
  evidence: EvidenceSnapshot
): string | null {
  if (step.condition.kind === "missing") return step.condition.evidence;
  if (step.condition.kind === "private-follow-up") return evidence.privateFollowUp?.eventId ?? null;
  return null;
}
