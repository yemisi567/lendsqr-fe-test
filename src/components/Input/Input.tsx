import React, { InputHTMLAttributes } from "react";
import "./Input.scss";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
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
    <div className="form_input">
      <input name={name} {...props} className={classNames("", className)} />
      {name === "password" && (
        <p className="toggle_visibility" onClick={onShowPassword}>
          {type === "password" ? "SHOW" : "HIDE"}
        </p>
      )}
      {error && <p className="error_message">{error}</p>}
    </div>
  );
};

export default Input;
