import React from "react";
import styles from "./Tab.module.scss";
import Button from "../Button/Button";

interface TabsProps {
  tabs: { name: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <Button
          variant="normal"
          key={tab.name}
          className={`tabs ${activeTab === tab.name ? styles.active_tab : ""}`}
          onClick={() => setActiveTab(tab.name)}
        >
          <p>{tab.name}</p>
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
