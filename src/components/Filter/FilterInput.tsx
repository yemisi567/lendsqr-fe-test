import styles from "./Filter.module.scss";

interface FilterInputProps {
  name: string;
  type: string;
  label: string;
}

export const FilterInput = ({ name, type, label }: FilterInputProps) => (
  <div className={styles.input_container}>
    <label htmlFor={name}>{label}</label>
    <input type={type} name={name} placeholder={label} />
  </div>
);
