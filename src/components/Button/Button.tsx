import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={classNames("button", className)}>
      {children}
    </button>
  );
};

export default Button;
