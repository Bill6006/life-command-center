import { DOMAIN_DEFINITIONS, ENVIRONMENT_DEFINITION } from "../features/domains/definitions";
import { buildStateIntelligenceProjection } from "../features/domains/intelligence";
import {
  readDomainField,
  readWorkWins,
  sanitizedWorkWin
} from "../features/domains/state";
import type {
  DomainDefinition,
  DomainFieldDefinition,
  WorkWinRecord
} from "../features/domains/types";
import { calculateTodayScore } from "../features/today/score";
import { parseTodayState } from "../features/today/types";
import { calculateMaturityTruth } from "../intelligence/maturity";
import { migrateState } from "../state/migrations";
import type { AppState } from "../state/model";
import type { Phase68Acceptance } from "../diagnostics";

export type ExportRange = "7" | "30" | "all";
export type WorkWinPacketMode = "sanitized-json" | "sanitized-text" | "full-metadata-json";

const DEFINITIONS: readonly DomainDefinition[] = [
  ...Object.values(DOMAIN_DEFINITIONS),
  ENVIRONMENT_DEFINITION
];

function exportMetadata(
  exportType: string,
  state: AppState,
  now: Date,
  effectiveDate: string
) {
  return {
    app: "Life Command Center",
    exportType,
    formatVersion: 1,
    schemaVersion: state.schemaVersion,
    generatedAt: now.toISOString(),
    timeZone: state.settings.timeZone,
    effectiveDate
  };
}

export function selectExportDateKeys(
  state: AppState,
  range: ExportRange,
  effectiveDate: string
) {
  const keys = Object.keys(state.days)
    .filter((key) => key <= effectiveDate)
    .sort();
  if (range === "all") return keys;
  return keys.slice(-Number(range));
}

function allowField(
  definition: DomainDefinition,
  field: DomainFieldDefinition,
  includePrivatePattern: boolean
) {
  if (!field.private) return true;
  return includePrivatePattern && definition.id === "pattern";
}

function projectedDomainValues(
  state: AppState,
  dateKey: string,
  definition: DomainDefinition,
  includePrivatePattern: boolean
) {
  return Object.fromEntries(
    definition.sections.flatMap((section) =>
      section.fields.flatMap((field) => {
        if (!allowField(definition, field, includePrivatePattern)) return [];
        const value = readDomainField(
          state,
          dateKey,
          definition.id,
          definition.storageKey,
          field.scope,
          field.id
        );
        if (value.evidenceState === "unknown") return [];
        return [
          [
            field.id,
            {
              value: value.value,
              evidenceState: value.evidenceState,
              updatedAt: value.updatedAt
            }
          ]
        ];
      })
    )
  );
}

function compactForecast(state: AppState, dateKey: string, now: Date) {
  const projection = buildStateIntelligenceProjection(state, dateKey, now);
  return {
    forecast: projection.forecast,
    capacity: projection.capacity,
    selected: {
      id: projection.selected.id,
      family: projection.selected.family,
      lane: projection.selected.lane,
      predictedEffect: projection.selected.predictedEffect,
      completionProbability: projection.selected.completionProbability
    },
    reachablePeak: projection.reachablePeak,
    northStar: projection.northStar
  };
}

