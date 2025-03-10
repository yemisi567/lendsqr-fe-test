import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styles from "./Layout.module.scss";
import Sidebar from "../components/Sidebar/SideBar";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Ensure sidebar is open when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.layout_container}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.main_content}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={classNames(styles.content, {
            [styles.content_full]: !isSidebarOpen,
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
