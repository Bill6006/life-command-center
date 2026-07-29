export interface AutomationHost {
  setInterval(callback: () => void, delay: number): ReturnType<typeof setInterval>;
  clearInterval(id: ReturnType<typeof setInterval>): void;
  addVisibilityListener(callback: () => void): void;
  removeVisibilityListener(callback: () => void): void;
}

export class GuideAutomationOwner {
  private interval: ReturnType<typeof setInterval> | null = null;
  private listening = false;

  constructor(
    private readonly host: AutomationHost,
    private readonly recompute: () => void,
    private readonly delay = 60_000
  ) {}

  start(): void {
    if (this.interval !== null) return;
    this.interval = this.host.setInterval(this.recompute, this.delay);
    if (!this.listening) {
      this.host.addVisibilityListener(this.onVisibility);
      this.listening = true;
    }
  }

  private readonly onVisibility = () => {
    this.recompute();
  };

  stop(): void {
    if (this.interval !== null) this.host.clearInterval(this.interval);
    this.interval = null;
    if (this.listening) this.host.removeVisibilityListener(this.onVisibility);
    this.listening = false;
  }
}
