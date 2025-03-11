import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../helpers/helper";
import { IUserDetails } from "../types/types";

const useFilter = (users: IUserDetails[], searchQuery?: string) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams] = useSearchParams();

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const companies = useMemo(() => [...new Set(users?.map((user) => user.company))], [users]);

  const filters = useMemo(() => ({
    email: searchParams.get("email")?.toLowerCase(),
    phone: searchParams.get("phone")?.toLowerCase(),
    username: searchParams.get("username")?.toLowerCase(),
    company: searchParams.get("company")?.toLowerCase(),
    status: searchParams.get("status")?.toLowerCase(),
    date_joined: searchParams.get("date_joined"),
  }), [searchParams]);

  const formattedDate = filters.date_joined ? formatDate(filters.date_joined).split(",")[0] : null;

  const lowercasedQuery = searchQuery?.toLowerCase().trim();

  const filteredUsers = useMemo(() => {
    if (
      !filters.email && !filters.phone && !filters.username && !filters.status &&
      !filters.company && !filters.date_joined && !lowercasedQuery
    ) {
      return users;
    }

    return users?.filter((user) => {
      const matchesFilters =
        (filters.phone && user.phone.toLowerCase().includes(filters.phone)) ||
        (filters.email && user.email.toLowerCase().includes(filters.email)) ||
        (filters.username && user.username.toLowerCase().includes(filters.username)) ||
        (filters.status && user.status.toLowerCase() === filters.status) ||
        (filters.company && user.company.toLowerCase() === filters.company) ||
        (filters.date_joined && formatDate(user.date_joined).includes(formattedDate!));

      const matchesSearchQuery =
        lowercasedQuery &&
        (user.phone.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        user.username.toLowerCase().includes(lowercasedQuery) ||
        user.status.toLowerCase().includes(lowercasedQuery) ||
        user.company.toLowerCase().includes(lowercasedQuery) ||
        formatDate(user.date_joined).includes(lowercasedQuery));

      return matchesFilters || matchesSearchQuery;
    });
  }, [users, filters, formattedDate, lowercasedQuery]);

  return { showFilter, handleShowFilter, companies, filteredUsers };
};

export default useFilter;
