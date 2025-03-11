import { JSX } from "react";
import styles from "../Users.module.scss";

interface UserDetailSectionProps {
  className: string;
  heading: string;
  children: JSX.Element[];
}

const UserDetailSection = ({ children, heading }: UserDetailSectionProps) => {
  return (
    <div className={styles.user_info}>
      <h2>{heading}</h2>
      <section>{children}</section>
    </div>
  );
};

export default UserDetailSection;
