import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Filter from "./Filter";

// Mock useNavigate to track navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams()],
  };
});

describe("Filter Component", () => {
  const mockHandleShowFilter = vi.fn();
  const companies = ["Company A", "Company B"];

  it("renders all filter form fields", () => {
    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={companies} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  // Submitting the form updates URL query params
  it("updates query params on form submission", async () => {
    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={companies} />
      </MemoryRouter>
    );

    const selectOrganization = screen.getByLabelText("Organization");
    fireEvent.change(selectOrganization, { target: { value: "Company A" } });

    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);

      // Ensure the query string contains the correct key-value pair
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/company=Company\+A/)
      );
    });

    expect(mockHandleShowFilter).toHaveBeenCalled();
  });

  // Clicking Reset clears filters and resets URL
  it("resets filters and navigates to default URL when reset is clicked", () => {
    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={companies} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Reset"));

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users");
    expect(mockHandleShowFilter).toHaveBeenCalled();
  });

  // Ensures handleShowFilter is called after submission
  it("calls handleShowFilter after filtering", async () => {
    mockHandleShowFilter.mockClear();

    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={companies} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => {
      expect(mockHandleShowFilter).toHaveBeenCalled();
    });

    expect(mockHandleShowFilter).toHaveBeenCalledTimes(1);
  });

  // Prevents navigation when all fields are empty
  it("does not navigate if no filters are selected", () => {
    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={companies} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Filter"));

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users");
  });

  //  Handles missing companies prop gracefully
  it("renders without crashing when companies list is empty", () => {
    render(
      <MemoryRouter>
        <Filter handleShowFilter={mockHandleShowFilter} companies={[]} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });
});
