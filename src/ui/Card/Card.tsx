import React from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

export default Card;
