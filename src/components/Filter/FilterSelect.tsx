import styles from "./Filter.module.scss";

interface IFilterSelect {
  label: string;
  options: string[];
  name: string;
}

export const FilterSelect = ({ label, options, name }: IFilterSelect) => (
  <div className={styles.input_container}>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
