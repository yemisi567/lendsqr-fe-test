import { useState } from "react";
import { filtersArray } from "../../../constants/constants";
import { useUsers } from "../../../context/Users/useUsers";
import useFilter from "../../../hooks/useFilter";
import usePagination from "../../../hooks/usePagination";
import { FilterIcon } from "../../../Icons/Filter";
import { IUserDetails } from "../../../types/types";
import Button from "../../../ui/Button/Button";
import Card from "../../../ui/Card/Card";
import Filter from "../../../ui/Filter/Filter";
import Pagination from "../../Pagination/Pagination";
import Details from "../Details/Details";
import styles from "./Table.module.scss";

const UsersTable: React.FC = () => {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const { users, loading, error } = useUsers();
  const { filteredUsers, handleShowFilter, showFilter, companies } = useFilter(
    users as IUserDetails[]
  );
  const {
    handleOnPrevious,
    handleOnNext,
    handleChangePageSize,
    end,
    start,
    page,
    pageSize,
  } = usePagination(filteredUsers?.length);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  if (!filteredUsers?.length) {
    return (
      <div className={`${styles.users_table_container} hide-scrollbar`}>
        <h2>No users for given filter</h2>
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className={`${styles.users_table_container} hide-scrollbar`}>
          {showFilter && (
            <Filter handleShowFilter={handleShowFilter} companies={companies} />
          )}
          <table>
            <thead>
              <tr>
                {filtersArray?.map((heading, index) => (
                  <th key={index}>
                    <div className={styles.th_content}>
                      {heading}
                      <Button variant="normal" onClick={handleShowFilter}>
                        <FilterIcon />
                      </Button>
                    </div>
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.slice(start, end).map((user: IUserDetails) => (
                <Details
                  key={user.id}
                  user={user}
                  activePopover={activePopover}
                  setActivePopover={setActivePopover}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination
        dataSize={filteredUsers.length}
        currentDetail={Math.min(end, filteredUsers.length)}
        page={page}
        pageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        onHandleNext={handleOnNext}
        onHandlePrevious={handleOnPrevious}
      />
    </>
  );
};
export default UsersTable;
