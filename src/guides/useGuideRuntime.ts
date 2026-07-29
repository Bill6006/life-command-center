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
    void coordinator
      .load()
      .then(({ state }) => {
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
        if (
          isTabId(state.settings.activeTab) &&
          window.location.hash === initialHashRef.current
        ) {
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

  const persist = useCallback((nextGuides: GuideState, activeTab?: string) => {
    const nextRoot = cloneState(rootRef.current);
    const timestamp = new Date();
    nextRoot.settings.guides = nextGuides;
    if (activeTab && isTabId(activeTab)) nextRoot.settings.activeTab = activeTab;
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
    rememberActiveTab
  };
}
