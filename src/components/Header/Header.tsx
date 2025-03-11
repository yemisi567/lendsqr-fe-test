import classNames from "classnames";
import { NotificationIcon } from "../../Icons/Notification";
import { useState } from "react";
import styles from "./Header.module.scss";
import Input from "../../ui/Input/Input";
import { DropdownIcon } from "../../Icons/Dropdown";
import MenuIcon from "../../Icons/Menu";
import Button from "../../ui/Button/Button";
import { SearchIcon } from "../../Icons/SearchIcon";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className={styles.header_container}>
      {!isSidebarOpen && (
        <>
          <div className={styles.logo_container}>
            <Button
              onClick={toggleSidebar}
              variant="normal"
              data-testid="menu-button"
            >
              <MenuIcon />
            </Button>
            <div className={styles.text}>Docs</div>
            <NotificationIcon />
            <div className={styles.profile}>
              <div>
                <img src="/assets/avatar.svg" alt="User Avatar" />
              </div>
              <div className={`${styles.text} ${styles.user_name}`}>
                Adedeji
              </div>
              <div>
                <DropdownIcon />
              </div>
            </div>
          </div>
          <div className={styles.mobile_header_search}>
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for anything"
            />
            <Button className={styles.button}>
              <SearchIcon />
            </Button>
          </div>
        </>
      )}

      <div className={styles.header_search}>
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for anything"
        />
        <Button className={styles.button}>
          <SearchIcon />
        </Button>
      </div>

      <div className={classNames(styles.right_section, "max-[678px]:hidden")}>
        <div className={styles.text}>Docs</div>
        <div>
          <NotificationIcon />
        </div>
        <div className={styles.profile}>
          <div>
            <img src="/assets/avatar.svg" alt="User Avatar" />
          </div>
          <div className={`${styles.text} ${styles.user_name}`}>Adedeji</div>
          <div>
            <DropdownIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
