import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { App } from "./app/App";
import { AppErrorBoundary } from "./app/AppErrorBoundary";
import "./styles.css";

registerSW({ immediate: true });

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root is unavailable.");
}

createRoot(root).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
