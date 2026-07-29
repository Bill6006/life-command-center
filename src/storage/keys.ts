export const STORAGE_KEYS = {
  primary: "tyree_life_command_center_v1",
  stateWindowPrefix: "TLCC_STATE::",
  sessionBackup: "tyree_life_command_center_v1_session_backup",
  latestBackup: "tyree_life_command_center_v1_backup_latest",
  lastGood: "tyree_life_command_center_v1_last_good",
  criticalRecovery: "tyree_life_command_center_v1_critical_recovery",
  dayCachePrefix: "tyree_life_command_center_v1_day_",
  restorePending: "tyree_life_command_center_v1_verified_import_pending_v1",
  restoreInstance: "tyree_life_command_center_v1_storage_instance_v1",
  restoreSession: "tyree_life_command_center_v1_verified_import_session_v1"
} as const;

export const INDEXED_DB_KEYS = {
  database: "tlcc_persistent_store_v1",
  store: "state",
  active: "tlcc_active",
  latest: "latest",
  backupLatest: "backup_latest",
  lastGood: "last_good",
  preImportPrefix: "pre_import::"
} as const;

export function isLegacyGrowthRecoveryKey(key: string): boolean {
  return key.startsWith(`${STORAGE_KEYS.primary}_`) && key.endsWith("_growth_recovery");
}