export function buildLifeUpdate(
  input: AppState,
  options: {
    range: ExportRange;
    now?: Date;
    effectiveDate?: string;
    includePrivatePattern?: boolean;
  }
) {
  const state = migrateState(input);
  const now = options.now ?? new Date();
  const effectiveDate = options.effectiveDate ?? now.toISOString().slice(0, 10);
  const dateKeys = selectExportDateKeys(state, options.range, effectiveDate);
  const snapshots = dateKeys.map((dateKey) => {
    const today = parseTodayState(state.days[dateKey]?.today);
    const score = calculateTodayScore(today);
    const domains = Object.fromEntries(
      DEFINITIONS.flatMap((definition) => {
        const values = projectedDomainValues(
          state,
          dateKey,
          definition,
          options.includePrivatePattern === true
        );
        return Object.keys(values).length ? [[definition.id, values]] : [];
      })
    );
    return {
      date: dateKey,
      today: {
        context: today.context,
        evidence: today.evidence,
        score,
        activeMove: today.activeMove
          ? {
              candidateId: today.activeMove.candidateId,
              family: today.activeMove.family,
              lane: today.activeMove.lane,
              status: today.activeMove.status
            }
          : null,
        moves: today.moveHistory.map((move) => ({
          candidateId: move.candidateId,
          family: move.family,
          lane: move.lane,
          status: move.status,
          updatedAt: move.updatedAt,
          observedChange: move.followUp?.observedChange ?? null
        })),
        minimumWins: today.minimumWinPlans.flatMap((plan) =>
          plan.wins.map((win) => ({
            family: win.family,
            lane: win.lane,
            tier: win.tier,
            status: win.status
          }))
        )
      },
      domains,
      intelligence: compactForecast(state, dateKey, now)
    };
  });
  const evidenceEntries = snapshots.flatMap((snapshot) =>
    Object.values(snapshot.today.evidence)
  );
  const moves = snapshots.flatMap((snapshot) => snapshot.today.moves);
  const minimumWins = snapshots.flatMap(
    (snapshot) => snapshot.today.minimumWins
  );
  const knownEvidence = evidenceEntries.filter(
    (entry) => entry.state !== "unknown"
  );
  const domainSummaries = Object.fromEntries(
    DEFINITIONS.map((definition) => {
      const values = snapshots.flatMap((snapshot) =>
        Object.keys(
          (snapshot.domains as Record<string, Record<string, unknown>>)[
            definition.id
          ] ?? {}
        )
      );
      return [
        definition.id,
        {
          loggedFields: values.length,
          privateFieldsIncluded:
            options.includePrivatePattern === true &&
            definition.id === "pattern"
        }
      ];
    })
  );

  return {
    ...exportMetadata("Life Update", state, now, effectiveDate),
    range: options.range,
    prompt:
      "Use qualified evidence only. Blank means unknown, not negative. Do not infer personal outcomes.",
    loggedDays: dateKeys.length,
    evidenceIntegrity: {
      known: knownEvidence.length,
      unknown: evidenceEntries.length - knownEvidence.length,
      explicitFalse: knownEvidence.filter(
        (entry) => entry.state === "explicit-false"
      ).length
    },
    completionRates: {
      moves:
        moves.length > 0
          ? moves.filter((move) => move.status === "completed").length /
            moves.length
          : null,
      minimumWins:
        minimumWins.length > 0
          ? minimumWins.filter((win) => win.status !== "open").length /
            minimumWins.length
          : null
    },
    domainSummaries,
    moodTimeline: snapshots.flatMap((snapshot) => {
      const therapy = (
        snapshot.domains as Record<
          string,
          Record<string, { value?: unknown }>
        >
      ).therapy;
      return typeof therapy?.mood?.value === "number"
        ? [{ date: snapshot.date, mood: therapy.mood.value }]
        : [];
    }),
    recentDaySnapshots: snapshots,
    workCareerProof: readWorkWins(state).map(sanitizedWorkWin),
    privacy: {
      privatePatternIncluded: options.includePrivatePattern === true,
      unknownDurableStateIncluded: false,
      rawBackupIncluded: false
    }
  };
}

function outcomeCounts(state: AppState) {
  const moves = Object.values(state.days).flatMap(
    (day) => parseTodayState(day.today).moveHistory
  );
  const qualified = moves.filter(
    (move) =>
      move.status === "completed" &&
      move.followUp?.status === "complete" &&
      typeof move.followUp.observedChange === "number"
  );
  return {
    qualified: qualified.length,
    positive: qualified.filter(
      (move) => (move.followUp?.observedChange ?? 0) > 0
    ).length,
    observedLift: qualified.length
      ? qualified.reduce(
          (total, move) => total + (move.followUp?.observedChange ?? 0),
          0
        ) / qualified.length
      : null
  };
}

