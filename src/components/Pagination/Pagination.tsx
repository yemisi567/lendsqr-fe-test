import styles from "./pagination.module.scss";
import usePagination from "../../hooks/usePagination";
import { ChevronDownIcon } from "../../Icons/ChevronDown";
import ChevronLeftIcon from "../../Icons/ChevronLeft";
import ChevronRightIcon from "../../Icons/ChevronRight";
import Button from "../../ui/Button/Button";
import { useState } from "react";

interface PaginationProps {
  page: number;
  dataSize: number;
  pageSize: number;
  currentDetail: number;
  onChangePageSize: (size: number) => void;
  onHandleNext: () => void;
  onHandlePrevious: () => void;
}

const Pagination = ({
  page,
  dataSize,
  onHandleNext,
  pageSize,
  onHandlePrevious,
}: PaginationProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { handlePageChange, handleChangePageSize } = usePagination(dataSize);

  const onChangePageSize = (size: number) => {
    setShowDropdown(false);
    if (size !== pageSize) {
      handleChangePageSize(size);
    }
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(dataSize / pageSize);
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);

      if (page > 4) pages.push("...");
      const startPage = Math.max(4, page - 1);
      const endPage = Math.min(totalPages - 2, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.pagination_container}>
      <div className={styles.count_container}>
        Showing{" "}
        <div className={styles.dropdown_wrapper}>
          <Button
            variant="normal"
            className={styles.current_detail}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {pageSize} <ChevronDownIcon />
          </Button>
          {showDropdown && (
            <ul className={styles.dropdown_menu}>
              {[50, 100, 150, 200, 250, 500].map((size) => (
                <li key={size} onClick={() => onChangePageSize(size)}>
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        out of {dataSize}
      </div>

      <div className={styles.pagination_cta}>
        <Button
          variant="normal"
          className={styles.pagination_cta_button}
          onClick={onHandlePrevious}
          disabled={page <= 1}
        >
          <ChevronLeftIcon />
        </Button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <Button
              variant="normal"
              key={i}
              className={styles.ellipsis}
              onClick={() =>
                handlePageChange(p === "..." ? page + 3 : Number(p))
              }
            >
              ...
            </Button>
          ) : (
            <Button
              variant="normal"
              key={i}
              onClick={() => handlePageChange(Number(p))}
              className={p === page ? styles.active_page : styles.inactive_page}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="normal"
          className={styles.pagination_cta_button}
          onClick={onHandleNext}
          disabled={page >= Math.ceil(dataSize / pageSize)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
export default Pagination;
