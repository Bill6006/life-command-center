import { isTabId, type TabId } from "./tabRegistry";

const FALLBACK_TAB: TabId = "today";

export function tabFromHash(hash = window.location.hash): TabId {
  const value = hash.replace(/^#\/?/, "").split(/[/?]/)[0].toLowerCase();
  return isTabId(value) ? value : FALLBACK_TAB;
}

export function navigateToTab(tab: TabId) {
  const nextHash = `#/${tab}`;
  if (window.location.hash === nextHash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  window.location.hash = nextHash;
}

export function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
