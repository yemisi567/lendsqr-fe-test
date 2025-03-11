import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "normal" | "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        { [styles.button]: variant === "normal" },
        { [styles.primary]: variant === "primary" },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
