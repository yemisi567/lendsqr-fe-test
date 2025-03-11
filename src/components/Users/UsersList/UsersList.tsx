import { CardDetails } from "../../../constants/constants";
import { useUsers } from "../../../context/Users/useUsers";
import useFilter from "../../../hooks/useFilter";
import { IUserDetails } from "../../../types/types";
import Card from "../../../ui/Card/Card";
import SkeletonLoader from "../../../ui/SkeletonLoader/SkeletonLoader";
import UsersTable from "../Table/Table";
import styles from "./UsersList.module.scss";

const UsersList: React.FC = () => {
  const { users, loading, error } = useUsers();
  const { filteredUsers } = useFilter(users as IUserDetails[]);

  if (loading) return <SkeletonLoader />;
  if (error) return <p>{error}</p>;
  return (
    <div className={styles.user_wrapper}>
      <h1 className={styles.text}>Users</h1>
      <div className={styles.card_container}>
        {CardDetails.map(({ text, count, icon: Icon }, index) => (
          <Card key={index}>
            <div className={styles.icon_container}>
              <Icon />
            </div>
            <p className={styles.sub_text}>{text.toUpperCase()}</p>
            <h2 className={`${styles.text} ${styles.text_bold}`}>{count}</h2>
          </Card>
        ))}
      </div>
      <div className={styles.table_wrapper}>
        <UsersTable
          users={users as IUserDetails[]}
          filteredUsers={filteredUsers as IUserDetails[]}
        />
      </div>
    </div>
  );
};
export default UsersList;
