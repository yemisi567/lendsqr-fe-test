import { useRef, useState } from "react";
import styles from "./Filter.module.scss";

interface FilterInputProps {
  name: string;
  type: string;
  label: string;
}

export const FilterInput = ({ name, type, label }: FilterInputProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={styles.input_container}>
      <label htmlFor={name}>{label}</label>
      {type === "date" ? (
        <div className={styles.date_picker} onClick={handleIconClick}>
          <input
            type="date"
            name={name}
            ref={dateInputRef}
            value={selectedDate}
            onChange={handleDateChange}
            className={styles.date_input}
          />
          {!selectedDate && <span className={styles.placeholder}>Date</span>}
          {selectedDate && (
            <span className={styles.selected_date}>{selectedDate}</span>
          )}
          <img
            src="/assets/calendar.svg"
            alt="Calendar"
            className={styles.calendar_icon}
          />
        </div>
      ) : (
        <input type={type} name={name} placeholder={label} />
      )}
    </div>
  );
};
