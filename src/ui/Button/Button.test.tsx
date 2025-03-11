import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  // Renders button with provided text
  it("renders button with children text", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  // Applies correct class based on variant
  it("applies correct class for `primary` variant", () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByText("Primary");

    expect(button.className).toMatch(/primary/);
  });

  it("applies correct class for `normal` variant", () => {
    render(<Button variant="normal">Normal</Button>);

    const button = screen.getByText("Normal");

    expect(button.className).toMatch(/button/);
  });

  // Calls onClick when clicked
  it("calls onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);

    fireEvent.click(screen.getByText("Click Me"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // Uses default variant="primary" when none is provided
  it("uses primary variant by default", () => {
    render(<Button>Default</Button>);

    const button = screen.getByText("Default");

    expect(button.className).toMatch(/primary/);
  });

  //  Handles missing onClick gracefully
  it("does not throw error if onClick is not provided", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByText("Click Me");

    expect(() => fireEvent.click(button)).not.toThrow();
  });

  //  Accepts additional props like disabled
  it("renders as disabled when `disabled` prop is passed", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });
});
