import styles from "./Popover.module.scss";
import { IUser } from "../../types/types";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { BlackListUserIcon } from "../../Icons/BlackListUser";
import { ActivateUserIcon } from "../../Icons/ActivateUser";
import { ViewUserIcon } from "../../Icons/ViewUser";
import { JSX } from "react";

interface PopoverProps {
  id: string;
  userDetails: IUser;
}

const PopoverItem = ({
  onClick,
  icon,
  label,
}: {
  onClick?: () => void;
  icon: JSX.Element;
  label: string;
}) => (
  <Button variant="normal" onClick={onClick} className={styles.popover_item}>
    {icon}
    <p>{label}</p>
  </Button>
);

const Popover = ({ id, userDetails }: PopoverProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userDetails));
      navigate(`/dashboard/users/${id}`);
    }
  };

  return (
    <div className={styles.popover}>
      <PopoverItem
        onClick={handleViewDetails}
        icon={<ViewUserIcon />}
        label="View Details"
      />
      <PopoverItem icon={<BlackListUserIcon />} label="Blacklist User" />
      <PopoverItem icon={<ActivateUserIcon />} label="Activate User" />
    </div>
  );
};

export default Popover;
