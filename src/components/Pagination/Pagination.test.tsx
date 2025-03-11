import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Pagination from "./Pagination";
import { MemoryRouter } from "react-router-dom";

// Mock pagination handlers
const mockOnHandleNext = vi.fn();
const mockOnHandlePrevious = vi.fn();
const mockOnChangePageSize = vi.fn();

describe("Pagination Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderPagination = (props = {}) =>
    render(
      <MemoryRouter>
        <Pagination
          page={1}
          dataSize={100}
          pageSize={10}
          currentDetail={10}
          onHandleNext={mockOnHandleNext}
          onHandlePrevious={mockOnHandlePrevious}
          onChangePageSize={mockOnChangePageSize}
          {...props}
        />
      </MemoryRouter>
    );

  it("calls onHandleNext when clicking the 'Next' button", async () => {
    renderPagination();

    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockOnHandleNext).toHaveBeenCalled();
    });
  });

  it("calls onHandlePrevious when clicking the 'Previous' button", async () => {
    renderPagination({ page: 2 });

    const prevButton = screen.getByRole("button", { name: /previous page/i });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mockOnHandlePrevious).toHaveBeenCalled();
    });
  });

  it("renders correct page numbers", () => {
    renderPagination({ pageSize: 10 });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("disables 'Next' button when on the last page", () => {
    renderPagination({ page: 10, dataSize: 100 });

    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeDisabled();
  });

  it("disables 'Previous' button when on the first page", () => {
    renderPagination({ page: 1 });

    const prevButton = screen.getByRole("button", { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });
});
