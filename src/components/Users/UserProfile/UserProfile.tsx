import { useState, useEffect } from "react";
import { IUserDetails } from "../../../types/types";
import Tabs from "../../../ui/Tab/Tab";
import UserInformation from "../UserInformation/UserInformation";
import { BackIcon } from "../../../Icons/Back";
import { Link } from "react-router-dom";
import styles from "../Users.module.scss";
import Button from "../../../ui/Button/Button";
import { UserAvatarIcon } from "../../../Icons/UserAvatar";
import Card from "../../../ui/Card/Card";

const UserProfile = () => {
  const [user, setUser] = useState<IUserDetails | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const TABS = [
    {
      name: "General Details",
      component: <UserInformation user={user as IUserDetails} />,
    },
    {
      name: "Documents",
      component: <div className={styles.empty_tabs}>Documents</div>,
    },
    {
      name: "Bank Details",
      component: <div className={styles.empty_tabs}>Bank Details</div>,
    },
    {
      name: "Loans",
      component: <div className={styles.empty_tabs}>Loans</div>,
    },
    {
      name: "Savings",
      component: <div className={styles.empty_tabs}>Savings</div>,
    },
    {
      name: "App and System",
      component: <div className={styles.empty_tabs}>App and System</div>,
    },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].name);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className={`${styles.user_details} hide-scrollbar`}>
      <Link to="/dashboard/users">
        <BackIcon />
        Back to Users
      </Link>
      <div className={styles.user_details_header}>
        <h1>User Details</h1>
        <div>
          <Button variant="normal">Blacklist User</Button>
          <Button variant="normal">Activate User</Button>
        </div>
      </div>

      <Card className={styles.user_details_banner}>
        <div className={styles.user_details_banner_top}>
          <figure>
            <UserAvatarIcon />
          </figure>
          <span>
            <h2 className={styles.large_text}>{user.name}</h2>
            <h3>{user.id.slice(0, 10).toUpperCase()}</h3>
          </span>
          <span>
            <h2 className={styles.small_heading}>User&apos;s tier</h2>
            <div>
              {Array.from({ length: 3 }, (_, index) => (
                <img
                  src={`/assets/star-${index + 1}.svg`}
                  alt="star"
                  key={index}
                />
              ))}
            </div>
          </span>
          <span>
            <h2 className={styles.large_text}>{user?.monthly_income}</h2>
            <h3 className={styles.smaller_heading}>{`${
              user?.account_number || "--"
            }/${user?.bank_name || "--"}`}</h3>
          </span>
        </div>
        <div>
          <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </Card>

      <Card className={styles.user_details_main_content}>
        {TABS.find((tab) => tab.name === activeTab)?.component}
      </Card>
    </div>
  );
};

export default UserProfile;
