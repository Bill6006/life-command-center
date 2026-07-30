import { useEffect, useSyncExternalStore } from "react";
import { APP_TIME_ZONE, APP_TIME_ZONE_LABEL, createBlankShellState } from "../domain/defaults";
import { TodayScreen } from "../features/today/TodayScreen";
import { GuideControls, GuideOverlay, GuideTarget } from "../guides/GuideExperience";
import { useGuideRuntime } from "../guides/useGuideRuntime";
import { navigateToTab, subscribeToHash, tabFromHash } from "../navigation/hashRoute";
import { getTabDefinition, TAB_REGISTRY, type TabId } from "../navigation/tabRegistry";

const blankState = createBlankShellState();

function currentDateLabel() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: APP_TIME_ZONE
  }).format(new Date());
}

function useActiveTab() {
  return useSyncExternalStore(subscribeToHash, tabFromHash, () => "today" as TabId);
}

function TabNavigation({ activeTab }: { activeTab: TabId }) {
  return (
    <nav className="tab-rail" aria-label="Command center areas">
      {TAB_REGISTRY.map((tab) => (
        <button
          type="button"
          className="tab-button"
          data-active={activeTab === tab.id}
          aria-current={activeTab === tab.id ? "page" : undefined}
          onClick={() => navigateToTab(tab.id)}
          key={tab.id}
        >
          <span className="tab-monogram" aria-hidden="true">
            {tab.monogram}
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function FirstRunNotice() {
  return (
    <aside className="first-run-card" aria-labelledby="first-run-title">
      <div className="first-run-icon" aria-hidden="true">
        0
      </div>
      <div>
        <span className="eyebrow">Fresh private workspace</span>
        <h2 id="first-run-title">This rebuild starts empty on purpose.</h2>
        <p>
          No legacy profile or history is bundled. The verified restore foundation is ready on the
          Data path without shipping a real backup.
        </p>
      </div>
      <button className="button button-secondary" type="button" onClick={() => navigateToTab("data")}>
        Open Data
      </button>
    </aside>
  );
}

function ScreenFoundation({
  activeTab,
  currentGuideStep
}: {
  activeTab: TabId;
  currentGuideStep: ReturnType<typeof useGuideRuntime>["currentStep"];
}) {
  const screen = getTabDefinition(activeTab);

  return (
    <section className="screen-grid" aria-labelledby="screen-title">
      <article className="command-card">
        <div className="command-orbit" aria-hidden="true">
          <span>{screen.monogram}</span>
        </div>
        <div className="command-copy">
          <span className="eyebrow">{screen.eyebrow}</span>
          <h1 id="screen-title">{screen.title}</h1>
          <p>{screen.description}</p>
          <div className="command-actions">
            <button className="button button-primary" type="button" disabled>
              Check-in arrives in {screen.phase}
            </button>
            <span className="quiet-status">
              <span className="status-dot" />
              Blank state confirmed
            </span>
          </div>
        </div>
      </article>

      <aside className="foundation-card">
        <span className="eyebrow">Foundation status</span>
        <h2>Ready for behavior, not carrying history.</h2>
        <dl className="status-list">
          <div>
            <dt>Privacy</dt>
            <dd>Local-first</dd>
          </div>
          <div>
            <dt>Starting records</dt>
            <dd>{Object.keys(blankState.days).length}</dd>
          </div>
          <div>
            <dt>Mapped areas</dt>
            <dd>{TAB_REGISTRY.length} of 12</dd>
          </div>
        </dl>
      </aside>
      <GuideTarget step={currentGuideStep} activeTab={activeTab} />
    </section>
  );
}

function FoundationDetails() {
  return (
    <section className="detail-grid" aria-label="Phase 2 foundation">
      <article className="detail-card detail-card-accent">
        <span className="detail-index">01</span>
        <div>
          <h2>Private by default</h2>
          <p>No analytics, remote logging, cloud sync, or personal seed in the application bundle.</p>
        </div>
      </article>
      <article className="detail-card">
        <span className="detail-index">02</span>
        <div>
          <h2>Built for recovery</h2>
          <p>A visible error boundary protects the path back without silently clearing browser state.</p>
        </div>
      </article>
      <article className="detail-card">
        <span className="detail-index">03</span>
        <div>
          <h2>Subpath and offline ready</h2>
          <p>The installable shell uses relative assets and hash routes for repository-safe hosting.</p>
        </div>
      </article>
    </section>
  );
}

export function App() {
  const activeTab = useActiveTab();
  const guides = useGuideRuntime();

  useEffect(() => {
    if (!window.location.hash) navigateToTab("today");
  }, []);

  useEffect(() => {
    if (guides.saveStatus !== "loading") guides.rememberActiveTab(activeTab);
  }, [activeTab, guides.rememberActiveTab, guides.saveStatus]);

  useEffect(() => {
    const step = guides.currentStep;
    if (!step) return;
    navigateToTab(step.tab);
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-guide-target="active"]').forEach((target) => {
        delete target.dataset.guideTarget;
      });
      const target = document.getElementById(step.targetId);
      if (!target) {
        guides.setNotice(`The ${step.title} target is unavailable. Guide progress remains saved.`);
        return;
      }
      target.dataset.guideTarget = "active";
      target.focus({ preventScroll: true });
      target.scrollIntoView?.({ block: "center", behavior: "smooth" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [guides.currentStep, guides.setNotice]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/today" aria-label="Life Command Center home">
          <img src={`${import.meta.env.BASE_URL}icon-192.png`} alt="" width="44" height="44" />
          <span>
            <strong>Life Command Center</strong>
            <small>Local-first rebuild · Phase 6</small>
          </span>
        </a>
        <div className="date-block">
          <span>{currentDateLabel()}</span>
          <small>
            {APP_TIME_ZONE_LABEL} · {guides.saveStatus === "saved" ? "saved locally" : guides.saveStatus}
          </small>
        </div>
      </header>

      <TabNavigation activeTab={activeTab} />

      <main className="main-content">
        <FirstRunNotice />
        <GuideControls runtime={guides} />
        {activeTab === "today" ? (
          <TodayScreen runtime={guides} />
        ) : (
          <ScreenFoundation activeTab={activeTab} currentGuideStep={guides.currentStep} />
        )}
        <FoundationDetails />
      </main>

      <nav className="bottom-navigation" aria-label="Mobile primary navigation">
        <button type="button" data-active={activeTab === "today"} onClick={() => navigateToTab("today")}>
          Today
        </button>
        <button type="button" data-active={activeTab === "week"} onClick={() => navigateToTab("week")}>
          Week
        </button>
        <button
          type="button"
          className="bottom-guide-button"
          onClick={() => document.getElementById("guide-controls")?.scrollIntoView({ behavior: "smooth" })}
        >
          Guide
        </button>
        <button type="button" data-active={activeTab === "pattern"} onClick={() => navigateToTab("pattern")}>
          Pattern
        </button>
        <button type="button" data-active={activeTab === "data"} onClick={() => navigateToTab("data")}>
          Data
        </button>
      </nav>

      <GuideOverlay runtime={guides} />

      <footer>
        <span>Life Command Center</span>
        <span>Local-first command layer · build 0.6</span>
      </footer>
    </div>
  );
}
