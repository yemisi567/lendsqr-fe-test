import { ActiveUserIcon } from "../Icons/ActiveUser";
import { UserIcon } from "../Icons/User";
import { UserWithLoanIcon } from "../Icons/UserWithLoan";
import { UserWithSavingsIcon } from "../Icons/UserWithSavings";

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