import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navigateToTab } from "../navigation/hashRoute";
import { isTabId } from "../navigation/tabRegistry";
import { cloneState, createBlankAppState, type AppState } from "../state/model";
import {
  BrowserIndexedStateStore,
  BrowserLocalStorageStore,
  MemoryIndexedStateStore,
  MemoryKeyValueStore
} from "../storage/adapters";
import { StorageCoordinator } from "../storage/coordinator";
import type { PreparedBackup } from "../storage/fullBackup";
import { STORAGE_KEYS } from "../storage/keys";
import {
  VerifiedRestoreCoordinator,
  type RestoreMode
} from "../storage/verifiedRestore";
import { GuideAutomationOwner } from "./automation";
import {
  missedMorningEligibility,
  smartCheckInEligibility,
  suggestedGuide,
  weeklyGuideEligibility
} from "./eligibility";
import {
  buildGuideSteps,
  buildSmartCheckInSteps,
  resolveSessionSteps,
  stepMap
} from "./guideRegistry";
import {
  completeCurrentStep,
  parseGuideState,
  reconcileRecoveredGuideState,
  skipCurrentStep,
  startGuide,
  startQuickMode,
  stopGuide,
  stopQuickMode
} from "./session";
import { effectiveDateKey, guidePeriodAt } from "./time";
import type {
  EvidenceSnapshot,
  GuideBuildContext,
  GuideFamily,
  GuideState,
  GuideTransition
} from "./types";
import { createBlankGuideState } from "./types";

export type SaveStatus = "loading" | "saved" | "saving" | "error";
export type BackupStatus = "idle" | "saving" | "saved" | "error";

const blankEvidence: EvidenceSnapshot = { satisfied: {} };

function browserCoordinator(): StorageCoordinator {
  let local;
  try {
    local = new BrowserLocalStorageStore();
  } catch {
    local = new MemoryKeyValueStore();
  }
  const indexed =
    typeof window.indexedDB === "undefined"
      ? new MemoryIndexedStateStore()
      : new BrowserIndexedStateStore();
  return new StorageCoordinator(local, indexed);
}

