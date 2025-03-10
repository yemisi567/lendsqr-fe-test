import UsersTable from "../../components/Users/Table/Table";
import { CardDetails } from "../../constants/constants";
import Card from "../../ui/Card/Card";
import styles from "./Users.module.scss";

const Users: React.FC = () => {
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
        <UsersTable />
      </div>
    </div>
  );
};
export default Users;
