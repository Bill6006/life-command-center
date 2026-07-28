# Legacy Owner Inventory

This mechanically generated inventory proves complete traversal of the
authoritative legacy source without committing that source. Protected
personal identifiers are replaced with neutral compatibility labels before
this report is written.

- Script blocks parsed: 12
- Style blocks indexed: 10
- Declared functions indexed: 1377
- Total callable owners indexed: 1904
- JavaScript parse errors: 0
- State/member paths indexed: 506
- Static element IDs indexed: 169

## Script ownership

| Script | Source lines | Bytes | Declared functions | Callable owners |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 348–15961 | 1022692 | 1121 | 1481 |
| 2 | 15967–16275 | 45081 | 16 | 68 |
| 3 | 16287–16452 | 15208 | 10 | 18 |
| 4 | 16480–16683 | 24758 | 26 | 35 |
| 5 | 16699–16885 | 35037 | 45 | 58 |
| 6 | 16898–17038 | 55599 | 35 | 61 |
| 7 | 17054–17358 | 37928 | 27 | 48 |
| 8 | 17373–17535 | 36666 | 37 | 50 |
| 9 | 17541–17684 | 29329 | 22 | 34 |
| 10 | 17700–17963 | 30898 | 35 | 46 |
| 11 | 17965–17968 | 156 | 0 | 0 |
| 12 | 17970–18027 | 7710 | 3 | 5 |

## Classification totals

| Classification | Owners |
| --- | ---: |
| automation/guide | 80 |
| compatibility/domain | 504 |
| diagnostic/test | 522 |
| export | 119 |
| navigation | 5 |
| persistence | 352 |
| pure domain logic | 273 |
| rendering | 19 |
| state mutation | 30 |

## Domain totals

| Domain | Owners |
| --- | ---: |
| azure/learning | 113 |
| diagnostics | 521 |
| environment | 17 |
| exports | 73 |
| faith | 24 |
| fatherhood/child | 30 |
| guides | 81 |
| health/recovery | 42 |
| intelligence | 152 |
| money | 15 |
| navigation/shell | 12 |
| pattern/private | 88 |
| shared | 228 |
| social/presence | 24 |
| storage/restore | 397 |
| therapy | 19 |
| today | 62 |
| week | 6 |

## Callable owner ledger

The source-line identity remains stable even where later patch scripts
replace an earlier global function. This makes override ownership explicit.

