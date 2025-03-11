import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

describe("Input Component", () => {
  // Renders input field correctly
  it("renders input field with provided props", () => {
    render(<Input type="text" name="username" placeholder="Enter username" />);

    const inputField = screen.getByPlaceholderText("Enter username");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute("type", "text");
    expect(inputField).toHaveAttribute("name", "username");
  });

  // Calls onShowPassword when "SHOW/HIDE" is clicked
  it("toggles password visibility when SHOW/HIDE is clicked", () => {
    const mockOnShowPassword = vi.fn();

    render(
      <Input
        type="password"
        name="password"
        onShowPassword={mockOnShowPassword}
      />
    );

    const toggleButton = screen.getByText("SHOW");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(mockOnShowPassword).toHaveBeenCalledTimes(1);
  });

  // Displays error message when provided
  it("displays an error message when error prop is given", () => {
    render(<Input type="text" name="email" error="Email is required" />);

    const errorMessage = screen.getByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
  });

  // Does not render SHOW/HIDE button for non-password fields
  it("does not show visibility toggle for non-password input", () => {
    render(<Input type="text" name="email" />);

    expect(screen.queryByText("SHOW")).not.toBeInTheDocument();
    expect(screen.queryByText("HIDE")).not.toBeInTheDocument();
  });

  // Handles missing name and type gracefully
  it("renders input field even if name and type are not provided", () => {
    render(<Input placeholder="Default Input" />);

    const inputField = screen.getByPlaceholderText("Default Input");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute("type", "text");
  });

  // Ensures onShowPassword is not called when undefined
  it("does not throw error if onShowPassword is not provided", () => {
    render(<Input type="password" name="password" />);

    const toggleButton = screen.getByText("SHOW");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
  });
});
