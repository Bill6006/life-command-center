import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application boundary caught an error.", {
      name: error.name,
      componentStack: info.componentStack
    });
  }

  private retry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="fatal-shell">
        <section className="fatal-card" role="alert">
          <span className="eyebrow">Recovery available</span>
          <h1>The command center hit a display error.</h1>
          <p>
            Your browser data has not been reset. Try this screen again, or reopen the app if
            the problem continues.
          </p>
          <details>
            <summary>Technical detail</summary>
            <code>{this.state.error.message || this.state.error.name}</code>
          </details>
          <button className="button button-primary" type="button" onClick={this.retry}>
            Try again
          </button>
        </section>
      </main>
    );
  }
}
