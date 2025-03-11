import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { IUserDetails, UserStatus } from "../../../types/types";
import UserProfile from "./UserProfile";

// Mock localStorage
const mockUser: IUserDetails = {
  id: "12324",
  name: "Sammie",
  email: "hello@domain.com",
  phone: "67890",
  username: "helloUser",
  company: "Company B",
  status: "inactive" as UserStatus,
  date_joined: "2024-02-15",
  BVN: "",
  account_number: 987654321,
  bank_name: "Bank XYZ",
  monthly_income: "$5600",
  repayment: "",
  facebook: "",
  twitter: "",
  instagram: "",
  education: "",
  children: "",
  employment: "",
  guarantors: [],
  marital_status: "",
  office_email: "",
  residence: "",
  duration: 0,
  sector: "",
  gender: "",
};

// Mock localStorage.getItem()
vi.stubGlobal("localStorage", {
  getItem: vi.fn((key) => {
    if (key === "user") {
      return JSON.stringify(mockUser);
    }
    return null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

describe("UserProfile Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Renders loading state when no user is found
  it("renders loading state when no user is found in localStorage", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValueOnce(null);

    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading user details...")).toBeInTheDocument();
  });

  // Loads user from localStorage and displays details
  it("loads user data from localStorage and displays their information", async () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Sammie" })
      ).toBeInTheDocument();
      expect(screen.getByText("67890")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /\$5600/i })
      ).toBeInTheDocument();
      expect(screen.getByText("987654321/Bank XYZ")).toBeInTheDocument();
    });
  });

  it("switches tabs when clicked", async () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );

    const loansTab = screen.getAllByText("Loans")[0];
    fireEvent.click(loansTab);

    await waitFor(() => {
      expect(screen.getByText("Loan")).toBeInTheDocument();
    });
  });

  // "Blacklist User" and "Activate User" buttons are displayed
  it("renders Blacklist and Activate User buttons", () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Blacklist User")).toBeInTheDocument();
    expect(screen.getByText("Activate User")).toBeInTheDocument();
  });

  // Clicking "Back to Users" navigates back
  it("renders back link to users list", () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });
});
