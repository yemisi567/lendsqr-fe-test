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

  const handleLogout = () => {
    logout();
  };
  const menuSections: {
    title: string;
    items: {
      path: string;
      Icon: React.FC;
      text: string;
      dropdown?: boolean;
      disabled?: boolean;
    }[];
  }[] = [
    {
      title: "",
      items: [
        {
          path: "/dashboard/switch-organization",
          Icon: BriefCaseIcon,
          text: "Switch Organization",
          dropdown: true,
          disabled: true,
        },
        {
          path: "/dashboard/home",
          Icon: HomeIcon,
          text: "Dashboard",
          disabled: true,
        },
      ],
    },
    {
      title: "CUSTOMERS",
      items: [
        { path: "/dashboard/users", Icon: UserFriendsIcon, text: "Users" },
        {
          path: "/dashboard/guarantors",
          Icon: UserIcon,
          text: "Guarantors",
          disabled: true,
        },
        {
          path: "/dashboard/loans",
          Icon: SlackIcon,
          text: "Loans",
          disabled: true,
        },
        {
          path: "/dashboard/decision-models",
          Icon: HandShakeIcon,
          text: "Decision Models",
          disabled: true,
        },
        {
          path: "/dashboard/savings",
          Icon: PiggyBankIcon,
          text: "Savings",
          disabled: true,
        },
        {
          path: "/dashboard/loan-requests",
          Icon: GroupSlackIcon,
          text: "Loan Requests",
          disabled: true,
        },
        {
          path: "/dashboard/whitelist",
          Icon: UserCheckIcon,
          text: "Whitelist",
          disabled: true,
        },
        {
          path: "/dashboard/karma",
          Icon: UserTimesIcon,
          text: "Karma",
          disabled: true,
        },
      ],
    },
    {
      title: "BUSINESSES",
      items: [
        {
          path: "/dashboard/organization",
          Icon: BriefCaseIcon,
          text: "Organization",
          disabled: true,
        },
        {
          path: "/dashboard/loan-products",
          Icon: GroupSlackIcon,
          text: "Loan Products",
          disabled: true,
        },
        {
          path: "/dashboard/savings-products",
          Icon: GroupHomeIcon,
          text: "Savings Products",
          disabled: true,
        },
        {
          path: "/dashboard/fees-charges",
          Icon: CoinsSolidIcon,
          text: "Fees and Charges",
          disabled: true,
        },
        {
          path: "/dashboard/transactions",
          Icon: ExportIcon,
          text: "Transactions",
          disabled: true,
        },
        {
          path: "/dashboard/services",
          Icon: GalaxyIcon,
          text: "Services",
          disabled: true,
        },
        {
          path: "/dashboard/service-account",
          Icon: UserCogIcon,
          text: "Service Account",
          disabled: true,
        },
        {
          path: "/dashboard/settlements",
          Icon: ScrollIcon,
          text: "Settlements",
          disabled: true,
        },
        {
          path: "/dashboard/reports",
          Icon: ChartBarIcon,
          text: "Reports",
          disabled: true,
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          path: "/dashboard/preferences",
          Icon: SlidersIcon,
          text: "Preferences",
          disabled: true,
        },
        {
          path: "/dashboard/fees-pricing",
          Icon: BadgePercentIcon,
          text: "Fees and Pricing",
          disabled: true,
        },
        {
          path: "/dashboard/audit-log",
          Icon: ClipBoardListIcon,
          text: "Audit Log",
          disabled: true,
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
              {section.items.map(({ path, Icon, text, dropdown, disabled }) => (
                <NavLink
                  key={path}
                  to={disabled ? "" : path} // Empty path prevents React Router issues
                  className={({ isActive }) =>
                    classNames(styles.nav_link, {
                      [styles.active]: isActive && !disabled, // Only apply active if not disabled
                      [styles.disabled]: disabled, // Apply disabled styles
                    })
                  }
                  onClick={(e) => disabled && e.preventDefault()} // Prevents click for disabled items
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
