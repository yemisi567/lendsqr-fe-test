import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../helpers/helper";
import { IUserDetails } from "../types/types";

const useFilter = (users: IUserDetails[]) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams] = useSearchParams();

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const companies = useMemo(() => [...new Set(users?.map((user) => user.company))], [users]);

  // Extract search params and convert them
  const filters = useMemo(() => ({
    email: searchParams.get("email")?.toLowerCase(),
    phone: searchParams.get("phone")?.toLowerCase(),
    username: searchParams.get("username")?.toLowerCase(),
    company: searchParams.get("company")?.toLowerCase(),
    status: searchParams.get("status")?.toLowerCase(),
    date_joined: searchParams.get("date_joined"),
  }), [searchParams]);

  const formattedDate = filters.date_joined ? formatDate(filters.date_joined).split(",")[0] : null;

  // Filter logic 
  const filteredUsers = useMemo(() => {
    if (!filters.email && !filters.phone && !filters.username && !filters.status && !filters.company && !filters.date_joined) {
      return users;
    }

    return users?.filter((user) => {
      return (
        (filters.phone && user.phone.toLowerCase().includes(filters.phone)) ||
        (filters.email && user.email.toLowerCase().includes(filters.email)) ||
        (filters.username && user.username.toLowerCase().includes(filters.username)) ||
        (filters.status && user.status.toLowerCase() === filters.status) ||
        (filters.company && user.company.toLowerCase() === filters.company) ||
        (filters.date_joined && formatDate(user.date_joined).includes(formattedDate!))
      );
    });
  }, [users, filters, formattedDate]);

  return { showFilter, handleShowFilter, companies, filteredUsers };
};

export default useFilter;
