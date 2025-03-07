import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name?: string;
  onShowPassword?: () => void;
  error?: string | null;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  error,
  onShowPassword,
  className,
  ...props
}) => {
  return (
    <div className={styles.form_input}>
      <input name={name} {...props} className={classNames("", className)} />
      {name === "password" && (
        <p className={styles.toggle_visibility} onClick={onShowPassword}>
          {type === "password" ? "SHOW" : "HIDE"}
        </p>
      )}
      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default Input;
