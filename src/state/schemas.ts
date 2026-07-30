import { z } from "zod";
import { CURRENT_SCHEMA_VERSION } from "./model";

const unknownRecordSchema = z.record(z.string(), z.unknown());

export const appSettingsSchema = z
  .object({
    activeTab: z.string().default("today"),
    autoBackupEnabled: z.boolean().default(true),
    autoBackupMinutes: z.number().min(5).max(1440).default(30),
    dayRolloverMode: z.string().default("after_sleep_4am"),
    timeZone: z.string().default("America/New_York"),
    timeZoneLabel: z.string().default("Eastern Time"),
    guides: unknownRecordSchema.default({})
  })
  .passthrough();

export const dayRecordSchema = z
  .object({
    _updatedAt: z.string().optional(),
    _inputUpdatedAt: z.string().optional(),
    _logged: unknownRecordSchema.optional(),
    forecastActions: z.array(z.unknown()).optional(),
    minimumWins: z.array(z.unknown()).optional()
  })
  .passthrough();

export const domainStateSchema = z
  .object({
    azure: unknownRecordSchema.default({}),
    learning: unknownRecordSchema.default({}),
    money: unknownRecordSchema.default({}),
    childGrowth: unknownRecordSchema.default({}),
    faith: unknownRecordSchema.default({}),
    health: unknownRecordSchema.default({}),
    pattern: unknownRecordSchema.default({}),
    social: unknownRecordSchema.default({}),
    therapy: unknownRecordSchema.default({}),
    vision: unknownRecordSchema.default({}),
    environment: unknownRecordSchema.default({}),
    weeklyAnchors: unknownRecordSchema.default({})
  })
  .passthrough();

export const appStateSchema = z
  .object({
    schemaVersion: z.string().default(CURRENT_SCHEMA_VERSION),
    settings: appSettingsSchema,
    days: z.record(z.string(), dayRecordSchema).default({}),
    domains: domainStateSchema,
    logs: z.array(z.unknown()).default([]),
    _domainUpdatedAt: z.record(z.string(), z.string()).default({}),
    _savedAt: z.string().optional(),
    _inputUpdatedAt: z.string().optional()
  })
  .passthrough();

export type ParsedAppState = z.infer<typeof appStateSchema>;