export function buildLevel5Review(
  input: AppState,
  options: {
    range: ExportRange;
    now?: Date;
    effectiveDate?: string;
    acceptance?: Phase68Acceptance | null;
  }
) {
  const state = migrateState(input);
  const now = options.now ?? new Date();
  const effectiveDate = options.effectiveDate ?? now.toISOString().slice(0, 10);
  const dates = selectExportDateKeys(state, options.range, effectiveDate);
  const meaningfulUses = dates.filter(
    (date) => Boolean(state.days[date]?._inputUpdatedAt)
  ).length;
  const outcomes = outcomeCounts(state);
  const passedChecks =
    options.acceptance?.groups.filter((entry) => entry.passed).length ?? 0;
  const totalChecks = options.acceptance?.groups.length ?? 0;
  return {
    ...exportMetadata("Level 5 Review", state, now, effectiveDate),
    range: options.range,
    maturity: calculateMaturityTruth({
      capability: { passedChecks, totalChecks },
      adoption: {
        meaningfulUses,
        eligibleOpportunities: dates.length
      },
      outcome: {
        qualifiedSamples: outcomes.qualified,
        positiveSamples: outcomes.positive,
        observedLift: outcomes.observedLift
      }
    }),
    capabilityEvidence:
      options.acceptance ?? {
        status: "not-run",
        reason: "Deep diagnostics remain on demand."
      },
    adoptionEvidence: {
      meaningfulUses,
      eligibleOpportunities: dates.length
    },
    personalEvidence: outcomes,
    sanitizedCareerProof: readWorkWins(state).map(sanitizedWorkWin),
    privacy: {
      rawBackupIncluded: false,
      privateContextIncluded: false
    }
  };
}

export function buildPhase17Report(
  input: AppState,
  acceptance: Phase68Acceptance,
  now = new Date()
) {
  const state = migrateState(input);
  return {
    ...exportMetadata(
      "Phase 17 Acceptance",
      state,
      now,
      acceptance.effectiveDate
    ),
    decision: acceptance.decision,
    automatedPassed: acceptance.automatedPassed,
    externalVerificationComplete: acceptance.externalVerificationComplete,
    groups: acceptance.groups,
    performance: { durationMs: acceptance.durationMs },
    reasons: acceptance.reasons,
    privacy: {
      rawPersonalRecordsIncluded: false,
      syntheticOrStructuralDiagnosticsPreferred: true
    }
  };
}

function sanitizedText(records: WorkWinRecord[]) {
  if (!records.length) return "Life Command Center — Work Win proof packet\n\nNo Work Wins recorded.";
  return [
    "Life Command Center — Work Win proof packet",
    "",
    ...records.flatMap((record, index) => {
      const safe = sanitizedWorkWin(record);
      return [
        `${index + 1}. ${safe.technology || "Technology not specified"}`,
        `Action: ${safe.action || "Not recorded"}`,
        `Result: ${safe.result || (record.sensitive ? "[withheld: sensitive]" : "Not recorded")}`,
        `Evidence: ${safe.evidenceStatus}; status: ${safe.status}`,
        ""
      ];
    })
  ].join("\n");
}

export function buildWorkWinPacket(
  input: AppState,
  mode: WorkWinPacketMode,
  now = new Date()
) {
  const state = migrateState(input);
  const effectiveDate = now.toISOString().slice(0, 10);
  const records = readWorkWins(state);
  if (mode === "sanitized-text") return sanitizedText(records);
  return {
    ...exportMetadata(
      mode === "full-metadata-json"
        ? "Work Win Full Metadata"
        : "Work Win Sanitized",
      state,
      now,
      effectiveDate
    ),
    mode,
    warning:
      mode === "full-metadata-json"
        ? "Explicit full metadata can contain private context. Review before sharing."
        : "Sensitive result and private issue context are omitted.",
    records:
      mode === "full-metadata-json"
        ? records
        : records.map(sanitizedWorkWin)
  };
}

export function safeExportFilename(
  kind: "full-backup" | "life-update" | "level-5" | "phase-17" | "work-wins",
  effectiveDate: string,
  extension: "json" | "txt" = "json"
) {
  const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(effectiveDate)
    ? effectiveDate
    : "undated";
  return `life-command-center-${kind}-${safeDate}.${extension}`;
}

export function exportJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}
