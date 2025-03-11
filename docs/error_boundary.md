## Error Boundary Handling

**Why Error Boundaries?**

Error boundaries ensure a graceful fallback UI when unexpected errors occur in my application.

**Implementation**

I created an ErrorBoundary component using React componentDidCatch() to catch errors and display a fallback UI instead of breaking the entire app.

```tsx
import React, { Component, ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";
import Button from "../../ui/Button/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h1>Something went wrong 😢</h1>
          <p>We encountered an error. Please try refreshing the page.</p>
          <Button onClick={this.handleRefresh}>Reload Page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```