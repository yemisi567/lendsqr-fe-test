import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useUsers } from "../../../context/Users/useUsers";
import useFilter from "../../../hooks/useFilter";
import UsersList from "./UsersList";
import { mockUsers } from "../../../constants/constants";

// Mock useUsers()
vi.mock("../../../context/Users/useUsers", () => ({
  useUsers: vi.fn(),
}));

// Mock useFilter() with a default export
vi.mock("../../../hooks/useFilter", () => ({
  default: vi.fn(() => ({ filteredUsers: [] })),
}));

describe("UsersList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Displays SkeletonLoader when loading
  it("renders SkeletonLoader when loading", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: [],
      loading: true,
      error: null,
      fetchUsers: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
  });

  // Displays error message when useUsers() returns an error
  it("renders error message when there is an error", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: [],
      loading: false,
      error: "Failed to load users",
      fetchUsers: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to load users")).toBeInTheDocument();
  });

  // Renders users and filtered users in the table
  it("renders UsersTable with filtered users", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      fetchUsers: function (): void {
        throw new Error("Function not implemented.");
      },
    });
    vi.mocked(useFilter).mockReturnValue({
      filteredUsers: [mockUsers[0]],
      showFilter: false,
      handleShowFilter: () => undefined,
      companies: [],
    });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });
});
