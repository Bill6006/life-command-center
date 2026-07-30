import type { ForecastContextInput, MoveOutcomeRecord } from "./types";

export interface IntelligenceGoldenFixture {
  id: string;
  contractVersion: "phase-6-golden-v1";
  input: ForecastContextInput;
  outcomes?: MoveOutcomeRecord[];
  expected: {
    forecastScore: number;
    forecastBand: "red" | "yellow" | "green";
    forecastMode: "protect" | "stabilize" | "build" | "expand";
    capacityBand: "low" | "normal" | "high";
    capacityProvisional: boolean;
    protectedNextLane: "protect" | "future" | "connection";
    primaryBottleneck: string;
    selectedCandidate: string;
    reachablePeak: number;
  };
}

export const INTELLIGENCE_GOLDEN_FIXTURES: readonly IntelligenceGoldenFixture[] =
  [
    {
      id: "blank-first-run",
      contractVersion: "phase-6-golden-v1",
      input: {
        dateKey: "2026-07-29",
        now: new Date(2026, 6, 29, 13, 0),
        place: "home"
      },
      expected: {
        forecastScore: 62,
        forecastBand: "yellow",
        forecastMode: "stabilize",
        capacityBand: "low",
        capacityProvisional: true,
        protectedNextLane: "connection",
        primaryBottleneck: "data-confidence",
        selectedCandidate: "qualified-check-in",
        reachablePeak: 68
      }
    },
    {
      id: "legacy-weight-boundary",
      contractVersion: "phase-6-golden-v1",
      input: {
        dateKey: "2026-07-29",
        now: new Date(2026, 6, 29, 13, 0),
        place: "home",
        protectiveCount: 2,
        riskCount: 1,
        effectiveEvidenceDays: 20,
        recoveryRisk: 30,
        signals: { energy: 7, mood: 7, focus: 7, drive: 7 }
      },
      expected: {
        forecastScore: 69,
        forecastBand: "yellow",
        forecastMode: "stabilize",
        capacityBand: "high",
        capacityProvisional: false,
        protectedNextLane: "future",
        primaryBottleneck: "recovery-risk",
        selectedCandidate: "recovery-floor",
        reachablePeak: 81
      }
    },
    {
      id: "low-capacity-urgent-protection",
      contractVersion: "phase-6-golden-v1",
      input: {
        dateKey: "2026-07-29",
        now: new Date(2026, 6, 29, 10, 0),
        place: "home",
        availableMinutes: 10,
        effectiveEvidenceDays: 20,
        recoveryRisk: 80,
        signals: { energy: 2, mood: 4, focus: 3, drive: 3 }
      },
      expected: {
        forecastScore: 48,
        forecastBand: "red",
        forecastMode: "protect",
        capacityBand: "low",
        capacityProvisional: false,
        protectedNextLane: "protect",
        primaryBottleneck: "recovery-risk",
        selectedCandidate: "recovery-floor",
        reachablePeak: 51
      }
    },
    {
      id: "high-capacity-confirmed-focus",
      contractVersion: "phase-6-golden-v1",
      input: {
        dateKey: "2026-07-29",
        now: new Date(2026, 6, 29, 10, 0),
        place: "home",
        availableMinutes: 60,
        protectiveCount: 3,
        effectiveEvidenceDays: 30,
        recoveryRisk: 20,
        weeklyFocus: "career",
        signals: { energy: 8, mood: 8, focus: 8, drive: 8 }
      },
      expected: {
        forecastScore: 78,
        forecastBand: "green",
        forecastMode: "build",
        capacityBand: "high",
        capacityProvisional: false,
        protectedNextLane: "future",
        primaryBottleneck: "environment-friction",
        selectedCandidate: "future-ten",
        reachablePeak: 96
      }
    },
    {
      id: "driving-safety",
      contractVersion: "phase-6-golden-v1",
      input: {
        dateKey: "2026-07-29",
        now: new Date(2026, 6, 29, 10, 0),
        place: "driving",
        availableMinutes: 30,
        effectiveEvidenceDays: 30,
        recoveryRisk: 20,
        signals: { energy: 8, mood: 8, focus: 8, drive: 8 }
      },
      expected: {
        forecastScore: 64,
        forecastBand: "yellow",
        forecastMode: "stabilize",
        capacityBand: "high",
        capacityProvisional: false,
        protectedNextLane: "future",
        primaryBottleneck: "recovery-risk",
        selectedCandidate: "safe-driving-protect",
        reachablePeak: 74
      }
    }
  ];
