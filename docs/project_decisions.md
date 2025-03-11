# Project Approach & Decisions

This page documents key decisions taken during the development of the **Lendsqr Dashboard**, the reasoning behind them.

## 1. Why React with TypeScript?

- **Type Safety**: Prevents runtime errors with strong typing.
- **Scalability**: TypeScript is better suited for large applications with multiple developers.
- **Better Developer Experience**: Provides **auto-completion & IntelliSense**.
- **Code Maintainability: Helps detect bugs early and enforce coding standards.**

**Impact on the Final Outcome**
By choosing React with TypeScript, I ensured that the user management system was robust, well-typed, and easier to debug and scale.

---

## 2. State Management: Why Context API over Redux?

- **Simplicity**: Redux introduces extra boilerplate; Context API is **built-in**.
- **Performance**: Using **React Context + useReducer** improves state management while keeping the code **lightweight**.
- **Easier Maintenance**: Fewer dependencies mean easier upgrades.

**Impact on the Final Outcome**
The combination of React Context and useReducer provided an efficient, lightweight state management system that scaled well without introducing unnecessary complexity.

---

## 3. Error Handling Strategy

To ensure application stability, I implemented a **Global Error Boundary** that catches unexpected errors and prevents app crashes.

### **Code Implementation**

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

**Impact on the Final Outcome**
The ErrorBoundary component improved application resilience by gracefully handling crashes. Users are shown a fallback page instead of the entire application breaking.

## 4. Pagination & Filtering Strategy: Why Client-side Pagination?

Instead of server-side pagination, I opted for client-side pagination and implemented a custom `usePagination` hook for optimized state updates.

**Reasons for This Decision**

- Faster user experience for small datasets.

- No additional API requests are needed.

- Better for static or rarely updated data.

```tsx
const { handleOnNext, handleOnPrevious, page, start, end } = usePagination(
  users.length
);
```

**Filtering Approach**

A custom `useFilter` hook was implemented to handle filtering logic dynamically.

**Why This Approach?**

- Allows real-time filtering without needing API requests.

- Uses memoization `useMemo` for performance optimizations.

**Impact on the Final Outcome**

This decision resulted in a faster, more interactive user experience, especially since my dataset is not constantly changing. However, for larger datasets, a server-side pagination strategy might be required

---

## 5. Testing Approach: Why Vitest?

- Faster than Jest – Runs tests more efficiently.

- Compatible with React Testing Library.

- Supports TypeScript out-of-the-box.

- Mocks and spies are simpler to use.

**Impact on the Final Outcome**

- All core features `authentication, user management, filtering, pagination` work as expected.

- Edge cases were covered (e.g., missing user data, invalid filters, etc.).

- Code changes are validated before deployment.

**Example Test Implementation**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UsersList from "../UsersList";

describe("UsersList Component", () => {
  it("renders user table", () => {
    render(<UsersList />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
});
```

---

## 6. Deployment Strategy: Why Netlify?

**I deployed the project using Netlify because of:**

- Ease of deployment – Direct GitHub integration for automatic updates.

- Free tier availability – Supports frontend hosting with minimal configuration.

- Built-in CI/CD – Every push triggers an automatic build & deployment.

**Impact on the Final Outcome**

Using Netlify ensured rapid deployments, version control, and a streamlined workflow.

Deployment Process

```tsx
git push origin main
```
