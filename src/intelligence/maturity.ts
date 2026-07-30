export type CapabilityMaturity = "not-built" | "partial" | "built";
export type AdoptionMaturity = "not-observed" | "emerging" | "established";
export type OutcomeMaturity = "insufficient" | "early-signal" | "qualified";

export interface MaturityTruthInput {
  capability: {
    passedChecks: number;
    totalChecks: number;
  };
  adoption: {
    meaningfulUses: number;
    eligibleOpportunities: number;
  };
  outcome: {
    qualifiedSamples: number;
    positiveSamples: number;
    observedLift?: number | null;
  };
}

export interface MaturityTruth {
  capability: {
    level: CapabilityMaturity;
    passedChecks: number;
    totalChecks: number;
  };
  adoption: {
    level: AdoptionMaturity;
    meaningfulUses: number;
    eligibleOpportunities: number;
    useRate: number | null;
  };
  outcome: {
    level: OutcomeMaturity;
    qualifiedSamples: number;
    positiveSamples: number;
    observedLift: number | null;
  };
  reasons: string[];
}

function whole(value: number) {
  return Math.max(0, Math.trunc(Number.isFinite(value) ? value : 0));
}

export function calculateMaturityTruth(
  input: MaturityTruthInput
): MaturityTruth {
  const totalChecks = whole(input.capability.totalChecks);
  const passedChecks = Math.min(
    totalChecks,
    whole(input.capability.passedChecks)
  );
  const meaningfulUses = whole(input.adoption.meaningfulUses);
  const eligibleOpportunities = whole(
    input.adoption.eligibleOpportunities
  );
  const useRate =
    eligibleOpportunities > 0
      ? Number(
          Math.min(1, meaningfulUses / eligibleOpportunities).toFixed(4)
        )
      : null;
  const qualifiedSamples = whole(input.outcome.qualifiedSamples);
  const positiveSamples = Math.min(
    qualifiedSamples,
    whole(input.outcome.positiveSamples)
  );
  const capability: CapabilityMaturity =
    totalChecks > 0 && passedChecks === totalChecks
      ? "built"
      : passedChecks > 0
        ? "partial"
        : "not-built";
  const adoption: AdoptionMaturity =
    meaningfulUses === 0
      ? "not-observed"
      : useRate !== null && useRate >= 0.5 && meaningfulUses >= 3
        ? "established"
        : "emerging";
  const outcome: OutcomeMaturity =
    qualifiedSamples >= 3
      ? "qualified"
      : qualifiedSamples > 0
        ? "early-signal"
        : "insufficient";
  const observedLift =
    typeof input.outcome.observedLift === "number" &&
    Number.isFinite(input.outcome.observedLift)
      ? input.outcome.observedLift
      : null;

  return {
    capability: { level: capability, passedChecks, totalChecks },
    adoption: {
      level: adoption,
      meaningfulUses,
      eligibleOpportunities,
      useRate
    },
    outcome: {
      level: outcome,
      qualifiedSamples,
      positiveSamples,
      observedLift
    },
    reasons: [
      `Capability is ${capability} from ${passedChecks}/${totalChecks} checks.`,
      meaningfulUses
        ? `Adoption is ${adoption} from ${meaningfulUses} meaningful uses.`
        : "Adoption has not yet been observed; this is not failure.",
      qualifiedSamples === 0
        ? "Personal outcome evidence is insufficient."
        : qualifiedSamples < 3
          ? "Personal outcome evidence is an early signal, not proof."
          : "Personal outcome evidence is qualified.",
      "Capability, adoption, and personal outcome remain independent."
    ]
  };
}
