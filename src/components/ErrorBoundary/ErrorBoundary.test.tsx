import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { vi } from "vitest";

// Mock button component if necessary
vi.mock("../../ui/Button/Button", () => ({
  default: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

// Helper component to trigger an error
const ProblematicComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children without errors", () => {
    render(
      <ErrorBoundary>
        <p>Safe Content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText("Safe Content")).toBeInTheDocument();
  });

  it("catches error and displays fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong 😢")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an error. Please try refreshing the page."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reload Page" })
    ).toBeInTheDocument();
  });

  it("reloads the page when the reload button is clicked", () => {
    const locationReloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: locationReloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole("button", { name: "Reload Page" });
    fireEvent.click(reloadButton);

    expect(locationReloadMock).toHaveBeenCalled();
  });
});
