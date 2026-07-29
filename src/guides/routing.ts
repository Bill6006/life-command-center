import type { GuideRouteCommand, GuideSession, GuideStepDefinition } from "./types";

export interface GuideRouteAdapter {
  navigate(tab: GuideRouteCommand["tab"]): void;
  findTarget(targetId: string): HTMLElement | null;
}

export type RouteResult =
  | { ok: true; command: GuideRouteCommand; target: HTMLElement }
  | { ok: false; command?: GuideRouteCommand; reason: string };

export function routeGuideStep(
  session: GuideSession,
  steps: ReadonlyMap<string, GuideStepDefinition>,
  adapter: GuideRouteAdapter
): RouteResult {
  const step = steps.get(session.stepIds[session.stepIndex]);
  if (!step) return { ok: false, reason: "This guide step is no longer available." };
  const command: GuideRouteCommand = {
    tab: step.tab,
    targetId: step.targetId,
    sideEffect: step.sideEffect
  };
  adapter.navigate(command.tab);
  const target = adapter.findTarget(command.targetId);
  if (!target) {
    return {
      ok: false,
      command,
      reason: `The ${step.title} target is unavailable. Your guide progress is still saved.`
    };
  }
  target.dataset.guideTarget = "active";
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "center", behavior: "smooth" });
  return { ok: true, command, target };
}