export function useGuideRuntime() {
  const [rootState, setRootState] = useState<AppState>(() => createBlankAppState());
  const [guideState, setGuideState] = useState<GuideState>(() => createBlankGuideState());
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("loading");
  const [backupStatus, setBackupStatus] = useState<BackupStatus>("idle");
  const [lastBackupAt, setLastBackupAt] = useState<string | null>(null);
  const [notice, setNotice] = useState<string>("");
  const [clock, setClock] = useState(() => new Date());
  const rootRef = useRef(rootState);
  const coordinatorRef = useRef<StorageCoordinator | null>(null);
  const saveQueueRef = useRef<Promise<unknown>>(Promise.resolve());
  const saveSequenceRef = useRef(0);
  const initialHashRef = useRef(window.location.hash);

  const context: GuideBuildContext = useMemo(
    () => ({
      now: clock,
      timeZone: rootState.settings.timeZone,
      rolloverMode: rootState.settings.dayRolloverMode,
      evidence: blankEvidence
    }),
    [clock, rootState.settings.dayRolloverMode, rootState.settings.timeZone]
  );

  useEffect(() => {
    let disposed = false;
    const coordinator = browserCoordinator();
    coordinatorRef.current = coordinator;
    const restore = new VerifiedRestoreCoordinator(
      coordinator.local,
      coordinator.indexed
    );
    void (async () => {
      let restoreNotice = "";
      let verifiedRestore: AppState | null = null;
      if (coordinator.local.getItem(STORAGE_KEYS.restorePending)) {
        try {
          verifiedRestore = await restore.verifyPendingOnBoot();
          if (verifiedRestore) {
            restoreNotice = "Restore verified after reload.";
          }
        } catch {
          restoreNotice =
            "Restore verification failed and the exact pre-import state was recovered.";
        }
      }
      const loaded = verifiedRestore
        ? { state: verifiedRestore }
        : await coordinator.load();
      return { state: loaded.state, restoreNotice };
    })()
      .then(({ state, restoreNotice }) => {
        if (disposed) return;
        const loadedGuides = reconcileRecoveredGuideState(
          parseGuideState(state.settings.guides),
          {
            now: new Date(),
            timeZone: state.settings.timeZone,
            rolloverMode: state.settings.dayRolloverMode
          }
        );
        state.settings.guides = loadedGuides;
        rootRef.current = state;
        setRootState(state);
        setGuideState(loadedGuides);
        setSaveStatus("saved");
        if (restoreNotice) setNotice(restoreNotice);
        if (isTabId(state.settings.activeTab) && initialHashRef.current === "") {
          navigateToTab(state.settings.activeTab);
        }
      })
      .catch(() => {
        if (disposed) return;
        setSaveStatus("error");
        setNotice("Local recovery could not be opened. The blank in-memory state is still safe.");
      });
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    if (
      saveStatus === "loading" ||
      rootState.settings.autoBackupEnabled === false
    ) {
      return;
    }
    const minutes = Math.min(
      1440,
      Math.max(5, rootState.settings.autoBackupMinutes || 30)
    );
    const timer = window.setInterval(() => {
      const coordinator = coordinatorRef.current;
      if (!coordinator) return;
      setBackupStatus("saving");
      void coordinator
        .saveLatestBackup(rootRef.current)
        .then(() => {
          setLastBackupAt(new Date().toISOString());
          setBackupStatus("saved");
        })
        .catch(() => {
          setBackupStatus("error");
          setNotice("The scheduled recovery snapshot could not be verified.");
        });
    }, minutes * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [
    rootState.settings.autoBackupEnabled,
    rootState.settings.autoBackupMinutes,
    saveStatus
  ]);

  useEffect(() => {
    const owner = new GuideAutomationOwner(
      {
        setInterval: (callback, delay) => window.setInterval(callback, delay),
        clearInterval: (id) => window.clearInterval(id as number),
        addVisibilityListener: (callback) =>
          document.addEventListener("visibilitychange", callback),
        removeVisibilityListener: (callback) =>
          document.removeEventListener("visibilitychange", callback)
      },
      () => setClock(new Date())
    );
    owner.start();
    return () => owner.stop();
  }, []);

  const commitRoot = useCallback((nextRoot: AppState, nextGuides: GuideState) => {
    const timestamp = new Date();
    nextRoot._inputUpdatedAt = timestamp.toISOString();
    rootRef.current = nextRoot;
    setRootState(nextRoot);
    setGuideState(nextGuides);
    setSaveStatus("saving");
    const sequence = ++saveSequenceRef.current;
    saveQueueRef.current = saveQueueRef.current
      .then(async () => {
        const coordinator = coordinatorRef.current;
        if (!coordinator) return;
        const saved = await coordinator.save(nextRoot, timestamp);
        if (sequence === saveSequenceRef.current) {
          rootRef.current = saved;
          setRootState(saved);
          setSaveStatus("saved");
        }
      })
      .catch(() => {
        if (sequence === saveSequenceRef.current) {
          setSaveStatus("error");
          setNotice("Autosave could not verify both local storage layers.");
        }
      });
  }, []);

  const persist = useCallback(
    (nextGuides: GuideState, activeTab?: string) => {
      const nextRoot = cloneState(rootRef.current);
      nextRoot.settings.guides = nextGuides;
      if (activeTab && isTabId(activeTab)) nextRoot.settings.activeTab = activeTab;
      commitRoot(nextRoot, nextGuides);
    },
    [commitRoot]
  );

  const mutateRoot = useCallback(
    (mutation: (state: AppState) => void) => {
      const nextRoot = cloneState(rootRef.current);
      mutation(nextRoot);
      const nextGuides = parseGuideState(nextRoot.settings.guides);
      nextRoot.settings.guides = nextGuides;
      commitRoot(nextRoot, nextGuides);
    },
    [commitRoot]
  );

  const createRecoveryBackup = useCallback(async () => {
    const coordinator = coordinatorRef.current;
    if (!coordinator) throw new Error("Storage is still loading.");
    setBackupStatus("saving");
    try {
      await coordinator.saveLatestBackup(rootRef.current);
      const completedAt = new Date().toISOString();
      setLastBackupAt(completedAt);
      setBackupStatus("saved");
      setNotice("Latest recovery snapshot verified in both local storage layers.");
    } catch (error) {
      setBackupStatus("error");
      setNotice("The recovery snapshot could not be verified.");
      throw error;
    }
  }, []);

  const prepareRestore = useCallback(async (text: string) => {
    const coordinator = coordinatorRef.current;
    if (!coordinator) throw new Error("Storage is still loading.");
    const restore = new VerifiedRestoreCoordinator(
      coordinator.local,
      coordinator.indexed
    );
    return restore.prepare(text);
  }, []);

  const executeRestore = useCallback(
    async (prepared: PreparedBackup, mode: RestoreMode) => {
      const coordinator = coordinatorRef.current;
      if (!coordinator) throw new Error("Storage is still loading.");
      const restore = new VerifiedRestoreCoordinator(
        coordinator.local,
        coordinator.indexed,
        (state) => {
          rootRef.current = state;
          setRootState(state);
          setGuideState(parseGuideState(state.settings.guides));
        }
      );
      const result = await restore.execute(prepared, mode, rootRef.current);
      if (result.status === "pending-reload-verification") {
        window.location.reload();
      }
      return result;
    },
    []
  );

  const applyTransition = useCallback(
    (transition: GuideTransition) => {
      if (!transition.ok) {
        setNotice(transition.reason);
        return false;
      }
      setNotice(transition.completion ? "Guide complete and saved." : "");
      persist(transition.state, transition.state.active?.activeTab);
      if (transition.state.active) navigateToTab(transition.state.active.activeTab);
      return true;
    },
    [persist]
  );

  const launch = useCallback(
    (family: GuideFamily, manualOverride = true) => {
      const currentContext = { ...context, now: new Date() };
      const period = guidePeriodAt(currentContext.now, currentContext.timeZone);
      const steps =
        family === "smart-check-in"
          ? buildSmartCheckInSteps(period, currentContext)
          : buildGuideSteps(family, currentContext);
      applyTransition(
        startGuide(guideState, family, steps, currentContext, manualOverride)
      );
    },
    [applyTransition, context, guideState]
  );

  const activeSteps = useMemo(
    () => (guideState.active ? resolveSessionSteps(guideState.active) : []),
    [guideState.active]
  );
  const currentStep = guideState.active
    ? activeSteps.find(
        (step) => step.id === guideState.active?.stepIds[guideState.active.stepIndex]
      )
    : undefined;

  const next = useCallback(() => {
    applyTransition(
      completeCurrentStep(
        guideState,
        stepMap(activeSteps),
        new Date(),
        `explicit:${new Date().toISOString()}`
      )
    );
  }, [activeSteps, applyTransition, guideState]);

  const skip = useCallback(() => {
    applyTransition(skipCurrentStep(guideState, stepMap(activeSteps), new Date()));
  }, [activeSteps, applyTransition, guideState]);

  const stop = useCallback(() => {
    applyTransition(stopGuide(guideState));
  }, [applyTransition, guideState]);

  const toggleQuickMode = useCallback(() => {
    applyTransition(
      guideState.quickMode.active
        ? stopQuickMode(guideState)
        : startQuickMode(guideState, new Date())
    );
  }, [applyTransition, guideState]);

  const rememberActiveTab = useCallback(
    (tab: string) => {
      if (!isTabId(tab) || rootRef.current.settings.activeTab === tab) return;
      persist(guideState, tab);
    },
    [guideState, persist]
  );

  const freshContext = { ...context, now: clock };
  const suggestion = suggestedGuide(guideState, freshContext);
  const missedMorning = missedMorningEligibility(guideState, freshContext);
  const smart = smartCheckInEligibility(guideState, freshContext);
  const weekly = weeklyGuideEligibility(guideState, freshContext);

  return {
    rootState,
    guideState,
    saveStatus,
    backupStatus,
    lastBackupAt,
    notice,
    setNotice,
    context,
    suggestion,
    missedMorning,
    smart,
    weekly,
    activeSteps,
    currentStep,
    effectiveDate: effectiveDateKey(context),
    launch,
    next,
    skip,
    stop,
    toggleQuickMode,
    rememberActiveTab,
    mutateRoot,
    createRecoveryBackup,
    prepareRestore,
    executeRestore
  };
}
