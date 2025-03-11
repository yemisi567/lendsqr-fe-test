import { ActiveUserIcon } from "../Icons/ActiveUser";
import { UserIcon } from "../Icons/User";
import { UserWithLoanIcon } from "../Icons/UserWithLoan";
import { UserWithSavingsIcon } from "../Icons/UserWithSavings";
import { UserStatus } from "../types/types";

export const CardDetails = [
    {
      text: "Users",
      count: "2,453",
      icon: UserIcon,
    },
    {
      text: "Active Users",
      count: "2,453",
      icon: ActiveUserIcon,
    },
    {
      text: "Users With Loans",
      count: "12,453",
      icon: UserWithLoanIcon,
    },
    {
      text: "Users with Savings",
      count: "102,453",
      icon: UserWithSavingsIcon,
    },
  ];

  export const filterItems = [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Date",
      name: "date_joined",
      type: "date",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
    },
  ];

  export const filtersArray = [
    "Organization",
    "Username",
    "Email",
    "Phone Number",
    "Date Joined",
    "Status",
  ]

  export const mockUsers = [
    {
      id: '1235654',
      name: "James",
      email: "test@example.com",
      phone: "12345",
      username: "testuser",
      company: "Company A",
      status: "Active" as UserStatus,
      date_joined: "2024-03-10",
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
    },
    {
      id: '12324',
      name: "Sam",
      email: "hello@domain.com",
      phone: "67890",
      username: "helloUser",
      company: "Company B",
      status: "inactive" as UserStatus,
      date_joined: "2024-02-15",
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
    },
  ];