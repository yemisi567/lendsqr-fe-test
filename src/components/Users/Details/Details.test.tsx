import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockUsers } from "../../../constants/constants";
import Details from "./Details";
import { SetStateAction } from "react";

// Mock formatDate function
vi.mock("../../../helpers/helper.ts", () => ({
  formatDate: vi.fn((date) => `Formatted: ${date}`),
}));

// Mock Popover component
vi.mock("../../../ui/Popover/Popover", () => ({
  __esModule: true,
  default: () => <div data-testid="popover">Mocked Popover</div>,
}));

describe("Details Component", () => {
  let mockSetActivePopover: (value: SetStateAction<string | null>) => void;

  beforeEach(() => {
    mockSetActivePopover = vi.fn();
  });

  //  Renders user details correctly
  it("renders user details correctly", () => {
    render(
      <Details
        user={mockUsers[0]}
        activePopover={null}
        setActivePopover={mockSetActivePopover}
      />
    );

    expect(screen.getByText(mockUsers[0].company)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].phone)).toBeInTheDocument();
    expect(screen.getByText("Formatted: 2024-03-10")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  // Opens popover when clicking on EllipsisIcon
  it("opens popover when clicking on the ellipsis icon", () => {
    render(
      <Details
        user={mockUsers[0]}
        activePopover={null}
        setActivePopover={mockSetActivePopover}
      />
    );

    // Click the ellipsis icon
    fireEvent.click(screen.getByTestId("ellipsis-icon"));

    expect(mockSetActivePopover).toHaveBeenCalledWith(mockUsers[0].id);
  });

  // Closes popover when clicking again
  it("closes popover when clicking again", () => {
    render(
      <Details
        user={mockUsers[0]}
        activePopover={mockUsers[0].id}
        setActivePopover={mockSetActivePopover}
      />
    );

    fireEvent.click(screen.getByTestId("ellipsis-icon"));

    expect(mockSetActivePopover).toHaveBeenCalledWith(null);
  });

  it("applies correct class based on status", () => {
    render(
      <Details
        user={mockUsers[0]}
        activePopover={null}
        setActivePopover={mockSetActivePopover}
      />
    );

    const statusBadge = screen.getByText("Active");

    expect(statusBadge.className).toContain("active");
  });
});
