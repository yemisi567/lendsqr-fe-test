import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UsersTable from "./Table";
import { mockUsers } from "../../../constants/constants";

// Mock pagination handlers
const mockHandleOnNext = vi.fn();
const mockHandleOnPrevious = vi.fn();

// Mock dependencies
vi.mock("../../../../hooks/useFilter", () => ({
  default: vi.fn(() => ({
    handleShowFilter: vi.fn(),
    showFilter: false,
    companies: ["Company A", "Company B"],
  })),
}));

vi.mock("../../../../hooks/usePagination", () => ({
  default: vi.fn(() => ({
    handleOnPrevious: mockHandleOnPrevious,
    handleOnNext: mockHandleOnNext,
    handleChangePageSize: vi.fn(),
    start: 0,
    end: 5, // Simulate a scenario where pagination exists
    page: 1,
    pageSize: 5, // Page size ensures there's a "Next" page
    dataSize: 20,
  })),
}));

describe("UsersTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Renders empty state when no users match the filter
  it("renders 'No users for given filter' when filteredUsers is empty", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} filteredUsers={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("No users for given filter")).toBeInTheDocument();
  });

  // Renders table with users
  it("renders users table with user details", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} filteredUsers={mockUsers} />
      </MemoryRouter>
    );

    // Check that table headers are displayed
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
  });

  // Opens the filter when clicking the filter button
  it("opens the filter when filter button is clicked", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} filteredUsers={mockUsers} />
      </MemoryRouter>
    );

    const filterButton = screen.getAllByRole("button")[0];
    fireEvent.click(filterButton);

    expect(screen.getByTestId("filter-section")).toBeInTheDocument();
  });

  // Calls pagination functions when navigating pages
  it("calls pagination handlers when navigating pages", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} filteredUsers={mockUsers} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", {
      name: /next page/i,
    }) as HTMLButtonElement;

    if (!nextButton.disabled) {
      fireEvent.click(nextButton);
      expect(mockHandleOnNext).toHaveBeenCalled();
    }

    const prevButton = screen.getByRole("button", {
      name: /previous page/i,
    }) as HTMLButtonElement;

    if (!prevButton.disabled) {
      fireEvent.click(prevButton);
      expect(mockHandleOnPrevious).toHaveBeenCalled();
    }
  });
});
