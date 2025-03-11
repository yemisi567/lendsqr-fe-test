import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../helpers/helper";
import { IUser } from "../types/types";

const useFilter = (users: IUser[]) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams] = useSearchParams();

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const companies = useMemo(
    () => [...new Set(users?.map((user) => user.company))],
    [users]
  );

  const filters = useMemo(
    () => ({
      email: searchParams.get("email")?.toLowerCase(),
      phone: searchParams.get("phone")?.toLowerCase(),
      username: searchParams.get("username")?.toLowerCase(),
      company: searchParams.get("company")?.toLowerCase(),
      status: searchParams.get("status")?.toLowerCase(),
      date_joined: searchParams.get("date_joined"),
    }),
    [searchParams]
  );

  const formattedDate = filters.date_joined
    ? formatDate(filters.date_joined).split(",")[0]
    : null;

  const filteredUsers = useMemo(() => {
    if (
      !filters.email &&
      !filters.phone &&
      !filters.username &&
      !filters.status &&
      !filters.company &&
      !filters.date_joined
    ) {
      return users;
    }

    return users?.filter((user) => {
      const matchesFilters =
        (filters.phone && user.phone.toLowerCase().includes(filters.phone)) ||
        (filters.email && user.email.toLowerCase().includes(filters.email)) ||
        (filters.username &&
          user.username.toLowerCase().includes(filters.username)) ||
        (filters.status && user.status.toLowerCase() === filters.status) ||
        (filters.company && user.company.toLowerCase() === filters.company) ||
        (filters.date_joined &&
          formatDate(user.date_joined).includes(formattedDate!));

      return matchesFilters;
    });
  }, [users, filters, formattedDate]);

  return { showFilter, handleShowFilter, companies, filteredUsers };
};

export default useFilter;
