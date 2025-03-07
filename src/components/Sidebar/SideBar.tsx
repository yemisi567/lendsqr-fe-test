import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./Sidebar.module.scss";

// Import Icons
import { BriefCaseIcon } from "../../Icons/BriefCase";
import { HomeIcon } from "../../Icons/Home";
import { UserFriendsIcon } from "../../Icons/UserFriends";
import { UserIcon } from "../../Icons/Users";
import { SlackIcon } from "../../Icons/Slack";
import { HandShakeIcon } from "../../Icons/HandShake";
import { PiggyBankIcon } from "../../Icons/PiggyBank";
import { GroupSlackIcon } from "../../Icons/GroupSlack";
import { UserCheckIcon } from "../../Icons/UserCheck";
import { UserTimesIcon } from "../../Icons/UserTimes";
import { GroupHomeIcon } from "../../Icons/GroupHome";
import { CoinsSolidIcon } from "../../Icons/CoinsSolid";
import { ExportIcon } from "../../Icons/Export";
import { GalaxyIcon } from "../../Icons/Galaxy";
import { UserCogIcon } from "../../Icons/UserCog";
import { ScrollIcon } from "../../Icons/Scroll";
import { ClipBoardListIcon } from "../../Icons/ClipBoardList";
import { SlidersIcon } from "../../Icons/Sliders";
import { BadgePercentIcon } from "../../Icons/BadgePercent";
import { ChevronDownIcon } from "../../Icons/ChevronDown";
import { ChartBarIcon } from "../../Icons/ChartBar";
import Button from "../../ui/Button/Button";
import ChevronLeftIcon from "../../Icons/ChevronLeft";
import { LogoutIcon } from "../../Icons/Logout";
import { useAuth } from "../../context/Auth/useAuth";
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav_link, { [styles.active]: isActive });

  const handleLogout = () => {
    logout();
  };
  const menuSections = [
    {
      title: "",
      items: [
        {
          path: "/switch-organization",
          Icon: BriefCaseIcon,
          text: "Switch Organization",
          dropdown: true,
        },
        { path: "/dashboard", Icon: HomeIcon, text: "Dashboard" },
      ],
    },
    {
      title: "CUSTOMERS",
      items: [
        { path: "/users", Icon: UserFriendsIcon, text: "Users" },
        { path: "/guarantors", Icon: UserIcon, text: "Guarantors" },
        { path: "/loans", Icon: SlackIcon, text: "Loans" },
        {
          path: "/decision-models",
          Icon: HandShakeIcon,
          text: "Decision Models",
        },
        { path: "/savings", Icon: PiggyBankIcon, text: "Savings" },
        { path: "/loan-requests", Icon: GroupSlackIcon, text: "Loan Requests" },
        { path: "/whitelist", Icon: UserCheckIcon, text: "Whitelist" },
        { path: "/karma", Icon: UserTimesIcon, text: "Karma" },
      ],
    },
    {
      title: "BUSINESSES",
      items: [
        { path: "/organization", Icon: BriefCaseIcon, text: "Organization" },
        { path: "/loan-products", Icon: GroupSlackIcon, text: "Loan Products" },
        {
          path: "/savings-products",
          Icon: GroupHomeIcon,
          text: "Savings Products",
        },
        {
          path: "/fees-charges",
          Icon: CoinsSolidIcon,
          text: "Fees and Charges",
        },
        {
          path: "/transactions",
          Icon: ExportIcon,
          text: "Transactions",
        },
        {
          path: "/services",
          Icon: GalaxyIcon,
          text: "Services",
        },
        {
          path: "/service-account",
          Icon: UserCogIcon,
          text: "Service Account",
        },
        {
          path: "/settlements",
          Icon: ScrollIcon,
          text: "Settlements",
        },
        {
          path: "/reports",
          Icon: ChartBarIcon,
          text: "Reports",
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { path: "/preferences", Icon: SlidersIcon, text: "Preferences" },
        {
          path: "/fees-pricing",
          Icon: BadgePercentIcon,
          text: "Fees and Pricing",
        },
        {
          path: "/audit-log",
          Icon: ClipBoardListIcon,
          text: "Audit Log",
        },
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <aside
        className={classNames(styles.sidebar, "fs-exclude", {
          [styles.sidebar_hide]: !isSidebarOpen,
        })}
      >
        <div className={styles.header}>
          <img src="/assets/in-app-logo.svg" alt="Logo" />
          <div className={styles.mobile_header}>
            <Button variant="normal" onClick={toggleSidebar}>
              <ChevronLeftIcon />
            </Button>
          </div>
        </div>
        <ul className={styles.menu}>
          {menuSections.map((section, index) => (
            <li key={index}>
              {section.title && (
                <p className={styles.menu_header}>{section.title}</p>
              )}
              {section.items.map(({ path, Icon, text, dropdown }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={linkClass}
                  onClick={toggleSidebar}
                >
                  <div className={styles.menu_item}>
                    <Icon />
                    <p>{text}</p>
                    {dropdown && <ChevronDownIcon />}
                  </div>
                </NavLink>
              ))}
            </li>
          ))}
        </ul>
        <div className={styles.logout}>
          <Button variant="normal" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </Button>
          <p>v.1.2.0</p>
        </div>
      </aside>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
