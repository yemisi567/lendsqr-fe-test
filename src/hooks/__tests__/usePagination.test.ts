/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import usePagination from "../usePagination";

let mockNavigate: ReturnType<typeof vi.fn>;

// Mock useNavigate and useSearchParams
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, any>; 
  
    return {
      ...actual, 
      useNavigate: () => vi.fn(),
      useSearchParams: () => [new URLSearchParams()],
    };
  });
  

describe("usePagination Hook", () => {
    const dataSize = 100;
    const defaultPageSize = 10;
   
    beforeEach(() => {
      mockNavigate = vi.fn();
      vi.mock("react-router-dom", async (importOriginal) => {
        const actual = (await importOriginal()) as Record<string, any>; 
        return {
          ...actual,
          useNavigate: () => mockNavigate, 
          useSearchParams: () => [new URLSearchParams()],
        };
      });
    });

  // Initializes pagination state correctly
  it("initializes pagination with default values", () => {
    const { result } = renderHook(() => usePagination(dataSize, defaultPageSize), {
      wrapper: MemoryRouter, 
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.start).toBe(0);
    expect(result.current.end).toBe(10);
  });

  // Calls navigate() on next page
  it("navigates to next page when handleOnNext is called", () => {
    const { result } = renderHook(() => usePagination(dataSize, defaultPageSize), {
      wrapper: MemoryRouter,
    });
  
    act(() => {
      result.current.handleOnNext();
    });
  
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/\?page=2&start=10&end=20(&pageSize=10)?/));
  });
  

  it("does not navigate when already on page 1", () => {
    const { result } = renderHook(() => usePagination(dataSize, defaultPageSize), {
      wrapper: MemoryRouter,
    });
  
    act(() => {
      result.current.handleOnPrevious();
    });

  
    expect(mockNavigate).not.toHaveBeenCalled(); 
  })

  // Handles page change to a specific page
  it("navigates to a specific page when handlePageChange is called", () => {
    const { result } = renderHook(() => usePagination(dataSize, defaultPageSize), {
      wrapper: MemoryRouter,
    });
  
    act(() => {
      result.current.handlePageChange(3);
    });
  
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/\?page=3&start=20&end=30(&pageSize=10)?/));
  });
  

  // Updates page size correctly
  it("changes page size and resets to page 1", () => {
    const { result } = renderHook(() => usePagination(dataSize, defaultPageSize), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.handleChangePageSize(20);
    });

    expect(mockNavigate).toHaveBeenCalledWith("?pageSize=20&page=1&start=0&end=20");
  });
});
