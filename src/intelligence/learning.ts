import {
  completionProbability,
  learnedLiftForCandidate,
  observedOutcomeLift,
  selectComparableRecords
} from "./optimization";
import type {
  ForecastContext,
  IntelligenceCandidate,
  MoveOutcomeRecord
} from "./types";

export type MoveLearningMaturity =
  | "insufficient"
  | "early-signal"
  | "qualified";

export interface MoveLearningProfile {
  candidateId: string;
  family: string;
  predictedEffect: [number, number];
  observed: {
    lift: number | null;
    comparableSamples: number;
    qualifiedSamples: number;
    maturity: MoveLearningMaturity;
  };
  completion: {
    probability: number;
    started: number;
    completed: number;
    feasibilityRejections: number;
  };
  reasons: string[];
}

export function buildMoveLearningProfile(
  context: ForecastContext,
  candidate: IntelligenceCandidate,
  records: readonly MoveOutcomeRecord[]
): MoveLearningProfile {
  const relevant = records.filter(
    (record) => record.candidateId === candidate.id
  );
  const comparable = selectComparableRecords(context, relevant);
  const qualifiedSamples = comparable.filter(
    ({ record }) => observedOutcomeLift(record) !== null
  ).length;
  const maturity: MoveLearningMaturity =
    qualifiedSamples >= 3
      ? "qualified"
      : qualifiedSamples > 0
        ? "early-signal"
        : "insufficient";
  const observedLift = learnedLiftForCandidate(
    context,
    candidate.id,
    relevant
  );
  const started = relevant.filter((record) => record.started).length;
  const completed = relevant.filter((record) => record.completed).length;
  const feasibilityRejections = relevant.filter(
    (record) => record.rejectedForFeasibility
  ).length;

  return {
    candidateId: candidate.id,
    family: candidate.family,
    predictedEffect: [...candidate.expectedEffect],
    observed: {
      lift: observedLift,
      comparableSamples: comparable.length,
      qualifiedSamples,
      maturity
    },
    completion: {
      probability: completionProbability(
        relevant,
        candidate.effort,
        candidate.durationMinutes
      ),
      started,
      completed,
      feasibilityRejections
    },
    reasons: [
      `Predicted effect remains the library range ${candidate.expectedEffect[0]}–${candidate.expectedEffect[1]}.`,
      qualifiedSamples === 0
        ? "No qualified observed outcome is claimed."
        : qualifiedSamples < 3
          ? `${qualifiedSamples} observed result is an early signal, not proof.`
          : `${qualifiedSamples} comparable observed results qualify for personal learning.`,
      feasibilityRejections
        ? "Feasibility rejections affect completion fit but never observed lift."
        : "No feasibility rejection adjustment was needed."
    ]
  };
}
