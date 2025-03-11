import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

// Mock toggleSidebar function
const mockToggleSidebar = vi.fn();

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Renders header correctly
  it("renders header with profile and search input", () => {
    render(
      <MemoryRouter>
        <Header isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />
      </MemoryRouter>
    );
    const docsElements = screen.getAllByText("Docs");
    expect(docsElements.length).toBeGreaterThan(0);
    expect(docsElements[0]).toBeInTheDocument();

    const searchInputs = screen.getAllByPlaceholderText("Search for anything");
    expect(searchInputs.length).toBeGreaterThan(0);
    expect(searchInputs[0]).toBeInTheDocument();

    const avatars = screen.getAllByAltText("User Avatar");
    expect(avatars.length).toBeGreaterThan(0);
    expect(avatars[0]).toBeInTheDocument();

    const userNames = screen.getAllByText("Adedeji");
    expect(userNames.length).toBeGreaterThan(0);
    expect(userNames[0]).toBeInTheDocument();
  });

  // Calls toggleSidebar when menu button is clicked
  it("calls toggleSidebar when clicking the menu button", () => {
    render(
      <MemoryRouter>
        <Header isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />
      </MemoryRouter>
    );

    // Select the menu button by test ID
    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  // Updates search input value on change
  it("updates search input field when typing", () => {
    render(
      <MemoryRouter>
        <Header isSidebarOpen={false} toggleSidebar={mockToggleSidebar} />
      </MemoryRouter>
    );

    const searchInputs = screen.getAllByPlaceholderText("Search for anything");

    const searchInput = searchInputs[0];

    fireEvent.change(searchInput, { target: { value: "React" } });

    expect(searchInput).toHaveValue("React");
  });

  // Does not show sidebar menu when isSidebarOpen is true
  it("does not show the sidebar menu button when isSidebarOpen is true", () => {
    render(
      <MemoryRouter>
        <Header isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
      </MemoryRouter>
    );

    // Ensure the menu button is not in the document
    expect(screen.queryByTestId("menu-button")).not.toBeInTheDocument();
  });
});
