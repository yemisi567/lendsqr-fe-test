import styles from "./Details.module.scss";
import { IUserDetails } from "../../../types/types";
import { EllipsisIcon } from "../../../Icons/Elipsis";
import { formatDate } from "../../../helpers/helper";
import Popover from "../../../ui/Popover/Popover";
import { useEffect, useRef } from "react";

interface IDetails {
  user: IUserDetails;
  activePopover: string | null;
  setActivePopover: React.Dispatch<React.SetStateAction<string | null>>;
}

const Details = ({ user, activePopover, setActivePopover }: IDetails) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const formattedDate = formatDate(user.date_joined);
  const isPopoverOpen = activePopover === user.id;

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen, setActivePopover]);

  return (
    <tr>
      <td>{user.company}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{formattedDate}</td>
      <td>
        <span
          className={`${styles.status_badge} ${
            styles[user.status.toLowerCase()]
          }`}
        >
          {user.status}
        </span>
      </td>
      <td
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => setActivePopover(isPopoverOpen ? null : user.id)}
        data-testid="ellipsis-icon"
      >
        <EllipsisIcon />
        {isPopoverOpen && <Popover id={user.id} userDetails={user} />}
      </td>
    </tr>
  );
};

export default Details;
