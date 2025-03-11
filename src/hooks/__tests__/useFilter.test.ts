/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import useFilter from "../useFilter";
import { mockUsers } from "../../constants/constants";


// Mock useSearchParams
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({
        email: "test@example.com",
        status: "active",
      }),
    ],
  };
});


describe("useFilter Hook", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // handleShowFilter() toggles state
  it("toggles filter visibility with handleShowFilter", () => {
    const { result } = renderHook(() => useFilter(mockUsers), {
      wrapper: MemoryRouter,
    });

    expect(result.current.showFilter).toBe(false); 

    act(() => {
      result.current.handleShowFilter();
    });

    expect(result.current.showFilter).toBe(true); 

    act(() => {
      result.current.handleShowFilter();
    });

    expect(result.current.showFilter).toBe(false); 
  });

  // Extracts unique company names
  it("extracts unique company names from user list", () => {
    const { result } = renderHook(() => useFilter(mockUsers), {
      wrapper: MemoryRouter,
    });

    expect(result.current.companies).toEqual(["Company A", "Company B"]);
  });

  // Returns all users when no filters are applied
  it("returns all users if no filters are set", () => {
    vi.mock("react-router-dom", async (importOriginal) => {
        const actual = (await importOriginal()) as Record<string, any>;
      return {
        ...actual,
        useSearchParams: () => [new URLSearchParams()],
      };
    });

    const { result } = renderHook(() => useFilter(mockUsers), {
      wrapper: MemoryRouter,
    });

    expect(result.current.filteredUsers.length).toBe(2); 
  });

  // Handles empty users array gracefully
  it("returns an empty list if no users are provided", () => {
    const { result } = renderHook(() => useFilter([]), {
      wrapper: MemoryRouter,
    });

    expect(result.current.filteredUsers.length).toBe(0);
  });
});