| Owner ID | Line | Kind | Domain | Classification | Source owner |
| --- | ---: | --- | --- | --- | --- |
| S1-L355-1 | 355 | declaration | azure/learning | compatibility/domain | `normalizeClaimStatus` |
| S1-L414-2 | 414 | declaration | money | persistence | `renderCacheGet` |
| S1-L423-3 | 423 | declaration | exports | export | `invalidateDerivedCaches` |
| S1-L428-4 | 428 | declaration | storage/restore | export | `ensureLightStateForRender` |
| S1-L520-5 | 520 | declaration | money | compatibility/domain | `blankNightInputs` |
| S1-L530-6 | 530 | declaration | exports | export | `defaultPattern` |
| S1-L546-7 | 546 | declaration | shared | pure domain logic | `blankDayFoodPeriod` |
| S1-L547-8 | 547 | declaration | shared | pure domain logic | `defaultDayFood` |
| S1-L548-9 | 548 | declaration | shared | compatibility/domain | `defaultMorningStart` |
| S1-L549-10 | 549 | declaration | faith | pure domain logic | `defaultSaturdayDay` |
| S1-L550-11 | 550 | declaration | faith | compatibility/domain | `defaultFaithProgress` |
| S1-L551-12 | 551 | declaration | exports | export | `defaultFaithDay` |
| S1-L552-13 | 552 | declaration | faith | compatibility/domain | `faithProgressState` |
| S1-L553-14 | 553 | declaration | faith | compatibility/domain | `faithTotalSubjects` |
| S1-L554-15 | 554 | declaration | faith | compatibility/domain | `faithCurrentIndex` |
| S1-L555-16 | 555 | declaration | faith | compatibility/domain | `faithCompletedBeforeCurrent` |
| S1-L556-17 | 556 | declaration | today | pure domain logic | `faithCompletedWithToday` |
| S1-L557-18 | 557 | declaration | storage/restore | persistence | `setFaith` |
| S1-L558-19 | 558 | declaration | storage/restore | persistence | `setFaithProgress` |
| S1-L559-20 | 559 | declaration | storage/restore | persistence | `advanceFaithSubject` |
| S1-L560-21 | 560 | declaration | faith | compatibility/domain | `faithMinimumDone` |
| S1-L561-22 | 561 | declaration | faith | pure domain logic | `faithWeekStats` |
| S1-L562-23 | 562 | declaration | today | compatibility/domain | `faithRepOptions` |
| S1-L567-24 | 567 | arrow | shared | state mutation | `add` |
| S1-L576-25 | 576 | declaration | today | compatibility/domain | `faithRepRecommendation` |
| S1-L577-26 | 577 | declaration | storage/restore | persistence | `logFaithRep` |
| S1-L585-27 | 585 | declaration | faith | pure domain logic | `faithSummaryForDay` |
| S1-L587-28 | 587 | declaration | guides | automation/guide | `dayFoodPeriodKey` |
| S1-L588-29 | 588 | declaration | azure/learning | pure domain logic | `dayFoodPeriodLabel` |
| S1-L589-30 | 589 | declaration | shared | pure domain logic | `dayFoodScope` |
| S1-L595-31 | 595 | declaration | shared | compatibility/domain | `morningFoodVisibleAny` |
| S1-L599-32 | 599 | declaration | exports | export | `syncAutomaticMorningNoBreakfast` |
| S1-L616-33 | 616 | declaration | shared | pure domain logic | `dayFoodHasAny` |
| S1-L620-34 | 620 | declaration | storage/restore | persistence | `setDayFood` |
| S1-L635-35 | 635 | declaration | azure/learning | pure domain logic | `dayFoodBool` |
| S1-L639-36 | 639 | declaration | shared | pure domain logic | `dayFoodFields` |
| S1-L644-37 | 644 | declaration | guides | automation/guide | `renderDayFoodCard` |
| S1-L646-38 | 646 | declaration | pattern/private | compatibility/domain | `getNightTarget` |
| S1-L657-39 | 657 | declaration | pattern/private | state mutation | `setStoredNightTarget` |
| S1-L678-40 | 678 | declaration | shared | compatibility/domain | `deepClone` |
| S1-L679-41 | 679 | declaration | storage/restore | persistence | `safeLocalGet` |
| S1-L680-42 | 680 | declaration | storage/restore | persistence | `safeLocalSet` |
| S1-L681-43 | 681 | declaration | storage/restore | persistence | `safeLocalRemove` |
| S1-L682-44 | 682 | declaration | storage/restore | persistence | `safeSessionGet` |
| S1-L683-45 | 683 | declaration | storage/restore | persistence | `safeSessionSet` |
| S1-L684-46 | 684 | declaration | storage/restore | persistence | `safeSessionRemove` |
| S1-L685-47 | 685 | declaration | diagnostics | diagnostic/test | `browserStorageWorks` |
| S1-L689-48 | 689 | declaration | diagnostics | diagnostic/test | `sessionStorageWorks` |
| S1-L693-49 | 693 | declaration | shared | compatibility/domain | `isLocalAppMode` |
| S1-L694-50 | 694 | declaration | diagnostics | diagnostic/test | `isAndroidLocalHtmlMode` |
| S1-L697-51 | 697 | declaration | storage/restore | persistence | `needsImmediateTabRecoveryWrite` |
| S1-L707-52 | 707 | declaration | shared | persistence | `partsInZone` |
| S1-L722-53 | 722 | declaration | shared | pure domain logic | `localDateKey` |
| S1-L726-54 | 726 | declaration | diagnostics | diagnostic/test | `localDateLabel` |
| S1-L729-55 | 729 | declaration | azure/learning | pure domain logic | `localDateTimeLabel` |
| S1-L732-56 | 732 | declaration | shared | compatibility/domain | `localHourInAppZone` |
| S1-L736-57 | 736 | declaration | shared | pure domain logic | `dateFromKey` |
| S1-L740-58 | 740 | declaration | shared | pure domain logic | `offsetDateKey` |
| S1-L745-59 | 745 | declaration | health/recovery | pure domain logic | `dayRolloverMode` |
| S1-L748-60 | 748 | declaration | today | persistence | `todayKey` |
| S1-L767-61 | 767 | declaration | diagnostics | diagnostic/test | `todayLabel` |
| S1-L768-62 | 768 | declaration | health/recovery | pure domain logic | `isUsingPreviousSleepDay` |
| S1-L769-63 | 769 | declaration | guides | automation/guide | `dayRolloverHint` |
| S1-L775-64 | 775 | declaration | storage/restore | persistence | `setDayRolloverMode` |
| S1-L781-65 | 781 | declaration | social/presence | pure domain logic | `maybeStartManualDay` |
| S1-L789-66 | 789 | declaration | guides | automation/guide | `dayRolloverSettingsHtml` |
| S1-L797-67 | 797 | declaration | exports | compatibility/domain | `backupFileStamp` |
| S1-L801-68 | 801 | declaration | storage/restore | export | `downloadTextFile` |
| S1-L810-69 | 810 | declaration | storage/restore | export | `autoBackupEnabled` |
| S1-L811-70 | 811 | declaration | exports | compatibility/domain | `autoBackupIntervalMs` |
| S1-L815-71 | 815 | declaration | storage/restore | persistence | `markAutoBackupDue` |
| S1-L825-72 | 825 | declaration | storage/restore | export | `setAutoBackupDownloads` |
| S1-L843-73 | 843 | declaration | storage/restore | persistence | `setAutoBackupInterval` |
| S1-L849-74 | 849 | declaration | storage/restore | export | `autoBackupStatusText` |
| S1-L856-75 | 856 | declaration | diagnostics | diagnostic/test | `autoBackupSettingsHtml` |
| S1-L863-76 | 863 | declaration | storage/restore | export | `scheduleAutoBackupDownload` |
| S1-L871-77 | 871 | declaration | storage/restore | export | `maybeAutoBackupDownload` |
| S1-L902-78 | 902 | declaration | diagnostics | diagnostic/test | `downloadBackupNow` |
| S1-L949-79 | 949 | declaration | storage/restore | persistence | `stateForStorage` |
| S1-L956-80 | 956 | declaration | shared | compatibility/domain | `encodeStateRawForHash` |
| S1-L965-81 | 965 | declaration | shared | compatibility/domain | `decodeStateRawFromHashToken` |
| S1-L975-82 | 975 | declaration | shared | compatibility/domain | `rawFromUrlHash` |
| S1-L982-83 | 982 | declaration | storage/restore | persistence | `writeRawToUrlHash` |
| S1-L995-84 | 995 | declaration | storage/restore | persistence | `scheduleDeferredRecoveryWrites` |
| S1-L1002-85 | 1002 | declaration | storage/restore | export | `writeImmediateTabRecovery` |
| S1-L1013-86 | 1013 | declaration | storage/restore | persistence | `flushDeferredRecoveryWrites` |
| S1-L1030-87 | 1030 | declaration | shared | compatibility/domain | `mergeValues` |
| S1-L1046-88 | 1046 | declaration | azure/learning | pure domain logic | `bestDayTimestamp` |
| S1-L1049-89 | 1049 | declaration | storage/restore | persistence | `normalizeDayKeysToLocal` |
| S1-L1055-90 | 1055 | declaration | shared | compatibility/domain | `stampFromIso` |
| S1-L1058-91 | 1058 | declaration | shared | pure domain logic | `newestTimelineStamp` |
| S1-L1064-92 | 1064 | declaration | storage/restore | persistence | `daySaveStamp` |
| S1-L1083-93 | 1083 | declaration | storage/restore | persistence | `rawSaveStamp` |
| S1-L1096-94 | 1096 | declaration | storage/restore | persistence | `compactDayForRecovery` |
| S1-L1102-95 | 1102 | declaration | storage/restore | persistence | `buildCriticalRecoveryState` |
| S1-L1110-96 | 1110 | declaration | storage/restore | persistence | `criticalRawCandidates` |
| S1-L1112-97 | 1112 | arrow | shared | compatibility/domain | `push` |
| S1-L1118-98 | 1118 | declaration | storage/restore | persistence | `mergeCriticalRecoveryIntoState` |
| S1-L1151-99 | 1151 | declaration | storage/restore | persistence | `writeCriticalRecoveryState` |
| S1-L1161-100 | 1161 | declaration | storage/restore | persistence | `buildchildRecoveryState` |
| S1-L1176-101 | 1176 | declaration | storage/restore | persistence | `childRecoveryRawCandidates` |
| S1-L1178-102 | 1178 | arrow | shared | compatibility/domain | `push` |
| S1-L1185-103 | 1185 | declaration | storage/restore | persistence | `mergechildRecoveryIntoState` |
| S1-L1215-104 | 1215 | declaration | storage/restore | persistence | `writechildRecoveryState` |
| S1-L1227-105 | 1227 | declaration | storage/restore | persistence | `collectSavedRawCandidates` |
| S1-L1229-106 | 1229 | arrow | shared | compatibility/domain | `push` |
| S1-L1241-107 | 1241 | declaration | storage/restore | persistence | `restoreDayCachesIntoState` |
| S1-L1244-108 | 1244 | arrow | intelligence | pure domain logic | `pushDay` |
| S1-L1264-109 | 1264 | declaration | intelligence | pure domain logic | `meaningfulDayStamp` |
| S1-L1281-110 | 1281 | declaration | shared | pure domain logic | `dateKeyMiddayStamp` |
| S1-L1289-111 | 1289 | declaration | guides | automation/guide | `guideCompletionStampFromSettings` |
| S1-L1306-112 | 1306 | declaration | azure/learning | compatibility/domain | `globalCanonicalDomains` |
| S1-L1307-113 | 1307 | declaration | navigation/shell | navigation | `jsonStableValue` |
| S1-L1308-114 | 1308 | declaration | azure/learning | compatibility/domain | `globalDomainSnapshot` |
| S1-L1320-115 | 1320 | declaration | navigation/shell | compatibility/domain | `computeDomainHashes` |
| S1-L1325-116 | 1325 | declaration | storage/restore | persistence | `azureProofStageIndexSafe` |
| S1-L1332-117 | 1332 | declaration | storage/restore | persistence | `azureProofStageLabelSafe` |
| S1-L1338-118 | 1338 | declaration | storage/restore | persistence | `azureStatusFromProofStageSafe` |
| S1-L1348-119 | 1348 | declaration | azure/learning | compatibility/domain | `azureStageFromSkillStatusSafe` |
| S1-L1349-120 | 1349 | declaration | azure/learning | compatibility/domain | `azureDomainMeaningScore` |
| S1-L1361-121 | 1361 | declaration | azure/learning | compatibility/domain | `domainMeaningScore` |
| S1-L1372-122 | 1372 | declaration | storage/restore | persistence | `globalDomainStamp` |
| S1-L1394-123 | 1394 | declaration | diagnostics | diagnostic/test | `repairAzureCanonicalState` |
| S1-L1440-124 | 1440 | declaration | storage/restore | persistence | `repairGlobalCanonicalStateForSave` |
| S1-L1457-125 | 1457 | declaration | diagnostics | diagnostic/test | `shouldCopyGlobalDomain` |
| S1-L1473-126 | 1473 | declaration | shared | pure domain logic | `mergeDomainUpdatedAt` |
| S1-L1484-127 | 1484 | declaration | storage/restore | persistence | `mergeGlobalCanonicalDomains` |
| S1-L1499-128 | 1499 | declaration | guides | automation/guide | `copyGuideCompletionIfNewer` |
| S1-L1513-129 | 1513 | declaration | guides | automation/guide | `mergeGuideCompletionSettings` |
| S1-L1525-130 | 1525 | declaration | guides | automation/guide | `guideCompletionKeys` |
| S1-L1530-131 | 1530 | declaration | guides | automation/guide | `guideStatePeriodForCompletion` |
| S1-L1538-132 | 1538 | declaration | guides | automation/guide | `guideStateTimeStamp` |
| S1-L1541-133 | 1541 | declaration | guides | automation/guide | `guideCompletionStampForPeriod` |
| S1-L1549-134 | 1549 | declaration | storage/restore | persistence | `shouldDiscardGuideStateAfterCompletion` |
| S1-L1569-135 | 1569 | declaration | guides | automation/guide | `sanitizeGuideStateAfterCompletion` |
| S1-L1578-136 | 1578 | declaration | guides | automation/guide | `syncGuideStateToSettings` |
| S1-L1587-137 | 1587 | declaration | diagnostics | diagnostic/test | `meaningfulStateStamp` |
| S1-L1598-138 | 1598 | declaration | shared | pure domain logic | `stateInputUpdatedStamp` |
| S1-L1608-139 | 1608 | declaration | azure/learning | pure domain logic | `dayContentStamp` |
| S1-L1617-140 | 1617 | declaration | diagnostics | diagnostic/test | `stateAntiRollbackStamp` |
| S1-L1627-141 | 1627 | declaration | storage/restore | persistence | `rawAntiRollbackStamp` |
| S1-L1630-142 | 1630 | declaration | storage/restore | persistence | `stateSavedOnlyStamp` |
| S1-L1631-143 | 1631 | declaration | storage/restore | persistence | `stateRankForNormalRecovery` |
| S1-L1637-144 | 1637 | declaration | storage/restore | persistence | `incomingWouldRollback` |
| S1-L1650-145 | 1650 | declaration | storage/restore | persistence | `mergeStatesWithoutRollback` |
| S1-L1656-146 | 1656 | declaration | storage/restore | persistence | `guardRawAgainstRollbackForWrite` |
| S1-L1670-147 | 1670 | declaration | storage/restore | persistence | `collectSharedRawCandidates` |
| S1-L1671-148 | 1671 | arrow | shared | compatibility/domain | `push` |
| S1-L1679-149 | 1679 | declaration | diagnostics | diagnostic/test | `latestSharedSavedRaw` |
| S1-L1691-150 | 1691 | declaration | storage/restore | persistence | `parseStateRaw` |
| S1-L1694-151 | 1694 | declaration | storage/restore | persistence | `mergeStatesNewestWins` |
| S1-L1731-152 | 1731 | declaration | diagnostics | diagnostic/test | `mergeLatestSharedStateIfNewer` |
| S1-L1754-153 | 1754 | declaration | storage/restore | persistence | `mergeRawStateCandidates` |
| S1-L1777-154 | 1777 | declaration | storage/restore | persistence | `readSavedRaw` |
| S1-L1789-155 | 1789 | declaration | storage/restore | persistence | `idbOpen` |
| S1-L1793-156 | 1793 | assigned | storage/restore | persistence | `req.onupgradeneeded` |
| S1-L1794-157 | 1794 | assigned | shared | compatibility/domain | `req.onsuccess` |
| S1-L1795-158 | 1795 | assigned | shared | compatibility/domain | `req.onerror` |
| S1-L1796-159 | 1796 | assigned | storage/restore | persistence | `req.onblocked` |
| S1-L1799-160 | 1799 | declaration | diagnostics | diagnostic/test | `idbPutRawStrict` |
| S1-L1804-161 | 1804 | arrow | storage/restore | persistence | `fail` |
| S1-L1807-162 | 1807 | assigned | shared | compatibility/domain | `tx.oncomplete` |
| S1-L1808-163 | 1808 | assigned | storage/restore | persistence | `tx.onerror` |
| S1-L1809-164 | 1809 | assigned | storage/restore | persistence | `tx.onabort` |
| S1-L1810-165 | 1810 | assigned | storage/restore | persistence | `req.onerror` |
| S1-L1815-166 | 1815 | declaration | diagnostics | diagnostic/test | `idbGetRawStrict` |
| S1-L1820-167 | 1820 | arrow | storage/restore | persistence | `fail` |
| S1-L1823-168 | 1823 | assigned | shared | compatibility/domain | `tx.oncomplete` |
| S1-L1824-169 | 1824 | assigned | storage/restore | persistence | `tx.onerror` |
| S1-L1825-170 | 1825 | assigned | storage/restore | persistence | `tx.onabort` |
| S1-L1826-171 | 1826 | assigned | shared | compatibility/domain | `req.onsuccess` |
| S1-L1826-172 | 1826 | assigned | storage/restore | persistence | `req.onerror` |
| S1-L1831-173 | 1831 | declaration | storage/restore | persistence | `idbDeleteRawStrict` |
| S1-L1836-174 | 1836 | arrow | storage/restore | persistence | `fail` |
| S1-L1839-175 | 1839 | assigned | shared | compatibility/domain | `tx.oncomplete` |
| S1-L1840-176 | 1840 | assigned | storage/restore | persistence | `tx.onerror` |
| S1-L1841-177 | 1841 | assigned | storage/restore | persistence | `tx.onabort` |
| S1-L1842-178 | 1842 | assigned | storage/restore | persistence | `req.onerror` |
| S1-L1847-179 | 1847 | declaration | diagnostics | diagnostic/test | `idbPutRaw` |
| S1-L1850-180 | 1850 | declaration | diagnostics | diagnostic/test | `idbGetRaw` |
| S1-L1853-181 | 1853 | declaration | diagnostics | diagnostic/test | `hydrateFromIndexedDB` |
| S1-L1867-182 | 1867 | declaration | storage/restore | persistence | `scheduleSecondaryStorageWrites` |
| S1-L1876-183 | 1876 | declaration | diagnostics | diagnostic/test | `pruneDayCacheKeys` |
| S1-L1896-184 | 1896 | declaration | storage/restore | persistence | `flushSecondaryStorageWrites` |
| S1-L1923-185 | 1923 | declaration | storage/restore | persistence | `writeCompactSavedRaw` |
| S1-L1939-186 | 1939 | declaration | storage/restore | persistence | `writeSavedState` |
| S1-L1945-187 | 1945 | declaration | storage/restore | persistence | `writeSavedRaw` |
| S1-L1954-188 | 1954 | declaration | storage/restore | persistence | `clearSavedRaw` |
| S1-L1962-189 | 1962 | declaration | storage/restore | persistence | `loadState` |
| S1-L1972-190 | 1972 | declaration | storage/restore | export | `migrate` |
| S1-L2030-191 | 2030 | declaration | intelligence | pure domain logic | `migrateDay` |
| S1-L2087-192 | 2087 | declaration | exports | export | `snapshotGlobalState` |
| S1-L2114-193 | 2114 | declaration | today | pure domain logic | `captureTodaySnapshot` |
| S1-L2124-194 | 2124 | declaration | storage/restore | export | `shouldCountAsInputUpdate` |
| S1-L2152-195 | 2152 | declaration | shared | pure domain logic | `queueInputUpdatedFromEvent` |
| S1-L2158-196 | 2158 | declaration | storage/restore | persistence | `markInputUpdated` |
| S1-L2174-197 | 2174 | declaration | shared | pure domain logic | `maybeMarkInputUpdated` |
| S1-L2185-198 | 2185 | declaration | diagnostics | diagnostic/test | `maybeMergeLatestSharedStateOnSave` |
| S1-L2194-199 | 2194 | declaration | today | pure domain logic | `shouldCaptureTodaySnapshotNow` |
| S1-L2203-200 | 2203 | declaration | diagnostics | diagnostic/test | `latestInputUpdatedStamp` |
| S1-L2229-201 | 2229 | declaration | storage/restore | persistence | `scheduleSaveFlush` |
| S1-L2232-202 | 2232 | arrow | storage/restore | persistence | `run` |
| S1-L2242-203 | 2242 | declaration | storage/restore | persistence | `prepStateForSave` |
| S1-L2268-204 | 2268 | declaration | storage/restore | persistence | `save` |
| S1-L2292-205 | 2292 | declaration | diagnostics | diagnostic/test | `flushPendingSaveNow` |
| S1-L2325-206 | 2325 | declaration | intelligence | pure domain logic | `resetDailyNonSliderFields` |
| S1-L2352-207 | 2352 | declaration | storage/restore | persistence | `applyOneTimeDailyCarryFix` |
| S1-L2362-208 | 2362 | declaration | diagnostics | diagnostic/test | `day` |
| S1-L2372-209 | 2372 | declaration | intelligence | pure domain logic | `defaultDay` |
| S1-L2373-210 | 2373 | declaration | diagnostics | diagnostic/test | `latestPriorEntry` |
| S1-L2380-211 | 2380 | declaration | diagnostics | diagnostic/test | `latestPriorDay` |
| S1-L2384-212 | 2384 | declaration | diagnostics | diagnostic/test | `defaultDayFromPrevious` |
| S1-L2441-213 | 2441 | declaration | shared | compatibility/domain | `pct` |
| S1-L2442-214 | 2442 | declaration | shared | compatibility/domain | `fmt` |
| S1-L2443-215 | 2443 | declaration | shared | compatibility/domain | `esc` |
| S1-L2457-216 | 2457 | declaration | storage/restore | export | `dayPositiveEvidence` |
| S1-L2485-217 | 2485 | declaration | intelligence | pure domain logic | `rangeEvidenceLogged` |
| S1-L2492-218 | 2492 | declaration | intelligence | pure domain logic | `dayEvidenceSlotState` |
| S1-L2503-219 | 2503 | declaration | intelligence | pure domain logic | `dayEvidenceIntegrity` |
| S1-L2524-220 | 2524 | declaration | intelligence | pure domain logic | `evidenceWeightedAverage` |
| S1-L2534-221 | 2534 | declaration | intelligence | pure domain logic | `loggedNumericValue` |
| S1-L2540-222 | 2540 | declaration | shared | state mutation | `loggedNestedNumericValue` |
| S1-L2548-223 | 2548 | declaration | intelligence | rendering | `evidenceIntegrityOverview` |
| S1-L2564-224 | 2564 | declaration | intelligence | pure domain logic | `scoreDay` |
| S1-L2591-225 | 2591 | declaration | today | pure domain logic | `sevenDay` |
| S1-L2599-226 | 2599 | declaration | diagnostics | diagnostic/test | `updateSaveStatus` |
| S1-L2623-227 | 2623 | declaration | storage/restore | persistence | `commitFocusedField` |
| S1-L2638-228 | 2638 | declaration | diagnostics | diagnostic/test | `scheduleAutosave` |
| S1-L2645-229 | 2645 | declaration | guides | automation/guide | `guidePeriodHasAnyLoggedData` |
| S1-L2674-230 | 2674 | declaration | today | pure domain logic | `isSundayKey` |
| S1-L2675-231 | 2675 | declaration | guides | automation/guide | `weeklyGuideBadgeStatus` |
| S1-L2690-232 | 2690 | declaration | guides | automation/guide | `guideStatusForPeriod` |
| S1-L2712-233 | 2712 | declaration | guides | automation/guide | `renderGuideStatusBadges` |
| S1-L2731-234 | 2731 | declaration | azure/learning | navigation | `buildTabButtonsOnce` |
| S1-L2742-235 | 2742 | assigned | navigation/shell | compatibility/domain | `btn.onclick` |
| S1-L2748-236 | 2748 | declaration | guides | automation/guide | `nav` |
| S1-L2760-237 | 2760 | declaration | navigation/shell | navigation | `updateActiveTabClasses` |
| S1-L2768-238 | 2768 | declaration | diagnostics | diagnostic/test | `commitTabContent64T` |
| S1-L2816-239 | 2816 | declaration | diagnostics | diagnostic/test | `setActiveTab` |
| S1-L2827-240 | 2827 | declaration | money | compatibility/domain | `clearLinkedMasterSources` |
| S1-L2848-241 | 2848 | declaration | storage/restore | persistence | `setDay` |
| S1-L2866-242 | 2866 | declaration | shared | state mutation | `setNested` |
| S1-L2868-243 | 2868 | declaration | therapy | compatibility/domain | `resetInputCallbacks` |
| S1-L2869-244 | 2869 | declaration | shared | compatibility/domain | `registerInputCallback` |
| S1-L2871-245 | 2871 | assigned | shared | compatibility/domain | `INPUT_CALLBACKS.*` |
| S1-L2874-246 | 2874 | declaration | shared | pure domain logic | `timePartsFromValue` |
| S1-L2889-247 | 2889 | declaration | shared | compatibility/domain | `to24Hour` |
| S1-L2897-248 | 2897 | declaration | azure/learning | pure domain logic | `formatTimeLabel` |
| S1-L2901-249 | 2901 | declaration | shared | pure domain logic | `parseLooseTime` |
| S1-L2933-250 | 2933 | declaration | azure/learning | pure domain logic | `timeChipsForLabel` |
| S1-L2939-251 | 2939 | declaration | shared | state mutation | `setTimeHelp` |
| S1-L2945-252 | 2945 | declaration | azure/learning | pure domain logic | `draftTimeTextControl` |
| S1-L2951-253 | 2951 | declaration | shared | pure domain logic | `timeCallbackForWrap` |
| S1-L2959-254 | 2959 | declaration | azure/learning | pure domain logic | `commitTimeTextControl` |
| S1-L2970-255 | 2970 | declaration | shared | pure domain logic | `pickTimeChip` |
| S1-L2981-256 | 2981 | declaration | shared | pure domain logic | `clearTimeControl` |
| S1-L2989-257 | 2989 | declaration | today | compatibility/domain | `nightContextForMode` |
| S1-L2998-258 | 2998 | declaration | pattern/private | state mutation | `setNightFieldValueForMode` |
| S1-L3007-259 | 3007 | declaration | shared | compatibility/domain | `selectedNightMode` |
| S1-L3010-260 | 3010 | declaration | azure/learning | pure domain logic | `commitNightTimeTextControl` |
| S1-L3023-261 | 3023 | declaration | shared | pure domain logic | `pickNightTimeChip` |
| S1-L3034-262 | 3034 | declaration | shared | pure domain logic | `clearNightTimeControl` |
| S1-L3042-263 | 3042 | declaration | azure/learning | compatibility/domain | `sliderKeyFromLabel` |
| S1-L3044-264 | 3044 | declaration | shared | pure domain logic | `isTimeAwareRangeKey` |
| S1-L3045-265 | 3045 | declaration | guides | automation/guide | `rangePeriodKey` |
| S1-L3046-266 | 3046 | declaration | today | pure domain logic | `rangePeriodLabel` |
| S1-L3047-267 | 3047 | declaration | today | compatibility/domain | `rangeLogInfo` |
| S1-L3057-268 | 3057 | declaration | shared | compatibility/domain | `isRangeLogged` |
| S1-L3058-269 | 3058 | declaration | guides | automation/guide | `rangeLoggedForGuide` |
| S1-L3065-270 | 3065 | declaration | guides | automation/guide | `rangeValueForGuide` |
| S1-L3086-271 | 3086 | declaration | diagnostics | diagnostic/test | `previousRangeValueForGuide` |
| S1-L3096-272 | 3096 | declaration | storage/restore | persistence | `rangeSourceLabel` |
| S1-L3097-273 | 3097 | declaration | diagnostics | diagnostic/test | `latestRangeBaseline` |
| S1-L3125-274 | 3125 | declaration | diagnostics | diagnostic/test | `rangeDisplayInfo` |
| S1-L3138-275 | 3138 | declaration | pattern/private | compatibility/domain | `applyRangeValueToState` |
| S1-L3159-276 | 3159 | declaration | pattern/private | compatibility/domain | `canonicalSliderStateValue` |
| S1-L3172-277 | 3172 | declaration | storage/restore | persistence | `commitRangeValueCanonical` |
| S1-L3202-278 | 3202 | declaration | storage/restore | persistence | `repairCanonicalRangeLogsForDay` |
| S1-L3232-279 | 3232 | declaration | storage/restore | persistence | `markRangeLogged` |
| S1-L3236-280 | 3236 | declaration | storage/restore | persistence | `undoRangeLogged` |
| S1-L3255-281 | 3255 | declaration | guides | automation/guide | `rangeGuideOptions` |
| S1-L3272-282 | 3272 | declaration | guides | automation/guide | `rangeGuideChips` |
| S1-L3278-283 | 3278 | declaration | storage/restore | persistence | `rangeQuickPick` |
| S1-L3301-284 | 3301 | declaration | azure/learning | compatibility/domain | `rangeDraftTouched` |
| S1-L3317-285 | 3317 | declaration | storage/restore | persistence | `rangeInputTouched` |
| S1-L3338-286 | 3338 | declaration | shared | compatibility/domain | `pendingRangeDraftId` |
| S1-L3339-287 | 3339 | declaration | shared | compatibility/domain | `queuePendingRangeDraft` |
| S1-L3354-288 | 3354 | declaration | shared | compatibility/domain | `clearPendingRangeDraft` |
| S1-L3357-289 | 3357 | declaration | storage/restore | persistence | `commitPendingRangeDrafts` |
| S1-L3380-290 | 3380 | declaration | exports | export | `todaySliderLive` |
| S1-L3401-291 | 3401 | declaration | storage/restore | persistence | `todaySliderCommit` |
| S1-L3420-292 | 3420 | declaration | guides | automation/guide | `todayRangeInput` |
| S1-L3430-293 | 3430 | declaration | storage/restore | persistence | `input` |
| S1-L3449-294 | 3449 | declaration | storage/restore | persistence | `handleCheckboxControl` |
| S1-L3459-295 | 3459 | declaration | azure/learning | compatibility/domain | `checkbox` |
| S1-L3463-296 | 3463 | declaration | azure/learning | compatibility/domain | `progress` |
| S1-L3464-297 | 3464 | declaration | money | compatibility/domain | `propertyProgress` |
| S1-L3465-298 | 3465 | declaration | navigation/shell | navigation | `sectionWrap` |
| S1-L3467-299 | 3467 | declaration | navigation/shell | compatibility/domain | `dismissAppToast` |
| S1-L3476-300 | 3476 | declaration | storage/restore | persistence | `showAppToast` |
| S1-L3492-301 | 3492 | declaration | navigation/shell | rendering | `render` |
| S1-L3497-302 | 3497 | arrow | navigation/shell | compatibility/domain | `run` |
| S1-L3503-303 | 3503 | declaration | diagnostics | diagnostic/test | `renderNow` |
| S1-L3546-304 | 3546 | declaration | guides | automation/guide | `guidePeriodLabel` |
| S1-L3547-305 | 3547 | declaration | guides | persistence | `currentGuidePeriod` |
| S1-L3559-306 | 3559 | declaration | guides | automation/guide | `missedMorningGuideAvailable` |
| S1-L3570-307 | 3570 | declaration | guides | automation/guide | `startMissedMorningGuide` |
| S1-L3576-308 | 3576 | declaration | intelligence | pure domain logic | `forecastTimeWindow` |
| S1-L3582-309 | 3582 | arrow | shared | compatibility/domain | `between` |
| S1-L3593-310 | 3593 | declaration | guides | automation/guide | `saturdayGuideStep` |
| S1-L3597-311 | 3597 | declaration | exports | export | `faithGuideSteps` |
| S1-L3614-312 | 3614 | declaration | guides | automation/guide | `fallbackGuideSteps` |
| S1-L3618-313 | 3618 | declaration | guides | automation/guide | `safeGuideSteps` |
| S1-L3627-314 | 3627 | declaration | pattern/private | compatibility/domain | `privateFollowupTouched` |
| S1-L3631-315 | 3631 | declaration | guides | automation/guide | `privateFollowupGuideStep` |
| S1-L3656-316 | 3656 | declaration | guides | automation/guide | `coreStateLoggedForGuide` |
| S1-L3659-317 | 3659 | declaration | guides | automation/guide | `rangeShiftStandsOutForGuide` |
| S1-L3668-318 | 3668 | declaration | guides | automation/guide | `timelineLoggedForGuide` |
| S1-L3672-319 | 3672 | declaration | guides | automation/guide | `energyShiftDraftActiveForGuide` |
| S1-L3681-320 | 3681 | declaration | guides | automation/guide | `shouldGuideEnergyShift` |
| S1-L3687-321 | 3687 | declaration | guides | automation/guide | `shouldGuideMoodTimeline` |
| S1-L3692-322 | 3692 | declaration | guides | automation/guide | `therapyDashboardLoggedForGuide` |
| S1-L3695-323 | 3695 | declaration | guides | automation/guide | `currentEffectsLoggedForGuide` |
| S1-L3698-324 | 3698 | declaration | guides | automation/guide | `shouldGuideCurrentEffects` |
| S1-L3704-325 | 3704 | declaration | guides | automation/guide | `guideIf` |
| S1-L3706-326 | 3706 | declaration | today | pure domain logic | `weekStartKey` |
| S1-L3714-327 | 3714 | declaration | guides | automation/guide | `weeklyGuideDue` |
| S1-L3723-328 | 3723 | declaration | guides | automation/guide | `weeklyGuideStatusText` |
| S1-L3729-329 | 3729 | declaration | storage/restore | persistence | `startWeeklyGuide` |
| S1-L3739-330 | 3739 | declaration | diagnostics | diagnostic/test | `weeklyGuideSteps` |
| S1-L3750-331 | 3750 | declaration | guides | automation/guide | `shouldGuideDaddyObservation` |
| S1-L3757-332 | 3757 | declaration | exports | export | `fatherDailyGuideSteps` |
| S1-L3767-333 | 3767 | declaration | guides | automation/guide | `renderWeeklyGuidePrompt` |
| S1-L3776-334 | 3776 | declaration | guides | automation/guide | `shouldGuideBodyReadiness` |
| S1-L3784-335 | 3784 | declaration | storage/restore | export | `bodyLevel5GuideSteps` |
| S1-L3792-336 | 3792 | declaration | guides | automation/guide | `shouldGuideEnvironment` |
| S1-L3801-337 | 3801 | declaration | exports | export | `environmentGuideSteps` |
| S1-L3804-338 | 3804 | declaration | storage/restore | persistence | `recoveryGuideSteps` |
| S1-L3808-339 | 3808 | declaration | guides | automation/guide | `missionGuideSteps` |
| S1-L3823-340 | 3823 | declaration | storage/restore | export | `presenceGuideSteps` |
| S1-L3837-341 | 3837 | declaration | shared | compatibility/domain | `minutesSinceIso` |
| S1-L3843-342 | 3843 | declaration | guides | automation/guide | `guideCompletedAtForPeriod` |
| S1-L3850-343 | 3850 | declaration | exports | automation/guide | `smartCheckDelayStatus` |
| S1-L3867-344 | 3867 | declaration | guides | automation/guide | `rangeLoggedAtForGuide` |
| S1-L3870-345 | 3870 | declaration | diagnostics | diagnostic/test | `minutesSinceLatestRangeLog` |
| S1-L3879-346 | 3879 | declaration | diagnostics | diagnostic/test | `smartCheckShouldRefreshRanges` |
| S1-L3889-347 | 3889 | declaration | guides | automation/guide | `currentPeriodElapsedMinutes` |
| S1-L3899-348 | 3899 | declaration | guides | automation/guide | `dedupeGuideSteps` |
| S1-L3908-349 | 3908 | declaration | storage/restore | export | `smartCheckInCoreSteps` |
| S1-L3910-350 | 3910 | arrow | shared | state mutation | `add` |
| S1-L3911-351 | 3911 | arrow | shared | state mutation | `addMany` |
| S1-L3991-352 | 3991 | declaration | guides | automation/guide | `guideCompletedForPeriod` |
| S1-L4000-353 | 4000 | declaration | guides | automation/guide | `guideCatchUpLabelForPeriod` |
| S1-L4010-354 | 4010 | declaration | guides | automation/guide | `smartCheckInAvailable` |
| S1-L4041-355 | 4041 | declaration | storage/restore | persistence | `startSmartCheckIn` |
| S1-L4054-356 | 4054 | declaration | diagnostics | diagnostic/test | `guideSteps` |
| S1-L4127-357 | 4127 | declaration | storage/restore | persistence | `persistGuideState` |
| S1-L4134-358 | 4134 | declaration | storage/restore | persistence | `resetGuideOnTimeframeChange` |
| S1-L4162-359 | 4162 | declaration | storage/restore | persistence | `startTimeGuide` |
| S1-L4180-360 | 4180 | declaration | guides | automation/guide | `guideStepUsesNightRecord` |
| S1-L4184-361 | 4184 | declaration | guides | automation/guide | `applyGuideStepSideEffects` |
| S1-L4189-362 | 4189 | declaration | storage/restore | persistence | `goGuideStep` |
| S1-L4206-363 | 4206 | declaration | guides | automation/guide | `guideNext` |
| S1-L4207-364 | 4207 | declaration | guides | automation/guide | `guideSkip` |
| S1-L4208-365 | 4208 | declaration | storage/restore | persistence | `stopGuide` |
| S1-L4216-366 | 4216 | declaration | storage/restore | persistence | `completeGuide` |
| S1-L4256-367 | 4256 | declaration | guides | automation/guide | `syncGuideUI` |
| S1-L4280-368 | 4280 | declaration | today | rendering | `renderSection` |
| S1-L4282-369 | 4282 | declaration | today | pure domain logic | `weekdayForDateKey` |
| S1-L4288-370 | 4288 | declaration | today | pure domain logic | `isSaturdayKey` |
| S1-L4290-371 | 4290 | declaration | intelligence | pure domain logic | `weekdayPatternConfidence` |
| S1-L4297-372 | 4297 | declaration | intelligence | persistence | `weekdayPatternLayer` |
| S1-L4301-373 | 4301 | arrow | shared | compatibility/domain | `boolRate` |
| S1-L4302-374 | 4302 | arrow | shared | compatibility/domain | `avg` |
| S1-L4303-375 | 4303 | arrow | intelligence | pure domain logic | `groupStats` |
| S1-L4308-376 | 4308 | arrow | shared | state mutation | `loggedAvg` |
| S1-L4359-377 | 4359 | declaration | intelligence | pure domain logic | `weekdayPatternForForecast` |
| S1-L4367-378 | 4367 | declaration | guides | automation/guide | `renderWeekdayPatternLayerCard` |
| S1-L4378-379 | 4378 | declaration | today | pure domain logic | `saturdayScope` |
| S1-L4392-380 | 4392 | declaration | storage/restore | persistence | `setSaturdayField` |
| S1-L4393-381 | 4393 | declaration | week | state mutation | `setSaturdayText` |
| S1-L4394-382 | 4394 | declaration | azure/learning | compatibility/domain | `satToggle` |
| S1-L4395-383 | 4395 | declaration | guides | automation/guide | `renderSaturdayOnlyCard` |
| S1-L4402-384 | 4402 | declaration | shared | compatibility/domain | `morningStartScope` |
| S1-L4409-385 | 4409 | declaration | storage/restore | persistence | `setMorningStartField` |
| S1-L4422-386 | 4422 | declaration | shared | compatibility/domain | `morningStartTouched` |
| S1-L4426-387 | 4426 | declaration | shared | compatibility/domain | `morningStartDone` |
| S1-L4430-388 | 4430 | declaration | guides | automation/guide | `shouldShowMorningStartCard` |
| S1-L4433-389 | 4433 | declaration | guides | automation/guide | `renderMorningStartCard` |
| S1-L4440-390 | 4440 | declaration | shared | rendering | `hasNightReviewText` |
| S1-L4441-391 | 4441 | declaration | guides | automation/guide | `shouldShowNightReview` |
| S1-L4443-392 | 4443 | declaration | storage/restore | persistence | `defaultRecoveryDay` |
| S1-L4450-393 | 4450 | declaration | storage/restore | persistence | `ensureRecoveryFields` |
| S1-L4457-394 | 4457 | declaration | storage/restore | persistence | `recoveryTomorrowMinimumText` |
| S1-L4461-395 | 4461 | declaration | storage/restore | persistence | `wave4BRecoveryPeriodActive` |
| S1-L4468-396 | 4468 | declaration | storage/restore | persistence | `wave4BRecoverySkipActive` |
| S1-L4472-397 | 4472 | declaration | storage/restore | persistence | `wave4BAnchorIsDone` |
| S1-L4480-398 | 4480 | declaration | storage/restore | persistence | `chooseNextRecoveryAnchor` |
| S1-L4510-399 | 4510 | declaration | storage/restore | persistence | `setNextRecoveryAnchorDone` |
| S1-L4525-400 | 4525 | declaration | storage/restore | persistence | `skipNextRecoveryAnchor` |
| S1-L4536-401 | 4536 | declaration | storage/restore | persistence | `renderNextRecoveryAnchor` |
| S1-L4543-402 | 4543 | declaration | diagnostics | diagnostic/test | `sleepRecoveryRiskProfile` |
| S1-L4574-403 | 4574 | arrow | shared | state mutation | `add` |
| S1-L4575-404 | 4575 | arrow | shared | compatibility/domain | `protect` |
| S1-L4605-405 | 4605 | declaration | storage/restore | persistence | `sleepRecoveryOverview` |
| S1-L4607-406 | 4607 | arrow | shared | compatibility/domain | `pct` |
| S1-L4626-407 | 4626 | declaration | storage/restore | persistence | `syncRecoveryNightReset` |
| S1-L4636-408 | 4636 | declaration | storage/restore | persistence | `setRecoveryFlag` |
| S1-L4647-409 | 4647 | declaration | storage/restore | persistence | `setRecoveryText` |
| S1-L4673-410 | 4673 | declaration | storage/restore | persistence | `renderSleepRecoveryCard` |
| S1-L4682-411 | 4682 | declaration | storage/restore | export | `renderNightReviewCard` |
| S1-L4688-412 | 4688 | declaration | intelligence | pure domain logic | `peakReadinessBand` |
| S1-L4697-413 | 4697 | declaration | storage/restore | export | `peakLevel5Mode` |
| S1-L4708-414 | 4708 | declaration | storage/restore | persistence | `peakExpectedEffect` |
| S1-L4730-415 | 4730 | declaration | storage/restore | persistence | `peakNextCheckWindow` |
| S1-L4737-416 | 4737 | declaration | exports | export | `peakForecastLevel5Display` |
| S1-L4797-417 | 4797 | declaration | intelligence | pure domain logic | `peakForecastDisplayInstruction` |
| S1-L4807-418 | 4807 | declaration | exports | export | `peakForecastLevel5Html` |
| S1-L4833-419 | 4833 | declaration | storage/restore | export | `peakForecastDisplayMaturity` |
| S1-L4849-420 | 4849 | declaration | exports | export | `buildTodayCommand` |
| S1-L4879-421 | 4879 | declaration | guides | automation/guide | `renderTodayCommandCard` |
| S1-L4908-422 | 4908 | declaration | intelligence | pure domain logic | `forecastDayPathValue` |
| S1-L4914-423 | 4914 | declaration | storage/restore | persistence | `forecastDayPathLimiter` |
| S1-L4936-424 | 4936 | declaration | storage/restore | persistence | `forecastDayPathDirection` |
| S1-L4947-425 | 4947 | declaration | storage/restore | persistence | `forecastDayPathLever` |
| S1-L4966-426 | 4966 | declaration | storage/restore | persistence | `forecastDayPathRead` |
| S1-L4979-427 | 4979 | declaration | storage/restore | persistence | `forecastDayPathPeriodHasDirectSignal` |
| S1-L4994-428 | 4994 | declaration | intelligence | pure domain logic | `forecastPathScoreKind` |
| S1-L5001-429 | 5001 | declaration | storage/restore | persistence | `forecastPathStatusFromScore` |
| S1-L5016-430 | 5016 | declaration | intelligence | pure domain logic | `forecastPathTrend` |
| S1-L5026-431 | 5026 | declaration | intelligence | pure domain logic | `forecastPathScoreDisplay` |
| S1-L5030-432 | 5030 | declaration | intelligence | pure domain logic | `forecastPathMiniLabel` |
| S1-L5036-433 | 5036 | declaration | intelligence | pure domain logic | `forecastPathMiniShortLabel` |
| S1-L5040-434 | 5040 | declaration | intelligence | pure domain logic | `forecastPathDisplayLimiter` |
| S1-L5050-435 | 5050 | declaration | intelligence | pure domain logic | `forecastPathTrendText` |
| S1-L5059-436 | 5059 | declaration | intelligence | pure domain logic | `forecastPathMicroRead` |
| S1-L5068-437 | 5068 | declaration | guides | persistence | `forecastPathBlockForPeriod` |
| S1-L5098-438 | 5098 | declaration | storage/restore | persistence | `forecastTomorrowPathBlock` |
| S1-L5127-439 | 5127 | declaration | storage/restore | persistence | `buildForecastDayPath` |
| S1-L5138-440 | 5138 | declaration | intelligence | rendering | `forecastDayPathHtml` |
| S1-L5157-441 | 5157 | declaration | storage/restore | persistence | `hydrateForecastDayPath` |
| S1-L5169-442 | 5169 | declaration | guides | automation/guide | `jumpToForecastPath` |
| S1-L5194-443 | 5194 | declaration | storage/restore | export | `hydrateForecastDetails` |
| S1-L5215-444 | 5215 | declaration | storage/restore | export | `renderPeakForecastCards` |
| S1-L5232-445 | 5232 | declaration | therapy | pure domain logic | `defaultEnvironmentDay` |
| S1-L5239-446 | 5239 | declaration | environment | compatibility/domain | `ensureEnvironmentFields` |
| S1-L5247-447 | 5247 | declaration | storage/restore | persistence | `environmentRepOptions` |
| S1-L5259-448 | 5259 | declaration | azure/learning | compatibility/domain | `environmentRepLabel` |
| S1-L5263-449 | 5263 | declaration | therapy | pure domain logic | `environmentScoreForDay` |
| S1-L5276-450 | 5276 | declaration | therapy | compatibility/domain | `environmentStageFromScore` |
| S1-L5284-451 | 5284 | declaration | exports | export | `environmentFrictionProfile` |
| S1-L5286-452 | 5286 | arrow | shared | compatibility/domain | `pct2` |
| S1-L5312-453 | 5312 | declaration | storage/restore | persistence | `logEnvironmentRep` |
| S1-L5327-454 | 5327 | declaration | storage/restore | persistence | `setEnvironmentText` |
| S1-L5341-455 | 5341 | declaration | storage/restore | persistence | `environmentBestRepRecommendation` |
| S1-L5355-456 | 5355 | declaration | exports | export | `renderEnvironmentLevel5Card` |
| S1-L5504-457 | 5504 | declaration | diagnostics | diagnostic/test | `minimumWinDeepContext` |
| S1-L5510-458 | 5510 | arrow | shared | compatibility/domain | `avg` |
| S1-L5511-459 | 5511 | arrow | shared | compatibility/domain | `rate` |
| S1-L5577-460 | 5577 | declaration | storage/restore | persistence | `caffeineRecoveryNeedScore` |
| S1-L5607-461 | 5607 | declaration | storage/restore | persistence | `shouldUseNoCaffeineTodayWin` |
| S1-L5612-462 | 5612 | declaration | storage/restore | persistence | `shouldUseCaffeineCutoffWin` |
| S1-L5616-463 | 5616 | declaration | storage/restore | persistence | `shouldUseWaterBeforeCaffeineWin` |
| S1-L5620-464 | 5620 | declaration | storage/restore | persistence | `caffeineCutoffText` |
| S1-L5632-465 | 5632 | declaration | intelligence | pure domain logic | `todayWinCandidateText` |
| S1-L5638-466 | 5638 | declaration | diagnostics | diagnostic/test | `todayWinEvidenceGate` |
| S1-L5656-467 | 5656 | declaration | intelligence | pure domain logic | `todayWinRecentSelectionStats` |
| S1-L5675-468 | 5675 | declaration | intelligence | pure domain logic | `todayWinRepeatAdjustment` |
| S1-L5691-469 | 5691 | declaration | storage/restore | persistence | `todayWinLaneNeedScore` |
| S1-L5699-470 | 5699 | arrow | shared | state mutation | `add` |
| S1-L5758-471 | 5758 | declaration | storage/restore | persistence | `todayWinCapacityScore` |
| S1-L5768-472 | 5768 | declaration | intelligence | pure domain logic | `todayWinTargetTier` |
| S1-L5779-473 | 5779 | declaration | today | pure domain logic | `todayWinTierRank` |
| S1-L5780-474 | 5780 | declaration | intelligence | pure domain logic | `todayWinLadderAdjustment` |
| S1-L5808-475 | 5808 | declaration | diagnostics | diagnostic/test | `scoreTodayWinCandidate` |
| S1-L5876-476 | 5876 | declaration | storage/restore | persistence | `todayWinGroup` |
| S1-L5887-477 | 5887 | declaration | diagnostics | diagnostic/test | `isBadDailyMinimumWinCandidate` |
| S1-L5898-478 | 5898 | declaration | diagnostics | diagnostic/test | `computeDailyMinimumWinItems` |
| S1-L5902-479 | 5902 | arrow | shared | compatibility/domain | `pushGroup` |
| S1-L5921-480 | 5921 | arrow | shared | compatibility/domain | `pickGroup` |
| S1-L5941-481 | 5941 | declaration | storage/restore | persistence | `minimumWinItems` |
| S1-L5959-482 | 5959 | declaration | shared | compatibility/domain | `winTextNorm` |
| S1-L5960-483 | 5960 | declaration | diagnostics | diagnostic/test | `inferWinLaneFromMove` |
| S1-L5975-484 | 5975 | declaration | intelligence | pure domain logic | `ensureMinimumWinState` |
| S1-L5982-485 | 5982 | declaration | intelligence | pure domain logic | `minimumWinKey` |
| S1-L5987-486 | 5987 | declaration | today | pure domain logic | `isTodayCaffeineWindowLogged` |
| S1-L5994-487 | 5994 | declaration | pattern/private | compatibility/domain | `caffeineWindowEndMinutes` |
| S1-L5997-488 | 5997 | declaration | diagnostics | diagnostic/test | `caffeineRuleForMinimumWin` |
| S1-L6005-489 | 6005 | declaration | azure/learning | compatibility/domain | `parseCaffeineCutoffMinutesFromLabel` |
| S1-L6016-490 | 6016 | declaration | intelligence | pure domain logic | `caffeineWinDirectStatus` |
| S1-L6053-491 | 6053 | declaration | storage/restore | persistence | `pivotWinStatus` |
| S1-L6056-492 | 6056 | declaration | diagnostics | diagnostic/test | `abstainWinDirectStatus` |
| S1-L6104-493 | 6104 | declaration | azure/learning | compatibility/domain | `shouldBlockPeakCoverageDueToPivot` |
| S1-L6109-494 | 6109 | declaration | today | pure domain logic | `todayWinStatus` |
| S1-L6112-495 | 6112 | declaration | shared | pure domain logic | `anyDayFood` |
| S1-L6115-496 | 6115 | declaration | shared | compatibility/domain | `hasAnyMeal` |
| S1-L6118-497 | 6118 | declaration | health/recovery | compatibility/domain | `hasProteinMeal` |
| S1-L6121-498 | 6121 | declaration | intelligence | pure domain logic | `hasBodyTrainingEvidence` |
| S1-L6124-499 | 6124 | declaration | intelligence | pure domain logic | `hasStrengthWorkoutEvidence` |
| S1-L6127-500 | 6127 | declaration | intelligence | pure domain logic | `hasShowerOrOutfitEvidence` |
| S1-L6130-501 | 6130 | declaration | diagnostics | diagnostic/test | `hasAzureProofEvidence` |
| S1-L6144-502 | 6144 | declaration | diagnostics | diagnostic/test | `hasMoneyEvidence` |
| S1-L6157-503 | 6157 | declaration | diagnostics | diagnostic/test | `hasFatherEvidence` |
| S1-L6209-504 | 6209 | declaration | diagnostics | diagnostic/test | `hasPresenceEvidence` |
| S1-L6238-505 | 6238 | declaration | diagnostics | diagnostic/test | `hasEnvironmentEvidence` |
| S1-L6250-506 | 6250 | declaration | intelligence | pure domain logic | `hasFaithEvidence` |
| S1-L6257-507 | 6257 | declaration | diagnostics | diagnostic/test | `hasMindEvidence` |
| S1-L6264-508 | 6264 | declaration | diagnostics | diagnostic/test | `inferMinimumWinStatusFromDailyFields` |
| S1-L6324-509 | 6324 | declaration | intelligence | pure domain logic | `inferMinimumWinDoneFromDailyFields` |
| S1-L6329-510 | 6329 | declaration | intelligence | pure domain logic | `inferMinimumWinStatusFromCompletedPeakActions` |
| S1-L6348-511 | 6348 | declaration | intelligence | pure domain logic | `backfillMinimumWinStatusFromCompletedPeakActions` |
| S1-L6379-512 | 6379 | declaration | intelligence | pure domain logic | `normalizeAutoMinimumWinStatus` |
| S1-L6386-513 | 6386 | declaration | intelligence | pure domain logic | `displayMinimumWinLabel` |
| S1-L6392-514 | 6392 | declaration | intelligence | pure domain logic | `minimumWinStatusForItem` |
| S1-L6409-515 | 6409 | declaration | diagnostics | diagnostic/test | `moveFamilyKeyFromText` |
| S1-L6422-516 | 6422 | declaration | azure/learning | compatibility/domain | `moveFamilyKey` |
| S1-L6425-517 | 6425 | declaration | diagnostics | diagnostic/test | `winActionStrongMatch` |
| S1-L6437-518 | 6437 | declaration | diagnostics | diagnostic/test | `matchForecastActionToMinimumWins` |
| S1-L6462-519 | 6462 | declaration | intelligence | pure domain logic | `coverMinimumWinsFromForecastAction` |
| S1-L6483-520 | 6483 | declaration | intelligence | pure domain logic | `uncoverMinimumWinsForForecastAction` |
| S1-L6491-521 | 6491 | declaration | storage/restore | persistence | `toggleMinimumWinDone` |
| S1-L6518-522 | 6518 | declaration | intelligence | persistence | `todayWinsProgress` |
| S1-L6528-523 | 6528 | declaration | intelligence | diagnostic/test | `todayWinSyncAuditForCurrentDay` |
| S1-L6545-524 | 6545 | declaration | intelligence | pure domain logic | `minimumWinActionTitle` |
| S1-L6548-525 | 6548 | declaration | intelligence | pure domain logic | `findMinimumWinActionById` |
| S1-L6554-526 | 6554 | declaration | storage/restore | persistence | `minimumWinSourceHuman` |
| S1-L6584-527 | 6584 | declaration | intelligence | pure domain logic | `minimumWinBodyProofList` |
| S1-L6599-528 | 6599 | declaration | intelligence | pure domain logic | `minimumWinPeakMatches` |
| S1-L6607-529 | 6607 | declaration | diagnostics | diagnostic/test | `minimumWinEvidenceRows` |
| S1-L6638-530 | 6638 | declaration | intelligence | rendering | `renderMinimumWinDetails` |
| S1-L6642-531 | 6642 | declaration | intelligence | pure domain logic | `toggleMinimumWinDetails` |
| S1-L6647-532 | 6647 | declaration | storage/restore | persistence | `renderMinimumWinItems` |
| S1-L6655-533 | 6655 | declaration | storage/restore | export | `renderToday` |
| S1-L6687-534 | 6687 | declaration | intelligence | pure domain logic | `nextAction` |
| S1-L6689-535 | 6689 | declaration | azure/learning | compatibility/domain | `defaultAzureProofState` |
| S1-L6699-536 | 6699 | declaration | azure/learning | compatibility/domain | `ensureAzureProofState` |
| S1-L6719-537 | 6719 | declaration | azure/learning | compatibility/domain | `azureProofStageIndex` |
| S1-L6723-538 | 6723 | declaration | azure/learning | compatibility/domain | `azureProofStageLabel` |
| S1-L6724-539 | 6724 | declaration | diagnostics | diagnostic/test | `azureProofStageFromSkillStatus` |
| S1-L6730-540 | 6730 | declaration | storage/restore | persistence | `azureProofTypeLabel` |
| S1-L6740-541 | 6740 | declaration | storage/restore | persistence | `azureProofStageForType` |
| S1-L6750-542 | 6750 | declaration | azure/learning | compatibility/domain | `azureProofTypeWeight` |
| S1-L6753-543 | 6753 | declaration | azure/learning | compatibility/domain | `azureSessionHasProof` |
| S1-L6756-544 | 6756 | declaration | today | pure domain logic | `azureProofCreatedToday` |
| S1-L6761-545 | 6761 | declaration | azure/learning | compatibility/domain | `azureProofCreatedCountsFromSessions` |
| S1-L6774-546 | 6774 | declaration | storage/restore | persistence | `azureNextProofTarget` |
| S1-L6787-547 | 6787 | declaration | intelligence | pure domain logic | `buildAzureProofCreatedSummary` |
| S1-L6798-548 | 6798 | declaration | storage/restore | persistence | `syncAzureSkillStatusFromProof` |
| S1-L6813-549 | 6813 | declaration | storage/restore | persistence | `renderAzureProofCreatedRow` |
| S1-L6819-550 | 6819 | declaration | azure/learning | compatibility/domain | `azureSkillProofRecord` |
| S1-L6828-551 | 6828 | declaration | azure/learning | compatibility/domain | `azureProofProgress` |
| S1-L6853-552 | 6853 | declaration | storage/restore | persistence | `setAzureCurrentSkill` |
| S1-L6860-553 | 6860 | declaration | storage/restore | persistence | `setAzureProofStage` |
| S1-L6871-554 | 6871 | declaration | storage/restore | persistence | `logAzureProof` |
| S1-L6918-555 | 6918 | declaration | storage/restore | persistence | `setAzureExplainConfidence` |
| S1-L6928-556 | 6928 | declaration | storage/restore | persistence | `setAzureProofText` |
| S1-L6938-557 | 6938 | declaration | storage/restore | persistence | `addAzureWeakTopic` |
| S1-L6948-558 | 6948 | declaration | storage/restore | persistence | `closeAzureWeakTopic` |
| S1-L6953-559 | 6953 | declaration | diagnostics | diagnostic/test | `azureProofRecommendation` |
| S1-L6970-560 | 6970 | declaration | exports | export | `azureCareerLevel5Overview` |
| S1-L6973-561 | 6973 | arrow | shared | compatibility/domain | `pct2` |
| S1-L6990-562 | 6990 | declaration | exports | export | `renderAzureProofLadder` |
| S1-L7004-563 | 7004 | declaration | azure/learning | compatibility/domain | `defaultLearningState` |
| S1-L7007-564 | 7007 | declaration | azure/learning | compatibility/domain | `ensureLearningState` |
| S1-L7024-565 | 7024 | declaration | azure/learning | compatibility/domain | `learningRepLabel` |
| S1-L7028-566 | 7028 | declaration | today | pure domain logic | `learningTodayTopic` |
| S1-L7033-567 | 7033 | declaration | today | rendering | `learningDueCards` |
| S1-L7037-568 | 7037 | declaration | azure/learning | rendering | `learningCardStrengthLabel` |
| S1-L7045-569 | 7045 | declaration | storage/restore | persistence | `addLearningCard` |
| S1-L7054-570 | 7054 | declaration | today | rendering | `reviewLearningCard` |
| S1-L7074-571 | 7074 | declaration | storage/restore | persistence | `logLearningRep` |
| S1-L7094-572 | 7094 | declaration | storage/restore | persistence | `addLearningWeakTopic` |
| S1-L7104-573 | 7104 | declaration | storage/restore | persistence | `closeLearningWeakTopic` |
| S1-L7109-574 | 7109 | declaration | azure/learning | compatibility/domain | `learningRepCounts` |
| S1-L7117-575 | 7117 | declaration | exports | export | `learningKnowledgeOverview` |
| S1-L7126-576 | 7126 | arrow | shared | compatibility/domain | `pct2` |
| S1-L7143-577 | 7143 | declaration | diagnostics | diagnostic/test | `learningRecommendation` |
| S1-L7152-578 | 7152 | declaration | storage/restore | export | `renderLearningScienceCard` |
| S1-L7162-579 | 7162 | declaration | diagnostics | diagnostic/test | `renderAzure` |
| S1-L7181-580 | 7181 | declaration | storage/restore | persistence | `setAzureStudyLogged` |
| S1-L7208-581 | 7208 | declaration | today | state mutation | `markAzureStudy` |
| S1-L7211-582 | 7211 | declaration | money | compatibility/domain | `defaultMoneyRhythm` |
| S1-L7212-583 | 7212 | declaration | money | compatibility/domain | `ensureMoneyRhythm` |
| S1-L7219-584 | 7219 | declaration | today | compatibility/domain | `moneyRhythmComputedStatus` |
| S1-L7229-585 | 7229 | declaration | azure/learning | compatibility/domain | `moneyRhythmStatusLabel` |
| S1-L7230-586 | 7230 | declaration | money | compatibility/domain | `moneyRhythmSummary` |
| S1-L7235-587 | 7235 | declaration | storage/restore | persistence | `setMoneyRhythmFlag` |
| S1-L7242-588 | 7242 | declaration | storage/restore | persistence | `setMoneyRhythmNextMove` |
| S1-L7250-589 | 7250 | declaration | storage/restore | persistence | `markMoneyRhythmDone` |
| S1-L7268-590 | 7268 | declaration | storage/restore | persistence | `renderMoneyRhythmCardContent` |
| S1-L7279-591 | 7279 | declaration | storage/restore | persistence | `renderMoney` |
| S1-L7287-592 | 7287 | declaration | storage/restore | persistence | `moneyInput` |
| S1-L7288-593 | 7288 | declaration | azure/learning | pure domain logic | `childSkillKey` |
| S1-L7289-594 | 7289 | declaration | fatherhood/child | pure domain logic | `normalizechildStage` |
| S1-L7290-595 | 7290 | declaration | storage/restore | persistence | `childSaveStamp` |
| S1-L7291-596 | 7291 | declaration | azure/learning | pure domain logic | `childProgressFootprint` |
| S1-L7308-597 | 7308 | declaration | storage/restore | persistence | `shouldUseImportedchild` |
| S1-L7324-598 | 7324 | declaration | fatherhood/child | pure domain logic | `touchchild` |
| S1-L7325-599 | 7325 | declaration | storage/restore | persistence | `setchildWeekly` |
| S1-L7326-600 | 7326 | declaration | azure/learning | pure domain logic | `childStage` |
| S1-L7327-601 | 7327 | declaration | storage/restore | persistence | `setchildStage` |
| S1-L7328-602 | 7328 | declaration | fatherhood/child | pure domain logic | `childSuggestionStore` |
| S1-L7329-603 | 7329 | declaration | exports | export | `childLessonLogCount` |
| S1-L7343-604 | 7343 | declaration | fatherhood/child | pure domain logic | `childStageSuggestionThreshold` |
| S1-L7352-605 | 7352 | declaration | fatherhood/child | pure domain logic | `childStageSuggestionReaskGap` |
| S1-L7357-606 | 7357 | declaration | fatherhood/child | pure domain logic | `childSuggestedNextStage` |
| S1-L7366-607 | 7366 | declaration | azure/learning | state mutation | `markchildStageBaseline` |
| S1-L7372-608 | 7372 | declaration | azure/learning | pure domain logic | `childStageSuggestionFor` |
| S1-L7391-609 | 7391 | declaration | diagnostics | diagnostic/test | `acceptchildStageSuggestion` |
| S1-L7400-610 | 7400 | declaration | storage/restore | persistence | `dismisschildStageSuggestion` |
| S1-L7408-611 | 7408 | declaration | diagnostics | diagnostic/test | `childStageSuggestionHtml` |
| S1-L7414-612 | 7414 | declaration | azure/learning | compatibility/domain | `categoryProgress` |
| S1-L7415-613 | 7415 | declaration | fatherhood/child | pure domain logic | `overallchildProgress` |
| S1-L7416-614 | 7416 | declaration | fatherhood/child | pure domain logic | `toolsThisWeek` |
| S1-L7417-615 | 7417 | declaration | azure/learning | pure domain logic | `allchildSkills` |
| S1-L7418-616 | 7418 | declaration | fatherhood/child | pure domain logic | `childStageIndex` |
| S1-L7419-617 | 7419 | declaration | fatherhood/child | compatibility/domain | `lessonStageNeed` |
| S1-L7427-618 | 7427 | declaration | today | compatibility/domain | `lessonCategoryBias` |
| S1-L7430-619 | 7430 | arrow | shared | state mutation | `add` |
| S1-L7439-620 | 7439 | declaration | azure/learning | compatibility/domain | `tinyLessonTemplate` |
| S1-L7449-621 | 7449 | declaration | today | compatibility/domain | `tinyLessonPlan` |
| S1-L7473-622 | 7473 | declaration | exports | export | `tinyLessonDoneCount` |
| S1-L7481-623 | 7481 | declaration | storage/restore | export | `suggestAnotherTinyLesson` |
| S1-L7497-624 | 7497 | declaration | fatherhood/child | compatibility/domain | `tinyLesson` |
| S1-L7498-625 | 7498 | declaration | exports | export | `completeTinyLesson` |
| S1-L7516-626 | 7516 | declaration | storage/restore | persistence | `currentTinyLessonMeta` |
| S1-L7517-627 | 7517 | declaration | storage/restore | persistence | `addchildSkill` |
| S1-L7518-628 | 7518 | declaration | storage/restore | persistence | `removechildSkill` |
| S1-L7519-629 | 7519 | declaration | azure/learning | compatibility/domain | `skillSelect` |
| S1-L7521-630 | 7521 | declaration | exports | export | `defaultFatherhoodLevel5Day` |
| S1-L7527-631 | 7527 | declaration | exports | export | `ensureFatherhoodLevel5Fields` |
| S1-L7536-632 | 7536 | declaration | azure/learning | compatibility/domain | `fatherhoodRepOptions` |
| S1-L7548-633 | 7548 | declaration | azure/learning | compatibility/domain | `fatherhoodRepLabel` |
| S1-L7552-634 | 7552 | declaration | storage/restore | export | `logFatherhoodRep` |
| S1-L7583-635 | 7583 | declaration | storage/restore | export | `setFatherhoodLevel5Text` |
| S1-L7592-636 | 7592 | declaration | exports | export | `fatherhoodLevel5Profile` |
| S1-L7594-637 | 7594 | arrow | shared | compatibility/domain | `pct2` |
| S1-L7621-638 | 7621 | declaration | fatherhood/child | compatibility/domain | `fatherhoodTopGrowthNeed` |
| S1-L7627-639 | 7627 | declaration | exports | export | `fatherhoodBestRepRecommendation` |
| S1-L7637-640 | 7637 | declaration | exports | export | `renderFatherhoodLevel5Card` |
| S1-L7643-641 | 7643 | declaration | storage/restore | export | `renderFather` |
| S1-L7658-642 | 7658 | declaration | exports | export | `defaultFaithLevel5Day` |
| S1-L7664-643 | 7664 | declaration | exports | export | `ensureFaithLevel5Fields` |
| S1-L7673-644 | 7673 | declaration | azure/learning | compatibility/domain | `faithMeaningRepOptions` |
| S1-L7685-645 | 7685 | declaration | azure/learning | compatibility/domain | `faithMeaningRepLabel` |
| S1-L7689-646 | 7689 | declaration | exports | export | `faithMeaningScoreForDay` |
| S1-L7702-647 | 7702 | declaration | faith | compatibility/domain | `faithMeaningStageFromScore` |
| S1-L7710-648 | 7710 | declaration | exports | export | `faithMeaningProfile` |
| S1-L7712-649 | 7712 | arrow | shared | compatibility/domain | `pct2` |
| S1-L7739-650 | 7739 | declaration | storage/restore | export | `logFaithMeaningRep` |
| S1-L7758-651 | 7758 | declaration | storage/restore | export | `setFaithMeaningText` |
| S1-L7772-652 | 7772 | declaration | exports | export | `faithMeaningBestRepRecommendation` |
| S1-L7786-653 | 7786 | declaration | exports | export | `renderFaithMeaningLevel5Card` |
| S1-L7793-654 | 7793 | declaration | storage/restore | export | `renderFaith` |
| S1-L7844-655 | 7844 | declaration | storage/restore | persistence | `setHealthFlag` |
| S1-L7852-656 | 7852 | declaration | storage/restore | persistence | `bodyReadinessOptions` |
| S1-L7860-657 | 7860 | declaration | storage/restore | persistence | `movementStageOptions` |
| S1-L7870-658 | 7870 | declaration | storage/restore | persistence | `movementStageRank` |
| S1-L7875-659 | 7875 | declaration | azure/learning | compatibility/domain | `movementStageLabel` |
| S1-L7880-660 | 7880 | declaration | intelligence | pure domain logic | `bodyReadinessLabel` |
| S1-L7884-661 | 7884 | declaration | storage/restore | persistence | `defaultActiveLoad` |
| S1-L7885-662 | 7885 | declaration | storage/restore | persistence | `normalizeActiveLoad` |
| S1-L7891-663 | 7891 | declaration | storage/restore | persistence | `ensureActiveLoad` |
| S1-L7897-664 | 7897 | declaration | storage/restore | persistence | `activeLoadHasAny` |
| S1-L7901-665 | 7901 | declaration | storage/restore | persistence | `activeLoadLabels` |
| S1-L7910-666 | 7910 | declaration | storage/restore | persistence | `activeLoadSummary` |
| S1-L7914-667 | 7914 | declaration | storage/restore | persistence | `setActiveLoadFlag` |
| S1-L7925-668 | 7925 | declaration | storage/restore | persistence | `renderActiveLoadCard` |
| S1-L7931-669 | 7931 | declaration | storage/restore | persistence | `ensureBodyPeakFields` |
| S1-L7940-670 | 7940 | declaration | storage/restore | persistence | `setBodyReadiness` |
| S1-L7948-671 | 7948 | declaration | storage/restore | persistence | `logMovementStage` |
| S1-L7964-672 | 7964 | declaration | storage/restore | persistence | `bodyPhysicalPeakProfile` |
| S1-L7966-673 | 7966 | arrow | shared | compatibility/domain | `pct` |
| S1-L7967-674 | 7967 | arrow | shared | compatibility/domain | `avg` |
| S1-L7995-675 | 7995 | declaration | intelligence | rendering | `renderBodyReadinessChips` |
| S1-L7999-676 | 7999 | declaration | azure/learning | rendering | `renderMovementLadderButtons` |
| S1-L8004-677 | 8004 | declaration | storage/restore | persistence | `renderHealth` |
| S1-L8016-678 | 8016 | declaration | health/recovery | compatibility/domain | `sleepFromPattern` |
| S1-L8024-679 | 8024 | declaration | azure/learning | compatibility/domain | `syncSleepFromPattern` |
| S1-L8036-680 | 8036 | declaration | today | pure domain logic | `syncLinkedFieldsForDay` |
| S1-L8090-681 | 8090 | declaration | today | compatibility/domain | `caffeineLabel` |
| S1-L8091-682 | 8091 | declaration | shared | pure domain logic | `dateKeyOffset` |
| S1-L8092-683 | 8092 | declaration | shared | pure domain logic | `getDayOffset` |
| S1-L8093-684 | 8093 | declaration | today | pure domain logic | `hasLoggedTodayInput` |
| S1-L8106-685 | 8106 | declaration | health/recovery | pure domain logic | `daySleepValue` |
| S1-L8107-686 | 8107 | declaration | azure/learning | compatibility/domain | `chainSummary` |
| S1-L8122-687 | 8122 | declaration | storage/restore | persistence | `forecastActionSnapshot` |
| S1-L8145-688 | 8145 | declaration | exports | export | `forecastContextSnapshot` |
| S1-L8192-689 | 8192 | declaration | exports | export | `forecastSummaryForExport` |
| S1-L8229-690 | 8229 | declaration | storage/restore | persistence | `forecastMoveType` |
| S1-L8251-691 | 8251 | declaration | shared | compatibility/domain | `moveNorm` |
| S1-L8252-692 | 8252 | declaration | shared | pure domain logic | `currentPeriodRangeLogged` |
| S1-L8257-693 | 8257 | declaration | shared | compatibility/domain | `numberOrNull` |
| S1-L8261-694 | 8261 | declaration | environment | compatibility/domain | `median` |
| S1-L8267-695 | 8267 | declaration | today | pure domain logic | `dateKeyForRecord` |
| S1-L8272-696 | 8272 | declaration | intelligence | persistence | `forecastEntriesBefore` |
| S1-L8281-697 | 8281 | declaration | intelligence | pure domain logic | `forecastRecentEntries` |
| S1-L8284-698 | 8284 | declaration | azure/learning | pure domain logic | `timeframeSliderLogsForDay` |
| S1-L8309-699 | 8309 | declaration | shared | pure domain logic | `sliderLogForPeriod` |
| S1-L8313-700 | 8313 | declaration | pattern/private | compatibility/domain | `currentValueForSlider` |
| S1-L8323-701 | 8323 | declaration | shared | pure domain logic | `dayFoodRisk` |
| S1-L8326-702 | 8326 | declaration | shared | pure domain logic | `dayFoodSupport` |
| S1-L8329-703 | 8329 | declaration | shared | compatibility/domain | `nightFoodRisk` |
| S1-L8332-704 | 8332 | declaration | shared | compatibility/domain | `nightFoodSupport` |
| S1-L8335-705 | 8335 | declaration | exports | export | `nightFoodExport` |
| S1-L8351-706 | 8351 | declaration | exports | export | `preBedStressorsExport` |
| S1-L8363-707 | 8363 | declaration | exports | export | `nextMorningEffectsExport` |
| S1-L8375-708 | 8375 | declaration | pattern/private | pure domain logic | `actualNightRecordsForDate` |
| S1-L8388-709 | 8388 | declaration | today | pure domain logic | `currentDayCaffeineWindow` |
| S1-L8398-710 | 8398 | declaration | diagnostics | diagnostic/test | `latestCaffeineWindow` |
| S1-L8405-711 | 8405 | declaration | today | compatibility/domain | `lastNightCaffeineWindow` |
| S1-L8409-712 | 8409 | declaration | intelligence | pure domain logic | `forecastConfidenceLabel` |
| S1-L8418-713 | 8418 | declaration | shared | compatibility/domain | `frequency` |
| S1-L8419-714 | 8419 | declaration | shared | pure domain logic | `periodAvg` |
| S1-L8423-715 | 8423 | declaration | shared | compatibility/domain | `issueListFromCounts` |
| S1-L8426-716 | 8426 | declaration | intelligence | pure domain logic | `forecastTrendSummary` |
| S1-L8476-717 | 8476 | declaration | intelligence | pure domain logic | `moodTimelineSignalFromNote` |
| S1-L8478-718 | 8478 | arrow | shared | compatibility/domain | `has` |
| S1-L8492-719 | 8492 | declaration | diagnostics | diagnostic/test | `moodTimelineForecastAnalysis` |
| S1-L8575-720 | 8575 | declaration | pattern/private | pure domain logic | `normalizeEnergyTimelineLevel` |
| S1-L8579-721 | 8579 | declaration | azure/learning | pure domain logic | `energyTimelineLabel` |
| S1-L8587-722 | 8587 | declaration | pattern/private | pure domain logic | `energyTimelineDraft` |
| S1-L8593-723 | 8593 | declaration | pattern/private | pure domain logic | `energyTimelineDefaultLevel` |
| S1-L8599-724 | 8599 | declaration | storage/restore | persistence | `energyTimelineDraftBaseline` |
| S1-L8606-725 | 8606 | declaration | storage/restore | persistence | `hasUnsavedEnergyTimelineDraft` |
| S1-L8616-726 | 8616 | declaration | shared | state mutation | `setDraftLogButtonPulse` |
| S1-L8620-727 | 8620 | declaration | shared | state mutation | `setEditFieldTrail` |
| S1-L8624-728 | 8624 | declaration | shared | state mutation | `setDraftFieldTrail` |
| S1-L8628-729 | 8628 | declaration | navigation/shell | compatibility/domain | `fieldTraceSvg` |
| S1-L8631-730 | 8631 | declaration | storage/restore | persistence | `refreshEnergyTimelineDraftBadge` |
| S1-L8657-731 | 8657 | declaration | storage/restore | persistence | `saveEnergyTimelineDraft` |
| S1-L8669-732 | 8669 | declaration | storage/restore | persistence | `setEnergyTimelineQuickScore` |
| S1-L8673-733 | 8673 | declaration | pattern/private | compatibility/domain | `getEnergyTagInputs` |
| S1-L8674-734 | 8674 | declaration | storage/restore | persistence | `addEnergyTimelineEntry` |
| S1-L8720-735 | 8720 | declaration | guides | pure domain logic | `oneTimeEnergy930FixAvailable` |
| S1-L8732-736 | 8732 | declaration | storage/restore | persistence | `fixEnergyEntryTime930` |
| S1-L8754-737 | 8754 | declaration | storage/restore | persistence | `deleteEnergyTimelineEntry` |
| S1-L8758-738 | 8758 | declaration | diagnostics | diagnostic/test | `energySymptomsAnalysis` |
| S1-L8789-739 | 8789 | declaration | storage/restore | persistence | `setEnergySymptom` |
| S1-L8794-740 | 8794 | declaration | storage/restore | persistence | `setEnergyDropStarted` |
| S1-L8799-741 | 8799 | declaration | storage/restore | persistence | `setEnergyCrashNotes` |
| S1-L8804-742 | 8804 | declaration | storage/restore | persistence | `energyShiftTag` |
| S1-L8809-743 | 8809 | declaration | storage/restore | persistence | `renderEnergyStateCard` |
| S1-L8830-744 | 8830 | declaration | today | pure domain logic | `nextDateKey` |
| S1-L8834-745 | 8834 | declaration | shared | compatibility/domain | `clampScore10` |
| S1-L8839-746 | 8839 | declaration | intelligence | pure domain logic | `periodMetricValueForForecast` |
| S1-L8842-747 | 8842 | declaration | intelligence | pure domain logic | `periodCompositeScoreForForecast` |
| S1-L8858-748 | 8858 | declaration | shared | compatibility/domain | `transitionBand` |
| S1-L8865-749 | 8865 | declaration | azure/learning | compatibility/domain | `transitionLabel` |
| S1-L8872-750 | 8872 | declaration | intelligence | pure domain logic | `transitionRowsForForecast` |
| S1-L8892-751 | 8892 | declaration | azure/learning | compatibility/domain | `summarizeTransitionRows` |
| S1-L8920-752 | 8920 | declaration | intelligence | pure domain logic | `transitionPatternForContext` |
| S1-L8945-753 | 8945 | declaration | diagnostics | diagnostic/test | `buildForecastContext` |
| S1-L8959-754 | 8959 | arrow | shared | compatibility/domain | `slider` |
| S1-L9031-755 | 9031 | arrow | shared | compatibility/domain | `tag` |
| S1-L9067-756 | 9067 | declaration | intelligence | pure domain logic | `forecastMoveContext` |
| S1-L9070-757 | 9070 | declaration | guides | automation/guide | `forecastContextKey` |
| S1-L9083-758 | 9083 | object member | shared | compatibility/domain | `score` |
| S1-L9084-759 | 9084 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9085-760 | 9085 | object member | shared | compatibility/domain | `score` |
| S1-L9086-761 | 9086 | object member | shared | compatibility/domain | `score` |
| S1-L9087-762 | 9087 | object member | shared | compatibility/domain | `score` |
| S1-L9088-763 | 9088 | object member | shared | compatibility/domain | `score` |
| S1-L9089-764 | 9089 | object member | intelligence | pure domain logic | `score` |
| S1-L9090-765 | 9090 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9091-766 | 9091 | object member | therapy | compatibility/domain | `score` |
| S1-L9092-767 | 9092 | object member | week | compatibility/domain | `score` |
| S1-L9093-768 | 9093 | object member | week | compatibility/domain | `score` |
| S1-L9095-769 | 9095 | object member | faith | compatibility/domain | `score` |
| S1-L9096-770 | 9096 | object member | faith | compatibility/domain | `score` |
| S1-L9097-771 | 9097 | object member | faith | compatibility/domain | `score` |
| S1-L9098-772 | 9098 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9099-773 | 9099 | object member | faith | compatibility/domain | `score` |
| S1-L9100-774 | 9100 | object member | faith | compatibility/domain | `score` |
| S1-L9101-775 | 9101 | object member | faith | compatibility/domain | `score` |
| S1-L9102-776 | 9102 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9103-777 | 9103 | object member | shared | compatibility/domain | `score` |
| S1-L9104-778 | 9104 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9105-779 | 9105 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9106-780 | 9106 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9109-781 | 9109 | object member | intelligence | pure domain logic | `score` |
| S1-L9110-782 | 9110 | object member | social/presence | compatibility/domain | `score` |
| S1-L9111-783 | 9111 | object member | social/presence | compatibility/domain | `score` |
| S1-L9112-784 | 9112 | object member | social/presence | compatibility/domain | `score` |
| S1-L9113-785 | 9113 | object member | social/presence | compatibility/domain | `score` |
| S1-L9114-786 | 9114 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9115-787 | 9115 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9116-788 | 9116 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9117-789 | 9117 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9118-790 | 9118 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9119-791 | 9119 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9120-792 | 9120 | object member | therapy | compatibility/domain | `score` |
| S1-L9121-793 | 9121 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9122-794 | 9122 | object member | intelligence | pure domain logic | `score` |
| S1-L9124-795 | 9124 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9125-796 | 9125 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9126-797 | 9126 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9127-798 | 9127 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9128-799 | 9128 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9130-800 | 9130 | object member | environment | compatibility/domain | `score` |
| S1-L9131-801 | 9131 | object member | environment | compatibility/domain | `score` |
| S1-L9132-802 | 9132 | object member | environment | compatibility/domain | `score` |
| S1-L9133-803 | 9133 | object member | storage/restore | persistence | `score` |
| S1-L9134-804 | 9134 | object member | environment | compatibility/domain | `score` |
| S1-L9135-805 | 9135 | object member | environment | compatibility/domain | `score` |
| S1-L9136-806 | 9136 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9138-807 | 9138 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9139-808 | 9139 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9140-809 | 9140 | object member | shared | compatibility/domain | `score` |
| S1-L9141-810 | 9141 | object member | shared | compatibility/domain | `score` |
| S1-L9142-811 | 9142 | object member | shared | compatibility/domain | `score` |
| S1-L9143-812 | 9143 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9144-813 | 9144 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9146-814 | 9146 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9147-815 | 9147 | object member | shared | compatibility/domain | `score` |
| S1-L9148-816 | 9148 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9149-817 | 9149 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9150-818 | 9150 | object member | navigation/shell | compatibility/domain | `score` |
| S1-L9151-819 | 9151 | object member | therapy | compatibility/domain | `score` |
| S1-L9152-820 | 9152 | object member | therapy | compatibility/domain | `score` |
| S1-L9153-821 | 9153 | object member | navigation/shell | compatibility/domain | `score` |
| S1-L9154-822 | 9154 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9155-823 | 9155 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9156-824 | 9156 | object member | environment | compatibility/domain | `score` |
| S1-L9157-825 | 9157 | object member | money | compatibility/domain | `score` |
| S1-L9158-826 | 9158 | object member | intelligence | pure domain logic | `score` |
| S1-L9159-827 | 9159 | object member | shared | compatibility/domain | `score` |
| S1-L9160-828 | 9160 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9161-829 | 9161 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9162-830 | 9162 | object member | social/presence | compatibility/domain | `score` |
| S1-L9163-831 | 9163 | object member | social/presence | compatibility/domain | `score` |
| S1-L9164-832 | 9164 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9165-833 | 9165 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9166-834 | 9166 | object member | shared | compatibility/domain | `score` |
| S1-L9167-835 | 9167 | object member | intelligence | pure domain logic | `score` |
| S1-L9168-836 | 9168 | object member | therapy | compatibility/domain | `score` |
| S1-L9169-837 | 9169 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9170-838 | 9170 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9171-839 | 9171 | object member | money | compatibility/domain | `score` |
| S1-L9172-840 | 9172 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9173-841 | 9173 | object member | therapy | compatibility/domain | `score` |
| S1-L9174-842 | 9174 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9175-843 | 9175 | object member | social/presence | compatibility/domain | `score` |
| S1-L9176-844 | 9176 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9177-845 | 9177 | object member | shared | compatibility/domain | `score` |
| S1-L9178-846 | 9178 | object member | shared | compatibility/domain | `score` |
| S1-L9179-847 | 9179 | object member | shared | compatibility/domain | `score` |
| S1-L9180-848 | 9180 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9181-849 | 9181 | object member | shared | compatibility/domain | `score` |
| S1-L9182-850 | 9182 | object member | shared | compatibility/domain | `score` |
| S1-L9184-851 | 9184 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9185-852 | 9185 | object member | shared | compatibility/domain | `score` |
| S1-L9186-853 | 9186 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9187-854 | 9187 | object member | shared | compatibility/domain | `score` |
| S1-L9188-855 | 9188 | object member | shared | compatibility/domain | `score` |
| S1-L9189-856 | 9189 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9190-857 | 9190 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9191-858 | 9191 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9192-859 | 9192 | object member | therapy | compatibility/domain | `score` |
| S1-L9193-860 | 9193 | object member | intelligence | pure domain logic | `score` |
| S1-L9194-861 | 9194 | object member | shared | compatibility/domain | `score` |
| S1-L9195-862 | 9195 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9196-863 | 9196 | object member | social/presence | compatibility/domain | `score` |
| S1-L9197-864 | 9197 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9198-865 | 9198 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9199-866 | 9199 | object member | social/presence | compatibility/domain | `score` |
| S1-L9200-867 | 9200 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9201-868 | 9201 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9202-869 | 9202 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9203-870 | 9203 | object member | fatherhood/child | compatibility/domain | `score` |
| S1-L9204-871 | 9204 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9205-872 | 9205 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9206-873 | 9206 | object member | money | compatibility/domain | `score` |
| S1-L9207-874 | 9207 | object member | money | compatibility/domain | `score` |
| S1-L9208-875 | 9208 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9209-876 | 9209 | object member | azure/learning | compatibility/domain | `score` |
| S1-L9210-877 | 9210 | object member | environment | compatibility/domain | `score` |
| S1-L9211-878 | 9211 | object member | environment | compatibility/domain | `score` |
| S1-L9212-879 | 9212 | object member | pattern/private | compatibility/domain | `score` |
| S1-L9213-880 | 9213 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9214-881 | 9214 | object member | social/presence | compatibility/domain | `score` |
| S1-L9215-882 | 9215 | object member | health/recovery | compatibility/domain | `score` |
| S1-L9216-883 | 9216 | object member | shared | compatibility/domain | `score` |
| S1-L9217-884 | 9217 | object member | shared | compatibility/domain | `score` |
| S1-L9218-885 | 9218 | object member | therapy | compatibility/domain | `score` |
| S1-L9219-886 | 9219 | object member | shared | compatibility/domain | `score` |
| S1-L9220-887 | 9220 | declaration | intelligence | pure domain logic | `forecastMoveIdFromText` |
| S1-L9225-888 | 9225 | declaration | shared | pure domain logic | `moveAllowedInPeriod` |
| S1-L9230-889 | 9230 | declaration | diagnostics | diagnostic/test | `moveAllowedInClockWindow` |
| S1-L9246-890 | 9246 | declaration | intelligence | pure domain logic | `moveContraindicated` |
| S1-L9249-891 | 9249 | object member | shared | compatibility/domain | `already_hydrated` |
| S1-L9250-892 | 9250 | object member | shared | compatibility/domain | `already_protein` |
| S1-L9251-893 | 9251 | object member | azure/learning | compatibility/domain | `already_azure` |
| S1-L9252-894 | 9252 | object member | money | compatibility/domain | `already_money` |
| S1-L9253-895 | 9253 | object member | fatherhood/child | compatibility/domain | `already_fatherhood` |
| S1-L9254-896 | 9254 | object member | social/presence | compatibility/domain | `already_social` |
| S1-L9255-897 | 9255 | object member | therapy | compatibility/domain | `already_night_reset` |
| S1-L9256-898 | 9256 | object member | intelligence | pure domain logic | `tomorrow_win_set` |
| S1-L9257-899 | 9257 | object member | shared | compatibility/domain | `very_low_state` |
| S1-L9258-900 | 9258 | object member | health/recovery | compatibility/domain | `exhausted` |
| S1-L9259-901 | 9259 | object member | week | pure domain logic | `saturday_open_time_done` |
| S1-L9260-902 | 9260 | object member | faith | compatibility/domain | `after_church_reset_done` |
| S1-L9261-903 | 9261 | object member | faith | compatibility/domain | `faith_minimum_done` |
| S1-L9262-904 | 9262 | object member | faith | compatibility/domain | `zion_signature_done` |
| S1-L9266-905 | 9266 | declaration | intelligence | pure domain logic | `moveTriggerScore` |
| S1-L9270-906 | 9270 | object member | shared | compatibility/domain | `missing_current_state` |
| S1-L9271-907 | 9271 | object member | shared | compatibility/domain | `low_state` |
| S1-L9272-908 | 9272 | object member | shared | compatibility/domain | `very_low_state` |
| S1-L9273-909 | 9273 | object member | pattern/private | compatibility/domain | `low_energy` |
| S1-L9274-910 | 9274 | object member | pattern/private | compatibility/domain | `low_mood` |
| S1-L9275-911 | 9275 | object member | shared | compatibility/domain | `low_focus` |
| S1-L9276-912 | 9276 | object member | shared | compatibility/domain | `low_drive` |
| S1-L9277-913 | 9277 | object member | social/presence | compatibility/domain | `low_confidence` |
| S1-L9278-914 | 9278 | object member | navigation/shell | navigation | `high_irritability` |
| S1-L9279-915 | 9279 | object member | therapy | compatibility/domain | `high_stress` |
| S1-L9280-916 | 9280 | object member | shared | compatibility/domain | `high_overwhelm` |
| S1-L9281-917 | 9281 | object member | health/recovery | compatibility/domain | `low_hydration` |
| S1-L9282-918 | 9282 | object member | shared | compatibility/domain | `hungry` |
| S1-L9283-919 | 9283 | object member | shared | compatibility/domain | `woke_thirsty` |
| S1-L9284-920 | 9284 | object member | shared | compatibility/domain | `no_breakfast` |
| S1-L9285-921 | 9285 | object member | shared | compatibility/domain | `skipped_meal` |
| S1-L9286-922 | 9286 | object member | shared | compatibility/domain | `food_risk` |
| S1-L9287-923 | 9287 | object member | shared | compatibility/domain | `food_unknown` |
| S1-L9288-924 | 9288 | object member | shared | compatibility/domain | `heavy_carbs` |
| S1-L9289-925 | 9289 | object member | shared | compatibility/domain | `heavy_lunch` |
| S1-L9290-926 | 9290 | object member | shared | compatibility/domain | `sugar` |
| S1-L9291-927 | 9291 | object member | health/recovery | compatibility/domain | `fast_food` |
| S1-L9292-928 | 9292 | object member | shared | compatibility/domain | `no_protein` |
| S1-L9293-929 | 9293 | object member | health/recovery | compatibility/domain | `no_workout` |
| S1-L9294-930 | 9294 | object member | shared | compatibility/domain | `no_sunlight` |
| S1-L9295-931 | 9295 | object member | azure/learning | compatibility/domain | `azure_missing` |
| S1-L9296-932 | 9296 | object member | money | compatibility/domain | `money_missing` |
| S1-L9297-933 | 9297 | object member | fatherhood/child | compatibility/domain | `fatherhood_missing` |
| S1-L9298-934 | 9298 | object member | social/presence | compatibility/domain | `social_missing` |
| S1-L9299-935 | 9299 | object member | environment | compatibility/domain | `home_missing` |
| S1-L9300-936 | 9300 | object member | therapy | compatibility/domain | `night_reset_missing` |
| S1-L9301-937 | 9301 | object member | money | compatibility/domain | `money_stress` |
| S1-L9302-938 | 9302 | object member | therapy | compatibility/domain | `parenting_stress` |
| S1-L9303-939 | 9303 | object member | therapy | compatibility/domain | `loneliness` |
| S1-L9304-940 | 9304 | object member | social/presence | compatibility/domain | `no_social_trend` |
| S1-L9305-941 | 9305 | object member | shared | compatibility/domain | `late_phone` |
| S1-L9306-942 | 9306 | object member | pattern/private | compatibility/domain | `late_caffeine` |
| S1-L9307-943 | 9307 | object member | health/recovery | compatibility/domain | `sleep_debt` |
| S1-L9308-944 | 9308 | object member | health/recovery | compatibility/domain | `low_sleep` |
| S1-L9309-945 | 9309 | object member | shared | compatibility/domain | `night_food_risk` |
| S1-L9310-946 | 9310 | object member | shared | compatibility/domain | `morning_sluggish` |
| S1-L9311-947 | 9311 | object member | shared | compatibility/domain | `racing_thoughts` |
| S1-L9312-948 | 9312 | object member | therapy | compatibility/domain | `night_stress` |
| S1-L9313-949 | 9313 | object member | shared | compatibility/domain | `evening` |
| S1-L9314-950 | 9314 | object member | intelligence | pure domain logic | `tomorrow_setup` |
| S1-L9315-951 | 9315 | object member | health/recovery | compatibility/domain | `sleep_protection` |
| S1-L9316-952 | 9316 | object member | shared | compatibility/domain | `decent_focus` |
| S1-L9317-953 | 9317 | object member | shared | compatibility/domain | `good_state` |
| S1-L9318-954 | 9318 | object member | shared | compatibility/domain | `steady_state` |
| S1-L9319-955 | 9319 | object member | week | pure domain logic | `saturday_open_time` |
| S1-L9320-956 | 9320 | object member | faith | pure domain logic | `church_day` |
| S1-L9321-957 | 9321 | object member | pattern/private | pure domain logic | `mood_timeline_low` |
| S1-L9322-958 | 9322 | object member | pattern/private | pure domain logic | `mood_timeline_drop` |
| S1-L9323-959 | 9323 | object member | pattern/private | pure domain logic | `mood_timeline_improving` |
| S1-L9324-960 | 9324 | object member | pattern/private | compatibility/domain | `mood_lifter_known` |
| S1-L9325-961 | 9325 | object member | pattern/private | compatibility/domain | `mood_drain_known` |
| S1-L9326-962 | 9326 | object member | faith | compatibility/domain | `faith_missing` |
| S1-L9327-963 | 9327 | object member | faith | compatibility/domain | `zion_signature_missing` |
| S1-L9328-964 | 9328 | object member | shared | compatibility/domain | `low_drive` |
| S1-L9329-965 | 9329 | object member | pattern/private | compatibility/domain | `energy_symptoms` |
| S1-L9330-966 | 9330 | object member | pattern/private | compatibility/domain | `energy_crash_after_food` |
| S1-L9331-967 | 9331 | object member | pattern/private | compatibility/domain | `energy_caffeine_crash` |
| S1-L9332-968 | 9332 | object member | pattern/private | compatibility/domain | `energy_brain_fog` |
| S1-L9333-969 | 9333 | object member | pattern/private | compatibility/domain | `private_followup_open` |
| S1-L9334-970 | 9334 | object member | pattern/private | compatibility/domain | `private_followup_late` |
| S1-L9335-971 | 9335 | object member | pattern/private | compatibility/domain | `private_followup_morning_after` |
| S1-L9336-972 | 9336 | object member | pattern/private | compatibility/domain | `private_followup_expired` |
| S1-L9337-973 | 9337 | object member | today | pure domain logic | `desk_day` |
| S1-L9338-974 | 9338 | object member | pattern/private | compatibility/domain | `good_energy` |
| S1-L9339-975 | 9339 | object member | shared | compatibility/domain | `good_focus` |
| S1-L9340-976 | 9340 | object member | shared | compatibility/domain | `strength_goal` |
| S1-L9341-977 | 9341 | object member | social/presence | compatibility/domain | `build_confidence` |
| S1-L9342-978 | 9342 | object member | azure/learning | compatibility/domain | `learning_due` |
| S1-L9343-979 | 9343 | object member | azure/learning | compatibility/domain | `weak_topic` |
| S1-L9344-980 | 9344 | object member | fatherhood/child | compatibility/domain | `child_development` |
| S1-L9345-981 | 9345 | object member | fatherhood/child | compatibility/domain | `connection_need` |
| S1-L9346-982 | 9346 | object member | social/presence | compatibility/domain | `confidence_building` |
| S1-L9347-983 | 9347 | object member | social/presence | compatibility/domain | `confidence_low` |
| S1-L9348-984 | 9348 | object member | intelligence | pure domain logic | `presence_open` |
| S1-L9349-985 | 9349 | object member | today | compatibility/domain | `environment_high_friction` |
| S1-L9350-986 | 9350 | object member | today | compatibility/domain | `machine_open` |
| S1-L9351-987 | 9351 | object member | environment | compatibility/domain | `morning_prep_open` |
| S1-L9352-988 | 9352 | object member | today | compatibility/domain | `meaning_drift` |
| S1-L9353-989 | 9353 | object member | faith | compatibility/domain | `faith_pressure` |
| S1-L9355-990 | 9355 | object member | today | pure domain logic | `workday` |
| S1-L9356-991 | 9356 | object member | today | pure domain logic | `monday` |
| S1-L9357-992 | 9357 | object member | today | pure domain logic | `sunday` |
| S1-L9361-993 | 9361 | declaration | intelligence | pure domain logic | `moveRepetitionPenalty` |
| S1-L9374-994 | 9374 | declaration | intelligence | pure domain logic | `forecastMoveDedupeGroup` |
| S1-L9379-995 | 9379 | arrow | shared | compatibility/domain | `has` |
| S1-L9392-996 | 9392 | declaration | today | compatibility/domain | `wave2MoveCanonicalText` |
| S1-L9398-997 | 9398 | declaration | shared | compatibility/domain | `wave2TokenSet` |
| S1-L9399-998 | 9399 | declaration | shared | compatibility/domain | `wave2TokenOverlap` |
| S1-L9405-999 | 9405 | declaration | storage/restore | persistence | `wave2MoveDedupeGroup` |
| S1-L9411-1000 | 9411 | arrow | shared | compatibility/domain | `has` |
| S1-L9424-1001 | 9424 | declaration | shared | compatibility/domain | `wave2IsNearDuplicateMove` |
| S1-L9432-1002 | 9432 | declaration | storage/restore | persistence | `wave2MoveGuardrailPenalty` |
| S1-L9469-1003 | 9469 | declaration | shared | compatibility/domain | `wave2RecentSimilarityPenalty` |
| S1-L9479-1004 | 9479 | declaration | shared | compatibility/domain | `wave2SelectBestRankedMove` |
| S1-L9485-1005 | 9485 | declaration | intelligence | pure domain logic | `forecastMoveCandidates` |
| S1-L9488-1006 | 9488 | arrow | intelligence | pure domain logic | `addCandidate` |
| S1-L9512-1007 | 9512 | declaration | intelligence | pure domain logic | `allForecastActions` |
| S1-L9521-1008 | 9521 | declaration | intelligence | pure domain logic | `forecastActionImprovement` |
| S1-L9530-1009 | 9530 | declaration | environment | compatibility/domain | `weightedAvgPairs` |
| S1-L9536-1010 | 9536 | declaration | intelligence | pure domain logic | `proofLevelForStats` |
| S1-L9545-1011 | 9545 | declaration | intelligence | pure domain logic | `forecastEffectMetricDeltas` |
| S1-L9556-1012 | 9556 | declaration | intelligence | pure domain logic | `forecastDomainEffectsFromDeltas` |
| S1-L9557-1013 | 9557 | arrow | shared | compatibility/domain | `avg` |
| S1-L9575-1014 | 9575 | declaration | azure/learning | compatibility/domain | `strongestEffectLabels` |
| S1-L9582-1015 | 9582 | declaration | azure/learning | compatibility/domain | `weakEffectLabels` |
| S1-L9589-1016 | 9589 | declaration | intelligence | pure domain logic | `moveConditionKeysFromAction` |
| S1-L9609-1017 | 9609 | declaration | guides | automation/guide | `moveConditionKeysFromContext` |
| S1-L9629-1018 | 9629 | declaration | azure/learning | compatibility/domain | `makeEmptyMoveEffectProfile` |
| S1-L9632-1019 | 9632 | declaration | intelligence | pure domain logic | `addActionToMoveEffectProfile` |
| S1-L9661-1020 | 9661 | declaration | shared | compatibility/domain | `finalizeMoveEffectProfile` |
| S1-L9696-1021 | 9696 | declaration | intelligence | pure domain logic | `buildMoveEffectProfiles` |
| S1-L9706-1022 | 9706 | arrow | azure/learning | compatibility/domain | `put` |
| S1-L9718-1023 | 9718 | declaration | intelligence | pure domain logic | `focusedProofCollectionStatus` |
| S1-L9742-1024 | 9742 | declaration | intelligence | pure domain logic | `profileLiftBonus` |
| S1-L9749-1025 | 9749 | declaration | shared | compatibility/domain | `profileConditionMatchBonus` |
| S1-L9765-1026 | 9765 | declaration | intelligence | pure domain logic | `forecastMoveStats` |
| S1-L9777-1027 | 9777 | arrow | intelligence | pure domain logic | `put` |
| S1-L9806-1028 | 9806 | declaration | intelligence | pure domain logic | `moveHistoryScore` |
| S1-L9846-1029 | 9846 | declaration | storage/restore | persistence | `privateBestMoveFromContext` |
| S1-L9882-1030 | 9882 | declaration | storage/restore | persistence | `peakBottleneckName` |
| S1-L9900-1031 | 9900 | declaration | storage/restore | persistence | `peakBottleneckDefaultLever` |
| S1-L9918-1032 | 9918 | declaration | storage/restore | export | `detectPeakBottlenecks` |
| S1-L9932-1033 | 9932 | arrow | intelligence | pure domain logic | `add` |
| S1-L10060-1034 | 10060 | declaration | intelligence | pure domain logic | `wave2BottleneckRow` |
| S1-L10064-1035 | 10064 | declaration | storage/restore | persistence | `wave2AddSpecificBottlenecks` |
| S1-L10114-1036 | 10114 | declaration | intelligence | pure domain logic | `buildWave2BottleneckRankings` |
| S1-L10121-1037 | 10121 | arrow | intelligence | pure domain logic | `put` |
| S1-L10141-1038 | 10141 | declaration | storage/restore | persistence | `peakMoveMatchesBottleneck` |
| S1-L10145-1039 | 10145 | arrow | shared | compatibility/domain | `has` |
| S1-L10147-1040 | 10147 | object member | health/recovery | compatibility/domain | `body_battery` |
| S1-L10148-1041 | 10148 | object member | therapy | compatibility/domain | `nervous_system` |
| S1-L10149-1042 | 10149 | object member | azure/learning | compatibility/domain | `mission_drift` |
| S1-L10150-1043 | 10150 | object member | storage/restore | persistence | `recovery_risk` |
| S1-L10151-1044 | 10151 | object member | environment | compatibility/domain | `environment_friction` |
| S1-L10152-1045 | 10152 | object member | fatherhood/child | compatibility/domain | `connection_need` |
| S1-L10153-1046 | 10153 | object member | health/recovery | compatibility/domain | `presence_identity` |
| S1-L10154-1047 | 10154 | object member | faith | compatibility/domain | `faith_meaning` |
| S1-L10155-1048 | 10155 | object member | social/presence | compatibility/domain | `data_confidence` |
| S1-L10156-1049 | 10156 | object member | azure/learning | compatibility/domain | `azure_drift` |
| S1-L10157-1050 | 10157 | object member | money | compatibility/domain | `money_drift` |
| S1-L10158-1051 | 10158 | object member | fatherhood/child | compatibility/domain | `fatherhood_drift` |
| S1-L10159-1052 | 10159 | object member | social/presence | compatibility/domain | `presence_social_drift` |
| S1-L10160-1053 | 10160 | object member | storage/restore | persistence | `emotional_load` |
| S1-L10166-1054 | 10166 | declaration | azure/learning | compatibility/domain | `eliteMoveFacetFlags` |
| S1-L10171-1055 | 10171 | arrow | shared | compatibility/domain | `has` |
| S1-L10189-1056 | 10189 | declaration | azure/learning | compatibility/domain | `fitGradeLabel` |
| S1-L10198-1057 | 10198 | declaration | storage/restore | export | `elitePeakMoveFitBreakdown` |
| S1-L10214-1058 | 10214 | arrow | shared | state mutation | `add` |
| S1-L10397-1059 | 10397 | declaration | intelligence | pure domain logic | `elitePeakMoveFitScore` |
| S1-L10407-1060 | 10407 | arrow | shared | compatibility/domain | `has` |
| S1-L10485-1061 | 10485 | declaration | guides | automation/guide | `choosePersonalizedMove` |
| S1-L10555-1062 | 10555 | declaration | intelligence | pure domain logic | `isSleepForecastAction` |
| S1-L10561-1063 | 10561 | declaration | shared | compatibility/domain | `hoursSinceIso` |
| S1-L10566-1064 | 10566 | declaration | intelligence | pure domain logic | `forecastEffectDelayMinutes` |
| S1-L10576-1065 | 10576 | declaration | intelligence | pure domain logic | `forecastEffectDueAt` |
| S1-L10589-1066 | 10589 | declaration | intelligence | pure domain logic | `forecastEffectCheckStatus` |
| S1-L10601-1067 | 10601 | declaration | intelligence | pure domain logic | `forecastEffectDueLabel` |
| S1-L10607-1068 | 10607 | declaration | shared | pure domain logic | `nextPeriodAfter` |
| S1-L10613-1069 | 10613 | declaration | guides | automation/guide | `forecastEffectTarget` |
| S1-L10619-1070 | 10619 | declaration | storage/restore | persistence | `effectCheckLagMinutes` |
| S1-L10625-1071 | 10625 | declaration | intelligence | automation/guide | `effectCheckWindowLabel` |
| S1-L10635-1072 | 10635 | declaration | diagnostics | diagnostic/test | `effectEvidenceForAction` |
| S1-L10677-1073 | 10677 | declaration | pattern/private | compatibility/domain | `isEffectStateRangeKey` |
| S1-L10680-1074 | 10680 | declaration | pattern/private | pure domain logic | `stateRangeLogCountForPeriod` |
| S1-L10685-1075 | 10685 | declaration | intelligence | pure domain logic | `findEffectCheckCandidateForAuto` |
| S1-L10704-1076 | 10704 | declaration | storage/restore | persistence | `maybeAutoCompleteForecastEffectFromRange` |
| S1-L10732-1077 | 10732 | declaration | guides | automation/guide | `autoCompleteDueForecastEffectsSilently` |
| S1-L10760-1078 | 10760 | declaration | storage/restore | persistence | `completeForecastEffectCheck` |
| S1-L10784-1079 | 10784 | declaration | azure/learning | compatibility/domain | `wave3ProofStatusLabel` |
| S1-L10787-1080 | 10787 | declaration | shared | compatibility/domain | `wave3ProofStatusLift` |
| S1-L10793-1081 | 10793 | declaration | shared | compatibility/domain | `wave3ActionProofStatus` |
| S1-L10797-1082 | 10797 | declaration | shared | compatibility/domain | `wave3SubjectiveLiftForAction` |
| S1-L10800-1083 | 10800 | declaration | shared | compatibility/domain | `wave3SubjectiveWeightForAction` |
| S1-L10806-1084 | 10806 | declaration | intelligence | pure domain logic | `wave3MoveKeyForAction` |
| S1-L10809-1085 | 10809 | declaration | intelligence | pure domain logic | `wave3MoveKeyForCandidate` |
| S1-L10812-1086 | 10812 | declaration | storage/restore | persistence | `wave3ProofContextTagsFromAction` |
| S1-L10830-1087 | 10830 | declaration | storage/restore | persistence | `wave3ProofContextTagsFromContext` |
| S1-L10849-1088 | 10849 | declaration | storage/restore | persistence | `wave3PendingProofPromptCandidate` |
| S1-L10873-1089 | 10873 | declaration | intelligence | rendering | `renderWave3ProofPrompt` |
| S1-L10882-1090 | 10882 | declaration | storage/restore | persistence | `recordWave3ProofOutcome` |
| S1-L10924-1091 | 10924 | declaration | shared | compatibility/domain | `wave3BNumber` |
| S1-L10925-1092 | 10925 | declaration | pattern/private | compatibility/domain | `wave3BMetricKeys` |
| S1-L10926-1093 | 10926 | declaration | pattern/private | pure domain logic | `wave3BPeriodMetricValue` |
| S1-L10946-1094 | 10946 | declaration | pattern/private | compatibility/domain | `wave3BScoreFromMetrics` |
| S1-L10952-1095 | 10952 | declaration | pattern/private | compatibility/domain | `wave3BSnapshotFor` |
| S1-L10961-1096 | 10961 | declaration | today | compatibility/domain | `wave3BSnapshotFromActionStart` |
| S1-L10969-1097 | 10969 | declaration | today | compatibility/domain | `wave3BSnapshotFromActionAfter` |
| S1-L10977-1098 | 10977 | declaration | intelligence | pure domain logic | `wave3BTargetWindowForAction` |
| S1-L10984-1099 | 10984 | declaration | shared | compatibility/domain | `wave3BFindAfterSnapshot` |
| S1-L10987-1100 | 10987 | declaration | pattern/private | compatibility/domain | `wave3BObservedDelta` |
| S1-L11001-1101 | 11001 | declaration | shared | pure domain logic | `wave3BDateBefore` |
| S1-L11002-1102 | 11002 | declaration | today | compatibility/domain | `wave3BBaselineForAction` |
| S1-L11022-1103 | 11022 | declaration | storage/restore | persistence | `wave3BConfoundersForAction` |
| S1-L11034-1104 | 11034 | declaration | social/presence | compatibility/domain | `wave3BConfidenceForInference` |
| S1-L11046-1105 | 11046 | declaration | shared | compatibility/domain | `wave3BManualStatusForAction` |
| S1-L11050-1106 | 11050 | declaration | intelligence | pure domain logic | `wave3BInferActionOutcome` |
| S1-L11078-1107 | 11078 | declaration | azure/learning | compatibility/domain | `wave3BLabelToProofStatus` |
| S1-L11084-1108 | 11084 | declaration | azure/learning | compatibility/domain | `wave3BLabelText` |
| S1-L11087-1109 | 11087 | declaration | diagnostics | diagnostic/test | `wave3BInferenceFingerprint` |
| S1-L11092-1110 | 11092 | declaration | storage/restore | persistence | `buildWave3BAutomaticOutcomeLearning` |
| S1-L11097-1111 | 11097 | arrow | azure/learning | compatibility/domain | `put` |
| S1-L11138-1112 | 11138 | declaration | intelligence | pure domain logic | `wave3BAutomaticOutcomeFitForCandidate` |
| S1-L11166-1113 | 11166 | declaration | intelligence | persistence | `buildWave3MoveEffectProfiles` |
| S1-L11171-1114 | 11171 | arrow | azure/learning | compatibility/domain | `put` |
| S1-L11216-1115 | 11216 | declaration | intelligence | pure domain logic | `wave3ProofFitForCandidate` |
| S1-L11246-1116 | 11246 | declaration | intelligence | pure domain logic | `forecastActionLifecycle` |
| S1-L11254-1117 | 11254 | declaration | intelligence | pure domain logic | `markExpiredForecastActions` |
| S1-L11267-1118 | 11267 | declaration | guides | automation/guide | `getActiveForecastAction` |
| S1-L11283-1119 | 11283 | declaration | intelligence | pure domain logic | `getActiveForecastMove` |
| S1-L11286-1120 | 11286 | declaration | storage/restore | export | `startForecastMove` |
| S1-L11332-1121 | 11332 | declaration | storage/restore | persistence | `startForecastMoveFromButton` |
| S1-L11342-1122 | 11342 | declaration | diagnostics | diagnostic/test | `forecastMoveEffectiveness` |
| S1-L11360-1123 | 11360 | declaration | storage/restore | persistence | `finishForecastMove` |
| S1-L11398-1124 | 11398 | declaration | storage/restore | persistence | `undoForecastMove` |
| S1-L11421-1125 | 11421 | declaration | intelligence | pure domain logic | `findForecastActionById` |
| S1-L11427-1126 | 11427 | declaration | diagnostics | diagnostic/test | `latestCompletedForecastActionForDisplay` |
| S1-L11448-1127 | 11448 | declaration | guides | automation/guide | `releaseOldPeakMoveDisplayLocks` |
| S1-L11459-1128 | 11459 | declaration | storage/restore | persistence | `forecastMovePayloadFromCandidate` |
| S1-L11481-1129 | 11481 | declaration | guides | automation/guide | `activeForecastMoveOverride` |
| S1-L11487-1130 | 11487 | declaration | storage/restore | persistence | `currentDisplayedForecastPayload` |
| S1-L11494-1131 | 11494 | declaration | storage/restore | persistence | `terminalSleepMovePayload` |
| S1-L11522-1132 | 11522 | declaration | storage/restore | persistence | `shouldOfferTerminalSleepMove` |
| S1-L11529-1133 | 11529 | declaration | storage/restore | persistence | `addForecastDismissalForPayload` |
| S1-L11555-1134 | 11555 | declaration | diagnostics | diagnostic/test | `chooseAlternateForecastMove` |
| S1-L11615-1135 | 11615 | declaration | storage/restore | persistence | `dismissCurrentPeakMove` |
| S1-L11629-1136 | 11629 | declaration | diagnostics | diagnostic/test | `forecastDisplayMove` |
| S1-L11648-1137 | 11648 | declaration | storage/restore | persistence | `requestAnotherForecastMove` |
| S1-L11674-1138 | 11674 | declaration | storage/restore | persistence | `forecastMovePayloadForStart` |
| S1-L11694-1139 | 11694 | declaration | diagnostics | diagnostic/test | `forecastMoveControls` |
| S1-L11720-1140 | 11720 | declaration | exports | export | `buildForecastMoveExport` |
| S1-L11734-1141 | 11734 | arrow | intelligence | pure domain logic | `put` |
| S1-L11770-1142 | 11770 | declaration | environment | compatibility/domain | `avgNums` |
| S1-L11774-1143 | 11774 | declaration | pattern/private | pure domain logic | `periodStateScoreFromDay` |
| S1-L11776-1144 | 11776 | arrow | shared | compatibility/domain | `val` |
| S1-L11785-1145 | 11785 | declaration | guides | automation/guide | `peakHighPointSnapshot` |
| S1-L11818-1146 | 11818 | declaration | storage/restore | persistence | `peakMoveDomain` |
| S1-L11824-1147 | 11824 | arrow | shared | compatibility/domain | `has` |
| S1-L11836-1148 | 11836 | declaration | storage/restore | persistence | `peakMoveMode` |
| S1-L11858-1149 | 11858 | declaration | storage/restore | persistence | `peakAimForMode` |
| S1-L11881-1150 | 11881 | declaration | diagnostics | diagnostic/test | `learningGoalForMove` |
| S1-L11904-1151 | 11904 | declaration | storage/restore | persistence | `peakModeClass` |
| S1-L11912-1152 | 11912 | declaration | diagnostics | diagnostic/test | `peakForecast` |
| S1-L11924-1153 | 11924 | arrow | shared | state mutation | `add` |
| S1-L11931-1154 | 11931 | arrow | shared | compatibility/domain | `actionProtect` |
| S1-L12045-1155 | 12045 | arrow | pattern/private | state mutation | `addCaffeineReason` |
| S1-L12191-1156 | 12191 | declaration | storage/restore | persistence | `setPattern` |
| S1-L12192-1157 | 12192 | declaration | storage/restore | persistence | `boolPattern` |
| S1-L12193-1158 | 12193 | declaration | storage/restore | persistence | `numPattern` |
| S1-L12194-1159 | 12194 | declaration | storage/restore | persistence | `rangePattern` |
| S1-L12195-1160 | 12195 | declaration | storage/restore | persistence | `currentEffectRange` |
| S1-L12196-1161 | 12196 | declaration | guides | automation/guide | `currentEffectsStatusChip` |
| S1-L12206-1162 | 12206 | declaration | storage/restore | persistence | `logCurrentEffects` |
| S1-L12207-1163 | 12207 | declaration | storage/restore | persistence | `timePattern` |
| S1-L12208-1164 | 12208 | declaration | storage/restore | persistence | `selectPattern` |
| S1-L12209-1165 | 12209 | declaration | storage/restore | persistence | `setPrivateSelect` |
| S1-L12216-1166 | 12216 | declaration | today | compatibility/domain | `privateSelectPattern` |
| S1-L12224-1167 | 12224 | declaration | pattern/private | compatibility/domain | `privatePatternActive` |
| S1-L12225-1168 | 12225 | declaration | pattern/private | compatibility/domain | `privateFollowupComplete` |
| S1-L12229-1169 | 12229 | declaration | pattern/private | compatibility/domain | `privateFollowupAllComplete` |
| S1-L12234-1170 | 12234 | declaration | pattern/private | compatibility/domain | `closePrivateFollowupIfComplete` |
| S1-L12245-1171 | 12245 | declaration | today | pure domain logic | `privateEventDayKeyFromIso` |
| S1-L12252-1172 | 12252 | declaration | today | pure domain logic | `sleepDayDiffFromIso` |
| S1-L12260-1173 | 12260 | declaration | health/recovery | compatibility/domain | `privateFollowupIsStale` |
| S1-L12263-1174 | 12263 | declaration | pattern/private | compatibility/domain | `autoCloseStalePrivateFollowup` |
| S1-L12278-1175 | 12278 | declaration | storage/restore | persistence | `privateFollowupKindForEvent` |
| S1-L12290-1176 | 12290 | declaration | azure/learning | compatibility/domain | `privateFollowupKindLabel` |
| S1-L12298-1177 | 12298 | declaration | azure/learning | compatibility/domain | `privateFollowupKindChip` |
| S1-L12304-1178 | 12304 | declaration | health/recovery | compatibility/domain | `privateFollowupInfo` |
| S1-L12337-1179 | 12337 | declaration | exports | export | `privateTimestampExport` |
| S1-L12343-1180 | 12343 | declaration | exports | export | `privatePatternExportDetails` |
| S1-L12400-1181 | 12400 | declaration | pattern/private | compatibility/domain | `privatePriorPendingNextMorning` |
| S1-L12403-1182 | 12403 | declaration | pattern/private | state mutation | `setPriorPrivateNextMorning` |
| S1-L12407-1183 | 12407 | declaration | pattern/private | compatibility/domain | `priorPrivateNextMorningPanel` |
| S1-L12412-1184 | 12412 | declaration | pattern/private | compatibility/domain | `privateEventLogs` |
| S1-L12417-1185 | 12417 | declaration | pattern/private | compatibility/domain | `privateEventIdFromIso` |
| S1-L12421-1186 | 12421 | declaration | azure/learning | compatibility/domain | `privateEventStatusLabel` |
| S1-L12434-1187 | 12434 | declaration | pattern/private | compatibility/domain | `privateEntryFromPattern` |
| S1-L12469-1188 | 12469 | declaration | pattern/private | compatibility/domain | `upsertPrivateEventLog` |
| S1-L12478-1189 | 12478 | declaration | pattern/private | state mutation | `removePrivateEventLog` |
| S1-L12485-1190 | 12485 | declaration | storage/restore | persistence | `deletePrivateEventLog` |
| S1-L12496-1191 | 12496 | declaration | pattern/private | compatibility/domain | `syncPrivateLogFromPattern` |
| S1-L12500-1192 | 12500 | declaration | storage/restore | persistence | `clearCurrentPrivatePattern` |
| S1-L12515-1193 | 12515 | declaration | azure/learning | pure domain logic | `privateEventDisplayTime` |
| S1-L12522-1194 | 12522 | declaration | today | pure domain logic | `privateBackdateSelectedDay` |
| S1-L12527-1195 | 12527 | declaration | today | rendering | `renderPrivateSelectedDateLogList` |
| S1-L12537-1196 | 12537 | declaration | azure/learning | rendering | `renderCurrentPrivateEventPreview` |
| S1-L12551-1197 | 12551 | declaration | azure/learning | rendering | `renderPrivateEventLogList` |
| S1-L12570-1198 | 12570 | declaration | guides | automation/guide | `privateGuideHoldNeeded` |
| S1-L12574-1199 | 12574 | declaration | pattern/private | pure domain logic | `privateDayForKey` |
| S1-L12579-1200 | 12579 | declaration | exports | export | `privateBackdateDraft` |
| S1-L12594-1201 | 12594 | declaration | storage/restore | persistence | `setPrivateBackdateField` |
| S1-L12601-1202 | 12601 | declaration | diagnostics | diagnostic/test | `localDateFromBackdate` |
| S1-L12606-1203 | 12606 | declaration | diagnostics | diagnostic/test | `privateBackdateTargetKey` |
| S1-L12611-1204 | 12611 | declaration | storage/restore | export | `logBackdatedPrivateEvent` |
| S1-L12648-1205 | 12648 | declaration | storage/restore | persistence | `renderPrivateBackdateControls` |
| S1-L12662-1206 | 12662 | declaration | azure/learning | compatibility/domain | `privateFollowupText` |
| S1-L12677-1207 | 12677 | declaration | pattern/private | pure domain logic | `ensurePrivateEventTimes` |
| S1-L12689-1208 | 12689 | declaration | storage/restore | persistence | `setPrivateFlag` |
| S1-L12709-1209 | 12709 | declaration | storage/restore | persistence | `setPrivateUsedAsEscape` |
| S1-L12720-1210 | 12720 | declaration | storage/restore | persistence | `setPrivateFollowupRange` |
| S1-L12727-1211 | 12727 | declaration | azure/learning | compatibility/domain | `privateFollowupRange` |
| S1-L12729-1212 | 12729 | declaration | azure/learning | pure domain logic | `privateCheckedTimeChip` |
| S1-L12741-1213 | 12741 | declaration | pattern/private | pure domain logic | `privateCheckedTimeChips` |
| S1-L12748-1214 | 12748 | declaration | storage/restore | persistence | `renderPrivateVariablesCard` |
| S1-L12764-1215 | 12764 | declaration | azure/learning | compatibility/domain | `readingSkillActive` |
| S1-L12765-1216 | 12765 | declaration | azure/learning | rendering | `renderSkillRepsCard` |
| S1-L12770-1217 | 12770 | declaration | shared | compatibility/domain | `nightKeys` |
| S1-L12772-1218 | 12772 | declaration | today | pure domain logic | `shouldCopyNightKeyToTodayPattern` |
| S1-L12773-1219 | 12773 | declaration | shared | compatibility/domain | `hasNightData` |
| S1-L12780-1220 | 12780 | declaration | pattern/private | compatibility/domain | `nightFromPattern` |
| S1-L12785-1221 | 12785 | declaration | shared | pure domain logic | `ensureDayByKey` |
| S1-L12790-1222 | 12790 | declaration | today | compatibility/domain | `actualLastNightContext` |
| S1-L12811-1223 | 12811 | declaration | today | pure domain logic | `syncActualLastNightIntoToday` |
| S1-L12830-1224 | 12830 | declaration | today | compatibility/domain | `nightTargetContext` |
| S1-L12840-1225 | 12840 | declaration | today | pure domain logic | `priorDateKey` |
| S1-L12844-1226 | 12844 | declaration | azure/learning | compatibility/domain | `labelForKey` |
| S1-L12849-1227 | 12849 | declaration | today | pure domain logic | `nightDateKeyForMode` |
| S1-L12853-1228 | 12853 | declaration | azure/learning | compatibility/domain | `nightTargetLabel` |
| S1-L12860-1229 | 12860 | declaration | storage/restore | persistence | `nightTargetContextChip` |
| S1-L12865-1230 | 12865 | declaration | today | compatibility/domain | `applyNightToPattern` |
| S1-L12872-1231 | 12872 | declaration | shared | compatibility/domain | `meaningfulNightValue` |
| S1-L12879-1232 | 12879 | declaration | today | compatibility/domain | `copyPreviousTonightIntoLastNight` |
| S1-L12909-1233 | 12909 | declaration | diagnostics | diagnostic/test | `ensureLastNightFromPrevious` |
| S1-L12928-1234 | 12928 | declaration | shared | compatibility/domain | `nightScope` |
| S1-L12931-1235 | 12931 | declaration | shared | compatibility/domain | `nightStatusNote` |
| S1-L12932-1236 | 12932 | declaration | azure/learning | compatibility/domain | `nightTargetControls` |
| S1-L12938-1237 | 12938 | declaration | shared | state mutation | `markLastNightManualEdit` |
| S1-L12942-1238 | 12942 | declaration | storage/restore | persistence | `afterNightRecordChanged` |
| S1-L12949-1239 | 12949 | declaration | pattern/private | state mutation | `setNightFieldValue` |
| S1-L12958-1240 | 12958 | declaration | pattern/private | state mutation | `setNightSelectValue` |
| S1-L12966-1241 | 12966 | declaration | azure/learning | pure domain logic | `nightTimePattern` |
| S1-L12975-1242 | 12975 | declaration | storage/restore | persistence | `setNightBoolValue` |
| S1-L12994-1243 | 12994 | declaration | azure/learning | compatibility/domain | `nightBoolPattern` |
| S1-L12999-1244 | 12999 | declaration | azure/learning | compatibility/domain | `nightSelectPattern` |
| S1-L13000-1245 | 13000 | declaration | storage/restore | persistence | `setNightTarget` |
| S1-L13008-1246 | 13008 | declaration | shared | state mutation | `setNightTargetFromEvent` |
| S1-L13014-1247 | 13014 | declaration | storage/restore | persistence | `setTodayCaffeineWindow` |
| S1-L13034-1248 | 13034 | declaration | diagnostics | diagnostic/test | `renderCaffeineCard` |
| S1-L13042-1249 | 13042 | declaration | diagnostics | diagnostic/test | `forecastReasonGroup` |
| S1-L13066-1250 | 13066 | declaration | intelligence | rendering | `forecastReasonGroupsHtml` |
| S1-L13074-1251 | 13074 | declaration | today | pure domain logic | `todaySignalRows` |
| S1-L13076-1252 | 13076 | declaration | pattern/private | pure domain logic | `moodTimelineEntries` |
| S1-L13081-1253 | 13081 | declaration | pattern/private | pure domain logic | `moodTimelineDraft` |
| S1-L13086-1254 | 13086 | declaration | storage/restore | persistence | `moodTimelineDraftBaseline` |
| S1-L13093-1255 | 13093 | declaration | pattern/private | pure domain logic | `moodTimelineDefaultLevel` |
| S1-L13100-1256 | 13100 | declaration | storage/restore | persistence | `hasUnsavedMoodTimelineDraft` |
| S1-L13109-1257 | 13109 | declaration | storage/restore | persistence | `refreshMoodTimelineDraftBadge` |
| S1-L13134-1258 | 13134 | declaration | storage/restore | persistence | `saveMoodTimelineDraft` |
| S1-L13145-1259 | 13145 | declaration | pattern/private | pure domain logic | `normalizeMoodTimelineLevel` |
| S1-L13152-1260 | 13152 | declaration | azure/learning | pure domain logic | `moodTimelineLabel` |
| S1-L13160-1261 | 13160 | declaration | storage/restore | persistence | `setMoodTimelineQuickScore` |
| S1-L13164-1262 | 13164 | declaration | storage/restore | persistence | `addMoodTimelineEntry` |
| S1-L13182-1263 | 13182 | declaration | storage/restore | persistence | `deleteMoodTimelineEntry` |
| S1-L13188-1264 | 13188 | declaration | storage/restore | persistence | `toggleMoodTimelineShowAll` |
| S1-L13194-1265 | 13194 | declaration | diagnostics | diagnostic/test | `renderMoodTimelineCard` |
| S1-L13210-1266 | 13210 | declaration | storage/restore | export | `renderPattern` |
| S1-L13227-1267 | 13227 | declaration | storage/restore | persistence | `defaultPresenceDay` |
| S1-L13234-1268 | 13234 | declaration | social/presence | compatibility/domain | `ensurePresenceFields` |
| S1-L13243-1269 | 13243 | declaration | azure/learning | compatibility/domain | `presenceRepOptions` |
| S1-L13253-1270 | 13253 | declaration | azure/learning | compatibility/domain | `presenceRepLabel` |
| S1-L13257-1271 | 13257 | declaration | social/presence | compatibility/domain | `presenceStageFromScore` |
| S1-L13265-1272 | 13265 | declaration | social/presence | pure domain logic | `presenceScoreForDay` |
| S1-L13276-1273 | 13276 | declaration | storage/restore | export | `presenceReadinessProfile` |
| S1-L13278-1274 | 13278 | arrow | shared | compatibility/domain | `pct2` |
| S1-L13300-1275 | 13300 | declaration | storage/restore | persistence | `logPresenceRep` |
| S1-L13316-1276 | 13316 | declaration | storage/restore | persistence | `setPresenceText` |
| S1-L13324-1277 | 13324 | declaration | storage/restore | persistence | `presenceBestRepRecommendation` |
| S1-L13340-1278 | 13340 | declaration | exports | export | `renderPresenceLevel5Card` |
| S1-L13347-1279 | 13347 | declaration | exports | export | `renderSocial` |
| S1-L13353-1280 | 13353 | declaration | storage/restore | persistence | `renderTherapy` |
| S1-L13361-1281 | 13361 | declaration | storage/restore | persistence | `emergencyReset` |
| S1-L13373-1282 | 13373 | declaration | storage/restore | persistence | `renderWeek` |
| S1-L13374-1283 | 13374 | declaration | azure/learning | rendering | `renderVision` |
| S1-L13375-1284 | 13375 | declaration | today | persistence | `recentEntries` |
| S1-L13389-1285 | 13389 | declaration | environment | compatibility/domain | `average` |
| S1-L13390-1286 | 13390 | declaration | shared | compatibility/domain | `yesRate` |
| S1-L13391-1287 | 13391 | declaration | fatherhood/child | compatibility/domain | `textEntries` |
| S1-L13405-1288 | 13405 | declaration | pattern/private | compatibility/domain | `stripPrivatePattern` |
| S1-L13410-1289 | 13410 | declaration | azure/learning | compatibility/domain | `normalizeInactiveDependentPattern` |
| S1-L13420-1290 | 13420 | declaration | exports | export | `sanitizePatternForExport` |
| S1-L13423-1291 | 13423 | declaration | exports | export | `sanitizeDayForExport` |
| S1-L13428-1292 | 13428 | declaration | exports | export | `forecastDayExport` |
| S1-L13451-1293 | 13451 | declaration | storage/restore | export | `buildPatternExport` |
| S1-L13460-1294 | 13460 | arrow | pattern/private | compatibility/domain | `vals` |
| S1-L13462-1295 | 13462 | arrow | pattern/private | compatibility/domain | `privateVals` |
| S1-L13464-1296 | 13464 | arrow | pattern/private | compatibility/domain | `readingVals` |
| S1-L13465-1297 | 13465 | arrow | pattern/private | compatibility/domain | `rate` |
| S1-L13466-1298 | 13466 | arrow | pattern/private | compatibility/domain | `privateRate` |
| S1-L13467-1299 | 13467 | arrow | pattern/private | compatibility/domain | `readingRate` |
| S1-L13468-1300 | 13468 | arrow | shared | pure domain logic | `dayFoodRate` |
| S1-L13518-1301 | 13518 | declaration | diagnostics | diagnostic/test | `buildMoodTimelineExport` |
| S1-L13542-1302 | 13542 | declaration | diagnostics | diagnostic/test | `buildLifeUpdate` |
| S1-L13549-1303 | 13549 | arrow | week | compatibility/domain | `satRate` |
| S1-L13666-1304 | 13666 | declaration | exports | export | `exportSleep` |
| S1-L13667-1305 | 13667 | declaration | diagnostics | diagnostic/test | `disableExportControls` |
| S1-L13679-1306 | 13679 | declaration | storage/restore | export | `setExportStatus` |
| S1-L13689-1307 | 13689 | declaration | storage/restore | export | `setExportProgress` |
| S1-L13701-1308 | 13701 | declaration | exports | export | `startExportProgress` |
| S1-L13709-1309 | 13709 | declaration | exports | export | `finishExportProgress` |
| S1-L13713-1310 | 13713 | declaration | exports | export | `failExportProgress` |
| S1-L13718-1311 | 13718 | declaration | storage/restore | export | `safeJsonDownload` |
| S1-L13723-1312 | 13723 | declaration | storage/restore | export | `buildFastBackupExport` |
| S1-L13743-1313 | 13743 | declaration | storage/restore | export | `exportLifeUpdate` |
| S1-L13768-1314 | 13768 | declaration | storage/restore | persistence | `toggleQuickMode` |
| S1-L13769-1315 | 13769 | declaration | storage/restore | persistence | `quickPreset` |
| S1-L13783-1316 | 13783 | declaration | shared | compatibility/domain | `quickBox` |
| S1-L13784-1317 | 13784 | declaration | storage/restore | persistence | `renderQuickMode` |
| S1-L13874-1318 | 13874 | declaration | storage/restore | persistence | `makeRestoreError` |
| S1-L13880-1319 | 13880 | declaration | storage/restore | persistence | `restoreErrorText` |
| S1-L13886-1320 | 13886 | declaration | storage/restore | persistence | `classifyRestoreStorageError` |
| S1-L13893-1321 | 13893 | declaration | storage/restore | persistence | `restoreTransactionIdFromHash` |
| S1-L13899-1322 | 13899 | declaration | storage/restore | persistence | `buildRestoreFailClosedState` |
| S1-L13902-1323 | 13902 | declaration | storage/restore | persistence | `canonicalRestoreSignature` |
| S1-L13924-1324 | 13924 | declaration | storage/restore | persistence | `restoreSignaturesEqual` |
| S1-L13927-1325 | 13927 | declaration | storage/restore | persistence | `restoreSignatureDiff` |
| S1-L13936-1326 | 13936 | declaration | storage/restore | persistence | `restoreDayKeyDiff` |
| S1-L13945-1327 | 13945 | declaration | storage/restore | persistence | `restoreMismatchDetails` |
| S1-L13954-1328 | 13954 | declaration | storage/restore | persistence | `currentRestoreFingerprint` |
| S1-L13965-1329 | 13965 | declaration | storage/restore | persistence | `restoreFingerprintsEqual` |
| S1-L13973-1330 | 13973 | declaration | storage/restore | persistence | `loadPendingRestoreStateBeforeRecovery` |
| S1-L14018-1331 | 14018 | declaration | storage/restore | persistence | `isPlainRestoreObject` |
| S1-L14019-1332 | 14019 | declaration | storage/restore | export | `prepareImportedBackupObject` |
| S1-L14052-1333 | 14052 | declaration | storage/restore | persistence | `hasMeaningfulCurrentDayEvidenceForRestore` |
| S1-L14074-1334 | 14074 | declaration | diagnostics | diagnostic/test | `finalizeRestoreCandidate` |
| S1-L14099-1335 | 14099 | declaration | storage/restore | export | `readImportFileReliable` |
| S1-L14104-1336 | 14104 | arrow | shared | compatibility/domain | `fail` |
| S1-L14105-1337 | 14105 | assigned | storage/restore | persistence | `reader.onerror` |
| S1-L14106-1338 | 14106 | assigned | storage/restore | persistence | `reader.onabort` |
| S1-L14107-1339 | 14107 | assigned | storage/restore | export | `reader.onload` |
| S1-L14122-1340 | 14122 | declaration | storage/restore | persistence | `restoreOverlayElement` |
| S1-L14134-1341 | 14134 | declaration | storage/restore | persistence | `closeRestoreOverlay` |
| S1-L14135-1342 | 14135 | declaration | storage/restore | persistence | `restoreProgressLabels` |
| S1-L14136-1343 | 14136 | declaration | storage/restore | persistence | `showRestoreProgress` |
| S1-L14142-1344 | 14142 | declaration | shared | compatibility/domain | `readableBytes` |
| S1-L14148-1345 | 14148 | declaration | storage/restore | persistence | `restoreStorageEstimate` |
| S1-L14155-1346 | 14155 | declaration | storage/restore | persistence | `showRestoreChoiceSheet` |
| S1-L14181-1347 | 14181 | declaration | storage/restore | persistence | `resolveRestoreChoice` |
| S1-L14187-1348 | 14187 | declaration | diagnostics | diagnostic/test | `markPhase64TRuntime` |
| S1-L14190-1349 | 14190 | declaration | diagnostics | diagnostic/test | `notePhase64TRuntimeError` |
| S1-L14197-1350 | 14197 | declaration | diagnostics | diagnostic/test | `phase64TExpectedRestoreContext` |
| S1-L14204-1351 | 14204 | declaration | diagnostics | diagnostic/test | `buildPhase64TDiagnosticPacket` |
| S1-L14231-1352 | 14231 | declaration | diagnostics | diagnostic/test | `phase64TDiagnosticPacketHtml` |
| S1-L14235-1353 | 14235 | declaration | diagnostics | diagnostic/test | `copyPhase64TDiagnostic` |
| S1-L14245-1354 | 14245 | declaration | diagnostics | diagnostic/test | `showPhase64TTabFailure` |
| S1-L14251-1355 | 14251 | declaration | diagnostics | diagnostic/test | `retryPhase64TFailedTab` |
| S1-L14262-1356 | 14262 | declaration | diagnostics | diagnostic/test | `showRestoreFailure` |
| S1-L14273-1357 | 14273 | declaration | storage/restore | persistence | `closeRestoreFailure` |
| S1-L14279-1358 | 14279 | declaration | storage/restore | persistence | `showRestoreSuccess` |
| S1-L14289-1359 | 14289 | declaration | storage/restore | persistence | `renderPendingRestoreBootSurface` |
| S1-L14299-1360 | 14299 | declaration | storage/restore | persistence | `relevantRestoreStorageMap` |
| S1-L14309-1361 | 14309 | declaration | diagnostics | diagnostic/test | `capturePreImportRollbackSnapshot` |
| S1-L14332-1362 | 14332 | declaration | storage/restore | persistence | `clearStorageAndRestoreMap` |
| S1-L14338-1363 | 14338 | declaration | diagnostics | diagnostic/test | `restoreRollbackBundle` |
| S1-L14364-1364 | 14364 | declaration | storage/restore | persistence | `rollbackPreImportState` |
| S1-L14374-1365 | 14374 | declaration | storage/restore | persistence | `clearCompetingRestoreSourcesForPending` |
| S1-L14381-1366 | 14381 | declaration | storage/restore | persistence | `strictLocalCandidateWrite` |
| S1-L14392-1367 | 14392 | declaration | storage/restore | persistence | `ensureRestoreInstanceId` |
| S1-L14401-1368 | 14401 | declaration | storage/restore | persistence | `setRestoreVerificationHash` |
| S1-L14405-1369 | 14405 | declaration | diagnostics | diagnostic/test | `verifyIdbCandidate` |
| S1-L14416-1370 | 14416 | declaration | diagnostics | diagnostic/test | `reconcileVerifiedRestoreAfterReload` |
| S1-L14461-1371 | 14461 | declaration | diagnostics | diagnostic/test | `finishPendingImportBootVerification` |
| S1-L14492-1372 | 14492 | declaration | storage/restore | persistence | `runVerifiedImportTransaction` |
| S1-L14588-1373 | 14588 | declaration | storage/restore | persistence | `shouldKeepFullRecoveryOutOfLocalStorage` |
| S1-L14592-1374 | 14592 | declaration | storage/restore | export | `storageStatusHtml` |
| S1-L14607-1375 | 14607 | declaration | diagnostics | diagnostic/test | `backupDayKeys` |
| S1-L14610-1376 | 14610 | declaration | exports | compatibility/domain | `backupByteEstimate` |
| S1-L14613-1377 | 14613 | declaration | exports | compatibility/domain | `backupDomainPresence` |
| S1-L14617-1378 | 14617 | declaration | exports | pure domain logic | `childSkillBackupSignature` |
| S1-L14620-1379 | 14620 | declaration | exports | compatibility/domain | `azureProofBackupSignature` |
| S1-L14623-1380 | 14623 | declaration | storage/restore | persistence | `backupIntegritySignature` |
| S1-L14633-1381 | 14633 | declaration | shared | pure domain logic | `dateKeyToTime` |
| S1-L14634-1382 | 14634 | declaration | exports | compatibility/domain | `requiredBackupDomainsPresent` |
| S1-L14637-1383 | 14637 | declaration | exports | compatibility/domain | `backupLooksLikeCompleteFullState` |
| S1-L14657-1384 | 14657 | declaration | storage/restore | persistence | `clearRecoverySnapshotMarkers` |
| S1-L14661-1385 | 14661 | declaration | storage/restore | persistence | `betterBackupBaselineSignature` |
| S1-L14664-1386 | 14664 | arrow | shared | compatibility/domain | `pushSig` |
| S1-L14676-1387 | 14676 | declaration | storage/restore | persistence | `backupShrinkRisk` |
| S1-L14699-1388 | 14699 | declaration | storage/restore | persistence | `guardRawAgainstHistoryShrinkForWrite` |
| S1-L14705-1389 | 14705 | arrow | storage/restore | persistence | `pushRaw` |
| S1-L14721-1390 | 14721 | declaration | storage/restore | persistence | `promoteLastGoodBackupRaw` |
| S1-L14758-1391 | 14758 | declaration | exports | export | `annotateBackupIntegrity` |
| S1-L14761-1392 | 14761 | declaration | storage/restore | export | `guardFullBackupExportCandidate` |
| S1-L14768-1393 | 14768 | declaration | storage/restore | export | `rememberSuccessfulFullBackup` |
| S1-L14782-1394 | 14782 | declaration | storage/restore | persistence | `backupSignatureCovers` |
| S1-L14785-1395 | 14785 | declaration | storage/restore | export | `backupHealthHtml` |
| S1-L14801-1396 | 14801 | declaration | storage/restore | export | `copyBackupJSON` |
| S1-L14813-1397 | 14813 | declaration | exports | export | `showBackupBox` |
| S1-L14817-1398 | 14817 | declaration | storage/restore | persistence | `applyImportedStateObject` |
| S1-L14820-1399 | 14820 | declaration | storage/restore | export | `importBackupText` |
| S1-L14831-1400 | 14831 | declaration | exports | export | `level5Clamp` |
| S1-L14836-1401 | 14836 | declaration | exports | export | `level5Label` |
| S1-L14844-1402 | 14844 | declaration | exports | export | `level5Confidence` |
| S1-L14851-1403 | 14851 | declaration | exports | export | `appCapabilityDomain` |
| S1-L14855-1404 | 14855 | declaration | exports | export | `outcomeLevelFromRate` |
| S1-L14861-1405 | 14861 | declaration | storage/restore | persistence | `appOutcomeMaturityForDomain` |
| S1-L14862-1406 | 14862 | arrow | environment | compatibility/domain | `avgRate` |
| S1-L14879-1407 | 14879 | declaration | exports | export | `pctToLevel` |
| S1-L14899-1408 | 14899 | declaration | shared | compatibility/domain | `growthSafeText` |
| S1-L14904-1409 | 14904 | declaration | shared | compatibility/domain | `uiSafetyScanText` |
| S1-L14911-1410 | 14911 | declaration | diagnostics | diagnostic/test | `uiSafetyProfile` |
| S1-L14941-1411 | 14941 | declaration | azure/learning | compatibility/domain | `supportiveStatusLabel` |
| S1-L14947-1412 | 14947 | declaration | exports | export | `renderUiSafetyCard` |
| S1-L14954-1413 | 14954 | declaration | diagnostics | diagnostic/test | `appCapabilityGrades` |
| S1-L15156-1414 | 15156 | declaration | intelligence | pure domain logic | `textHasMove` |
| S1-L15159-1415 | 15159 | declaration | health/recovery | compatibility/domain | `textIncludesEliteMoveLayer` |
| S1-L15162-1416 | 15162 | declaration | exports | export | `appCapabilityGradesHtml` |
| S1-L15176-1417 | 15176 | declaration | intelligence | pure domain logic | `summarizeBottleneckHistory` |
| S1-L15197-1418 | 15197 | declaration | storage/restore | persistence | `summarizeMoveFitHistory` |
| S1-L15220-1419 | 15220 | arrow | shared | compatibility/domain | `avgField` |
| S1-L15238-1420 | 15238 | declaration | intelligence | pure domain logic | `domainMaturitySummary` |
| S1-L15249-1421 | 15249 | declaration | diagnostics | diagnostic/test | `level5ReviewHandoffPrompt` |
| S1-L15288-1422 | 15288 | declaration | diagnostics | diagnostic/test | `level5ReviewHandoffPackage` |
| S1-L15315-1423 | 15315 | declaration | storage/restore | export | `buildLevel5ReviewExport` |
| S1-L15421-1424 | 15421 | declaration | storage/restore | export | `exportLevel5Review` |
| S1-L15439-1425 | 15439 | declaration | diagnostics | diagnostic/test | `renderLevel5ReviewExportCard` |
| S1-L15447-1426 | 15447 | declaration | exports | export | `level5FunctionExists` |
| S1-L15450-1427 | 15450 | declaration | diagnostics | diagnostic/test | `phase16FeatureChecklist` |
| S1-L15470-1428 | 15470 | declaration | diagnostics | diagnostic/test | `phase16AcceptanceTests` |
| S1-L15488-1429 | 15488 | declaration | diagnostics | diagnostic/test | `phase16SpeedProfile` |
| S1-L15510-1430 | 15510 | declaration | diagnostics | diagnostic/test | `renderPhase16FinalPassCard` |
| S1-L15518-1431 | 15518 | declaration | diagnostics | diagnostic/test | `phase17MoveExistsAny` |
| S1-L15521-1432 | 15521 | declaration | diagnostics | diagnostic/test | `phase17AcceptanceScenarioDefinitions` |
| S1-L15527-1433 | 15527 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15528-1434 | 15528 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15534-1435 | 15534 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15535-1436 | 15535 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15541-1437 | 15541 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15542-1438 | 15542 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15548-1439 | 15548 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15549-1440 | 15549 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15555-1441 | 15555 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15556-1442 | 15556 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15562-1443 | 15562 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15563-1444 | 15563 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15569-1445 | 15569 | object member | diagnostics | diagnostic/test | `pass` |
| S1-L15570-1446 | 15570 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15576-1447 | 15576 | object member | intelligence | pure domain logic | `pass` |
| S1-L15577-1448 | 15577 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15583-1449 | 15583 | object member | exports | export | `pass` |
| S1-L15584-1450 | 15584 | object member | exports | export | `evidence` |
| S1-L15590-1451 | 15590 | object member | exports | export | `pass` |
| S1-L15591-1452 | 15591 | object member | exports | export | `evidence` |
| S1-L15597-1453 | 15597 | object member | shared | compatibility/domain | `pass` |
| S1-L15598-1454 | 15598 | object member | intelligence | pure domain logic | `evidence` |
| S1-L15602-1455 | 15602 | declaration | diagnostics | diagnostic/test | `phase17RunAcceptanceSuite` |
| S1-L15622-1456 | 15622 | declaration | diagnostics | diagnostic/test | `phase17OngoingTuningPlan` |
| S1-L15657-1457 | 15657 | declaration | diagnostics | diagnostic/test | `renderPhase17AcceptanceCard` |
| S1-L15663-1458 | 15663 | declaration | diagnostics | diagnostic/test | `buildPhase17AcceptanceExport` |
| S1-L15676-1459 | 15676 | declaration | diagnostics | diagnostic/test | `exportPhase17Acceptance` |
| S1-L15693-1460 | 15693 | declaration | health/recovery | pure domain logic | `targetSleepTimeValue` |
| S1-L15696-1461 | 15696 | declaration | storage/restore | persistence | `setTargetSleepTime` |
| S1-L15702-1462 | 15702 | declaration | shared | pure domain logic | `timeStringToMinutes` |
| S1-L15707-1463 | 15707 | declaration | shared | compatibility/domain | `currentLocalMinutes` |
| S1-L15712-1464 | 15712 | declaration | health/recovery | compatibility/domain | `isAtOrAfterSleepTarget` |
| S1-L15718-1465 | 15718 | declaration | health/recovery | compatibility/domain | `minutesUntilSleepTarget` |
| S1-L15726-1466 | 15726 | declaration | health/recovery | compatibility/domain | `isNearOrAfterSleepTarget` |
| S1-L15730-1467 | 15730 | declaration | storage/restore | persistence | `shouldAutoTerminalSleepMove` |
| S1-L15741-1468 | 15741 | declaration | health/recovery | rendering | `sleepTargetSettingsHtml` |
| S1-L15748-1469 | 15748 | declaration | storage/restore | persistence | `fastBackupHealthHtml` |
| S1-L15758-1470 | 15758 | declaration | diagnostics | diagnostic/test | `scheduleDataTabDiagnostics` |
| S1-L15761-1471 | 15761 | arrow | diagnostics | diagnostic/test | `run` |
| S1-L15787-1472 | 15787 | declaration | diagnostics | diagnostic/test | `requestDataTabDiagnostics64T` |
| S1-L15797-1473 | 15797 | declaration | diagnostics | diagnostic/test | `clearDataTabDiagnostics64T` |
| S1-L15808-1474 | 15808 | declaration | diagnostics | diagnostic/test | `renderData` |
| S1-L15854-1475 | 15854 | declaration | diagnostics | diagnostic/test | `buildFullBackupExport` |
| S1-L15887-1476 | 15887 | declaration | storage/restore | export | `exportData` |
| S1-L15888-1477 | 15888 | declaration | shared | compatibility/domain | `importData` |
| S1-L15889-1478 | 15889 | declaration | storage/restore | export | `resetApp` |
| S1-L15890-1479 | 15890 | declaration | storage/restore | persistence | `saveOnExit` |
| S1-L15891-1480 | 15891 | declaration | storage/restore | export | `isExportDownloadControl` |
| S1-L15933-1481 | 15933 | declaration | shared | compatibility/domain | `handleNightTargetEvent` |
| S2-L15974-1482 | 15974 | declaration | diagnostics | diagnostic/test | `phase65AGetPath` |
| S2-L15977-1483 | 15977 | declaration | diagnostics | diagnostic/test | `phase65AHasLog` |
| S2-L15981-1484 | 15981 | declaration | diagnostics | diagnostic/test | `phase65AAnyLogPrefix` |
| S2-L15984-1485 | 15984 | declaration | diagnostics | diagnostic/test | `phase65AWeightForCompleteness` |
| S2-L15988-1486 | 15988 | declaration | diagnostics | diagnostic/test | `phase65AResult` |
| S2-L16001-1487 | 16001 | declaration | diagnostics | diagnostic/test | `phase65ACoreSpec` |
| S2-L16010-1488 | 16010 | object member | intelligence | pure domain logic | `positive` |
| S2-L16011-1489 | 16011 | object member | intelligence | pure domain logic | `positive` |
| S2-L16012-1490 | 16012 | object member | intelligence | pure domain logic | `positive` |
| S2-L16013-1491 | 16013 | object member | intelligence | pure domain logic | `positive` |
| S2-L16014-1492 | 16014 | object member | intelligence | pure domain logic | `positive` |
| S2-L16015-1493 | 16015 | object member | intelligence | pure domain logic | `positive` |
| S2-L16016-1494 | 16016 | object member | intelligence | pure domain logic | `positive` |
| S2-L16017-1495 | 16017 | object member | intelligence | pure domain logic | `positive` |
| S2-L16021-1496 | 16021 | declaration | diagnostics | diagnostic/test | `phase65ARangeRow` |
| S2-L16027-1497 | 16027 | declaration | diagnostics | diagnostic/test | `phase65AEvidence` |
| S2-L16064-1498 | 16064 | declaration | diagnostics | diagnostic/test | `phase65APathEvidence` |
| S2-L16079-1499 | 16079 | assigned | diagnostics | diagnostic/test | `window.rangeEvidenceLogged` |
| S2-L16080-1500 | 16080 | assigned | diagnostics | diagnostic/test | `window.loggedNumericValue` |
| S2-L16081-1501 | 16081 | assigned | diagnostics | diagnostic/test | `window.loggedNestedNumericValue` |
| S2-L16083-1502 | 16083 | assigned | diagnostics | diagnostic/test | `window.dayEvidenceSlotState` |
| S2-L16087-1503 | 16087 | assigned | diagnostics | diagnostic/test | `window.dayEvidenceIntegrity` |
| S2-L16102-1504 | 16102 | assigned | diagnostics | diagnostic/test | `window.evidenceIntegrityOverview` |
| S2-L16108-1505 | 16108 | assigned | intelligence | pure domain logic | `window.evidenceWeightedAverage` |
| S2-L16115-1506 | 16115 | assigned | diagnostics | diagnostic/test | `window.scoreDay` |
| S2-L16119-1507 | 16119 | arrow | intelligence | pure domain logic | `put` |
| S2-L16132-1508 | 16132 | assigned | today | pure domain logic | `window.sevenDay` |
| S2-L16134-1509 | 16134 | declaration | diagnostics | diagnostic/test | `phase65ARate` |
| S2-L16139-1510 | 16139 | declaration | diagnostics | diagnostic/test | `phase65ACompletionRate` |
| S2-L16140-1511 | 16140 | declaration | diagnostics | diagnostic/test | `phase65AWeightedSignalAverage` |
| S2-L16144-1512 | 16144 | assigned | diagnostics | diagnostic/test | `window.yesRate` |
| S2-L16150-1513 | 16150 | assigned | diagnostics | diagnostic/test | `window.weekdayPatternLayer` |
| S2-L16154-1514 | 16154 | arrow | diagnostics | diagnostic/test | `groupStats` |
| S2-L16164-1515 | 16164 | arrow | shared | compatibility/domain | `pairAvg` |
| S2-L16169-1516 | 16169 | assigned | diagnostics | diagnostic/test | `window.bodyPhysicalPeakProfile` |
| S2-L16171-1517 | 16171 | arrow | diagnostics | diagnostic/test | `movementEvidence` |
| S2-L16172-1518 | 16172 | arrow | diagnostics | diagnostic/test | `stageRate` |
| S2-L16179-1519 | 16179 | declaration | diagnostics | diagnostic/test | `phase65ARecoveryField` |
| S2-L16180-1520 | 16180 | assigned | diagnostics | diagnostic/test | `window.sleepRecoveryRiskProfile` |
| S2-L16187-1521 | 16187 | arrow | shared | state mutation | `add` |
| S2-L16187-1522 | 16187 | arrow | shared | compatibility/domain | `protect` |
| S2-L16193-1523 | 16193 | assigned | diagnostics | diagnostic/test | `window.sleepRecoveryOverview` |
| S2-L16194-1524 | 16194 | arrow | diagnostics | diagnostic/test | `rate` |
| S2-L16199-1525 | 16199 | assigned | diagnostics | diagnostic/test | `window.setHealthFlag` |
| S2-L16201-1526 | 16201 | assigned | storage/restore | persistence | `window.syncRecoveryNightReset` |
| S2-L16204-1527 | 16204 | assigned | diagnostics | diagnostic/test | `window.buildForecastContext` |
| S2-L16210-1528 | 16210 | assigned | diagnostics | diagnostic/test | `window.peakForecast` |
| S2-L16212-1529 | 16212 | assigned | diagnostics | diagnostic/test | `window.wave3BPeriodMetricValue` |
| S2-L16215-1530 | 16215 | declaration | diagnostics | diagnostic/test | `phase65ASnapshotFromAction` |
| S2-L16218-1531 | 16218 | assigned | diagnostics | diagnostic/test | `window.wave3BSnapshotFromActionStart` |
| S2-L16219-1532 | 16219 | assigned | diagnostics | diagnostic/test | `window.wave3BSnapshotFromActionAfter` |
| S2-L16220-1533 | 16220 | assigned | intelligence | pure domain logic | `window.forecastActionImprovement` |
| S2-L16221-1534 | 16221 | assigned | intelligence | pure domain logic | `window.forecastEffectMetricDeltas` |
| S2-L16223-1535 | 16223 | declaration | diagnostics | diagnostic/test | `phase65ADayManifest` |
| S2-L16226-1536 | 16226 | declaration | diagnostics | diagnostic/test | `phase65AExportEvidence` |
| S2-L16228-1537 | 16228 | assigned | diagnostics | diagnostic/test | `window.forecastDayExport` |
| S2-L16230-1538 | 16230 | assigned | diagnostics | diagnostic/test | `window.buildPatternExport` |
| S2-L16232-1539 | 16232 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S2-L16234-1540 | 16234 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S2-L16236-1541 | 16236 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S2-L16239-1542 | 16239 | assigned | diagnostics | diagnostic/test | `window.renderEnvironmentLevel5Card` |
| S2-L16244-1543 | 16244 | assigned | diagnostics | diagnostic/test | `window.renderTodayCommandCard` |
| S2-L16246-1544 | 16246 | assigned | diagnostics | diagnostic/test | `window.renderToday` |
| S2-L16248-1545 | 16248 | assigned | diagnostics | diagnostic/test | `window.renderSleepRecoveryCard` |
| S2-L16250-1546 | 16250 | assigned | diagnostics | diagnostic/test | `window.renderHealth` |
| S2-L16252-1547 | 16252 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S2-L16254-1548 | 16254 | assigned | diagnostics | diagnostic/test | `window.runPhase65ATruthTests` |
| S2-L16255-1549 | 16255 | arrow | diagnostics | diagnostic/test | `check` |
| S3-L16293-1550 | 16293 | declaration | diagnostics | diagnostic/test | `phase65BMeaningfullyLoggedDay` |
| S3-L16301-1551 | 16301 | declaration | diagnostics | diagnostic/test | `phase65BDateOrdinal` |
| S3-L16305-1552 | 16305 | declaration | diagnostics | diagnostic/test | `phase65BCalendarDayDiff` |
| S3-L16309-1553 | 16309 | declaration | diagnostics | diagnostic/test | `phase65BHandledOnEffectiveDay` |
| S3-L16313-1554 | 16313 | declaration | diagnostics | diagnostic/test | `phase65BReentryStatusForKey` |
| S3-L16324-1555 | 16324 | declaration | diagnostics | diagnostic/test | `phase65BReentryStatus` |
| S3-L16328-1556 | 16328 | declaration | diagnostics | diagnostic/test | `phase65BProtectStaleState` |
| S3-L16334-1557 | 16334 | arrow | diagnostics | diagnostic/test | `resetNumber` |
| S3-L16375-1558 | 16375 | assigned | diagnostics | diagnostic/test | `window.forecastEffectCheckStatus` |
| S3-L16377-1559 | 16377 | assigned | diagnostics | diagnostic/test | `window.completeForecastEffectCheck` |
| S3-L16379-1560 | 16379 | declaration | diagnostics | diagnostic/test | `phase65BReentryCard` |
| S3-L16388-1561 | 16388 | declaration | diagnostics | diagnostic/test | `phase65BRestartNow` |
| S3-L16403-1562 | 16403 | declaration | diagnostics | diagnostic/test | `phase65BSkipForNow` |
| S3-L16410-1563 | 16410 | assigned | diagnostics | diagnostic/test | `window.renderToday` |
| S3-L16420-1564 | 16420 | assigned | diagnostics | diagnostic/test | `window.renderNow` |
| S3-L16433-1565 | 16433 | assigned | diagnostics | diagnostic/test | `window.runPhase65BTruthTests` |
| S3-L16434-1566 | 16434 | arrow | diagnostics | diagnostic/test | `check` |
| S3-L16435-1567 | 16435 | arrow | pattern/private | state mutation | `logged` |
| S4-L16490-1568 | 16490 | declaration | diagnostics | diagnostic/test | `phase66AEnsureStore` |
| S4-L16500-1569 | 16500 | declaration | diagnostics | diagnostic/test | `phase66AReasonLabel` |
| S4-L16501-1570 | 16501 | declaration | diagnostics | diagnostic/test | `phase66APreferenceSummary` |
| S4-L16507-1571 | 16507 | declaration | diagnostics | diagnostic/test | `phase66AIsEquipmentDependent` |
| S4-L16511-1572 | 16511 | declaration | diagnostics | diagnostic/test | `phase66ACandidateFamily` |
| S4-L16512-1573 | 16512 | declaration | diagnostics | diagnostic/test | `phase66AIsBlockedCandidate` |
| S4-L16516-1574 | 16516 | declaration | diagnostics | diagnostic/test | `phase66AReasonFit` |
| S4-L16534-1575 | 16534 | declaration | diagnostics | diagnostic/test | `phase66AApplyCandidateFeedback` |
| S4-L16544-1576 | 16544 | declaration | diagnostics | diagnostic/test | `phase66AContextFallback` |
| S4-L16550-1577 | 16550 | assigned | diagnostics | diagnostic/test | `window.forecastMoveCandidates` |
| S4-L16558-1578 | 16558 | declaration | diagnostics | diagnostic/test | `phase66AContextFlags` |
| S4-L16561-1579 | 16561 | declaration | diagnostics | diagnostic/test | `phase66ARecordFeedback` |
| S4-L16575-1580 | 16575 | declaration | shared | compatibility/domain | `disposalIdSafe` |
| S4-L16576-1581 | 16576 | declaration | diagnostics | diagnostic/test | `phase66ALegacyFeedbackRowsFromState` |
| S4-L16581-1582 | 16581 | declaration | diagnostics | diagnostic/test | `phase66AAllFeedbackRows` |
| S4-L16584-1583 | 16584 | assigned | diagnostics | diagnostic/test | `window.addForecastDismissalForPayload` |
| S4-L16591-1584 | 16591 | declaration | diagnostics | diagnostic/test | `phase66ASyncVisualViewport` |
| S4-L16605-1585 | 16605 | declaration | diagnostics | diagnostic/test | `phase66AInstallVisualViewportSync` |
| S4-L16608-1586 | 16608 | arrow | diagnostics | diagnostic/test | `sync` |
| S4-L16617-1587 | 16617 | declaration | diagnostics | diagnostic/test | `phase66AReasonSheetHtml` |
| S4-L16621-1588 | 16621 | declaration | diagnostics | diagnostic/test | `phase66AOpenCantNowFromButton` |
| S4-L16627-1589 | 16627 | declaration | diagnostics | diagnostic/test | `phase66ACloseCantNow` |
| S4-L16628-1590 | 16628 | declaration | diagnostics | diagnostic/test | `phase66ASubmitCantNow` |
| S4-L16641-1591 | 16641 | declaration | diagnostics | diagnostic/test | `phase66AInjectCantNowControl` |
| S4-L16647-1592 | 16647 | assigned | diagnostics | diagnostic/test | `window.forecastMoveControls` |
| S4-L16649-1593 | 16649 | declaration | diagnostics | diagnostic/test | `phase66ARemoveBlockFromStore` |
| S4-L16650-1594 | 16650 | declaration | diagnostics | diagnostic/test | `phase66AUndoBlock` |
| S4-L16651-1595 | 16651 | declaration | diagnostics | diagnostic/test | `phase66AClearFamily` |
| S4-L16652-1596 | 16652 | declaration | diagnostics | diagnostic/test | `phase66AClearSelectedFamily` |
| S4-L16653-1597 | 16653 | declaration | diagnostics | diagnostic/test | `phase66AFeedbackManagementHtml` |
| S4-L16661-1598 | 16661 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S4-L16664-1599 | 16664 | assigned | diagnostics | diagnostic/test | `window.buildForecastMoveExport` |
| S4-L16666-1600 | 16666 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S4-L16668-1601 | 16668 | assigned | diagnostics | diagnostic/test | `window.runPhase66ATruthTests` |
| S4-L16669-1602 | 16669 | arrow | diagnostics | diagnostic/test | `check` |
| S5-L16710-1603 | 16710 | declaration | diagnostics | diagnostic/test | `phase66BDefaultCurrent` |
| S5-L16711-1604 | 16711 | declaration | diagnostics | diagnostic/test | `phase66BEnsureStore` |
| S5-L16725-1605 | 16725 | declaration | diagnostics | diagnostic/test | `phase66BContextHasAnswer` |
| S5-L16726-1606 | 16726 | declaration | diagnostics | diagnostic/test | `phase66BContextExpired` |
| S5-L16732-1607 | 16732 | declaration | diagnostics | diagnostic/test | `phase66BExpireCurrentIfNeeded` |
| S5-L16738-1608 | 16738 | declaration | diagnostics | diagnostic/test | `phase66BRecentRepeatedContext` |
| S5-L16745-1609 | 16745 | declaration | diagnostics | diagnostic/test | `phase66BScheduleInference` |
| S5-L16751-1610 | 16751 | declaration | diagnostics | diagnostic/test | `phase66BResolveContext` |
| S5-L16761-1611 | 16761 | declaration | diagnostics | diagnostic/test | `phase66BCurrentContext` |
| S5-L16762-1612 | 16762 | declaration | diagnostics | diagnostic/test | `phase66BSetExpiry` |
| S5-L16769-1613 | 16769 | declaration | diagnostics | diagnostic/test | `phase66BCommitContext` |
| S5-L16770-1614 | 16770 | declaration | diagnostics | diagnostic/test | `phase66BSetContextChip` |
| S5-L16774-1615 | 16774 | declaration | diagnostics | diagnostic/test | `phase66BSkipContextQuestion` |
| S5-L16775-1616 | 16775 | declaration | diagnostics | diagnostic/test | `phase66BClearCurrentContext` |
| S5-L16776-1617 | 16776 | declaration | diagnostics | diagnostic/test | `phase66BOpenchildDuration` |
| S5-L16777-1618 | 16777 | declaration | diagnostics | diagnostic/test | `phase66BCloseDuration` |
| S5-L16778-1619 | 16778 | declaration | diagnostics | diagnostic/test | `phase66BSetchildDuration` |
| S5-L16780-1620 | 16780 | declaration | diagnostics | diagnostic/test | `phase66BCandidateText` |
| S5-L16781-1621 | 16781 | declaration | diagnostics | diagnostic/test | `phase66BIsStabilityBall` |
| S5-L16782-1622 | 16782 | declaration | diagnostics | diagnostic/test | `phase66BIsFloorExercise` |
| S5-L16783-1623 | 16783 | declaration | diagnostics | diagnostic/test | `phase66BIsDrivingUnsafe` |
| S5-L16784-1624 | 16784 | declaration | diagnostics | diagnostic/test | `phase66BEquipmentProfile` |
| S5-L16785-1625 | 16785 | declaration | diagnostics | diagnostic/test | `phase66BIschildSupportive` |
| S5-L16786-1626 | 16786 | declaration | diagnostics | diagnostic/test | `phase66BIsHighPressure` |
| S5-L16787-1627 | 16787 | declaration | diagnostics | diagnostic/test | `phase66BIsGymPreferred` |
| S5-L16788-1628 | 16788 | declaration | diagnostics | diagnostic/test | `phase66BEstimatedMinutes` |
| S5-L16789-1629 | 16789 | declaration | diagnostics | diagnostic/test | `phase66BFloorAccepted` |
| S5-L16790-1630 | 16790 | declaration | diagnostics | diagnostic/test | `phase66BAcceptFloorMove` |
| S5-L16791-1631 | 16791 | declaration | diagnostics | diagnostic/test | `phase66BFitCandidate` |
| S5-L16812-1632 | 16812 | declaration | diagnostics | diagnostic/test | `phase66BDrivingCandidate` |
| S5-L16813-1633 | 16813 | declaration | diagnostics | diagnostic/test | `phase66BchildCandidate` |
| S5-L16814-1634 | 16814 | declaration | diagnostics | diagnostic/test | `phase66BFitCandidates` |
| S5-L16820-1635 | 16820 | assigned | diagnostics | diagnostic/test | `window.forecastMoveCandidates` |
| S5-L16822-1636 | 16822 | assigned | diagnostics | diagnostic/test | `window.choosePersonalizedMove` |
| S5-L16824-1637 | 16824 | declaration | diagnostics | diagnostic/test | `phase66BWorkoutItemCandidate` |
| S5-L16825-1638 | 16825 | declaration | diagnostics | diagnostic/test | `phase66BEligibleWorkoutItems` |
| S5-L16826-1639 | 16826 | declaration | diagnostics | diagnostic/test | `phase66BAuditWorkoutPlan` |
| S5-L16831-1640 | 16831 | declaration | diagnostics | diagnostic/test | `phase66BContextQuestion` |
| S5-L16832-1641 | 16832 | declaration | diagnostics | diagnostic/test | `phase66BContextSummary` |
| S5-L16833-1642 | 16833 | declaration | diagnostics | diagnostic/test | `phase66BContextPromptHtml` |
| S5-L16834-1643 | 16834 | declaration | diagnostics | diagnostic/test | `phase66BDisplayedCandidate` |
| S5-L16835-1644 | 16835 | declaration | diagnostics | diagnostic/test | `phase66BFitExplanation` |
| S5-L16846-1645 | 16846 | declaration | diagnostics | diagnostic/test | `phase66BDetailsHtml` |
| S5-L16848-1646 | 16848 | assigned | diagnostics | diagnostic/test | `window.renderTodayCommandCard` |
| S5-L16850-1647 | 16850 | assigned | diagnostics | diagnostic/test | `window.peakForecastLevel5Html` |
| S5-L16852-1648 | 16852 | declaration | diagnostics | diagnostic/test | `phase66BApplyReasonContext` |
| S5-L16854-1649 | 16854 | assigned | diagnostics | diagnostic/test | `window.phase66ASubmitCantNow` |
| S5-L16856-1650 | 16856 | declaration | diagnostics | diagnostic/test | `phase66BSetDurablePreference` |
| S5-L16857-1651 | 16857 | declaration | diagnostics | diagnostic/test | `phase66BSetHomeEquipment` |
| S5-L16858-1652 | 16858 | declaration | diagnostics | diagnostic/test | `phase66BPreferenceManagementHtml` |
| S5-L16858-1653 | 16858 | arrow | diagnostics | diagnostic/test | `toggle` |
| S5-L16860-1654 | 16860 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S5-L16862-1655 | 16862 | assigned | diagnostics | diagnostic/test | `window.buildForecastMoveExport` |
| S5-L16862-1656 | 16862 | arrow | shared | compatibility/domain | `strip` |
| S5-L16864-1657 | 16864 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S5-L16866-1658 | 16866 | assigned | diagnostics | diagnostic/test | `window.runPhase66BTruthTests` |
| S5-L16867-1659 | 16867 | arrow | diagnostics | diagnostic/test | `check` |
| S5-L16868-1660 | 16868 | arrow | diagnostics | diagnostic/test | `resolve` |
| S6-L16904-1661 | 16904 | declaration | diagnostics | diagnostic/test | `phase67ARound` |
| S6-L16905-1662 | 16905 | declaration | diagnostics | diagnostic/test | `phase67AClamp` |
| S6-L16906-1663 | 16906 | declaration | diagnostics | diagnostic/test | `phase67AEnsureStore` |
| S6-L16907-1664 | 16907 | declaration | diagnostics | diagnostic/test | `phase67ARecordRerank` |
| S6-L16908-1665 | 16908 | declaration | diagnostics | diagnostic/test | `phase67AAllDismissals` |
| S6-L16909-1666 | 16909 | declaration | diagnostics | diagnostic/test | `phase67AStateBand` |
| S6-L16910-1667 | 16910 | declaration | diagnostics | diagnostic/test | `phase67AFeature` |
| S6-L16911-1668 | 16911 | declaration | diagnostics | diagnostic/test | `phase67ACurrentFeatures` |
| S6-L16912-1669 | 16912 | arrow | diagnostics | diagnostic/test | `put` |
| S6-L16924-1670 | 16924 | declaration | diagnostics | diagnostic/test | `phase67AHistoricalFeatures` |
| S6-L16925-1671 | 16925 | arrow | diagnostics | diagnostic/test | `put` |
| S6-L16935-1672 | 16935 | declaration | diagnostics | diagnostic/test | `phase67AFeatureSimilarity` |
| S6-L16936-1673 | 16936 | declaration | diagnostics | diagnostic/test | `phase67ACompareFeatureSets` |
| S6-L16937-1674 | 16937 | declaration | diagnostics | diagnostic/test | `phase67AComparableStates` |
| S6-L16939-1675 | 16939 | declaration | diagnostics | diagnostic/test | `phase67AObservedLift` |
| S6-L16940-1676 | 16940 | declaration | diagnostics | diagnostic/test | `phase67APriorForCandidate` |
| S6-L16941-1677 | 16941 | declaration | diagnostics | diagnostic/test | `phase67ACandidateRelationWeight` |
| S6-L16942-1678 | 16942 | declaration | diagnostics | diagnostic/test | `phase67ABlendHorizon` |
| S6-L16943-1679 | 16943 | declaration | diagnostics | diagnostic/test | `phase67ACompletionProbability` |
| S6-L16944-1680 | 16944 | declaration | diagnostics | diagnostic/test | `phase67ADoseStatus` |
| S6-L16945-1681 | 16945 | declaration | diagnostics | diagnostic/test | `phase67AIsGamingCandidate` |
| S6-L16946-1682 | 16946 | declaration | diagnostics | diagnostic/test | `phase67AEstimateMoveEffects` |
| S6-L16955-1683 | 16955 | declaration | diagnostics | diagnostic/test | `phase67AMaterialFingerprint` |
| S6-L16956-1684 | 16956 | declaration | diagnostics | diagnostic/test | `phase67AHash` |
| S6-L16957-1685 | 16957 | declaration | diagnostics | diagnostic/test | `phase67AExplorationAllowed` |
| S6-L16958-1686 | 16958 | declaration | diagnostics | diagnostic/test | `phase67ASelectStable` |
| S6-L16959-1687 | 16959 | declaration | diagnostics | diagnostic/test | `phase67ARankCandidates` |
| S6-L16962-1688 | 16962 | assigned | diagnostics | diagnostic/test | `window.choosePersonalizedMove` |
| S6-L16963-1689 | 16963 | declaration | diagnostics | diagnostic/test | `phase67ALiftRangeText` |
| S6-L16963-1690 | 16963 | arrow | shared | compatibility/domain | `fmt` |
| S6-L16964-1691 | 16964 | declaration | diagnostics | diagnostic/test | `phase67ABuildOptimization` |
| S6-L16966-1692 | 16966 | assigned | diagnostics | diagnostic/test | `window.peakForecast` |
| S6-L16968-1693 | 16968 | assigned | diagnostics | diagnostic/test | `window.forecastSummaryForExport` |
| S6-L16970-1694 | 16970 | assigned | diagnostics | diagnostic/test | `window.forecastMovePayloadFromCandidate` |
| S6-L16972-1695 | 16972 | declaration | diagnostics | diagnostic/test | `phase67AOptimizationForDisplayed` |
| S6-L16973-1696 | 16973 | declaration | diagnostics | diagnostic/test | `phase67ALiftStripHtml` |
| S6-L16974-1697 | 16974 | declaration | diagnostics | diagnostic/test | `phase67AOptimizationDetailsHtml` |
| S6-L16976-1698 | 16976 | assigned | diagnostics | diagnostic/test | `window.renderTodayCommandCard` |
| S6-L16978-1699 | 16978 | assigned | diagnostics | diagnostic/test | `window.peakForecastLevel5Html` |
| S6-L16981-1700 | 16981 | assigned | diagnostics | diagnostic/test | `window.startForecastMove` |
| S6-L16983-1701 | 16983 | assigned | diagnostics | diagnostic/test | `window.finishForecastMove` |
| S6-L16985-1702 | 16985 | assigned | diagnostics | diagnostic/test | `window.dismissCurrentPeakMove` |
| S6-L16987-1703 | 16987 | assigned | diagnostics | diagnostic/test | `window.requestAnotherForecastMove` |
| S6-L16989-1704 | 16989 | assigned | diagnostics | diagnostic/test | `window.phase66ASubmitCantNow` |
| S6-L16991-1705 | 16991 | assigned | diagnostics | diagnostic/test | `window.phase66BCommitContext` |
| S6-L16993-1706 | 16993 | assigned | diagnostics | diagnostic/test | `window.addForecastDismissalForPayload` |
| S6-L16995-1707 | 16995 | declaration | diagnostics | diagnostic/test | `phase67ACalibrationDiagnostics` |
| S6-L16997-1708 | 16997 | arrow | diagnostics | diagnostic/test | `group` |
| S6-L17001-1709 | 17001 | declaration | diagnostics | diagnostic/test | `phase67ADeveloperDiagnosticsHtml` |
| S6-L17003-1710 | 17003 | declaration | diagnostics | diagnostic/test | `phase67ADataDiagnosticsHtml` |
| S6-L17004-1711 | 17004 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S6-L17005-1712 | 17005 | declaration | diagnostics | diagnostic/test | `phase67ACompactExport` |
| S6-L17006-1713 | 17006 | declaration | diagnostics | diagnostic/test | `phase67AFullExport` |
| S6-L17008-1714 | 17008 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S6-L17010-1715 | 17010 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S6-L17012-1716 | 17012 | assigned | diagnostics | diagnostic/test | `window.buildForecastMoveExport` |
| S6-L17014-1717 | 17014 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S6-L17016-1718 | 17016 | assigned | diagnostics | diagnostic/test | `window.runPhase67ATruthTests` |
| S6-L17017-1719 | 17017 | arrow | diagnostics | diagnostic/test | `check` |
| S6-L17017-1720 | 17017 | arrow | today | compatibility/domain | `dk` |
| S6-L17017-1721 | 17017 | arrow | storage/restore | persistence | `action` |
| S7-L17062-1722 | 17062 | declaration | diagnostics | diagnostic/test | `phase67BEnsureStore` |
| S7-L17071-1723 | 17071 | declaration | diagnostics | diagnostic/test | `phase67BRecordEvent` |
| S7-L17076-1724 | 17076 | declaration | diagnostics | diagnostic/test | `phase67BWeekKey` |
| S7-L17082-1725 | 17082 | declaration | diagnostics | diagnostic/test | `phase67BFocusLabel` |
| S7-L17083-1726 | 17083 | declaration | diagnostics | diagnostic/test | `phase67BRate` |
| S7-L17084-1727 | 17084 | declaration | diagnostics | diagnostic/test | `phase67BDeepSignals` |
| S7-L17086-1728 | 17086 | arrow | diagnostics | diagnostic/test | `rate` |
| S7-L17112-1729 | 17112 | declaration | diagnostics | diagnostic/test | `phase67BIsUserChosenFocus` |
| S7-L17117-1730 | 17117 | declaration | diagnostics | diagnostic/test | `phase67BWeeklyFocus` |
| S7-L17146-1731 | 17146 | declaration | diagnostics | diagnostic/test | `phase67BQueueFocusSave` |
| S7-L17151-1732 | 17151 | declaration | diagnostics | diagnostic/test | `phase67BSetWeeklyFocus` |
| S7-L17158-1733 | 17158 | declaration | diagnostics | diagnostic/test | `phase67BStateEvidence` |
| S7-L17168-1734 | 17168 | declaration | diagnostics | diagnostic/test | `phase67BLaneForCandidate` |
| S7-L17179-1735 | 17179 | declaration | diagnostics | diagnostic/test | `phase67BDomainForCandidate` |
| S7-L17189-1736 | 17189 | declaration | diagnostics | diagnostic/test | `phase67BLaneUsage` |
| S7-L17213-1737 | 17213 | declaration | diagnostics | diagnostic/test | `phase67BBudgetFingerprint` |
| S7-L17216-1738 | 17216 | declaration | diagnostics | diagnostic/test | `phase67BBuildBudget` |
| S7-L17245-1739 | 17245 | declaration | diagnostics | diagnostic/test | `phase67BCandidateFits` |
| S7-L17253-1740 | 17253 | declaration | diagnostics | diagnostic/test | `phase67BFallbackCandidate` |
| S7-L17262-1741 | 17262 | declaration | diagnostics | diagnostic/test | `phase67BSelectCandidate` |
| S7-L17277-1742 | 17277 | assigned | diagnostics | diagnostic/test | `window.choosePersonalizedMove` |
| S7-L17284-1743 | 17284 | declaration | diagnostics | diagnostic/test | `phase67BRouteSnapshot` |
| S7-L17286-1744 | 17286 | assigned | diagnostics | diagnostic/test | `window.peakForecast` |
| S7-L17292-1745 | 17292 | declaration | diagnostics | diagnostic/test | `phase67BBudgetStripHtml` |
| S7-L17296-1746 | 17296 | declaration | diagnostics | diagnostic/test | `phase67BBudgetDetailsHtml` |
| S7-L17297-1747 | 17297 | arrow | diagnostics | diagnostic/test | `lane` |
| S7-L17301-1748 | 17301 | assigned | diagnostics | diagnostic/test | `window.renderTodayCommandCard` |
| S7-L17303-1749 | 17303 | declaration | diagnostics | diagnostic/test | `phase67BWeeklyFocusHtml` |
| S7-L17312-1750 | 17312 | assigned | diagnostics | diagnostic/test | `window.renderWeek` |
| S7-L17314-1751 | 17314 | declaration | diagnostics | diagnostic/test | `phase67BBudgetDiagnosticsHtml` |
| S7-L17316-1752 | 17316 | declaration | diagnostics | diagnostic/test | `phase67BDataDiagnosticsHtml` |
| S7-L17317-1753 | 17317 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S7-L17319-1754 | 17319 | declaration | diagnostics | diagnostic/test | `phase67BCompactExport` |
| S7-L17320-1755 | 17320 | declaration | diagnostics | diagnostic/test | `phase67BFullExport` |
| S7-L17322-1756 | 17322 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S7-L17324-1757 | 17324 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S7-L17326-1758 | 17326 | assigned | diagnostics | diagnostic/test | `window.buildForecastMoveExport` |
| S7-L17328-1759 | 17328 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S7-L17331-1760 | 17331 | assigned | diagnostics | diagnostic/test | `window.startForecastMove` |
| S7-L17333-1761 | 17333 | assigned | diagnostics | diagnostic/test | `window.finishForecastMove` |
| S7-L17335-1762 | 17335 | assigned | diagnostics | diagnostic/test | `window.requestAnotherForecastMove` |
| S7-L17337-1763 | 17337 | assigned | diagnostics | diagnostic/test | `window.phase66ASubmitCantNow` |
| S7-L17339-1764 | 17339 | assigned | diagnostics | diagnostic/test | `window.phase66BCommitContext` |
| S7-L17341-1765 | 17341 | assigned | diagnostics | diagnostic/test | `window.runPhase67BTruthTests` |
| S7-L17342-1766 | 17342 | arrow | diagnostics | diagnostic/test | `check` |
| S7-L17342-1767 | 17342 | arrow | storage/restore | persistence | `fc` |
| S7-L17342-1768 | 17342 | arrow | storage/restore | persistence | `deep` |
| S7-L17342-1769 | 17342 | arrow | diagnostics | diagnostic/test | `candidate` |
| S8-L17397-1770 | 17397 | declaration | diagnostics | diagnostic/test | `phase67CEnsureStore` |
| S8-L17407-1771 | 17407 | declaration | diagnostics | diagnostic/test | `phase67CText` |
| S8-L17411-1772 | 17411 | declaration | diagnostics | diagnostic/test | `phase67CTechByKey` |
| S8-L17412-1773 | 17412 | declaration | diagnostics | diagnostic/test | `phase67CStageRank` |
| S8-L17413-1774 | 17413 | declaration | diagnostics | diagnostic/test | `phase67CStatusForStage` |
| S8-L17414-1775 | 17414 | declaration | diagnostics | diagnostic/test | `phase67CClaimSuggestion` |
| S8-L17415-1776 | 17415 | declaration | diagnostics | diagnostic/test | `phase67CFindMatchingKey` |
| S8-L17416-1777 | 17416 | declaration | diagnostics | diagnostic/test | `phase67CStageSuggestion` |
| S8-L17427-1778 | 17427 | declaration | diagnostics | diagnostic/test | `phase67CMapCapture` |
| S8-L17433-1779 | 17433 | declaration | diagnostics | diagnostic/test | `phase67CGenerateDrafts` |
| S8-L17441-1780 | 17441 | declaration | diagnostics | diagnostic/test | `phase67CReviewItems` |
| S8-L17442-1781 | 17442 | arrow | azure/learning | state mutation | `add` |
| S8-L17449-1782 | 17449 | declaration | diagnostics | diagnostic/test | `phase67CCreateRecord` |
| S8-L17455-1783 | 17455 | declaration | diagnostics | diagnostic/test | `phase67CApplySkillAdvancement` |
| S8-L17464-1784 | 17464 | declaration | diagnostics | diagnostic/test | `phase67CAddLearningCard` |
| S8-L17465-1785 | 17465 | declaration | diagnostics | diagnostic/test | `phase67CSaveRecord` |
| S8-L17474-1786 | 17474 | declaration | diagnostics | diagnostic/test | `phase67CSetDraftValue` |
| S8-L17475-1787 | 17475 | declaration | diagnostics | diagnostic/test | `phase67CEditDraft` |
| S8-L17476-1788 | 17476 | declaration | diagnostics | diagnostic/test | `phase67CResolveReview` |
| S8-L17477-1789 | 17477 | declaration | diagnostics | diagnostic/test | `phase67CRecordForExport` |
| S8-L17478-1790 | 17478 | declaration | diagnostics | diagnostic/test | `phase67CProofPacketRecords` |
| S8-L17479-1791 | 17479 | declaration | diagnostics | diagnostic/test | `phase67CProofPacketText` |
| S8-L17480-1792 | 17480 | declaration | diagnostics | diagnostic/test | `exportWorkWinProofPacket` |
| S8-L17482-1793 | 17482 | declaration | diagnostics | diagnostic/test | `phase67CFormPayload` |
| S8-L17482-1794 | 17482 | arrow | shared | compatibility/domain | `q` |
| S8-L17483-1795 | 17483 | declaration | diagnostics | diagnostic/test | `phase67CCloseCapture` |
| S8-L17484-1796 | 17484 | declaration | diagnostics | diagnostic/test | `phase67COpenCapture` |
| S8-L17487-1797 | 17487 | declaration | diagnostics | diagnostic/test | `phase67COpenSavedDrafts` |
| S8-L17488-1798 | 17488 | declaration | diagnostics | diagnostic/test | `phase67CSaveCaptureFromForm` |
| S8-L17489-1799 | 17489 | declaration | diagnostics | diagnostic/test | `phase67CIsRelevantAction` |
| S8-L17490-1800 | 17490 | declaration | diagnostics | diagnostic/test | `phase67CDismissSuggestion` |
| S8-L17491-1801 | 17491 | declaration | diagnostics | diagnostic/test | `phase67CSuggestionHtml` |
| S8-L17492-1802 | 17492 | declaration | diagnostics | diagnostic/test | `phase67CEntryHtml` |
| S8-L17493-1803 | 17493 | declaration | diagnostics | diagnostic/test | `phase67CWorkWinCard` |
| S8-L17494-1804 | 17494 | declaration | diagnostics | diagnostic/test | `phase67CReviewQueueHtml` |
| S8-L17495-1805 | 17495 | declaration | diagnostics | diagnostic/test | `phase67CDashboardHtml` |
| S8-L17498-1806 | 17498 | assigned | diagnostics | diagnostic/test | `window.renderToday` |
| S8-L17500-1807 | 17500 | assigned | diagnostics | diagnostic/test | `window.renderQuickMode` |
| S8-L17502-1808 | 17502 | assigned | diagnostics | diagnostic/test | `window.renderAzure` |
| S8-L17505-1809 | 17505 | assigned | diagnostics | diagnostic/test | `window.finishForecastMove` |
| S8-L17507-1810 | 17507 | declaration | diagnostics | diagnostic/test | `phase67CCompactExport` |
| S8-L17508-1811 | 17508 | declaration | diagnostics | diagnostic/test | `phase67CFullExport` |
| S8-L17509-1812 | 17509 | declaration | diagnostics | diagnostic/test | `phase67CMainStateSafety` |
| S8-L17511-1813 | 17511 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S8-L17513-1814 | 17513 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S8-L17515-1815 | 17515 | assigned | diagnostics | diagnostic/test | `window.buildForecastMoveExport` |
| S8-L17517-1816 | 17517 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S8-L17519-1817 | 17519 | assigned | diagnostics | diagnostic/test | `window.runPhase67CTruthTests` |
| S8-L17520-1818 | 17520 | arrow | diagnostics | diagnostic/test | `check` |
| S8-L17520-1819 | 17520 | arrow | storage/restore | persistence | `sandbox` |
| S9-L17545-1820 | 17545 | declaration | diagnostics | diagnostic/test | `phase67DClamp` |
| S9-L17546-1821 | 17546 | declaration | diagnostics | diagnostic/test | `phase67DRound` |
| S9-L17547-1822 | 17547 | declaration | diagnostics | diagnostic/test | `phase67DDateAgeDays` |
| S9-L17548-1823 | 17548 | declaration | diagnostics | diagnostic/test | `phase67DAdoptionConfidence` |
| S9-L17549-1824 | 17549 | declaration | diagnostics | diagnostic/test | `phase67DAdoptionLabel` |
| S9-L17550-1825 | 17550 | declaration | diagnostics | diagnostic/test | `phase67DAdoptionMaturity` |
| S9-L17561-1826 | 17561 | declaration | diagnostics | diagnostic/test | `phase67DPersonalEvidence` |
| S9-L17580-1827 | 17580 | declaration | diagnostics | diagnostic/test | `phase67DThreeDimensions` |
| S9-L17581-1828 | 17581 | declaration | diagnostics | diagnostic/test | `phase67DAllActions` |
| S9-L17582-1829 | 17582 | declaration | diagnostics | diagnostic/test | `phase67DActionDomains` |
| S9-L17593-1830 | 17593 | declaration | diagnostics | diagnostic/test | `phase67DOutcomeFromAction` |
| S9-L17598-1831 | 17598 | declaration | diagnostics | diagnostic/test | `phase67DHasAnyTrue` |
| S9-L17599-1832 | 17599 | declaration | diagnostics | diagnostic/test | `phase67DEntryUsedForDomain` |
| S9-L17613-1833 | 17613 | declaration | diagnostics | diagnostic/test | `phase67DIntegrityWeight` |
| S9-L17614-1834 | 17614 | declaration | diagnostics | diagnostic/test | `phase67DAdoptionForDomain` |
| S9-L17623-1835 | 17623 | declaration | diagnostics | diagnostic/test | `phase67DPersonalForDomain` |
| S9-L17624-1836 | 17624 | declaration | diagnostics | diagnostic/test | `phase67DGapRecommendation` |
| S9-L17630-1837 | 17630 | declaration | diagnostics | diagnostic/test | `phase67DEnrichGrades` |
| S9-L17635-1838 | 17635 | arrow | diagnostics | diagnostic/test | `avg` |
| S9-L17639-1839 | 17639 | declaration | diagnostics | diagnostic/test | `phase67DDimensionBox` |
| S9-L17640-1840 | 17640 | declaration | diagnostics | diagnostic/test | `phase67DMaturityTruthHtml` |
| S9-L17645-1841 | 17645 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S9-L17647-1842 | 17647 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGradesHtml` |
| S9-L17649-1843 | 17649 | assigned | diagnostics | diagnostic/test | `window.domainMaturitySummary` |
| S9-L17653-1844 | 17653 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S9-L17654-1845 | 17654 | declaration | diagnostics | diagnostic/test | `phase67DCompactExport` |
| S9-L17655-1846 | 17655 | declaration | diagnostics | diagnostic/test | `phase67DFullExport` |
| S9-L17657-1847 | 17657 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S9-L17659-1848 | 17659 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S9-L17661-1849 | 17661 | assigned | diagnostics | diagnostic/test | `window.buildFullBackupExport` |
| S9-L17663-1850 | 17663 | assigned | diagnostics | diagnostic/test | `window.phase17OngoingTuningPlan` |
| S9-L17665-1851 | 17665 | assigned | diagnostics | diagnostic/test | `window.runPhase67DTruthTests` |
| S9-L17666-1852 | 17666 | arrow | diagnostics | diagnostic/test | `check` |
| S9-L17666-1853 | 17666 | arrow | intelligence | pure domain logic | `positive` |
| S10-L17707-1854 | 17707 | declaration | diagnostics | diagnostic/test | `phase68PublishJson` |
| S10-L17713-1855 | 17713 | declaration | diagnostics | diagnostic/test | `phase68ReadJson` |
| S10-L17714-1856 | 17714 | declaration | diagnostics | diagnostic/test | `phase68Test` |
| S10-L17715-1857 | 17715 | declaration | diagnostics | diagnostic/test | `phase68Group` |
| S10-L17716-1858 | 17716 | declaration | diagnostics | diagnostic/test | `phase68ResultTest` |
| S10-L17717-1859 | 17717 | declaration | diagnostics | diagnostic/test | `phase68Inherited` |
| S10-L17718-1860 | 17718 | declaration | diagnostics | diagnostic/test | `phase68Ms` |
| S10-L17719-1861 | 17719 | declaration | diagnostics | diagnostic/test | `phase68ByteLength` |
| S10-L17720-1862 | 17720 | declaration | diagnostics | diagnostic/test | `phase68SafeClone` |
| S10-L17722-1863 | 17722 | declaration | diagnostics | diagnostic/test | `phase68BlankState` |
| S10-L17728-1864 | 17728 | declaration | diagnostics | diagnostic/test | `phase68WithState` |
| S10-L17733-1865 | 17733 | declaration | diagnostics | diagnostic/test | `phase68StateSummary` |
| S10-L17735-1866 | 17735 | arrow | shared | compatibility/domain | `countArray` |
| S10-L17738-1867 | 17738 | declaration | diagnostics | diagnostic/test | `phase68SemanticSignature` |
| S10-L17742-1868 | 17742 | declaration | diagnostics | diagnostic/test | `phase68StableJson` |
| S10-L17743-1869 | 17743 | arrow | shared | compatibility/domain | `normalize` |
| S10-L17747-1870 | 17747 | declaration | diagnostics | diagnostic/test | `phase68FreshGroup` |
| S10-L17757-1871 | 17757 | declaration | diagnostics | diagnostic/test | `phase68MigrationGroup` |
| S10-L17768-1872 | 17768 | declaration | diagnostics | diagnostic/test | `phase68GuidePeriodAt` |
| S10-L17769-1873 | 17769 | declaration | diagnostics | diagnostic/test | `phase68TimeGroup` |
| S10-L17785-1874 | 17785 | declaration | diagnostics | diagnostic/test | `phase68CommandGroup` |
| S10-L17799-1875 | 17799 | declaration | diagnostics | diagnostic/test | `phase68FeedbackGroup` |
| S10-L17811-1876 | 17811 | declaration | diagnostics | diagnostic/test | `phase68CareerGroup` |
| S10-L17823-1877 | 17823 | declaration | diagnostics | diagnostic/test | `phase68TruthGroup` |
| S10-L17838-1878 | 17838 | declaration | diagnostics | diagnostic/test | `phase68RegressionGroup` |
| S10-L17839-1879 | 17839 | arrow | diagnostics | diagnostic/test | `add` |
| S10-L17869-1880 | 17869 | declaration | diagnostics | diagnostic/test | `phase68MobileStructuralGroup` |
| S10-L17881-1881 | 17881 | declaration | diagnostics | diagnostic/test | `phase68TuningGroup` |
| S10-L17883-1882 | 17883 | declaration | diagnostics | diagnostic/test | `phase68PerformanceGroup` |
| S10-L17892-1883 | 17892 | assigned | storage/restore | export | `window.buildLevel5ReviewExport` |
| S10-L17900-1884 | 17900 | declaration | diagnostics | diagnostic/test | `phase68CompactAcceptance` |
| S10-L17904-1885 | 17904 | declaration | diagnostics | diagnostic/test | `phase68ComputeDecision` |
| S10-L17908-1886 | 17908 | declaration | diagnostics | diagnostic/test | `phase68RunStartupTruth` |
| S10-L17913-1887 | 17913 | declaration | diagnostics | diagnostic/test | `phase68RunFinalAcceptance` |
| S10-L17937-1888 | 17937 | declaration | diagnostics | diagnostic/test | `phase68TestRows` |
| S10-L17938-1889 | 17938 | declaration | diagnostics | diagnostic/test | `phase68AcceptanceCardHtml` |
| S10-L17942-1890 | 17942 | declaration | diagnostics | diagnostic/test | `phase68UpdateCard` |
| S10-L17943-1891 | 17943 | declaration | diagnostics | diagnostic/test | `phase68RecordViewportAudit` |
| S10-L17944-1892 | 17944 | declaration | diagnostics | diagnostic/test | `phase68ViewportAudit` |
| S10-L17945-1893 | 17945 | arrow | shared | compatibility/domain | `visible` |
| S10-L17945-1894 | 17945 | arrow | shared | compatibility/domain | `rect` |
| S10-L17950-1895 | 17950 | assigned | diagnostics | diagnostic/test | `window.renderData` |
| S10-L17952-1896 | 17952 | assigned | diagnostics | diagnostic/test | `window.buildLifeUpdate` |
| S10-L17954-1897 | 17954 | assigned | diagnostics | diagnostic/test | `window.buildLevel5ReviewExport` |
| S10-L17956-1898 | 17956 | assigned | diagnostics | diagnostic/test | `window.buildFullBackupExport` |
| S10-L17958-1899 | 17958 | assigned | diagnostics | diagnostic/test | `window.appCapabilityGrades` |
| S12-L17973-1900 | 17973 | declaration | diagnostics | diagnostic/test | `phase70KActiveWorkoutCandidates` |
| S12-L17977-1901 | 17977 | declaration | diagnostics | diagnostic/test | `phase70KActiveWorkoutText` |
| S12-L17982-1902 | 17982 | declaration | diagnostics | diagnostic/test | `phase70KObsoletePreferenceFields` |
| S12-L17986-1903 | 17986 | assigned | diagnostics | diagnostic/test | `window.runPhase70KTruthTests` |
| S12-L17987-1904 | 17987 | arrow | diagnostics | diagnostic/test | `check` |

## State/member path ledger

These paths are a static compatibility inventory, not a proposed new state
shape. Wildcards represent computed member access.

| Path |
| --- |
| `d.*` |
| `d.*.length` |
| `d.*.level` |
| `d.*.some` |
| `d._inputUpdatedAt` |
| `d._logged` |
| `d._logged.*` |
| `d._logged.azure` |
| `d._logged.dayFood:morning:noBreakfast` |
| `d._logged.energy` |
| `d._logged.energyTimeline:afternoon` |
| `d._logged.energyTimeline:morning` |
| `d._logged.faith.faithRepLogged` |
| `d._logged.faith.foundationRep` |
| `d._logged.faith.minimumRep` |
| `d._logged.father.lessonSuggested` |
| `d._logged.fatherCheck` |
| `d._logged.health.bodyReadiness` |
| `d._logged.health.movementStage` |
| `d._logged.home` |
| `d._logged.money` |
| `d._logged.moodTimeline` |
| `d._logged.morningStart.phoneBoundary` |
| `d._logged.night` |
| `d._logged.pattern.caffeineWindow` |
| `d._logged.pattern.energySymptoms` |
| `d._logged.privateEventLog` |
| `d._logged.recovery.nextAnchorSkipped` |
| `d._logged.recovery.phoneBoundary` |
| `d._logged.reentry.slightlyBetter` |
| `d._logged.reentry.urgent` |
| `d._logged.saturday.keepDayLight` |
| `d._logged.saturday.protectOpenTime` |
| `d._logged.sleep` |
| `d._logged.socialCheck` |
| `d._logged.water` |
| `d._logged.workout` |
| `d._rangePeriods` |
| `d._rangePeriods.*` |
| `d._rangePeriods.*.*` |
| `d._rangePeriods.*.*.value` |
| `d._saturdayV88DefaultsApplied` |
| `d._savedAt` |
| `d._vals` |
| `d.activeAction` |
| `d.adoption` |
| `d.adoptionLevel` |
| `d.adoptionMaturity` |
| `d.adoptionMaturity.confidence` |
| `d.adoptionMaturity.eligibleOpportunities` |
| `d.adoptionMaturity.label` |
| `d.adoptionMaturity.level` |
| `d.adoptionMaturity.meaningfulUses` |
| `d.adoptionMaturity.missingProof` |
| `d.adoptionMaturity.recencyDays` |
| `d.adoptionMaturity.useRate` |
| `d.azure` |
| `d.azureLoggedAt` |
| `d.azureProgress` |
| `d.azureProof` |
| `d.azureSession` |
| `d.azureSessions` |
| `d.azureSessions.filter` |
| `d.azureSessions.length` |
| `d.azureSessions.push` |
| `d.azureSessions.some` |
| `d.bestLever` |
| `d.body` |
| `d.body.liftCompleted` |
| `d.body.mobility` |
| `d.body.protein` |
| `d.body.strength` |
| `d.body.walk` |
| `d.body.workout` |
| `d.bodyWin` |
| `d.capabilityLevel` |
| `d.checkWindow` |
| `d.coffee` |
| `d.confidence` |
| `d.count` |
| `d.dailySnapshot` |
| `d.dailySnapshot.capturedAt` |
| `d.dayFood` |
| `d.dayFood.*` |
| `d.dayFood.*.*` |
| `d.dayFood.*.breakfast` |
| `d.dayFood.*.noBreakfast` |
| `d.dayFood.afternoon` |
| `d.dayFood.afternoon.lunch` |
| `d.dayFood.evening` |
| `d.dayFood.evening.dinner` |
| `d.dayFood.morning` |
| `d.dayFood.morning.breakfast` |
| `d.delta` |
| `d.energy` |
| `d.energySymptoms` |
| `d.energySymptoms.entries` |
| `d.energySymptoms.entries.some` |
| `d.energyTimeline` |
| `d.energyTimeline.find` |
| `d.energyTimeline.push` |
| `d.energyTimeline.slice` |
| `d.energyTimeline.some` |
| `d.energyTimelineDraft` |
| `d.energyTimelineDraft.tags` |
| `d.environment` |
| `d.environment.*` |
| `d.environment.repLog` |
| `d.evidencePolicy` |
| `d.expectedEffect` |
| `d.expectedLift` |
| `d.faith` |
| `d.faith.*` |
| `d.faith.faithRepLogged` |
| `d.faith.foundationRep` |
| `d.faith.gotSignature` |
| `d.faith.level5` |
| `d.faith.level5.*` |
| `d.faith.level5.repLog` |
| `d.faith.minimum` |
| `d.faith.minimumDone` |
| `d.faith.minimumRep` |
| `d.faith.prayer` |
| `d.faith.solidReason` |
| `d.faith.studiedSubject` |
| `d.father` |
| `d.father.bedtime` |
| `d.father.coaching` |
| `d.father.coaching.*` |
| `d.father.daddyNeed` |
| `d.father.daily` |
| `d.father.daily.connect` |
| `d.father.daily.repair` |
| `d.father.daily.teach` |
| `d.father.independence` |
| `d.father.lesson` |
| `d.father.lessonCycle` |
| `d.father.lessonMeta` |
| `d.father.lessonSuggestedAt` |
| `d.father.lessonSuggestionId` |
| `d.father.level5` |
| `d.father.level5.*` |
| `d.father.level5.completedTinyLessons` |
| `d.father.level5.repLog` |
| `d.father.notes` |
| `d.father.obs` |
| `d.father.obs.frustrated` |
| `d.father.obs.loved` |
| `d.father.obs.repeat` |
| `d.father.obs.taught` |
| `d.father.obs.well` |
| `d.father.patience` |
| `d.father.potty` |
| `d.father.reading` |
| `d.father.repair` |
| `d.father.warmth` |
| `d.father.words` |
| `d.fatherCheck` |
| `d.fatherWin` |
| `d.forecastActions` |
| `d.forecastActions.filter` |
| `d.forecastActions.find` |
| `d.forecastActions.forEach` |
| `d.forecastActions.push` |
| `d.forecastActions.some` |
| `d.forecastDismissals` |
| `d.forecastDismissals.filter` |
| `d.forecastDismissals.push` |
| `d.futureWin` |
| `d.getDate` |
| `d.getDay` |
| `d.getFullYear` |
| `d.getMonth` |
| `d.getTime` |
| `d.health` |
| `d.health.activeLoad` |
| `d.health.bodyReadiness` |
| `d.health.cleanOutfit` |
| `d.health.fastFood` |
| `d.health.heavyCarbs` |
| `d.health.hydration` |
| `d.health.movementLog` |
| `d.health.movementStage` |
| `d.health.protein` |
| `d.health.rest` |
| `d.health.shower` |
| `d.health.strengthWorkoutDone` |
| `d.health.sugar` |
| `d.health.sunlight` |
| `d.health.walk` |
| `d.health.workout` |
| `d.home` |
| `d.inputUpdatedAt` |
| `d.key` |
| `d.lastUpdated` |
| `d.level` |
| `d.lockedDone` |
| `d.mainInstruction` |
| `d.minimumWins` |
| `d.minimumWins.date` |
| `d.minimumWins.items` |
| `d.minimumWins.status` |
| `d.minimumWins.version` |
| `d.missingPiece` |
| `d.mode` |
| `d.money` |
| `d.moneyDiscipline` |
| `d.moneyDiscipline.avoidLifestyle` |
| `d.moneyDiscipline.avoidRandom` |
| `d.moneyDiscipline.nextMove` |
| `d.moneyDiscipline.protectCar` |
| `d.moneyDiscipline.protectProperty` |
| `d.moneyLog` |
| `d.moneyState` |
| `d.mood` |
| `d.moodTimeline` |
| `d.moodTimeline.some` |
| `d.moodTimelineDraft` |
| `d.morningStart` |
| `d.morningStart.*` |
| `d.morningStart.notes` |
| `d.morningStart.phoneBoundary` |
| `d.moveFit` |
| `d.nextUpgradeMove` |
| `d.night` |
| `d.notes` |
| `d.outcomeMaturity` |
| `d.outcomeMaturity.level` |
| `d.override` |
| `d.pattern` |
| `d.pattern.*` |
| `d.pattern.bedtime` |
| `d.pattern.bodyRep` |
| `d.pattern.caffeineAfter6` |
| `d.pattern.caffeineWindow` |
| `d.pattern.caffeineWindowLogged` |
| `d.pattern.caffeineWindowLoggedAt` |
| `d.pattern.caffeineWindowLoggedDate` |
| `d.pattern.currentEffectsLogged` |
| `d.pattern.currentEffectsLoggedAt` |
| `d.pattern.daughterConnection` |
| `d.pattern.driveLevel` |
| `d.pattern.energyBrainFog` |
| `d.pattern.energyClearHeaded` |
| `d.pattern.energyCrashNotes` |
| `d.pattern.energyDropStarted` |
| `d.pattern.energyEnergized` |
| `d.pattern.energyGroggy` |
| `d.pattern.energyLethargic` |
| `d.pattern.energySleepy` |
| `d.pattern.energyTired` |
| `d.pattern.focusLevel` |
| `d.pattern.irritability` |
| `d.pattern.lateCaffeine` |
| `d.pattern.latePhone` |
| `d.pattern.masturbated` |
| `d.pattern.masturbatedAt` |
| `d.pattern.moneyLeak` |
| `d.pattern.newTasksAfterCloseout` |
| `d.pattern.nextMorningEffect` |
| `d.pattern.nextMorningEffectLogged` |
| `d.pattern.nightEntryTarget` |
| `d.pattern.pagesRead` |
| `d.pattern.peakNotes` |
| `d.pattern.phoneAfterBedtime` |
| `d.pattern.phoneAway` |
| `d.pattern.pianoMinutes` |
| `d.pattern.pornWatched` |
| `d.pattern.pornWatchedAt` |
| `d.pattern.privateEventAt` |
| `d.pattern.privateEventLogId` |
| `d.pattern.privateFollowUpClosedAt` |
| `d.pattern.privateFollowUpCompletedAt` |
| `d.pattern.privateFollowUpDueAt` |
| `d.pattern.privateFollowUpKind` |
| `d.pattern.privateNotes` |
| `d.pattern.privateSleepEffect` |
| `d.pattern.privateSleepEffectLogged` |
| `d.pattern.proteinMeal` |
| `d.pattern.readingMinutes` |
| `d.pattern.socialContact` |
| `d.pattern.speedPractice` |
| `d.pattern.spendingControl` |
| `d.pattern.sunlight` |
| `d.pattern.taskSpiral` |
| `d.pattern.tonight` |
| `d.pattern.tonight.*` |
| `d.pattern.tonight.bedtime` |
| `d.pattern.tonight.caffeineAfter6` |
| `d.pattern.tonight.caffeineWindow` |
| `d.pattern.tonight.latePhone` |
| `d.pattern.tonight.newTasksAfterCloseout` |
| `d.pattern.tonight.phoneAfterBedtime` |
| `d.pattern.tonight.phoneAway` |
| `d.pattern.tonight.wakeTime` |
| `d.pattern.usedAsEscape` |
| `d.pattern.usedAsEscapeAt` |
| `d.pattern.wakeTime` |
| `d.pattern.workoutWalk` |
| `d.personalEvidence` |
| `d.personalEvidence.confidence` |
| `d.personalEvidence.label` |
| `d.personalEvidence.level` |
| `d.personalEvidence.missingProof` |
| `d.personalEvidence.nextEvidenceCollectionMove` |
| `d.personalEvidence.positiveRate` |
| `d.personalEvidence.sampleCount` |
| `d.personalEvidence.unknownOutcomesExcluded` |
| `d.personalEvidenceLevel` |
| `d.phase67AExploration` |
| `d.presence` |
| `d.presence.grooming` |
| `d.presence.outfit` |
| `d.primaryBottleneck` |
| `d.privateEvents` |
| `d.privateEvents.filter` |
| `d.privateEvents.length` |
| `d.proof` |
| `d.reason` |
| `d.recovery` |
| `d.recovery.*` |
| `d.recovery.caffeineCutoff` |
| `d.recovery.morningCue` |
| `d.recovery.morningCueText` |
| `d.recovery.phoneBoundary` |
| `d.recovery.targetWakeTime` |
| `d.recovery.tomorrowMinimumText` |
| `d.recovery.wakeTimeSet` |
| `d.reentry` |
| `d.reentry.slightlyBetter` |
| `d.reentry.urgent` |
| `d.review` |
| `d.review.*` |
| `d.review.What is tomorrow’s minimum win?` |
| `d.saturday` |
| `d.saturday.*` |
| `d.saturday.churchAllDay` |
| `d.saturday.keepDayLight` |
| `d.saturday.protectOpenTime` |
| `d.score` |
| `d.secondaryBottleneck` |
| `d.setDate` |
| `d.sleep` |
| `d.sleepSource` |
| `d.sleepSourceLabel` |
| `d.social` |
| `d.social.compliment` |
| `d.social.grooming` |
| `d.social.outfit` |
| `d.social.presence` |
| `d.social.presence.*` |
| `d.social.presence.repLog` |
| `d.social.publicSpace` |
| `d.social.realConversation` |
| `d.social.selfRespect` |
| `d.socialCheck` |
| `d.systemCapability` |
| `d.systemCapability.level` |
| `d.therapy` |
| `d.therapy.confidence` |
| `d.therapy.journal` |
| `d.therapy.loneliness` |
| `d.therapy.overwhelm` |
| `d.therapy.resetAt` |
| `d.therapy.resetLoggedAt` |
| `d.therapy.resetUsed` |
| `d.therapy.stress` |
| `d.title` |
| `d.totalWeight` |
| `d.upgradeRecommendation` |
| `d.upgradeRecommendation.gapType` |
| `d.water` |
| `d.workout` |
| `state._backupIntegrity` |
| `state._backupIntegrity.lastFullConfirmedAt` |
| `state._backupIntegrity.lastFullReason` |
| `state._backupIntegrity.lastFullSignature` |
| `state._backupIntegrity.lastFullWarnings` |
| `state._domainUpdatedAt` |
| `state._domainUpdatedAt.azure` |
| `state._inputUpdatedAt` |
| `state._lastMeaningfulInputAt` |
| `state._savedAt` |
| `state._schemaVersion` |
| `state.azure` |
| `state.azure.claims` |
| `state.azure.claims.*` |
| `state.azure.proof` |
| `state.azure.proof.*` |
| `state.azure.proof.explainQueue` |
| `state.azure.proof.proofLog` |
| `state.azure.proof.proofQueue` |
| `state.azure.proof.weakTopics` |
| `state.azure.proof.workWins` |
| `state.azure.skills` |
| `state.azure.skills.*` |
| `state.child` |
| `state.child.customSkills` |
| `state.child.customSkills.filter` |
| `state.child.customSkills.length` |
| `state.child.customSkills.map` |
| `state.child.customSkills.push` |
| `state.child.customSkills.splice` |
| `state.child.skills` |
| `state.child.skills.*` |
| `state.child.stageSuggestionMeta` |
| `state.child.updatedAt` |
| `state.child.weekly` |
| `state.child.weekly.*` |
| `state.child.weekly.best` |
| `state.child.weekly.dad` |
| `state.child.weekly.lastGuideCompletedAt` |
| `state.child.weekly.lastGuideCompletedWeek` |
| `state.child.weekly.lastGuideStartedAt` |
| `state.child.weekly.lastGuideStartedWeek` |
| `state.child.weekly.practice` |
| `state.child.weekly.strong` |
| `state.child.weekly.support` |
| `state.days` |
| `state.days.*` |
| `state.days.*._savedAt` |
| `state.days.*.dailySnapshot` |
| `state.days.*.forecastActions` |
| `state.days.*.inputUpdatedAt` |
| `state.days.*.lastUpdated` |
| `state.faith` |
| `state.faith.progress` |
| `state.learning` |
| `state.learning.*` |
| `state.learning.cards` |
| `state.learning.reps` |
| `state.learning.weakTopics` |
| `state.money` |
| `state.money.*` |
| `state.money.carAggressivePayment` |
| `state.money.carBalance` |
| `state.money.carOriginal` |
| `state.money.creditBalance` |
| `state.money.creditLimit` |
| `state.money.emergencyFloorLater` |
| `state.money.emergencyFloorNow` |
| `state.money.emergencyFund` |
| `state.money.moneyRhythm` |
| `state.money.monthlyDebtPayoff` |
| `state.money.monthlySavingsGoal` |
| `state.money.propertyFund` |
| `state.money.propertyGoal` |
| `state.money.rothAnnualGoal` |
| `state.money.rothYTD` |
| `state.settings` |
| `state.settings.activeTab` |
| `state.settings.autoBackupDownloads` |
| `state.settings.autoBackupDueAt` |
| `state.settings.autoBackupDueReason` |
| `state.settings.autoBackupIntervalMinutes` |
| `state.settings.autoBackupLastAt` |
| `state.settings.autoBackupLastAttemptAt` |
| `state.settings.autoBackupPromptCooldownUntil` |
| `state.settings.dailyCarryFixAppliedFor` |
| `state.settings.dayRolloverMode` |
| `state.settings.forecastDisplayLock` |
| `state.settings.forecastDisplayLock.id` |
| `state.settings.forecastDisplayLock.period` |
| `state.settings.forecastDisplayLock.released` |
| `state.settings.forecastDisplayLock.releasedAt` |
| `state.settings.forecastDisplayLock.releasedReason` |
| `state.settings.forecastMoveOverride` |
| `state.settings.forecastMoveOverride.period` |
| `state.settings.forecastMoveOverride.released` |
| `state.settings.forecastMoveOverride.releasedAt` |
| `state.settings.forecastMoveOverride.started` |
| `state.settings.guideState` |
| `state.settings.includePrivatePatternInExports` |
| `state.settings.lastAfternoonGuideCompletedAt` |
| `state.settings.lastAfternoonGuideCompletedDay` |
| `state.settings.lastEveningGuideCompletedAt` |
| `state.settings.lastEveningGuideCompletedDay` |
| `state.settings.lastGuidePeriod` |
| `state.settings.lastGuideStateClearedAt` |
| `state.settings.lastMorningGuideCompletedAt` |
| `state.settings.lastMorningGuideCompletedDay` |
| `state.settings.lastSmartCheckInCompletedAt` |
| `state.settings.lastSmartCheckInCompletedSourcePeriod` |
| `state.settings.lastSmartCheckInSourcePeriod` |
| `state.settings.lastSmartCheckInStartedAt` |
| `state.settings.manualDayKey` |
| `state.settings.missedMorningGuideUsedFor` |
| `state.settings.nightEntryTarget` |
| `state.settings.nightTarget` |
| `state.settings.oneTimeEnergy930FixUsedFor` |
| `state.settings.privateBackdateDraft` |
| `state.settings.quickMode` |
| `state.settings.reentry` |
| `state.settings.reentry.completedAt` |
| `state.settings.reentry.gapDays` |
| `state.settings.reentry.lastAction` |
| `state.settings.reentry.lastMeaningfulDate` |
| `state.settings.reentry.lastProtection` |
| `state.settings.reentry.lastShownAt` |
| `state.settings.reentry.skippedAt` |
| `state.settings.reentry.staleProtectedAt` |
| `state.settings.reentry.staleProtectedFor` |
| `state.settings.showAllMoodTimelineToday` |
| `state.settings.targetSleepTime` |
| `state.theme` |
| `state.weeklyAnchors` |

## DOM ownership ledger

Markup IDs: 169; direct runtime ID references: 52.

| Markup element ID |
| --- |
| `${esc(sourceActionId)}` |
| `${id}` |
| `app` |
| `appToast` |
| `backupHealthSlot` |
| `bottomNav` |
| `buildDataDiagnosticsBtn` |
| `cb` |
| `content` |
| `dataDiagnosticPanel` |
| `dataIntegrityStatus` |
| `energyShiftDraftStatus` |
| `energyTimelineLogButton` |
| `energyTimelineNote` |
| `energyTimelineNoteWrap` |
| `energyTimelineScore` |
| `energyTimelineScoreWrap` |
| `exportProgressBox` |
| `exportProgressFill` |
| `exportProgressHint` |
| `exportProgressPct` |
| `exportProgressText` |
| `exportStatus` |
| `forecastInfoBox` |
| `forecastPathDetails` |
| `guide-active-load` |
| `guide-azure-log` |
| `guide-azure-proof-ladder` |
| `guide-body-readiness` |
| `guide-environment-level5` |
| `guide-faith-foundation` |
| `guide-faith-meaning-level5` |
| `guide-faith-minimum` |
| `guide-faith-subject` |
| `guide-father-coaching` |
| `guide-father-daily` |
| `guide-father-growth` |
| `guide-father-level5` |
| `guide-father-observation` |
| `guide-father-tiny-lesson` |
| `guide-father-weekly-review` |
| `guide-health-mode` |
| `guide-learning-engine` |
| `guide-level5-review-export` |
| `guide-money-discipline` |
| `guide-movement-ladder` |
| `guide-pattern-caffeine` |
| `guide-pattern-current-effects` |
| `guide-pattern-day-food` |
| `guide-pattern-energy-state` |
| `guide-pattern-mood-timeline` |
| `guide-pattern-night-food` |
| `guide-pattern-night-inputs` |
| `guide-pattern-private` |
| `guide-pattern-stressors` |
| `guide-pattern-weekday-layer` |
| `guide-phase16-final-pass` |
| `guide-phase17-acceptance` |
| `guide-presence-level5` |
| `guide-saturday-open-time` |
| `guide-sleep-recovery` |
| `guide-social-reps` |
| `guide-therapy-dashboard` |
| `guide-therapy-journal` |
| `guide-today-core` |
| `guide-today-daily-checks` |
| `guide-today-daily-review` |
| `guide-today-forecast` |
| `guide-today-forecast-why` |
| `guide-today-life-checks` |
| `guide-today-minimum-win` |
| `guide-today-morning-start` |
| `guide-ui-safety` |
| `guide-weekly-prompt` |
| `guide-weekly-rhythm` |
| `guideControls` |
| `guideStatusWrap` |
| `lastUpdatedBadge` |
| `missedMorningGuideBtn` |
| `moodTimelineDraftStatus` |
| `moodTimelineLogButton` |
| `moodTimelineNote` |
| `moodTimelineNoteWrap` |
| `moodTimelineScore` |
| `moodTimelineScoreWrap` |
| `nb_` |
| `newLearningQuestion` |
| `newLearningTopic` |
| `newSkillCat` |
| `newSkillText` |
| `phase64tDiagnosticStatus` |
| `phase64tDiagnosticText` |
| `phase65a-evidence-truth-styles` |
| `phase65a-evidence-truth-unification` |
| `phase65a-synthetic-truth-results` |
| `phase65b-reentry-better` |
| `phase65b-reentry-card` |
| `phase65b-reentry-energy` |
| `phase65b-reentry-mode` |
| `phase65b-reentry-styles` |
| `phase65b-reentry-urgent` |
| `phase65b-synthetic-truth-results` |
| `phase66a-cant-now-feedback` |
| `phase66a-cant-now-styles` |
| `phase66a-feedback-management` |
| `phase66a-synthetic-truth-results` |
| `phase66aCantNowOverlay` |
| `phase66aClearFamilySelect` |
| `phase66aReasonError` |
| `phase66aReasonNote` |
| `phase66b-constraint-learning` |
| `phase66b-constraint-learning-styles` |
| `phase66b-constraint-management` |
| `phase66b-synthetic-truth-results` |
| `phase66bDurationOverlay` |
| `phase67a-forecast-lift-path-engine` |
| `phase67a-forecast-lift-styles` |
| `phase67a-optimization-diagnostics` |
| `phase67a-synthetic-truth-results` |
| `phase67b-budget-diagnostics` |
| `phase67b-capacity-budget-engine` |
| `phase67b-capacity-budget-styles` |
| `phase67b-synthetic-truth-results` |
| `phase67b-weekly-focus` |
| `phase67c-review-queue` |
| `phase67c-synthetic-truth-results` |
| `phase67c-work-win-drafts` |
| `phase67c-work-win-engine` |
| `phase67c-work-win-styles` |
| `phase67cAction` |
| `phase67cCanExplain` |
| `phase67cCaptureOverlay` |
| `phase67cCaptureSheet` |
| `phase67cCaptureStatus` |
| `phase67cEvidenceLocation` |
| `phase67cEvidenceSaved` |
| `phase67cEvidenceType` |
| `phase67cLocationSensitive` |
| `phase67cOtherTechnology` |
| `phase67cPrivacy` |
| `phase67cPrivateContext` |
| `phase67cProblem` |
| `phase67cResult` |
| `phase67cResumeReady` |
| `phase67cSpacedCard` |
| `phase67d-maturity-truth-card` |
| `phase67d-maturity-truth-engine` |
| `phase67d-maturity-truth-styles` |
| `phase67d-synthetic-truth-results` |
| `phase68-final-acceptance-card` |
| `phase68-final-acceptance-engine` |
| `phase68-final-acceptance-styles` |
| `phase68RunBtn` |
| `phase70j-time-weekly-focus-marker` |
| `phase70k-fitbod-boundary-cleanup` |
| `phase70k-synthetic-truth-results` |
| `quickModeBtn` |
| `resetPanel` |
| `restoreTransactionOverlay` |
| `saveStatus` |
| `sec-` |
| `sec-${id}` |
| `sec-quick` |
| `smartCheckBtn` |
| `storage-` |
| `tabs` |
| `timeGuideBtn` |
| `todayPill` |
| `weeklyGuideSlot` |

### Runtime ID references

| Referenced ID |
| --- |
| `app` |
| `appToast` |
| `backupJsonBox` |
| `bottomNav` |
| `buildDataDiagnosticsBtn` |
| `content` |
| `dataDiagnosticPanel` |
| `dataIntegrityStatus` |
| `energyShiftDraftStatus` |
| `energyTimelineNote` |
| `energyTimelineScore` |
| `exportProgressBox` |
| `exportProgressFill` |
| `exportProgressHint` |
| `exportProgressPct` |
| `exportProgressText` |
| `exportStatus` |
| `forecastPathDetails` |
| `guide-today-forecast-why` |
| `guideControls` |
| `guideStatusWrap` |
| `lastUpdatedBadge` |
| `missedMorningGuideBtn` |
| `moodTimelineDraftStatus` |
| `moodTimelineNote` |
| `moodTimelineScore` |
| `newSkillCat` |
| `newSkillText` |
| `phase64tDiagnosticStatus` |
| `phase64tDiagnosticText` |
| `phase66aCantNowOverlay` |
| `phase66aClearFamilySelect` |
| `phase66bDurationOverlay` |
| `phase67c-work-win-drafts` |
| `phase67cCaptureOverlay` |
| `phase67cCaptureSheet` |
| `phase67cCaptureStatus` |
| `phase67cProblem` |
| `phase67d-maturity-truth-card` |
| `phase67d-maturity-truth-styles` |
| `phase68-final-acceptance-card` |
| `phase68-final-acceptance-styles` |
| `phase70k-synthetic-truth-results` |
| `quickModeBtn` |
| `resetPanel` |
| `restoreTransactionOverlay` |
| `saveStatus` |
| `smartCheckBtn` |
| `tabs` |
| `timeGuideBtn` |
| `todayPill` |
| `weeklyGuideSlot` |

## Storage identifier ledger

| Identifier |
| --- |
| `TLCC_STATE::` |
| `_backup_latest` |
| `_last_good` |
| `_verified_import_pending_v1` |
| `_verified_import_session_v1` |
| `backup_latest` |
| `last_good` |
| `pre_import::` |
| `tlcc_active` |
| `tlcc_persistent_store_v1` |
| `tyree_life_command_center_v1` |

## Browser event ledger

| Event type |
| --- |
| `beforeunload` |
| `blur` |
| `change` |
| `click` |
| `error` |
| `focus` |
| `input` |
| `keydown` |
| `orientationchange` |
| `pagehide` |
| `pointerdown` |
| `pointerup` |
| `resize` |
| `scroll` |
| `storage` |
| `touchend` |
| `unhandledrejection` |
| `visibilitychange` |
