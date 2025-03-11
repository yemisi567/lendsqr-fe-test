import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter} from "react-router-dom";
import Popover from "./Popover";
import { IUserDetails } from "../../types/types";

let mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Popover Component", () => {
  beforeEach(() => {
    mockNavigate = vi.fn();
  });

  const userDetails: IUserDetails = {
    id: "123",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    company: "Acme Corp",
    status: "Active",
    date_joined: "2023-01-01",
    username: "",
    BVN: "",
    account_number: 0,
    bank_name: "",
    monthly_income: "",
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

  // Renders all popover items correctly
  it("renders all popover items", () => {
    render(
      <MemoryRouter>
        <Popover id="123" userDetails={userDetails} />
      </MemoryRouter>
    );

    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByText("Blacklist User")).toBeInTheDocument();
    expect(screen.getByText("Activate User")).toBeInTheDocument();
  });

  // Calls handleViewDetails and navigates correctly
  it("calls handleViewDetails and navigates to user details page", () => {
    render(
      <MemoryRouter>
        <Popover id="123" userDetails={userDetails} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("View Details"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users/123");
  });

  // Stores user details in localStorage when "View Details" is clicked
  it("stores user details in localStorage", () => {
    const localStorageSetItem = vi.spyOn(Storage.prototype, "setItem");

    render(
      <MemoryRouter>
        <Popover id="123" userDetails={userDetails} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("View Details"));

    expect(localStorageSetItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(userDetails)
    );

    localStorageSetItem.mockRestore();
  });

  // Ensures component renders without crashing even if userDetails is missing
  it("renders without crashing when userDetails is empty", () => {
    render(
      <MemoryRouter>
        <Popover id="123" userDetails={{} as IUserDetails} />
      </MemoryRouter>
    );

    expect(screen.getByText("View Details")).toBeInTheDocument();
  });
});
