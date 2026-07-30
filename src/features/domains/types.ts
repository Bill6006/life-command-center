import type { EvidenceState } from "../today/types";

export type DomainTabId =
  | "azure"
  | "money"
  | "father"
  | "faith"
  | "health"
  | "pattern"
  | "social"
  | "therapy"
  | "week"
  | "vision";

export type DomainId = DomainTabId | "environment";
export type DomainStorageKey =
  | "azure"
  | "money"
  | "childGrowth"
  | "faith"
  | "health"
  | "pattern"
  | "social"
  | "therapy"
  | "weeklyAnchors"
  | "vision"
  | "environment";

export type DomainFieldKind = "choice" | "number" | "scale" | "text" | "time" | "toggle";
export type DomainFieldScope = "day" | "durable";

export interface DomainFieldOption {
  label: string;
  value: string;
}

export interface DomainFieldDefinition {
  id: string;
  label: string;
  kind: DomainFieldKind;
  scope: DomainFieldScope;
  help?: string;
  max?: number;
  min?: number;
  options?: readonly DomainFieldOption[];
  private?: boolean;
  step?: number;
}

export interface DomainSectionDefinition {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  fields: readonly DomainFieldDefinition[];
}

export interface DomainDefinition {
  id: DomainId;
  tab: DomainTabId | "today";
  storageKey: DomainStorageKey;
  eyebrow: string;
  title: string;
  description: string;
  boundary: string;
  sections: readonly DomainSectionDefinition[];
}

export type DomainFieldPrimitive = boolean | number | string | null;

export interface DomainFieldRecord {
  value: DomainFieldPrimitive;
  evidenceState: EvidenceState;
  updatedAt?: string;
}

export interface WorkWinRecord {
  id: string;
  technology: string;
  issue: string;
  action: string;
  result: string;
  evidenceStatus: "unverified" | "observed" | "verified";
  sensitive: boolean;
  status: "draft" | "complete";
  createdAt: string;
  updatedAt: string;
}
