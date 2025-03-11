import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./filter.module.scss";
import { FormEvent, useMemo } from "react";
import { FilterSelect } from "../../components/Filter/FilterSelect";
import { filterItems } from "../../constants/constants";
import { FilterInput } from "../../components/Filter/FilterInput";

const Filter = ({
  handleShowFilter,
  companies,
}: {
  handleShowFilter: () => void;
  companies: string[];
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const handleFilter = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    formData.forEach((value, key) => {
      if (value && value !== "Select") {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    navigate(
      queryString ? `/dashboard/users?${queryString}` : "/dashboard/users"
    );
    handleShowFilter();
  };

  const handleReset = () => {
    navigate("/dashboard/users");
    handleShowFilter();
  };

  return (
    <section className={`${styles.filter} custom-scrollbar`}>
      <form onSubmit={handleFilter}>
        <FilterSelect
          label="Organization"
          name="company"
          options={["Select", ...companies]}
        />
        {filterItems.map((input, index) => (
          <FilterInput key={index} {...input} />
        ))}
        <FilterSelect
          label="Status"
          name="status"
          options={["Select", "Active", "Pending", "Blacklisted", "Inactive"]}
        />
        <div className={styles.filter_cta}>
          <button
            type="reset"
            className={styles.reset_button}
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className={styles.filter_button}>
            Filter
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
