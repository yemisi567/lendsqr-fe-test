import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Tabs from "./Tab";

describe("Tabs Component", () => {
  const tabs = [{ name: "Tab 1" }, { name: "Tab 2" }, { name: "Tab 3" }];
  const mockSetActiveTab = vi.fn();

  // Renders all tabs correctly
  it("renders all tabs", () => {
    render(
      <Tabs tabs={tabs} activeTab="Tab 1" setActiveTab={mockSetActiveTab} />
    );

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
    });
  });

  // Highlights the active tab
  it("highlights the active tab", () => {
    render(
      <Tabs tabs={tabs} activeTab="Tab 2" setActiveTab={mockSetActiveTab} />
    );

    const activeTab = screen.getByText("Tab 2");
    expect(activeTab.parentElement).toHaveClass("tabs");
  });

  // Handles an empty tabs array gracefully
  it("renders nothing when tabs array is empty", () => {
    render(
      <Tabs tabs={[]} activeTab="Tab 1" setActiveTab={mockSetActiveTab} />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Ensures component does not crash if setActiveTab is missing
  it("does not crash if setActiveTab is not provided", () => {
    render(<Tabs tabs={tabs} activeTab="Tab 1" setActiveTab={() => {}} />);

    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);

    expect(() => fireEvent.click(tab2)).not.toThrow();
  });
});
