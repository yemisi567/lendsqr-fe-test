import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Login from "./Login";

// Mock useAuth
const mockLogin = vi.fn();

vi.mock("../../context/Auth/useAuth.ts", () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

describe("Login Component", () => {
  vi.mock("../../context/Auth/useAuth.ts", () => ({
    useAuth: () => ({ login: mockLogin }),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Renders login form fields
  it("renders email, password input fields, and login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
    expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
  });

  // Calls login() when valid email & password are entered
  it("calls login function with valid email and password", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("LOG IN"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });

  // Displays error message for an invalid password
  it("shows error when password is too short", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("LOG IN"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  // Does not call login() if form validation fails
  it("does not call login when validation fails", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password11" },
    });

    fireEvent.click(screen.getByText("LOG IN"));

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  // Handles missing useAuth() context correctly
  it("renders without crashing if `useAuth` is not available", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });
});
